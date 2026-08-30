"use client";
import React from "react";
import { AdaptiveTable } from "@/components/adaptive/AdaptiveTable";
import { Plus, Shield } from "lucide-react";

const mockUsers = [
  { id: "U-001", name: "Nguyễn Anh", email: "anh@plth.vn", role: "admin", lastActive: "30/08/2026 14:00", status: "online" },
  { id: "U-002", name: "Trần Hà", email: "ha@plth.vn", role: "coordinator", lastActive: "30/08/2026 12:30", status: "online" },
  { id: "U-003", name: "Lê Mai", email: "mai@plth.vn", role: "qc", lastActive: "29/08/2026 16:00", status: "offline" },
  { id: "U-004", name: "Ông Tới (Hộ PL-H-003)", email: "—", role: "artisan", lastActive: "30/08/2026 08:00", status: "online" },
  { id: "U-005", name: "ACME Corp", email: "john@acme.sg", role: "customer", lastActive: "28/08/2026 10:00", status: "offline" },
];

const roleMap: Record<string, { label: string; color: string }> = {
  admin: { label: "Quản trị viên", color: "bg-red-100 text-red-700" },
  coordinator: { label: "Điều phối", color: "bg-blue-100 text-blue-700" },
  qc: { label: "Chất lượng", color: "bg-green-100 text-green-700" },
  artisan: { label: "Hộ nghề", color: "bg-amber-100 text-amber-700" },
  customer: { label: "Khách hàng", color: "bg-purple-100 text-purple-700" },
};

export default function UsersPage() {
  const columns = [
    { key: "name", label: "Tên", render: (val: string) => <span className="font-medium">{val}</span> },
    { key: "email", label: "Email" },
    { key: "role", label: "Vai trò", render: (val: string) => { const r = roleMap[val]; return <span className={`px-2 py-1 rounded-full text-xs font-medium ${r?.color}`}>{r?.label}</span>; }},
    { key: "status", label: "Trạng thái", render: (val: string) => <span className="flex items-center gap-1.5 text-sm"><span className={`w-2 h-2 rounded-full ${val === 'online' ? 'bg-green-500' : 'bg-gray-300'}`} />{val === 'online' ? 'Online' : 'Offline'}</span> },
    { key: "lastActive", label: "Hoạt động gần nhất" },
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2"><Shield className="w-5 h-5 text-primary" /><span className="text-sm text-muted-foreground">RLS + Role-based: 5 vai trò</span></div>
        <button className="h-9 px-3 bg-primary text-primary-foreground rounded-md flex items-center text-sm font-medium hover:bg-primary/90"><Plus className="w-4 h-4 mr-1" />Thêm</button>
      </div>
      <div className="bg-card border rounded-xl shadow-sm overflow-hidden">
        <AdaptiveTable columns={columns} data={mockUsers} keyField="id" />
      </div>
    </div>
  );
}
