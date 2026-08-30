-- 4.2. Người dùng, nhật ký, cấu hình
create table profiles (
  id            uuid primary key references auth.users(id) on delete cascade,
  full_name     text not null,
  role          user_role not null,
  phone         text,
  email         text,
  locale        text not null default 'vi',
  household_id  uuid,          -- chỉ khác null khi role='artisan'
  customer_id   uuid,          -- chỉ khác null khi role='customer'
  is_active     boolean not null default true,
  last_seen_at  timestamptz,
  created_at    timestamptz not null default now(),
  constraint chk_artisan_link  check (role <> 'artisan'  or household_id is not null),
  constraint chk_customer_link check (role <> 'customer' or customer_id  is not null)
);

create table audit_logs (
  id           bigserial primary key,
  actor_id     uuid references profiles(id),
  actor_role   user_role,
  entity_type  text not null,
  entity_id    uuid not null,
  action       text not null,           -- 'create' | 'update' | 'delete' | 'approve' | 'gate_blocked'
  field_diff   jsonb,                   -- { field: {before, after} }
  reason       text,
  created_at   timestamptz not null default now()
);
create index on audit_logs (entity_type, entity_id, created_at desc);

create table settings (
  key         text primary key,
  value       jsonb not null,
  label_vi    text not null,
  description text,
  updated_by  uuid references profiles(id),
  updated_at  timestamptz not null default now()
);

create table content_blocks (
  id         uuid primary key default gen_random_uuid(),
  slug       text not null,
  locale     text not null default 'vi',
  title      text,
  body_md    text,
  media      jsonb default '[]',
  published  boolean not null default false,
  unique (slug, locale)
);

-- 4.3. Hộ nghề và năng lực sản xuất
create table households (
  id                    uuid primary key default gen_random_uuid(),
  code                  text unique not null,               -- PL-H-001
  name                  text not null,                      -- tên hộ / xưởng
  owner_name            text not null,
  generation            smallint,                           -- đời thứ mấy làm nghề
  address               text,
  hamlet                text,
  phone                 text,
  email                 text,
  id_note               text,
  internal_notes        text,
  public_slug           text unique,
  public_consent        boolean not null default false,
  consent_signed_at     timestamptz,
  consent_file          text,
  bio_vi                text,
  bio_en                text,
  cover_image           text,
  status                household_status not null default 'prospect',
  rolling_defect_rate   numeric(5,2),
  ontime_rate           numeric(5,2),
  orders_completed      int not null default 0,
  verified_by           uuid references profiles(id),
  verified_at           timestamptz,
  joined_at             date,
  created_at            timestamptz not null default now()
);

create table techniques (
  id        uuid primary key default gen_random_uuid(),
  code      text unique not null,
  name_vi   text not null,
  name_en   text not null,
  group_key text not null
);

create table household_techniques (
  household_id  uuid references households(id) on delete cascade,
  technique_id  uuid references techniques(id),
  skill_level   smallint check (skill_level between 1 and 5),
  years_exp     smallint,
  evidence      jsonb default '[]',
  primary key (household_id, technique_id)
);

create table kilns (
  id               uuid primary key default gen_random_uuid(),
  household_id     uuid not null references households(id) on delete cascade,
  name             text not null,
  type             kiln_type not null,
  inner_w_mm       int, inner_d_mm int, inner_h_mm int,
  max_piece_h_mm   int not null,
  capacity_pieces  int,
  max_temp_c       int,
  cycle_days       numeric(3,1) not null default 3,
  notes            text
);

create table kiln_schedules (
  id            uuid primary key default gen_random_uuid(),
  kiln_id       uuid not null references kilns(id) on delete cascade,
  start_date    date not null,
  end_date      date not null,
  status        text not null default 'planned',
  order_line_id uuid,
  capacity_used_pct smallint,
  notes         text,
  created_by    uuid references profiles(id),
  constraint chk_dates check (end_date >= start_date)
);
create index on kiln_schedules (kiln_id, start_date);

create table household_capacity (
  household_id     uuid references households(id) on delete cascade,
  product_type     text not null,
  max_height_mm    int,
  max_diameter_mm  int,
  monthly_pieces   int,
  min_batch        int not null default 1,
  lead_time_days   int not null,
  baseline_defect_rate numeric(5,2),
  primary key (household_id, product_type)
);

create table household_materials (
  id           uuid primary key default gen_random_uuid(),
  household_id uuid not null references households(id) on delete cascade,
  kind         text not null,
  name         text not null,
  source       text,
  lead_time_days int,
  notes        text
);

create table household_samples (
  id           uuid primary key default gen_random_uuid(),
  household_id uuid not null references households(id) on delete cascade,
  name         text not null,
  photos       jsonb default '[]',
  h_mm int, w_mm int, d_mm int,
  technique_id uuid references techniques(id),
  price_from   numeric(14,2),
  price_to     numeric(14,2)
);

-- 4.4. Thiết kế, dung sai, quyền
create table collections (
  id            uuid primary key default gen_random_uuid(),
  code          text unique not null,
  slug          text unique not null,
  name_vi       text not null, name_en text,
  narrative_vi  text, narrative_en text,
  edition_size  int,
  numbering     text default 'NN/TT',
  launch_date   date,
  cover_image   text,
  published     boolean not null default false
);

create table designs (
  id             uuid primary key default gen_random_uuid(),
  code           text unique not null,
  title_vi       text not null, title_en text,
  collection_id  uuid references collections(id),
  product_type   text not null,
  designer_id    uuid references profiles(id),
  household_id   uuid references households(id),
  status         design_status not null default 'draft',
  current_version int not null default 1,
  story_vi       text, story_en text,
  is_public      boolean not null default false,
  created_at     timestamptz not null default now()
);

create table design_versions (
  id               uuid primary key default gen_random_uuid(),
  design_id        uuid not null references designs(id) on delete cascade,
  version_no       int not null,
  drawings         jsonb default '[]',
  h_mm int, w_mm int, d_mm int, weight_g int,
  clay_ref         text,
  glaze_ref        text,
  shrinkage_pct    numeric(4,1),
  tolerance_set_id uuid,
  packaging_plan   jsonb,
  target_cost      numeric(14,2),
  target_price     numeric(14,2),
  changelog        text,
  created_by       uuid references profiles(id),
  approved_by      uuid references profiles(id),
  approved_at      timestamptz,
  created_at       timestamptz not null default now(),
  unique (design_id, version_no)
);

create table tolerance_sets (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  design_id  uuid references designs(id) on delete cascade,
  created_by uuid references profiles(id),
  created_at timestamptz not null default now()
);

create table tolerance_items (
  id               uuid primary key default gen_random_uuid(),
  set_id           uuid not null references tolerance_sets(id) on delete cascade,
  attribute_vi     text not null,
  attribute_en     text,
  class            tolerance_class not null,
  nominal          text,
  tol_minus        text, tol_plus text,
  unit             text,
  method           text not null,
  accept_criteria  text not null,
  sort_order       smallint not null default 0
);

create table design_rights (
  id           uuid primary key default gen_random_uuid(),
  design_id    uuid not null references designs(id) on delete cascade,
  holder_type  party_type not null,
  holder_id    uuid,
  share_pct    numeric(5,2) not null,
  usage_scope  text not null,
  territory    text,
  exclusive    boolean not null default false,
  valid_from   date, valid_to date,
  contract_file text,
  constraint chk_share check (share_pct >= 0 and share_pct <= 100)
);

-- 4.5. Kiểm chứng nhu cầu
create table interviews (
  id                 uuid primary key default gen_random_uuid(),
  stage              interview_stage not null default 'problem',
  segment            text not null,
  org_name           text not null,
  country            text,
  contact_name       text,
  interviewer_id     uuid references profiles(id),
  held_at            date not null,
  problem_confirmed  boolean,
  will_review_deck   boolean,
  will_pay_sample    boolean,
  requested_quote    boolean,
  budget_note        text,
  rejection_reason   text,
  minutes_md         text not null,
  attachments        jsonb default '[]',
  customer_id        uuid,
  created_at         timestamptz not null default now()
);

-- 4.6. Khách hàng, yêu cầu, báo giá
create table customers (
  id              uuid primary key default gen_random_uuid(),
  code            text unique not null,
  company_name    text not null,
  segment         text not null,
  country         text not null,
  city            text,
  contact_name    text, contact_email text, contact_phone text,
  currency        text not null default 'USD',
  incoterm_default text,
  payment_terms   text,
  credit_limit    numeric(14,2),
  owner_id        uuid references profiles(id),
  source          text,
  status          text not null default 'active',
  created_at      timestamptz not null default now()
);

create table inquiries (
  id              uuid primary key default gen_random_uuid(),
  code            text unique not null,
  customer_id     uuid references customers(id),
  prospect_name   text,
  channel         text,
  received_at     timestamptz not null default now(),
  summary         text not null,
  product_type    text,
  quantity        int,
  budget_amount   numeric(14,2), budget_currency text,
  target_market   text,
  deadline        date,
  compliance_flags jsonb default '[]',
  score_detail    jsonb,
  screening_score smallint,
  decision        inquiry_decision not null default 'pending',
  reject_reason   text,
  owner_id        uuid references profiles(id)
);

create table quotes (
  id            uuid primary key default gen_random_uuid(),
  code          text unique not null,
  inquiry_id    uuid references inquiries(id),
  customer_id   uuid not null references customers(id),
  currency      text not null,
  fx_rate       numeric(14,6) not null,
  incoterm      text not null,
  valid_until   date not null,
  design_fee    numeric(14,2) not null default 0,
  coordination_fee numeric(14,2) not null default 0,
  transaction_fee_pct numeric(5,2) not null default 0,
  packing_fee   numeric(14,2) not null default 0,
  logistics_est numeric(14,2) not null default 0,
  subtotal      numeric(14,2) not null default 0,
  total         numeric(14,2) not null default 0,
  status        quote_status not null default 'draft',
  sent_at       timestamptz, accepted_at timestamptz,
  pdf_vi        text, pdf_en text,
  created_by    uuid references profiles(id)
);

create table quote_lines (
  id                uuid primary key default gen_random_uuid(),
  quote_id          uuid not null references quotes(id) on delete cascade,
  design_id         uuid references designs(id),
  design_version_id uuid references design_versions(id),
  description_vi    text not null, description_en text,
  qty               int not null,
  unit_cost_household numeric(14,2) not null,
  unit_price        numeric(14,2) not null,
  lead_time_days    int,
  sort_order        smallint default 0
);
