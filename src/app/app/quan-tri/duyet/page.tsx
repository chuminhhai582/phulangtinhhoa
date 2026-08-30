"use client";
import React from "react";
import { Clock, CheckCircle2, XCircle } from "lucide-react";

const pendingApprovals = [
  { id: 1, type: "Thiết kế mới", item: "Chậu Sen Lớn v1", submitter: "Trần Hà", submitted: "28/08/2026 14:00", status: "pending" },
  { id: 2, type: "Báo giá", item: "PL-Q-2026-003 → Lotus Boutique", submitter: "Nguyễn Anh", submitted: "28/08/2026 10:00", status: "pending" },
  { id: 3, type: "Nội dung", item: "Cập nhật trang Nghệ nhân", submitter: "Lê Mai", submitted: "27/08/2026 16:00", status: "approved" },
  { id: 4, type: "Thiết kế mới", item: "Tượng Phong Thủy v1", submitter: "Trần Hà", submitted: "26/08/2026 09:00", status: "rejected" },
];

export default function ApprovalsPage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2"><Clock className="w-5 h-5 text-primary" /><span className="text-sm text-muted-foreground">Hàng đợi kiểm duyệt nội bộ</span></div>
      <div className="space-y-2">
        {pendingApprovals.map((a) => (
          <div key={a.id} className="flex items-center justify-between p-4 bg-card border rounded-xl">
            <div className="flex items-center gap-3">
              {a.status === 'pending' ? <Clock className="w-5 h-5 text-amber-500" /> : a.status === 'approved' ? <CheckCircle2 className="w-5 h-5 text-green-500" /> : <XCircle className="w-5 h-5 text-red-500" />}
              <div>
                <div className="flex items-center gap-2"><span className="font-medium">{a.item}</span><span className="text-xs px-2 py-0.5 rounded-full bg-muted">{a.type}</span></div>
                <p className="text-xs text-muted-foreground mt-0.5">{a.submitter} · {a.submitted}</p>
              </div>
            </div>
            {a.status === 'pending' && (
              <div className="flex gap-2">
                <button className="h-8 px-3 bg-green-600 text-white text-xs rounded-md hover:bg-green-700">Duyệt</button>
                <button className="h-8 px-3 border text-xs rounded-md hover:bg-muted">Từ chối</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
