"use client";
import React from "react";
import Link from "next/link";
import { ChevronRight, RefreshCcw } from "lucide-react";
import { useOrders } from "@/hooks/use-orders";

export default function ArtisanOrdersPage() {
  const { orders, loading, refresh } = useOrders();

  return (
    <div className="space-y-4 max-w-lg mx-auto">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold" style={{ fontSize: '20px' }}>Đơn được giao cho hộ</h2>
        <button onClick={refresh} className="p-2 bg-secondary rounded-full" disabled={loading}>
           <RefreshCcw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>
      
      <div className="space-y-3">
        {orders.length === 0 && !loading && (
          <p className="text-muted-foreground text-center py-4">Chưa có đơn hàng nào.</p>
        )}
        {orders.map((o) => (
          <Link key={o.code} href={`/tho/don/${o.code}`} className="block bg-card border rounded-xl p-5 hover:shadow-md transition-all" style={{ minHeight: '48px' }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-primary" style={{ fontSize: '17px' }}>{o.code}</p>
                <p className="font-medium mt-1 text-sm">Trạng thái: {o.status}</p>
                <p className="text-sm text-muted-foreground mt-2">Ngày tạo: {new Date(o.created_at).toLocaleDateString('vi-VN')}</p>
                {o._syncStatus && (
                  <p className="text-xs text-amber-600 mt-1">[{o._syncStatus}]</p>
                )}
              </div>
              <ChevronRight className="w-6 h-6 text-muted-foreground shrink-0" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
