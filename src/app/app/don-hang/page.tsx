"use client";

import React from "react";
import { AdaptiveTable } from "@/components/adaptive/AdaptiveTable";
import { FilterBar } from "@/components/adaptive/FilterBar";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";

const mockOrders = [
  { id: "PL-2024-042", customer: "ACME Corp", design: "Bình hoa Mùa Xuân", qty: 300, totalValue: "150,000,000", status: "co_design", date: "24/10/2024" },
  { id: "PL-2024-041", customer: "Kansai Trading", design: "Bộ ấm trà đạo", qty: 150, totalValue: "75,000,000", status: "sample_approved", date: "22/10/2024" },
  { id: "PL-2024-040", customer: "ACME Corp", design: "Chậu bonsai lớn", qty: 50, totalValue: "90,000,000", status: "assigned", date: "20/10/2024" },
  { id: "PL-2024-039", customer: "Lotus Boutique", design: "Đĩa gốm trang trí", qty: 500, totalValue: "120,000,000", status: "in_production", date: "15/10/2024" },
  { id: "PL-2024-038", customer: "Hanoia", design: "Tượng linh vật", qty: 200, totalValue: "200,000,000", status: "packing", date: "05/10/2024" },
];

export default function OrdersPage() {
  const router = useRouter();

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { label: string, color: string }> = {
      co_design: { label: "Đang thiết kế", color: "bg-blue-100 text-blue-700" },
      sample_approved: { label: "Đã duyệt mẫu", color: "bg-indigo-100 text-indigo-700" },
      assigned: { label: "Đã giao thợ", color: "bg-amber-100 text-amber-700" },
      in_production: { label: "Đang sản xuất", color: "bg-orange-100 text-orange-700" },
      packing: { label: "Đang đóng gói", color: "bg-emerald-100 text-emerald-700" },
    };
    const s = statusMap[status] || { label: status, color: "bg-gray-100 text-gray-700" };
    return <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${s.color}`}>{s.label}</span>;
  };

  const columns = [
    { key: "id", label: "Mã đơn", render: (val: string) => <span className="font-semibold text-primary">{val}</span> },
    { key: "customer", label: "Khách hàng" },
    { key: "design", label: "Thiết kế" },
    { key: "qty", label: "Số lượng" },
    { key: "totalValue", label: "Giá trị (VND)" },
    { key: "status", label: "Trạng thái", render: getStatusBadge },
    { key: "date", label: "Ngày tạo" },
  ];

  const filterConfigs = [
    {
      id: "status",
      label: "Trạng thái",
      type: "select" as const,
      options: [
        { label: "Tất cả", value: "" },
        { label: "Đang thiết kế", value: "co_design" },
        { label: "Đang sản xuất", value: "in_production" },
        { label: "Đang đóng gói", value: "packing" },
      ]
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-heading font-bold mb-2">Đơn hàng</h2>
          <FilterBar 
            filters={filterConfigs} 
            onFilterChange={(f) => {}} 
            onSearch={(s) => {}}
          />
        </div>
        <button className="h-10 px-4 bg-primary text-primary-foreground rounded-md flex items-center text-sm font-medium hover:bg-primary/90 transition-colors">
          <Plus className="w-4 h-4 mr-2" />
          Tạo đơn mới
        </button>
      </div>

      <div className="bg-card border rounded-xl shadow-sm overflow-hidden mt-4">
        <AdaptiveTable 
          columns={columns} 
          data={mockOrders} 
          keyField="id" 
          onRowClick={(row) => router.push(`/app/don-hang/${row.id}`)}
        />
      </div>
    </div>
  );
}
