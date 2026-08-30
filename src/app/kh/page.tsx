"use client";
import React from "react";
import Link from "next/link";
import { ChevronRight, Package, FileText, CheckSquare } from "lucide-react";

export default function CustomerPortalPage() {
  const orders = [
    { code: "PL-O-2026-007", design: "Bình Thu Vàng × 200", status: "Đang sản xuất", progress: 65 },
    { code: "PL-O-2026-004", design: "Ấm Trà Phù Lãng × 150", status: "Đã giao", progress: 100 },
  ];
  const pendingApprovals = [
    { id: "SAM-001", type: "Duyệt mẫu", design: "Bình Thu Vàng v3", dueDate: "05/09/2026" },
    { id: "DEV-002", type: "Duyệt sai lệch", design: "Bình Thu Vàng — Lô #0138", dueDate: "10/09/2026" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold text-[var(--pl-char)]">Xin chào, ACME Corp</h1>
        <p className="text-[var(--pl-char)]/60 mt-1">Theo dõi đơn hàng, duyệt mẫu, và duyệt sai lệch chất lượng.</p>
      </div>

      {/* Pending approvals */}
      {pendingApprovals.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
          <h2 className="font-bold text-amber-800 flex items-center gap-2"><CheckSquare className="w-5 h-5" /> Cần bạn duyệt ({pendingApprovals.length})</h2>
          <div className="mt-3 space-y-2">
            {pendingApprovals.map((a) => (
              <Link key={a.id} href={a.type === 'Duyệt mẫu' ? `/kh/duyet-mau/${a.id}` : `/kh/duyet-sai-lech/${a.id}`} className="flex items-center justify-between p-3 bg-white rounded-lg border hover:shadow-md transition-all">
                <div><p className="font-medium text-sm">{a.type}: {a.design}</p><p className="text-xs text-muted-foreground">Hạn: {a.dueDate}</p></div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Orders */}
      <div>
        <h2 className="font-bold text-lg text-[var(--pl-char)] mb-3">Đơn hàng của bạn</h2>
        <div className="space-y-3">
          {orders.map((o) => (
            <Link key={o.code} href={`/kh/don/${o.code}`} className="block bg-white rounded-xl border p-5 hover:shadow-md transition-all">
              <div className="flex items-center justify-between mb-3">
                <span className="font-bold text-[var(--pl-clay)]">{o.code}</span>
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${o.progress === 100 ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>{o.status}</span>
              </div>
              <p className="text-sm">{o.design}</p>
              <div className="mt-3 h-2 bg-[var(--pl-ash)]/20 rounded-full overflow-hidden">
                <div className="h-full bg-[var(--pl-clay)] rounded-full transition-all" style={{ width: `${o.progress}%` }} />
              </div>
              <p className="text-xs text-[var(--pl-char)]/40 mt-2 text-right">{o.progress}%</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
