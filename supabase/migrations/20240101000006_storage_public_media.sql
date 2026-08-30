-- Insert public_media bucket if it doesn't exist
insert into storage.buckets (id, name, public)
values ('public_media', 'public_media', true)
on conflict (id) do nothing;

-- Set up RLS for storage.objects
create policy "Media Public Access" 
  on storage.objects for select 
  using (bucket_id = 'public_media');

create policy "Media Admin Upload" 
  on storage.objects for insert 
  with check (bucket_id = 'public_media' and (auth.role() = 'authenticated' or is_staff()));

create policy "Media Admin Delete" 
  on storage.objects for delete 
  using (bucket_id = 'public_media' and (auth.role() = 'authenticated' or is_staff()));
