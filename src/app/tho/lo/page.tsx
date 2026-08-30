"use client";
import React from "react";
import Link from "next/link";
import { ChevronRight, Flame, Clock } from "lucide-react";

const kilnLogs = [
  { id: "PL-B-2026-0142", date: "29/08/2026", type: "Gas", temp: "1200°C", duration: "36h", status: "Đang nung", items: 14 },
  { id: "PL-B-2026-0138", date: "22/08/2026", type: "Gas", temp: "1180°C", duration: "32h", status: "Hoàn tất", items: 18 },
  { id: "PL-B-2026-0130", date: "15/08/2026", type: "Củi", temp: "1150°C", duration: "72h", status: "Hoàn tất", items: 12 },
];

export default function KilnLogPage() {
  return (
    <div className="space-y-4 max-w-lg mx-auto">
      <h2 className="text-xl font-bold" style={{ fontSize: '20px' }}>Nhật ký lò</h2>
      <div className="space-y-3">
        {kilnLogs.map((l) => (
          <Link key={l.id} href={`/tho/lo/${l.id}`} className="block bg-card border rounded-xl p-5 hover:shadow-md transition-all" style={{ minHeight: '48px' }}>
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  {l.status === 'Đang nung' && <Flame className="w-5 h-5 text-orange-600" />}
                  <span className="font-bold text-primary" style={{ fontSize: '17px' }}>{l.id}</span>
                </div>
                <p className="text-sm mt-1">{l.date} · {l.type} · {l.temp} · {l.duration}</p>
                <p className="text-sm text-muted-foreground mt-1">{l.items} sản phẩm · {l.status}</p>
              </div>
              <ChevronRight className="w-6 h-6 text-muted-foreground" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
