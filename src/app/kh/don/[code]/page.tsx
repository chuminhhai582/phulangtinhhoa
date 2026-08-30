"use client";
import React from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Circle, Clock } from "lucide-react";

export default function CustomerOrderTrackPage({ params }: { params: { code: string } }) {
  const steps = [
    { name: "Tiếp nhận yêu cầu", date: "15/07/2026", done: true },
    { name: "Đồng thiết kế", date: "22/07/2026", done: true },
    { name: "Duyệt mẫu chuẩn", date: "05/08/2026", done: true },
    { name: "Chọn hộ sản xuất", date: "08/08/2026", done: true },
    { name: "Sản xuất & kiểm tra", date: "Đang thực hiện", done: false, active: true },
    { name: "Đóng gói & xuất khẩu", date: "Dự kiến: 15/10/2026", done: false },
  ];

  return (
    <div className="space-y-6">
      <Link href="/kh" className="flex items-center gap-2 text-[var(--pl-char)]/60 hover:text-[var(--pl-clay)]"><ArrowLeft className="w-5 h-5" />Quay lại</Link>
      <div>
        <h1 className="text-2xl font-heading font-bold text-[var(--pl-char)]">Theo dõi: {params.code}</h1>
        <p className="text-[var(--pl-char)]/60 mt-1">Bình Thu Vàng × 200 · ETD: 15/10/2026</p>
      </div>

      <div className="bg-white rounded-xl border p-6">
        <h2 className="font-bold mb-6">Tiến trình đơn hàng</h2>
        <div className="space-y-0">
          {steps.map((s, i) => (
            <div key={i} className="flex gap-4 pb-6 last:pb-0">
              <div className="flex flex-col items-center">
                {s.done ? <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0" /> : s.active ? <Clock className="w-6 h-6 text-[var(--pl-clay)] shrink-0 animate-pulse" /> : <Circle className="w-6 h-6 text-[var(--pl-ash)]/40 shrink-0" />}
                {i < steps.length - 1 && <div className={`w-0.5 flex-1 mt-2 ${s.done ? 'bg-green-300' : 'bg-[var(--pl-ash)]/20'}`} />}
              </div>
              <div className="pb-2">
                <p className={`font-medium ${s.active ? 'text-[var(--pl-clay)]' : s.done ? '' : 'text-[var(--pl-char)]/40'}`}>{s.name}</p>
                <p className="text-sm text-[var(--pl-char)]/50 mt-0.5">{s.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl border p-6">
        <h2 className="font-bold mb-4">Sản phẩm đã kiểm tra</h2>
        <div className="flex items-center gap-4">
          <div className="text-center"><div className="text-3xl font-bold text-green-600">127</div><p className="text-xs text-[var(--pl-char)]/50">Đạt</p></div>
          <div className="text-center"><div className="text-3xl font-bold text-red-600">6</div><p className="text-xs text-[var(--pl-char)]/50">Hỏng</p></div>
          <div className="text-center"><div className="text-3xl font-bold text-[var(--pl-char)]/30">67</div><p className="text-xs text-[var(--pl-char)]/50">Chưa kiểm tra</p></div>
        </div>
        <div className="h-3 mt-4 bg-[var(--pl-ash)]/20 rounded-full overflow-hidden flex">
          <div className="bg-green-500 h-full" style={{ width: '63.5%' }} />
          <div className="bg-red-500 h-full" style={{ width: '3%' }} />
        </div>
      </div>
    </div>
  );
}
