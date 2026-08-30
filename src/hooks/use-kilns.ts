import { useState, useEffect } from 'react';
import { db, type LocalKiln } from '@/lib/db/dexie';
import { createClient } from '@/lib/supabase/client';

export function useKilns() {
  const [kilns, setKilns] = useState<LocalKiln[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    loadKilns();
  }, []);

  const loadKilns = async () => {
    setLoading(true);
    try {
      if (navigator.onLine) {
        const { data, error } = await supabase
          .from('kilns')
          .select('id, household_id, name, type, max_piece_h_mm, capacity_pieces')
          .order('name', { ascending: true });

        if (data && !error) {
          await db.kilns.clear();
          await db.kilns.bulkPut(data.map(d => ({ ...d, _syncStatus: 'synced', _lastUpdated: Date.now() })));
        }
      }
      const localData = await db.kilns.toArray();
      setKilns(localData);
    } catch (err) {
      console.error("Failed to load kilns", err);
    } finally {
      setLoading(false);
    }
  };

  return { kilns, loading, refresh: loadKilns };
}
