import { useState, useEffect } from 'react';
import { db, type LocalOrder } from '@/lib/db/dexie';
import { createClient } from '@/lib/supabase/client';

export function useOrders() {
  const [orders, setOrders] = useState<LocalOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    setLoading(true);
    try {
      if (navigator.onLine) {
        const { data, error } = await supabase
          .from('orders')
          .select('id, code, status, total_value, created_at')
          .order('created_at', { ascending: false });

        if (data && !error) {
          // Ghi đè vào Dexie
          await db.orders.clear();
          await db.orders.bulkPut(data.map(d => ({ ...d, _syncStatus: 'synced', _lastUpdated: Date.now() })));
        }
      }
      // Dù online hay offline, luôn đọc từ Dexie để hiển thị
      const localData = await db.orders.toArray();
      setOrders(localData);
    } catch (err) {
      console.error("Failed to load orders", err);
    } finally {
      setLoading(false);
    }
  };

  const addOrderLocal = async (order: LocalOrder) => {
    const newOrder = { ...order, _syncStatus: 'pending_insert' as const, _lastUpdated: Date.now() };
    await db.orders.put(newOrder);
    await db.syncQueue.add({
      table: 'orders',
      action: 'insert',
      payload: newOrder,
      created_at: Date.now()
    });
    setOrders(prev => [newOrder, ...prev]);
  };

  return { orders, loading, refresh: loadOrders, addOrderLocal };
}
