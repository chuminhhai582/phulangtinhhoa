"use client";
import React from "react";
import { AdaptiveTable } from "@/components/adaptive/AdaptiveTable";
import { useRouter } from "next/navigation";

const mockExports = [
  { orderId: "PL-O-2026-007", customer: "ACME Corp", destination: "Singapore", incoterm: "FOB", etd: "15/10/2026", docsReady: "3/8", status: "Đang chuẩn bị" },
  { orderId: "PL-O-2026-004", customer: "Kansai Trading", destination: "Nhật Bản", incoterm: "CIF", etd: "01/10/2026", docsReady: "7/8", status: "Gần hoàn tất" },
  { orderId: "PL-O-2025-015", customer: "Hanoia", destination: "Việt Nam", incoterm: "DAP", etd: "20/09/2026", docsReady: "8/8", status: "Sẵn sàng" },
];

export default function ExportDeskPage() {
  const router = useRouter();
  const columns = [
    { key: "orderId", label: "Đơn hàng", render: (val: string) => <span className="font-medium text-primary">{val}</span> },
    { key: "customer", label: "Khách hàng" },
    { key: "destination", label: "Thị trường" },
    { key: "incoterm", label: "Incoterm" },
    { key: "etd", label: "Ngày giao dự kiến" },
    { key: "docsReady", label: "Chứng từ", render: (val: string) => {
      const [done, total] = val.split('/').map(Number);
      return <span className={`font-medium ${done === total ? 'text-green-600' : 'text-amber-600'}`}>{val}</span>;
    }},
    { key: "status", label: "Trạng thái", render: (val: string) => {
      const color = val === 'Sẵn sàng' ? 'bg-green-100 text-green-700' : val === 'Gần hoàn tất' ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700';
      return <span className={`px-2 py-1 rounded-full text-xs font-medium ${color}`}>{val}</span>;
    }},
  ];

  return (
    <div className="space-y-6">
      <div><h2 className="text-2xl font-heading font-bold">Bàn xuất khẩu</h2><p className="text-muted-foreground text-sm mt-1">Chứng từ, đóng gói và vận chuyển.</p></div>
      <div className="bg-card border rounded-xl shadow-sm overflow-hidden">
        <AdaptiveTable columns={columns} data={mockExports} keyField="orderId" onRowClick={(row) => router.push(`/app/xuat-khau/${row.orderId}`)} />
      </div>
    </div>
  );
}
