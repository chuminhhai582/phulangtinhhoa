create table map_locations (
  id uuid default gen_random_uuid() primary key,
  lat numeric(10, 7) not null,
  lng numeric(10, 7) not null,
  type text not null check (type in ('household', 'custom')),
  household_id uuid references households(id) on delete cascade,
  custom_name text,
  custom_description text,
  custom_media_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS
alter table map_locations enable row level security;

create policy "Public Map View"
  on map_locations for select
  using (true);

create policy "Admin Map Management"
  on map_locations for all
  using (auth.role() = 'authenticated' or is_staff())
  with check (auth.role() = 'authenticated' or is_staff());
