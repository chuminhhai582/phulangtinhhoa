-- Add category column to map_locations for location type classification
ALTER TABLE map_locations
ADD COLUMN IF NOT EXISTS category text 
  NOT NULL DEFAULT 'dia_diem'
  CHECK (category IN ('nha_hang', 'lo_gom', 'di_tich', 'check_in', 'dia_diem'));

-- Add thumbnail_url column for custom marker thumbnails
ALTER TABLE map_locations
ADD COLUMN IF NOT EXISTS thumbnail_url text;

COMMENT ON COLUMN map_locations.category IS 'Location category: nha_hang (restaurant), lo_gom (kiln/pottery), di_tich (heritage), check_in (photo spot), dia_diem (general)';
COMMENT ON COLUMN map_locations.thumbnail_url IS 'Optional thumbnail image URL for marker display';
