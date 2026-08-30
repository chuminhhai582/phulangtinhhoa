"use client";

import React from "react";
import { AdaptiveTable } from "@/components/adaptive/AdaptiveTable";
import { FilterBar } from "@/components/adaptive/FilterBar";
import { TabRouter } from "@/components/adaptive/TabRouter";
import { useRouter } from "next/navigation";
import { ClipboardCheck, AlertOctagon } from "lucide-react";

const mockInspections = [
  { id: "QC-1029", order: "PL-2024-042", checkpoint: "Sau nung", household: "Ông Tới", result: "pending", date: "30/10/2024", defects: 0 },
  { id: "QC-1028", order: "PL-2024-039", checkpoint: "Trước nung", household: "Bà Nga", result: "pass", date: "29/10/2024", defects: 0 },
  { id: "QC-1027", order: "PL-2024-039", checkpoint: "Trước đóng gói", household: "Ông Tới", result: "conditional", date: "28/10/2024", defects: 2 },
];

const mockNC = [
  { id: "NC-089", order: "PL-2024-039", issue: "Nứt trôn (2 SP)", household: "Ông Tới", decision: null, date: "28/10/2024" },
  { id: "NC-088", order: "PL-2024-035", issue: "Sai màu men (5 SP)", household: "Bà Nga", decision: "discount", date: "25/10/2024" },
];

export default function QualityControlPage() {
  const router = useRouter();

  const getResultBadge = (result: string) => {
    switch (result) {
      case 'pass': return <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">Đạt</span>;
      case 'conditional': return <span className="px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700">Đạt có điều kiện</span>;
      case 'fail': return <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">Không đạt</span>;
      default: return <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">Chờ duyệt</span>;
    }
  };

  const getDecisionBadge = (decision: string | null) => {
    switch (decision) {
      case 'rework': return <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">Bù mẻ sau</span>;
      case 'discount': return <span className="px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700">Giảm giá bán</span>;
      case 'scrap': return <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">Xóa bỏ</span>;
      default: return <span className="px-2 py-1 rounded-full text-xs font-medium border border-red-300 text-red-700 bg-red-50">Cần quyết định</span>;
    }
  };

  const inspectionColumns = [
    { key: "id", label: "Mã phiếu", render: (val: string) => <span className="font-semibold">{val}</span> },
    { key: "order", label: "Đơn hàng", render: (val: string) => <span className="text-primary cursor-pointer hover:underline">{val}</span> },
    { key: "checkpoint", label: "Điểm kiểm tra" },
    { key: "household", label: "Hộ sản xuất" },
    { key: "defects", label: "Lỗi phát hiện", render: (val: number) => val > 0 ? <span className="text-red-600 font-medium">{val} lỗi</span> : "-" },
    { key: "result", label: "Kết quả", render: getResultBadge },
    { key: "date", label: "Ngày" },
  ];

  const ncColumns = [
    { key: "id", label: "Mã NC", render: (val: string) => <span className="font-semibold text-red-600">{val}</span> },
    { key: "order", label: "Đơn hàng" },
    { key: "issue", label: "Mô tả lỗi" },
    { key: "household", label: "Hộ sản xuất" },
    { key: "decision", label: "Phương án", render: getDecisionBadge },
    { key: "date", label: "Ngày ghi nhận" },
  ];

  const tabs = [
    { label: "Hàng đợi duyệt (QC)", href: "/app/chat-luong", icon: <ClipboardCheck className="w-4 h-4" /> },
    { label: "Sản phẩm không phù hợp (NC)", href: "/app/chat-luong?tab=nc", icon: <AlertOctagon className="w-4 h-4" /> },
  ];

  // For MVP demo, check URL manually or just show both stacked
  // Since we don't have real routing here, we will show them stacked for the demo

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-heading font-bold mb-1">Kiểm soát chất lượng</h2>
        <p className="text-muted-foreground text-sm">Hàng đợi duyệt ảnh kiểm tra và xử lý sản phẩm không phù hợp.</p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <ClipboardCheck className="w-5 h-5 text-primary" />
            Phiếu kiểm tra chờ duyệt
          </h3>
          <FilterBar filters={[]} onFilterChange={() => {}} onSearch={() => {}} />
        </div>
        <div className="bg-card border rounded-xl shadow-sm overflow-hidden">
          <AdaptiveTable columns={inspectionColumns} data={mockInspections} keyField="id" />
        </div>
      </div>

      <div className="space-y-4 pt-4 border-t">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold flex items-center gap-2 text-red-700">
            <AlertOctagon className="w-5 h-5" />
            Sản phẩm không phù hợp (NC)
          </h3>
          <FilterBar filters={[]} onFilterChange={() => {}} onSearch={() => {}} />
        </div>
        <div className="bg-card border border-red-100 rounded-xl shadow-sm overflow-hidden">
          <AdaptiveTable 
            columns={ncColumns} 
            data={mockNC} 
            keyField="id" 
            onRowClick={(row) => router.push(`/app/chat-luong/nc/${row.id}`)}
          />
        </div>
      </div>
    </div>
  );
}
