"use client";
import React from "react";
import { CheckCircle2, Clock, AlertTriangle } from "lucide-react";

const payments = [
  { order: "PL-O-2026-007", milestone: "Ứng nguyên liệu", amount: "12,000,000", status: "paid", date: "01/08/2026", confirmed: true },
  { order: "PL-O-2026-007", milestone: "Sau nung đạt", amount: "18,000,000", status: "due", date: "Khi kiểm tra đạt", confirmed: false },
  { order: "PL-O-2026-007", milestone: "Sau giao hàng", amount: "7,000,000", status: "pending", date: "Sau giao", confirmed: false },
  { order: "PL-O-2026-009", milestone: "Đặt cọc", amount: "8,000,000", status: "pending", date: "Chờ bác nhận đơn", confirmed: false },
];

export default function ArtisanMoneyPage() {
  return (
    <div className="space-y-4 max-w-lg mx-auto">
      <h2 className="text-xl font-bold" style={{ fontSize: '20px' }}>Tiền hộ nghề</h2>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
          <p className="text-sm text-green-700">Đã nhận</p>
          <p className="text-2xl font-bold text-green-700 mt-1">12.000.000đ</p>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-center">
          <p className="text-sm text-amber-700">Sắp nhận</p>
          <p className="text-2xl font-bold text-amber-700 mt-1">33.000.000đ</p>
        </div>
      </div>

      <div className="bg-card border rounded-xl p-5">
        <h3 className="font-bold mb-3" style={{ fontSize: '17px' }}>Chi tiết thanh toán</h3>
        <div className="space-y-3">
          {payments.map((p, i) => (
            <div key={i} className="flex items-start gap-3 p-3 border rounded-xl" style={{ minHeight: '48px' }}>
              {p.status === 'paid' ? <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" /> : p.status === 'due' ? <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5 shrink-0" /> : <Clock className="w-5 h-5 text-muted-foreground mt-0.5 shrink-0" />}
              <div className="flex-1">
                <div className="flex justify-between"><span className="font-medium" style={{ fontSize: '17px' }}>{p.amount}đ</span></div>
                <p className="text-sm text-muted-foreground">{p.milestone}</p>
                <p className="text-xs text-muted-foreground">{p.order} · {p.date}</p>
                {p.status === 'paid' && !p.confirmed && <button className="mt-2 px-3 py-1.5 bg-green-600 text-white text-sm rounded-lg" style={{ minHeight: '36px' }}>Xác nhận đã nhận đủ</button>}
                {p.confirmed && <span className="text-xs text-green-600 mt-1 block">✓ Đã xác nhận nhận đủ</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
