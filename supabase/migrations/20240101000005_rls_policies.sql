-- 4.13. Row Level Security — các policy quan trọng nhất
alter table households        enable row level security;
alter table order_lines       enable row level security;
alter table household_payouts enable row level security;
alter table qc_inspections    enable row level security;
alter table product_passports enable row level security;
alter table orders            enable row level security;
alter table audit_logs        enable row level security;

-- Nhân sự nội bộ đọc toàn bộ hộ nghề
create policy hh_staff_read on households for select
  using (is_staff());

-- Hộ nghề chỉ đọc chính mình
create policy hh_self on households for select
  using (id = my_household());

-- Khách hàng chỉ thấy hộ đã đồng ý công khai (và không thấy cột riêng tư — dùng VIEW bên dưới)
create policy hh_customer_public on households for select
  using (my_role() = 'customer' and public_consent = true);

-- ★ Che cột riêng tư bằng view, vì RLS của Postgres là theo DÒNG không theo CỘT
create view households_public as
  select id, code, name, owner_name, generation, hamlet, public_slug,
         bio_vi, bio_en, cover_image, status
  from households where public_consent = true;
grant select on households_public to anon, authenticated;

-- order_lines: hộ nghề chỉ thấy dòng của mình
create policy ol_artisan on order_lines for select
  using (household_id = my_household());

-- order_lines: nhân sự nội bộ xem tất cả
create policy ol_staff on order_lines for all
  using (is_staff());

-- order_lines: khách hàng thấy dòng thuộc đơn của mình — nhưng KHÔNG được đọc unit_cost
create view order_lines_customer as
  select id, order_id, design_id, design_version_id, qty_ordered, unit_price, status
  from order_lines
  where order_id in (select id from orders where customer_id = my_customer());
grant select on order_lines_customer to authenticated;

-- household_payouts: chỉ hộ đó, kế toán, điều phối, admin
create policy hp_access on household_payouts for select
  using (household_id = my_household()
      or my_role() in ('admin','coordinator','accountant'));

-- Hộ nghề tự xác nhận đã nhận tiền — chỉ được sửa đúng một cột
create policy hp_confirm on household_payouts for update
  using (household_id = my_household())
  with check (household_id = my_household());
-- kèm trigger chặn mọi cột khác ngoài confirmed_by_household_at
create or replace function protect_payout_update() returns trigger language plpgsql as $$
begin
  if my_role() = 'artisan' then
    if new.amount <> old.amount or new.status <> old.status or new.order_line_id <> old.order_line_id or new.milestone <> old.milestone or new.household_id <> old.household_id then
      raise exception 'Hộ nghề chỉ được cập nhật thời gian xác nhận nhận tiền.';
    end if;
  end if;
  return new;
end $$;
create trigger t_protect_payout before update on household_payouts
  for each row execute function protect_payout_update();

-- Hộ chiếu số: ai cũng đọc được bản đã công bố
create policy pp_public on product_passports for select
  using (published = true);
create policy pp_staff on product_passports for all
  using (is_staff());

-- Audit logs: không cho phép update/delete
create policy audit_logs_read on audit_logs for select
  using (is_staff());
create policy audit_logs_insert on audit_logs for insert
  with check (true);
create policy audit_logs_no_update on audit_logs for update
  using (false);
create policy audit_logs_no_delete on audit_logs for delete
  using (false);
