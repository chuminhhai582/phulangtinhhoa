"use client";

import React from "react";
import { AdaptiveTable } from "@/components/adaptive/AdaptiveTable";
import { FilterBar } from "@/components/adaptive/FilterBar";
import { useRouter } from "next/navigation";
import { Plus, Eye } from "lucide-react";

const mockDesigns = [
  { id: "PL-D-2026-001", title: "Bình Thu Vàng", collection: "Thu Lãng", productType: "Bình hoa", designer: "Nguyễn Anh", status: "approved", version: 3 },
  { id: "PL-D-2026-002", title: "Ấm Trà Phù Lãng", collection: "Trà Đạo", productType: "Ấm trà", designer: "Nguyễn Anh", status: "approved", version: 2 },
  { id: "PL-D-2026-003", title: "Chậu Sen Lớn", collection: "—", productType: "Chậu", designer: "Trần Hà", status: "in_review", version: 1 },
  { id: "PL-D-2026-004", title: "Tượng Phong Thủy", collection: "—", productType: "Tượng", designer: "Trần Hà", status: "draft", version: 1 },
  { id: "PL-D-2026-005", title: "Đèn Gốm Treo", collection: "Hoa Đất", productType: "Đèn", designer: "Lê Mai", status: "approved", version: 2 },
];

const statusMap: Record<string, { label: string; color: string }> = {
  draft: { label: "Bản nháp", color: "bg-gray-100 text-gray-600" },
  in_review: { label: "Đang duyệt", color: "bg-amber-100 text-amber-700" },
  approved: { label: "Đã duyệt", color: "bg-green-100 text-green-700" },
  retired: { label: "Ngừng dùng", color: "bg-red-100 text-red-600" },
};

export default function DesignLibraryPage() {
  const router = useRouter();

  const columns = [
    { key: "id", label: "Mã", render: (val: string) => <span className="font-medium text-primary">{val}</span> },
    { key: "title", label: "Tên thiết kế" },
    { key: "collection", label: "Bộ sưu tập" },
    { key: "productType", label: "Loại SP" },
    { key: "designer", label: "Thiết kế" },
    { key: "version", label: "Phiên bản", render: (val: number) => <span>v{val}</span> },
    { key: "status", label: "Trạng thái", render: (val: string) => {
      const s = statusMap[val] || { label: val, color: "bg-gray-100" };
      return <span className={`px-2 py-1 rounded-full text-xs font-medium ${s.color}`}>{s.label}</span>;
    }},
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div>
          <h2 className="text-2xl font-heading font-bold">Thư viện thiết kế</h2>
          <p className="text-muted-foreground text-sm mt-1">Quản lý hồ sơ thiết kế, phiên bản, dung sai và quyền sử dụng.</p>
        </div>
        <button className="h-10 px-4 bg-primary text-primary-foreground rounded-md flex items-center text-sm font-medium hover:bg-primary/90 transition-colors self-start">
          <Plus className="w-4 h-4 mr-2" />Tạo thiết kế mới
        </button>
      </div>
      <FilterBar
        filters={[
          { id: "status", label: "Trạng thái", type: "select", options: [{ label: "Tất cả", value: "" }, { label: "Đã duyệt", value: "approved" }, { label: "Đang duyệt", value: "in_review" }, { label: "Bản nháp", value: "draft" }] },
          { id: "type", label: "Loại SP", type: "select", options: [{ label: "Tất cả", value: "" }, { label: "Bình hoa", value: "binh" }, { label: "Ấm trà", value: "am" }] },
        ]}
        onFilterChange={() => {}}
        onSearch={() => {}}
      />
      <div className="bg-card border rounded-xl shadow-sm overflow-hidden">
        <AdaptiveTable columns={columns} data={mockDesigns} keyField="id" onRowClick={(row) => router.push(`/app/thiet-ke/${row.id}`)} />
      </div>
    </div>
  );
}
