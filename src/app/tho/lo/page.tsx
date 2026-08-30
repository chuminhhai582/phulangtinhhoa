"use client";
import React from "react";
import Link from "next/link";
import { ChevronRight, Flame, RefreshCcw } from "lucide-react";
import { useKilns } from "@/hooks/use-kilns";

export default function KilnLogPage() {
  const { kilns, loading, refresh } = useKilns();

  return (
    <div className="space-y-4 max-w-lg mx-auto">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold" style={{ fontSize: '20px' }}>Nhật ký lò</h2>
        <button onClick={refresh} className="p-2 bg-secondary rounded-full" disabled={loading}>
           <RefreshCcw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      <div className="space-y-3">
        {kilns.length === 0 && !loading && (
          <p className="text-muted-foreground text-center py-4">Chưa có lò nung nào.</p>
        )}
        {kilns.map((l) => (
          <Link key={l.id} href={`/tho/lo/${l.id}`} className="block bg-card border rounded-xl p-5 hover:shadow-md transition-all" style={{ minHeight: '48px' }}>
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-primary" style={{ fontSize: '17px' }}>{l.name}</span>
                </div>
                <p className="text-sm mt-1">Loại: {l.type} · Max Height: {l.max_piece_h_mm}mm</p>
                <p className="text-sm text-muted-foreground mt-1">Capacity: {l.capacity_pieces || 'N/A'} sản phẩm</p>
                {l._syncStatus && (
                  <p className="text-xs text-amber-600 mt-1">[{l._syncStatus}]</p>
                )}
              </div>
              <ChevronRight className="w-6 h-6 text-muted-foreground" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
