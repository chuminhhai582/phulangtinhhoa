"use client";
import React from "react";
import { Activity } from "lucide-react";

const auditLogs = [
  { time: "30/08 14:32", user: "Nguyễn Anh", action: "Cập nhật cấu hình", target: "Hệ số dự phòng = 1.15", ip: "103.xx.xx.42" },
  { time: "30/08 14:15", user: "Trần Hà", action: "Tạo thiết kế", target: "Chậu Sen Lớn v1", ip: "103.xx.xx.55" },
  { time: "30/08 12:00", user: "Ông Tới", action: "Gửi ảnh kiểm tra", target: "Lô PL-B-2026-0142, Bước 1", ip: "—" },
  { time: "30/08 11:30", user: "Lê Mai", action: "Duyệt NC", target: "NC-2026-018 → Sản xuất lại", ip: "103.xx.xx.60" },
  { time: "29/08 16:00", user: "ACME Corp", action: "Duyệt mẫu", target: "Bình Thu Vàng v3 → Đồng ý", ip: "203.xx.xx.12" },
  { time: "29/08 14:00", user: "Trần Hà", action: "Giao đơn cho hộ", target: "PL-O-2026-009 → PL-H-003", ip: "103.xx.xx.55" },
  { time: "29/08 10:00", user: "Nguyễn Anh", action: "Tạo báo giá", target: "PL-Q-2026-003", ip: "103.xx.xx.42" },
  { time: "28/08 18:00", user: "System", action: "Cảnh báo tập trung", target: "ACME Corp = 42% doanh thu > ngưỡng 35%", ip: "—" },
];

export default function AuditLogPage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2"><Activity className="w-5 h-5 text-primary" /><span className="text-sm text-muted-foreground">Nhật ký hoạt động & dữ liệu</span></div>
      <div className="bg-card border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead><tr className="border-b bg-muted/30"><th className="text-left p-3 font-medium">Thời gian</th><th className="text-left p-3 font-medium">Người dùng</th><th className="text-left p-3 font-medium">Hành động</th><th className="text-left p-3 font-medium">Chi tiết</th></tr></thead>
          <tbody>{auditLogs.map((l, i) => (<tr key={i} className="border-b hover:bg-muted/30"><td className="p-3 text-xs text-muted-foreground whitespace-nowrap">{l.time}</td><td className="p-3 font-medium whitespace-nowrap">{l.user}</td><td className="p-3">{l.action}</td><td className="p-3 text-muted-foreground">{l.target}</td></tr>))}</tbody>
        </table>
      </div>
    </div>
  );
}
