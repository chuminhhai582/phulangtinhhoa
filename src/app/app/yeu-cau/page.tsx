"use client";
import React from "react";
import { AdaptiveTable } from "@/components/adaptive/AdaptiveTable";
import { FilterBar } from "@/components/adaptive/FilterBar";
import { useRouter } from "next/navigation";

const mockInquiries = [
  { id: "INQ-001", prospect: "Kansai Trading", channel: "Sự kiện", product: "Bình trang trí", qty: 200, score: 78, decision: "accept", date: "25/08/2026" },
  { id: "INQ-002", prospect: "Lotus Boutique", channel: "Website", product: "Ấm trà", qty: 500, score: 65, decision: "accept", date: "22/08/2026" },
  { id: "INQ-003", prospect: "Green Hotels", channel: "Giới thiệu", product: "Đèn gốm", qty: 100, score: 42, decision: "park", date: "20/08/2026" },
  { id: "INQ-004", prospect: "Kitchen Co.", channel: "Email", product: "Đĩa ăn", qty: 1000, score: 0, decision: "reject", date: "18/08/2026" },
];

const decisionMap: Record<string, { label: string; color: string }> = {
  pending: { label: "Chờ xử lý", color: "bg-gray-100 text-gray-600" },
  accept: { label: "Chấp nhận", color: "bg-green-100 text-green-700" },
  park: { label: "Tạm giữ", color: "bg-amber-100 text-amber-700" },
  reject: { label: "Từ chối", color: "bg-red-100 text-red-600" },
};

export default function InquiriesPage() {
  const router = useRouter();
  const columns = [
    { key: "id", label: "Mã", render: (val: string) => <span className="font-medium text-primary">{val}</span> },
    { key: "prospect", label: "Khách tiềm năng" },
    { key: "channel", label: "Kênh" },
    { key: "product", label: "Sản phẩm" },
    { key: "qty", label: "SL" },
    { key: "score", label: "Điểm sàng lọc", render: (val: number) => (
      <span className={`font-medium ${val >= 60 ? 'text-green-600' : val >= 40 ? 'text-amber-600' : 'text-red-600'}`}>{val}/135</span>
    )},
    { key: "decision", label: "Quyết định", render: (val: string) => {
      const d = decisionMap[val] || { label: val, color: "bg-gray-100" };
      return <span className={`px-2 py-1 rounded-full text-xs font-medium ${d.color}`}>{d.label}</span>;
    }},
    { key: "date", label: "Ngày nhận" },
  ];

  return (
    <div className="space-y-6">
      <div><h2 className="text-2xl font-heading font-bold">Yêu cầu đến</h2><p className="text-muted-foreground text-sm mt-1">Tiếp nhận và sàng lọc yêu cầu từ khách hàng tiềm năng.</p></div>
      <FilterBar filters={[{ id: "decision", label: "Quyết định", type: "select", options: [{ label: "Tất cả", value: "" }, { label: "Chấp nhận", value: "accept" }, { label: "Tạm giữ", value: "park" }, { label: "Từ chối", value: "reject" }] }]} onFilterChange={() => {}} onSearch={() => {}} />
      <div className="bg-card border rounded-xl shadow-sm overflow-hidden">
        <AdaptiveTable columns={columns} data={mockInquiries} keyField="id" onRowClick={(row) => router.push(`/app/yeu-cau/${row.id}`)} />
      </div>
    </div>
  );
}
