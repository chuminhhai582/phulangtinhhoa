"use client";

import React from "react";
import { TabRouter } from "@/components/adaptive/TabRouter";
import { ArrowLeft, Map, ThermometerSun, FileText, Clock, DollarSign, FileSignature } from "lucide-react";
import Link from "next/link";

export default function HouseholdDetailPage({ params }: { params: { id: string } }) {
  const tabs = [
    { label: "Năng lực", href: `/app/ho-nghe/${params.id}/nang-luc`, icon: <Map className="w-4 h-4" /> },
    { label: "Lò nung", href: `/app/ho-nghe/${params.id}/lo-nung`, icon: <ThermometerSun className="w-4 h-4" /> },
    { label: "Mẫu", href: `/app/ho-nghe/${params.id}/mau`, icon: <FileText className="w-4 h-4" /> },
    { label: "Lịch sử chất lượng", href: `/app/ho-nghe/${params.id}/lich-su`, icon: <Clock className="w-4 h-4" /> },
    { label: "Thu nhập", href: `/app/ho-nghe/${params.id}/thu-nhap`, icon: <DollarSign className="w-4 h-4" /> },
    { label: "Hợp đồng", href: `/app/ho-nghe/${params.id}/hop-dong`, icon: <FileSignature className="w-4 h-4" /> },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/app/ho-nghe" className="p-2 -ml-2 rounded-full hover:bg-muted text-muted-foreground transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-heading font-bold">Hồ sơ: Ông Nguyễn Văn Tới</h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">Đang hoạt động</span>
          </div>
          <p className="text-muted-foreground text-sm mt-1">Mã hệ thống: {params.id} • Thôn Phù Lãng</p>
        </div>
      </div>

      <div className="bg-card border rounded-xl overflow-hidden shadow-sm">
        <TabRouter tabs={tabs} basePath={`/app/ho-nghe/${params.id}`}>
          <div className="p-6 min-h-[400px]">
            <h3 className="text-lg font-semibold mb-4">Thông tin năng lực</h3>
            <div className="grid grid-cols-2 gap-4 max-w-2xl">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Chuyên môn chính</p>
                <p className="font-medium">Vuốt tay chập chiếc</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Kích thước lò tối đa</p>
                <p className="font-medium">Cao 1200mm</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Tỷ lệ lỗi trung bình (6 lô gần nhất)</p>
                <p className="font-medium text-green-600">5.2%</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Đồng ý hiển thị công khai</p>
                <p className="font-medium">Có</p>
              </div>
            </div>
          </div>
        </TabRouter>
      </div>
    </div>
  );
}
