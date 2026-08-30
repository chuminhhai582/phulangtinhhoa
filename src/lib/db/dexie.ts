import Dexie, { type Table } from 'dexie';

export interface LocalOrder {
  id: string;
  code: string;
  status: string;
  total_value: number;
  created_at: string;
  // Local flags for sync
  _syncStatus?: 'synced' | 'pending_update' | 'pending_insert';
  _lastUpdated?: number;
}

export interface LocalKiln {
  id: string;
  household_id: string;
  name: string;
  type: string;
  max_piece_h_mm: number;
  capacity_pieces: number | null;
  // Local flags for sync
  _syncStatus?: 'synced' | 'pending_update' | 'pending_insert';
  _lastUpdated?: number;
}

export interface SyncQueueItem {
  id?: number;
  table: string;
  action: 'insert' | 'update' | 'delete';
  payload: any;
  created_at: number;
}

export class AppDatabase extends Dexie {
  orders!: Table<LocalOrder, string>;
  kilns!: Table<LocalKiln, string>;
  syncQueue!: Table<SyncQueueItem, number>;

  constructor() {
    super('PhuLangTinhHoaDB');
    this.version(1).stores({
      orders: 'id, code, status, _syncStatus',
      kilns: 'id, household_id, type, _syncStatus',
      syncQueue: '++id, table, action, created_at'
    });
  }
}

export const db = new AppDatabase();
