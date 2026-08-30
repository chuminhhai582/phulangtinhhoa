"use client";
import React from "react";
import { AdaptiveTable } from "@/components/adaptive/AdaptiveTable";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";

const mockQuotes = [
  { id: "PL-Q-2026-001", customer: "ACME Corp", currency: "USD", total: "$12,500", status: "sent", validUntil: "30/09/2026", createdAt: "01/08/2026" },
  { id: "PL-Q-2026-002", customer: "Kansai Trading", currency: "USD", total: "$8,200", status: "accepted", validUntil: "15/09/2026", createdAt: "25/07/2026" },
  { id: "PL-Q-2026-003", customer: "Lotus Boutique", currency: "VND", total: "120,000,000đ", status: "draft", validUntil: "—", createdAt: "28/08/2026" },
];

const statusMap: Record<string, { label: string; color: string }> = {
  draft: { label: "Bản nháp", color: "bg-gray-100 text-gray-600" },
  sent: { label: "Đã gửi", color: "bg-blue-100 text-blue-700" },
  accepted: { label: "Đã chấp nhận", color: "bg-green-100 text-green-700" },
  rejected: { label: "Bị từ chối", color: "bg-red-100 text-red-600" },
  expired: { label: "Hết hạn", color: "bg-gray-100 text-gray-500" },
};

export default function QuotesPage() {
  const router = useRouter();
  const columns = [
    { key: "id", label: "Mã", render: (val: string) => <span className="font-medium text-primary">{val}</span> },
    { key: "customer", label: "Khách hàng" },
    { key: "currency", label: "Tiền tệ" },
    { key: "total", label: "Tổng giá trị" },
    { key: "status", label: "Trạng thái", render: (val: string) => { const s = statusMap[val]; return <span className={`px-2 py-1 rounded-full text-xs font-medium ${s?.color}`}>{s?.label}</span>; }},
    { key: "validUntil", label: "Hiệu lực đến" },
    { key: "createdAt", label: "Ngày tạo" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div><h2 className="text-2xl font-heading font-bold">Báo giá</h2><p className="text-muted-foreground text-sm mt-1">Soạn, gửi và theo dõi báo giá cho khách hàng.</p></div>
        <button className="h-10 px-4 bg-primary text-primary-foreground rounded-md flex items-center text-sm font-medium hover:bg-primary/90"><Plus className="w-4 h-4 mr-2" />Tạo báo giá</button>
      </div>
      <div className="bg-card border rounded-xl shadow-sm overflow-hidden">
        <AdaptiveTable columns={columns} data={mockQuotes} keyField="id" onRowClick={(row) => router.push(`/app/bao-gia/${row.id}`)} />
      </div>
    </div>
  );
}
