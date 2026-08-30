"use client";

import React, { useState } from "react";
import { AdaptiveTable } from "@/components/adaptive/AdaptiveTable";
import { FilterBar } from "@/components/adaptive/FilterBar";
import { evaluateArtisanMatch, HouseholdProfile } from "@/lib/domain/artisan-matching";
import { Users, Search, CheckCircle2, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";

// Giả lập dữ liệu
const mockHouseholds: HouseholdProfile[] = [
  { id: "PL-001", status: "active", maxKilnHeight: 1200, monthlyCapacityRemaining: 500, technicalMatchScore: 0.9, defectRate: 5, onTimeRate: 98, hasKilnSlotBeforeDeadline: true, experienceMatchScore: 0.8 },
  { id: "PL-002", status: "active", maxKilnHeight: 800, monthlyCapacityRemaining: 1200, technicalMatchScore: 0.7, defectRate: 8, onTimeRate: 90, hasKilnSlotBeforeDeadline: true, experienceMatchScore: 0.5 },
  { id: "PL-003", status: "paused", maxKilnHeight: 1500, monthlyCapacityRemaining: 0, technicalMatchScore: 1.0, defectRate: 2, onTimeRate: 100, hasKilnSlotBeforeDeadline: false, experienceMatchScore: 1.0 },
  { id: "PL-004", status: "active", maxKilnHeight: 1000, monthlyCapacityRemaining: 200, technicalMatchScore: 0.8, defectRate: 15, onTimeRate: 85, hasKilnSlotBeforeDeadline: true, experienceMatchScore: 0.6 },
];

export default function ArtisanNetworkPage() {
  const router = useRouter();
  const [isMatchingMode, setIsMatchingMode] = useState(false);
  
  // States for matching form
  const [reqHeight, setReqHeight] = useState(600);
  const [reqQty, setReqQty] = useState(300);

  const filterConfigs = [
    {
      id: "status",
      label: "Trạng thái",
      type: "select" as const,
      options: [
        { label: "Tất cả", value: "" },
        { label: "Đang hoạt động", value: "active" },
        { label: "Tạm nghỉ", value: "paused" },
      ]
    },
    {
      id: "technique",
      label: "Kỹ thuật",
      type: "select" as const,
      options: [
        { label: "Tất cả", value: "" },
        { label: "Vuốt tay", value: "vuot_tay" },
        { label: "Đổ rót", value: "do_rot" },
      ]
    }
  ];

  const renderDefectRate = (rate: number) => {
    let color = "text-green-600 bg-green-50";
    if (rate > 10) color = "text-red-600 bg-red-50";
    else if (rate > 5) color = "text-amber-600 bg-amber-50";
    return <span className={`px-2 py-1 rounded text-xs font-medium ${color}`}>{rate}%</span>;
  };

  const columnsNormal = [
    { key: "id", label: "Mã hộ", render: (val: string) => <span className="font-medium text-primary">{val}</span> },
    { key: "status", label: "Trạng thái", render: (val: string) => (
      <span className={`px-2 py-1 rounded-full text-xs ${val === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
        {val === 'active' ? 'Hoạt động' : 'Tạm nghỉ'}
      </span>
    )},
    { key: "maxKilnHeight", label: "Lòng lò Max (mm)" },
    { key: "monthlyCapacityRemaining", label: "Công suất trống" },
    { key: "defectRate", label: "Tỷ lệ vỡ hỏng", render: renderDefectRate },
    { key: "onTimeRate", label: "Tỷ lệ đúng hạn", render: (val: number) => <span>{val}%</span> },
  ];

  // Nếu đang ở chế độ so khớp, ta map dữ liệu qua hàm evaluateArtisanMatch
  const matchResults = mockHouseholds.map(hh => ({
    ...hh,
    match: evaluateArtisanMatch(hh, { productHeight: reqHeight, qtyRequired: reqQty })
  })).sort((a, b) => b.match.score - a.match.score); // Xếp điểm cao lên đầu

  const columnsMatching = [
    { key: "id", label: "Mã hộ", render: (val: string) => <span className="font-medium">{val}</span> },
    { key: "match.isEligible", label: "Điều kiện cứng", render: (_: any, row: any) => (
      row.match.isEligible 
        ? <div className="flex items-center text-green-600"><CheckCircle2 className="w-4 h-4 mr-1"/> Đạt</div>
        : <div className="flex flex-col text-red-600 text-xs">
            <div className="flex items-center"><XCircle className="w-4 h-4 mr-1"/> Không đạt</div>
            <span className="text-muted-foreground mt-1 line-clamp-1" title={row.match.ineligibleReasons.join(', ')}>
              {row.match.ineligibleReasons[0]}
            </span>
          </div>
    )},
    { key: "match.score", label: "Điểm phù hợp", render: (_: any, row: any) => (
      <div className="flex items-center">
        <div className="w-full bg-muted rounded-full h-2.5 mr-2 max-w-[100px]">
          <div className="bg-primary h-2.5 rounded-full" style={{ width: `${row.match.score}%` }}></div>
        </div>
        <span className="text-sm font-medium">{row.match.score}đ</span>
      </div>
    )},
    { key: "monthlyCapacityRemaining", label: "Công suất trống" },
    { key: "defectRate", label: "Tỷ lệ hỏng", render: renderDefectRate },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-heading font-bold">Bản đồ năng lực hộ nghề</h2>
          <p className="text-muted-foreground text-sm mt-1">Tra cứu, đánh giá và tìm kiếm hộ sản xuất phù hợp nhất.</p>
        </div>
        
        <div className="flex bg-muted p-1 rounded-lg">
          <button 
            className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${!isMatchingMode ? 'bg-background shadow text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            onClick={() => setIsMatchingMode(false)}
          >
            Danh sách
          </button>
          <button 
            className={`px-4 py-2 text-sm font-medium rounded-md transition-all flex items-center ${isMatchingMode ? 'bg-primary text-primary-foreground shadow' : 'text-muted-foreground hover:text-foreground'}`}
            onClick={() => setIsMatchingMode(true)}
          >
            <Search className="w-4 h-4 mr-2" />
            So khớp tự động
          </button>
        </div>
      </div>

      {isMatchingMode && (
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-5 mb-6">
          <h3 className="font-semibold text-primary mb-4">Nhập yêu cầu đơn hàng để tìm thợ</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="text-sm font-medium mb-1.5 block">Chiều cao sản phẩm (mm)</label>
              <input type="number" value={reqHeight} onChange={e => setReqHeight(Number(e.target.value))} className="w-full h-10 px-3 border rounded-md" />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Số lượng cần sản xuất</label>
              <input type="number" value={reqQty} onChange={e => setReqQty(Number(e.target.value))} className="w-full h-10 px-3 border rounded-md" />
            </div>
            <div className="flex items-end">
              <p className="text-xs text-muted-foreground pb-2">
                * Thuật toán sẽ tính điểm dựa trên độ khớp kỹ thuật, tỷ lệ vỡ hỏng, tỷ lệ đúng hạn và kinh nghiệm của hộ.
              </p>
            </div>
          </div>
        </div>
      )}

      {!isMatchingMode && (
        <FilterBar 
          filters={filterConfigs} 
          onFilterChange={(f) => console.log(f)} 
          onSearch={(s) => console.log(s)}
        />
      )}

      <div className="bg-card border rounded-xl shadow-sm overflow-hidden">
        <AdaptiveTable 
          columns={isMatchingMode ? columnsMatching : columnsNormal} 
          data={isMatchingMode ? matchResults : mockHouseholds} 
          keyField="id" 
          onRowClick={(row) => router.push(`/app/ho-nghe/${row.id}`)}
        />
      </div>
    </div>
  );
}
