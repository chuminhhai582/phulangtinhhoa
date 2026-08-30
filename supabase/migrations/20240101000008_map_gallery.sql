alter table map_locations
add column if not exists gallery_urls text[] default '{}';
