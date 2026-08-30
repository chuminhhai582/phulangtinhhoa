"use client";
import React from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function InquiryDetailPage({ params }: { params: { id: string } }) {
  const criteria = [
    { name: "Phù hợp năng lực", weight: 2, score: 4 },
    { name: "Giá trị đơn hàng", weight: 2, score: 4 },
    { name: "Độ rõ yêu cầu", weight: 1, score: 3 },
    { name: "Khả năng lặp lại", weight: 1, score: 4 },
    { name: "Rủi ro tuân thủ", weight: 2, score: 5 },
    { name: "Khả năng thanh toán", weight: 1, score: 3 },
  ];
  const totalScore = criteria.reduce((s, c) => s + c.score * c.weight, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/app/yeu-cau" className="p-2 -ml-2 rounded-full hover:bg-muted text-muted-foreground"><ArrowLeft className="w-5 h-5" /></Link>
        <div>
          <h2 className="text-2xl font-heading font-bold">Yêu cầu: {params.id}</h2>
          <p className="text-muted-foreground text-sm mt-1">Kansai Trading · Nhận ngày 25/08/2026 · Bình trang trí</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card border rounded-xl p-6 shadow-sm">
            <h3 className="font-semibold mb-4">Thông tin yêu cầu</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div><span className="text-muted-foreground">Tổ chức</span><p className="font-medium mt-0.5">Kansai Trading Co., Ltd.</p></div>
              <div><span className="text-muted-foreground">Quốc gia</span><p className="font-medium mt-0.5">Nhật Bản</p></div>
              <div><span className="text-muted-foreground">Loại sản phẩm</span><p className="font-medium mt-0.5">Bình trang trí</p></div>
              <div><span className="text-muted-foreground">Số lượng</span><p className="font-medium mt-0.5">200 sản phẩm</p></div>
              <div><span className="text-muted-foreground">Ngân sách</span><p className="font-medium mt-0.5">$15,000 USD</p></div>
              <div><span className="text-muted-foreground">Hạn giao</span><p className="font-medium mt-0.5">Q1 2027</p></div>
            </div>
            <div className="mt-4"><span className="text-sm text-muted-foreground">Mô tả</span><p className="text-sm mt-1">Cần 200 bình hoa men da lươn cao 30-40cm cho chuỗi khách sạn boutique tại Osaka. Yêu cầu có hộ chiếu số cho mỗi sản phẩm.</p></div>
          </div>
        </div>

        <div className="bg-card border rounded-xl p-6 shadow-sm">
          <h3 className="font-semibold mb-4">Chấm điểm sàng lọc</h3>
          <div className="space-y-3">
            {criteria.map((c, i) => (
              <div key={i} className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{c.name} (×{c.weight})</span>
                <span className="font-medium">{c.score}/5</span>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t flex items-center justify-between">
            <span className="font-semibold">Tổng điểm</span>
            <span className={`text-xl font-bold ${totalScore >= 60 ? 'text-green-600' : 'text-amber-600'}`}>{totalScore}/135</span>
          </div>
          <div className="mt-4">
            <span className={`px-3 py-1.5 rounded-full text-sm font-medium ${totalScore >= 60 ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
              {totalScore >= 60 ? '→ Chấp nhận' : '→ Tạm giữ'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
