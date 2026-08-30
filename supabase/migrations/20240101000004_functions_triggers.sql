-- 4.12. Sinh mã tự động
create sequence seq_household; create sequence seq_design; create sequence seq_order;
create sequence seq_batch;     create sequence seq_quote;  create sequence seq_nc;

create or replace function gen_code(prefix text, seq text, digits int default 3)
returns text language sql as
$$ select prefix || lpad(nextval(seq)::text, digits, '0') $$;

-- Ví dụ trigger cho orders
create or replace function trg_order_code() returns trigger language plpgsql as $$
begin
  if new.code is null then
    new.code := 'PL-O-' || to_char(now(),'YYYY') || '-' || lpad(nextval('seq_order')::text, 3, '0');
  end if;
  return new;
end $$;
create trigger set_order_code before insert on orders for each row execute function trg_order_code();

-- Hàm trợ giúp cho RLS
create or replace function my_role() returns user_role language sql stable security definer as
$$ select role from profiles where id = auth.uid() $$;

create or replace function my_household() returns uuid language sql stable security definer as
$$ select household_id from profiles where id = auth.uid() $$;

create or replace function my_customer() returns uuid language sql stable security definer as
$$ select customer_id from profiles where id = auth.uid() $$;

create or replace function is_staff() returns boolean language sql stable security definer as
$$ select role in ('admin','coordinator','designer','qc','export','accountant') from profiles where id = auth.uid() $$;

-- 4.14. Ba trigger bắt buộc

-- (1) Cổng chuyển trạng thái đơn hàng
create or replace function assert_order_gate() returns trigger language plpgsql as $$
declare v_msg text; v_cnt int;
begin
  if new.status = old.status then return new; end if;

  if new.status = 'in_production' then
    select count(*) into v_cnt from payment_milestones
      where order_id = new.id and kind = 'deposit' and status = 'paid';
    if v_cnt = 0 then
      raise exception 'G3: Chưa nhận đủ tiền đặt cọc. Không được đặt nguyên liệu và lịch lò.';
    end if;
  end if;

  if new.status = 'packing' then
    select count(distinct checkpoint) into v_cnt from qc_inspections i
      join order_lines l on l.id = i.order_line_id
      where l.order_id = new.id and i.result in ('pass','conditional');
    if v_cnt < (select (value::text)::int from settings where key='min_qc_checkpoints') then
      raise exception 'G4: Đơn hàng chưa đủ số điểm kiểm tra bắt buộc (hiện có %).', v_cnt;
    end if;
    if exists (select 1 from nonconformities n join order_lines l on l.id=n.order_line_id
               where l.order_id = new.id and n.decision is null) then
      raise exception 'G4: Còn sản phẩm không phù hợp chưa có phương án xử lý.';
    end if;
  end if;

  if new.status = 'shipped' then
    if not exists (select 1 from export_docs where order_id = new.id and hs_verified_by is not null) then
      raise exception 'G6: Mã HS chưa được đơn vị khai báo xác nhận.';
    end if;
  end if;

  return new;
end $$;
create trigger t_order_gate before update of status on orders
  for each row execute function assert_order_gate();

-- (2) Phân bổ tiền phải khớp tổng giá trị đơn
create or replace function assert_allocation_sum() returns trigger language plpgsql as $$
declare v_sum numeric; v_total numeric;
begin
  select coalesce(sum(amount),0) into v_sum from order_allocations
    where order_id = coalesce(new.order_id, old.order_id);
  select total_value into v_total from orders
    where id = coalesce(new.order_id, old.order_id);
  if abs(v_sum - v_total) > 1000 then
    raise exception 'Phân bổ tiền (%) không khớp giá trị đơn hàng (%). Chênh lệch cho phép tối đa 1.000đ.', v_sum, v_total;
  end if;
  return null;
end $$;
create constraint trigger t_alloc_sum after insert or update or delete on order_allocations
  deferrable initially deferred for each row execute function assert_allocation_sum();

-- (3) Khóa giá vốn trả hộ sau khi hộ đã xác nhận
create or replace function protect_unit_cost() returns trigger language plpgsql as $$
begin
  if old.cost_locked_at is not null and new.unit_cost is distinct from old.unit_cost then
    if not exists (select 1 from cost_change_requests
                   where order_line_id = old.id and status = 'approved'
                     and new_cost = new.unit_cost and household_agreed_at is not null) then
      raise exception 'Giá trả hộ đã khóa. Phải có yêu cầu thay đổi được hộ nghề đồng ý và người có thẩm quyền duyệt.';
    end if;
  end if;
  return new;
end $$;
create trigger t_protect_cost before update on order_lines
  for each row execute function protect_unit_cost();
