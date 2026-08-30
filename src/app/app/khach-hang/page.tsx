"use client";
import React from "react";
import { AdaptiveTable } from "@/components/adaptive/AdaptiveTable";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";

const mockCustomers = [
  { id: "KH-001", code: "ACME", company: "ACME Corp", segment: "Kiến trúc sư", country: "Singapore", orders: 5, revenue: "750,000,000", status: "active" },
  { id: "KH-002", code: "KST", company: "Kansai Trading", segment: "Nhà phân phối", country: "Nhật Bản", orders: 3, revenue: "450,000,000", status: "active" },
  { id: "KH-003", code: "LBT", company: "Lotus Boutique", segment: "Khách sạn", country: "Việt Nam", orders: 2, revenue: "195,000,000", status: "active" },
  { id: "KH-004", code: "HNA", company: "Hanoia", segment: "Nhà phân phối", country: "Việt Nam", orders: 4, revenue: "680,000,000", status: "active" },
];

export default function CustomersPage() {
  const router = useRouter();
  const columns = [
    { key: "code", label: "Mã KH", render: (val: string) => <span className="font-medium text-primary">{val}</span> },
    { key: "company", label: "Tên công ty" },
    { key: "segment", label: "Phân khúc" },
    { key: "country", label: "Quốc gia" },
    { key: "orders", label: "Số đơn" },
    { key: "revenue", label: "Doanh thu (VND)" },
    { key: "status", label: "Trạng thái", render: () => <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">Đang hợp tác</span> },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div><h2 className="text-2xl font-heading font-bold">Khách hàng B2B</h2><p className="text-muted-foreground text-sm mt-1">Quản lý hồ sơ khách hàng và lịch sử đơn hàng.</p></div>
        <button className="h-10 px-4 bg-primary text-primary-foreground rounded-md flex items-center text-sm font-medium hover:bg-primary/90"><Plus className="w-4 h-4 mr-2" />Thêm khách hàng</button>
      </div>
      <div className="bg-card border rounded-xl shadow-sm overflow-hidden">
        <AdaptiveTable columns={columns} data={mockCustomers} keyField="id" onRowClick={(row) => router.push(`/app/khach-hang/${row.id}`)} />
      </div>
    </div>
  );
}
