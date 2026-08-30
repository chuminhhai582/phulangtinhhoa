-- 4.7. Đơn hàng, phân công, tiền
create table orders (
  id               uuid primary key default gen_random_uuid(),
  code             text unique not null,
  customer_id      uuid not null references customers(id),
  quote_id         uuid references quotes(id),
  status           order_status not null default 'co_design',
  currency         text not null,
  fx_rate          numeric(14,6) not null,
  incoterm         text not null,
  total_value      numeric(14,2) not null,
  market           text,
  promised_ship_date date,
  actual_ship_date   date,
  contract_file    text,
  owner_id         uuid references profiles(id),
  risk_flags       jsonb default '[]',
  created_at       timestamptz not null default now(),
  closed_at        timestamptz
);

create table order_lines (
  id                uuid primary key default gen_random_uuid(),
  order_id          uuid not null references orders(id) on delete cascade,
  design_id         uuid not null references designs(id),
  design_version_id uuid not null references design_versions(id),
  tolerance_set_id  uuid references tolerance_sets(id),
  household_id      uuid references households(id),
  qty_ordered       int not null,
  qty_spare         int not null default 0,
  unit_price        numeric(14,2) not null,
  unit_cost         numeric(14,2),
  cost_locked_at    timestamptz,
  assignment_confirmed_at timestamptz,
  status            text not null default 'pending'
);
create index on order_lines (household_id, status);

create table order_allocations (
  id          uuid primary key default gen_random_uuid(),
  order_id    uuid not null references orders(id) on delete cascade,
  party_type  party_type not null,
  party_id    uuid,
  amount      numeric(14,2) not null,
  pct         numeric(5,2),
  note        text
);

create table payment_milestones (
  id          uuid primary key default gen_random_uuid(),
  order_id    uuid not null references orders(id) on delete cascade,
  kind        milestone_kind not null,
  label       text not null,
  pct         numeric(5,2) not null,
  amount      numeric(14,2) not null,
  due_rule    text,
  due_date    date,
  status      milestone_status not null default 'pending',
  invoice_no  text,
  paid_at     timestamptz,
  evidence    jsonb default '[]',
  sort_order  smallint default 0
);

create table household_payouts (
  id             uuid primary key default gen_random_uuid(),
  order_line_id  uuid not null references order_lines(id) on delete cascade,
  household_id   uuid not null references households(id),
  milestone      text not null,
  amount         numeric(14,2) not null,
  status         payout_status not null default 'planned',
  due_date       date,
  paid_at        timestamptz,
  evidence       jsonb default '[]',
  confirmed_by_household_at timestamptz,
  created_at     timestamptz not null default now()
);

create table cost_change_requests (
  id             uuid primary key default gen_random_uuid(),
  order_line_id  uuid not null references order_lines(id),
  old_cost       numeric(14,2) not null,
  new_cost       numeric(14,2) not null,
  reason         text not null,
  requested_by   uuid references profiles(id),
  household_agreed_at timestamptz,
  approved_by    uuid references profiles(id),
  status         text not null default 'pending',
  created_at     timestamptz not null default now()
);

create table samples (
  id            uuid primary key default gen_random_uuid(),
  code          text unique not null,
  inquiry_id    uuid references inquiries(id),
  design_id     uuid references designs(id),
  customer_id   uuid references customers(id),
  household_id  uuid references households(id),
  fee           numeric(14,2) not null default 0,
  fee_paid      boolean not null default false,
  status        sample_status not null default 'requested',
  photos        jsonb default '[]',
  feedback      text,
  shipped_at    timestamptz, decided_at timestamptz
);

create table sample_approvals (
  id               uuid primary key default gen_random_uuid(),
  sample_id        uuid not null references samples(id) on delete cascade,
  tolerance_set_id uuid not null references tolerance_sets(id),
  approved_by_name text not null,
  approved_by_email text,
  signature_data   text,
  ip_hash          text,
  signed_at        timestamptz not null default now(),
  snapshot         jsonb not null
);

-- 4.8. Sản xuất, chất lượng, sai lệch
create table production_batches (
  id              uuid primary key default gen_random_uuid(),
  code            text unique not null,
  order_line_id   uuid references order_lines(id),
  household_id    uuid not null references households(id),
  kiln_id         uuid references kilns(id),
  kiln_schedule_id uuid references kiln_schedules(id),
  status          batch_status not null default 'planned',
  qty_planned     int not null,
  qty_started     int, qty_fired int, qty_passed int, qty_failed int,
  clay_lot        text,
  glaze_lot       text,
  fired_at        timestamptz,
  fuel_note       text,
  defect_rate     numeric(5,2) generated always as
                    (case when qty_fired > 0 then round(qty_failed::numeric*100/qty_fired,2) end) stored,
  created_at      timestamptz not null default now()
);

create table qc_inspections (
  id             uuid primary key default gen_random_uuid(),
  order_line_id  uuid references order_lines(id),
  batch_id       uuid references production_batches(id),
  checkpoint     qc_checkpoint not null,
  inspector_id   uuid references profiles(id),
  inspected_at   timestamptz not null default now(),
  result         qc_result not null,
  measurements   jsonb default '[]',
  photos         jsonb not null default '[]',
  notes          text,
  household_signed_at timestamptz,
  next_action    text,
  offline_id     text unique,
  constraint chk_photos check (jsonb_array_length(photos) >= 1)
);
create index on qc_inspections (order_line_id, checkpoint);

create table nonconformities (
  id                uuid primary key default gen_random_uuid(),
  code              text unique not null,
  batch_id          uuid references production_batches(id),
  order_line_id     uuid references order_lines(id),
  qty               int not null,
  cause             nc_cause not null,
  description       text not null,
  photos            jsonb not null default '[]',
  decision          nc_decision,
  requires_customer_approval boolean not null default false,
  customer_approved_at timestamptz,
  cost_impact       numeric(14,2),
  cost_bearer       party_type,
  preventive_action text,
  owner_id          uuid references profiles(id),
  status            text not null default 'open',
  closed_at         timestamptz,
  created_at        timestamptz not null default now()
);

-- 4.9. Đóng gói, xuất khẩu, chứng từ
create table packing_lists (
  id           uuid primary key default gen_random_uuid(),
  order_id     uuid not null references orders(id) on delete cascade,
  carton_no    text not null,
  l_mm int, w_mm int, h_mm int,
  gross_kg     numeric(8,2), net_kg numeric(8,2),
  contents     jsonb not null,
  cushioning   text,
  stack_limit  smallint,
  photos       jsonb not null default '[]',
  unique (order_id, carton_no)
);

create table export_docs (
  id             uuid primary key default gen_random_uuid(),
  order_id       uuid not null references orders(id) on delete cascade,
  hs_code        text,
  hs_verified_by text,
  hs_verified_at timestamptz,
  co_type        text,
  co_status      text,
  checklist      jsonb not null default '{}',
  notes          text
);

create table shipments (
  id             uuid primary key default gen_random_uuid(),
  order_id       uuid not null references orders(id) on delete cascade,
  carrier        text, awb_bl_no text,
  incoterm       text,
  etd date, eta date, delivered_at date,
  insurance_note text,
  breakage_qty   int not null default 0,
  breakage_rate  numeric(5,2),
  claim_status   text,
  claim_file     text
);

create table documents (
  id          uuid primary key default gen_random_uuid(),
  entity_type text not null,
  entity_id   uuid not null,
  doc_type    text not null,
  file_url    text not null,
  version     smallint not null default 1,
  visible_to  text[] not null default '{staff}',
  uploaded_by uuid references profiles(id),
  created_at  timestamptz not null default now()
);
create index on documents (entity_type, entity_id);

-- 4.10. Hộ chiếu số
create table product_passports (
  id                uuid primary key default gen_random_uuid(),
  public_code       text unique not null,
  order_line_id     uuid references order_lines(id),
  batch_id          uuid references production_batches(id),
  design_id         uuid not null references designs(id),
  design_version_id uuid references design_versions(id),
  household_id      uuid not null references households(id),
  collection_id     uuid references collections(id),
  serial_no         text,
  fired_at          date,
  materials_public  text,
  care_vi           text, care_en text,
  story_vi          text, story_en text,
  author_credit     text,
  images            jsonb not null default '[]',
  published         boolean not null default false,
  published_at      timestamptz,
  published_by      uuid references profiles(id),
  privacy_checked_at timestamptz,
  view_count        int not null default 0
);

create table passport_views (
  id           bigserial primary key,
  passport_id  uuid references product_passports(id) on delete cascade,
  viewed_at    timestamptz not null default now(),
  country_code text,
  referrer     text
);

-- 4.11. Đo lường tác động
create table impact_metrics (
  id           uuid primary key default gen_random_uuid(),
  period       date not null,
  metric_code  text not null,
  household_id uuid references households(id),
  baseline     numeric(14,2),
  value        numeric(14,2) not null,
  evidence_ref text,
  computed_at  timestamptz not null default now(),
  unique (period, metric_code, household_id)
);
