"use client";
import React from "react";
import { DollarSign, Clock, CheckCircle2, AlertTriangle } from "lucide-react";

const milestones = [
  { order: "PL-O-2026-007", customer: "ACME Corp", kind: "Đặt cọc 40%", amount: "60,000,000", status: "paid", dueDate: "01/08/2026" },
  { order: "PL-O-2026-007", customer: "ACME Corp", kind: "Trước giao hàng 30%", amount: "45,000,000", status: "pending", dueDate: "10/10/2026" },
  { order: "PL-O-2026-007", customer: "ACME Corp", kind: "Quyết toán 30%", amount: "45,000,000", status: "pending", dueDate: "30/10/2026" },
  { order: "PL-O-2026-004", customer: "Kansai Trading", kind: "Đặt cọc 40%", amount: "$3,280", status: "paid", dueDate: "15/07/2026" },
  { order: "PL-O-2026-004", customer: "Kansai Trading", kind: "Quyết toán", amount: "$4,920", status: "overdue", dueDate: "20/08/2026" },
];

const payouts = [
  { household: "PL-H-001 Ông Tới", order: "PL-O-2026-007", milestone: "Ứng nguyên liệu", amount: "12,000,000", status: "paid", confirmed: true },
  { household: "PL-H-001 Ông Tới", order: "PL-O-2026-007", milestone: "Sau nung đạt", amount: "18,000,000", status: "due", confirmed: false },
  { household: "PL-H-002 Bà Lan", order: "PL-O-2026-007", milestone: "Ứng nguyên liệu", amount: "8,000,000", status: "paid", confirmed: true },
  { household: "PL-H-003 Ông Hùng", order: "PL-O-2026-004", milestone: "Sau giao hàng", amount: "25,000,000", status: "paid", confirmed: false },
];

export default function FinancePage() {
  return (
    <div className="space-y-6">
      <div><h2 className="text-2xl font-heading font-bold">Tài chính</h2><p className="text-muted-foreground text-sm mt-1">Mốc thanh toán khách hàng và chi trả hộ nghề.</p></div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-card border rounded-xl p-5 flex items-start gap-4"><div className="p-3 rounded-lg bg-green-100 text-green-600"><DollarSign className="w-6 h-6" /></div><div><p className="text-sm text-muted-foreground">Đã thu</p><h3 className="text-2xl font-bold mt-1">63,280,000đ</h3></div></div>
        <div className="bg-card border rounded-xl p-5 flex items-start gap-4"><div className="p-3 rounded-lg bg-amber-100 text-amber-600"><Clock className="w-6 h-6" /></div><div><p className="text-sm text-muted-foreground">Chờ thu</p><h3 className="text-2xl font-bold mt-1">94,920,000đ</h3></div></div>
        <div className="bg-card border rounded-xl p-5 flex items-start gap-4"><div className="p-3 rounded-lg bg-red-100 text-red-600"><AlertTriangle className="w-6 h-6" /></div><div><p className="text-sm text-muted-foreground">Quá hạn</p><h3 className="text-2xl font-bold mt-1 text-red-600">$4,920</h3></div></div>
      </div>

      {/* Milestones */}
      <div className="bg-card border rounded-xl p-6 shadow-sm">
        <h3 className="font-semibold mb-4">Mốc thanh toán khách hàng</h3>
        <div className="space-y-2">
          {milestones.map((m, i) => (
            <div key={i} className="flex items-center justify-between p-3 border rounded-lg text-sm">
              <div className="flex items-center gap-3">
                {m.status === 'paid' ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : m.status === 'overdue' ? <AlertTriangle className="w-4 h-4 text-red-500" /> : <Clock className="w-4 h-4 text-muted-foreground" />}
                <div><span className="font-medium text-primary">{m.order}</span><span className="text-muted-foreground ml-2">{m.customer}</span></div>
              </div>
              <div className="text-right"><div className="font-medium">{m.amount}</div><div className="text-xs text-muted-foreground">{m.kind} · {m.dueDate}</div></div>
            </div>
          ))}
        </div>
      </div>

      {/* Payouts */}
      <div className="bg-card border rounded-xl p-6 shadow-sm">
        <h3 className="font-semibold mb-4">Chi trả hộ nghề</h3>
        <div className="space-y-2">
          {payouts.map((p, i) => (
            <div key={i} className="flex items-center justify-between p-3 border rounded-lg text-sm">
              <div className="flex items-center gap-3">
                {p.confirmed ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <Clock className="w-4 h-4 text-muted-foreground" />}
                <div><span className="font-medium">{p.household}</span><span className="text-muted-foreground ml-2">{p.milestone}</span></div>
              </div>
              <div className="text-right">
                <div className="font-medium">{p.amount}đ</div>
                <div className="text-xs">{p.confirmed ? <span className="text-green-600">Hộ đã xác nhận nhận đủ</span> : <span className="text-amber-600">Chưa xác nhận</span>}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
