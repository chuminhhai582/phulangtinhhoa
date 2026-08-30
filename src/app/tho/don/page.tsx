"use client";
import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

const orders = [
  { code: "PL-O-2026-007", design: "Bình Thu Vàng", qty: 12, spare: 2, deadline: "14/09/2026", daysLeft: 15, status: "Đang làm" },
  { code: "PL-O-2026-009", design: "Ấm Trà Phù Lãng", qty: 50, spare: 5, deadline: "30/09/2026", daysLeft: 31, status: "Chờ xác nhận" },
];

export default function ArtisanOrdersPage() {
  return (
    <div className="space-y-4 max-w-lg mx-auto">
      <h2 className="text-xl font-bold" style={{ fontSize: '20px' }}>Đơn được giao cho hộ</h2>
      <div className="space-y-3">
        {orders.map((o) => (
          <Link key={o.code} href={`/tho/don/${o.code}`} className="block bg-card border rounded-xl p-5 hover:shadow-md transition-all" style={{ minHeight: '48px' }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-primary" style={{ fontSize: '17px' }}>{o.code}</p>
                <p className="font-medium mt-1" style={{ fontSize: '17px' }}>{o.design}</p>
                <p className="text-sm text-muted-foreground mt-2">Làm: {o.qty} cái + {o.spare} dự phòng</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className={`text-sm font-medium ${o.daysLeft < 20 ? 'text-amber-600' : 'text-green-600'}`}>
                    Hạn: {o.deadline} (còn {o.daysLeft} ngày)
                  </span>
                </div>
              </div>
              <ChevronRight className="w-6 h-6 text-muted-foreground shrink-0" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
