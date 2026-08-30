"use client";
import { useEffect } from 'react';
import { db } from '@/lib/db/dexie';
import { createClient } from '@/lib/supabase/client';

export function useSync() {
  const supabase = createClient();

  useEffect(() => {
    const handleOnline = () => {
      console.log("Network online. Starting background sync...");
      syncPendingData();
    };

    window.addEventListener('online', handleOnline);
    
    // Thử sync nếu đang có mạng lúc mới load
    if (navigator.onLine) {
      syncPendingData();
    }

    return () => {
      window.removeEventListener('online', handleOnline);
    };
  }, []);

  const syncPendingData = async () => {
    try {
      const queue = await db.syncQueue.orderBy('created_at').toArray();
      if (queue.length === 0) return;

      for (const item of queue) {
        if (item.action === 'insert') {
          const { error } = await supabase.from(item.table).insert(item.payload);
          if (!error) {
            await db.syncQueue.delete(item.id!);
            // Cập nhật lại status trong local table (giả định đang là bảng orders)
            if (item.table === 'orders') {
               await db.orders.update(item.payload.id, { _syncStatus: 'synced' });
            }
          } else {
            console.error("Sync error for item:", item, error);
          }
        }
        // Có thể mở rộng cho update/delete sau này
      }
    } catch (err) {
      console.error("Failed to sync data", err);
    }
  };
}

// Đây là component rỗng để đặt vào RootLayout
export function SyncProvider() {
  useSync();
  return null;
}
