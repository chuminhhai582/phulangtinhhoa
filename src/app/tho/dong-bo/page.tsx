"use client";
import React from "react";
import { WifiOff, RefreshCw, Trash2 } from "lucide-react";

const queue = [
  { id: 1, type: "Ảnh kiểm tra", desc: "Lô 0143 · Bước 1 · 3 ảnh", size: "4.2 MB", time: "14:30 hôm nay" },
  { id: 2, type: "Nhập số đo", desc: "Lô 0143 · Chiều cao 318mm", size: "1 KB", time: "14:32 hôm nay" },
];

export default function OfflineQueuePage() {
  return (
    <div className="space-y-4 max-w-lg mx-auto">
      <h2 className="text-xl font-bold" style={{ fontSize: '20px' }}>Hàng đợi chưa gửi</h2>
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-center gap-3"><WifiOff className="w-5 h-5 text-amber-600" /><p className="text-sm text-amber-800" style={{ fontSize: '17px' }}>{queue.length} việc đang chờ mạng để gửi</p></div>
      <div className="space-y-3">
        {queue.map((item) => (
          <div key={item.id} className="bg-card border rounded-xl p-4 flex items-start gap-3" style={{ minHeight: '48px' }}>
            <div className="flex-1"><p className="font-medium" style={{ fontSize: '17px' }}>{item.type}</p><p className="text-sm text-muted-foreground">{item.desc}</p><p className="text-xs text-muted-foreground mt-1">{item.size} · {item.time}</p></div>
            <button className="p-2 text-muted-foreground hover:text-red-600"><Trash2 className="w-5 h-5" /></button>
          </div>
        ))}
      </div>
      <button className="w-full h-14 bg-primary text-primary-foreground rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors" style={{ minHeight: '48px', fontSize: '17px' }}><RefreshCw className="w-5 h-5" />Thử gửi lại tất cả</button>
    </div>
  );
}
