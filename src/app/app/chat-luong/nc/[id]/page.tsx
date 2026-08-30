"use client";

import React, { useState } from "react";
import { ArrowLeft, AlertOctagon, CheckCircle2, RotateCcw, Tag, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NonconformityDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [decision, setDecision] = useState<string | null>(null);

  const handleSave = () => {
    alert(`Đã lưu quyết định xử lý: ${decision}`);
    router.push('/app/chat-luong');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-4">
        <Link href="/app/chat-luong" className="p-2 -ml-2 rounded-full hover:bg-muted text-muted-foreground transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-heading font-bold">{params.id}</h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700 border border-red-200">Cần xử lý</span>
          </div>
          <p className="text-muted-foreground text-sm mt-1">Sản phẩm không phù hợp (Nonconformity Report)</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div className="bg-card border rounded-xl p-5 shadow-sm space-y-4">
            <h3 className="font-semibold text-lg border-b pb-3">Thông tin phát hiện</h3>
            <div className="space-y-3 text-sm">
              <div className="grid grid-cols-3 gap-2">
                <span className="text-muted-foreground">Đơn hàng:</span>
                <span className="col-span-2 font-medium text-primary">PL-2024-039</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <span className="text-muted-foreground">Lô sản xuất:</span>
                <span className="col-span-2 font-medium">B01 - Hộ Ông Tới</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <span className="text-muted-foreground">Công đoạn:</span>
                <span className="col-span-2 font-medium">Kiểm tra sau nung</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <span className="text-muted-foreground">Mô tả lỗi:</span>
                <span className="col-span-2 font-medium text-red-600">Nứt trôn (âm thanh đục)</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <span className="text-muted-foreground">Số lượng hỏng:</span>
                <span className="col-span-2 font-medium">2 / 50 sản phẩm</span>
              </div>
            </div>
          </div>

          <div className="bg-card border rounded-xl p-5 shadow-sm space-y-4">
            <h3 className="font-semibold text-lg border-b pb-3">Bằng chứng (Hình ảnh/Video)</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="aspect-square bg-muted rounded-lg border border-dashed flex items-center justify-center text-muted-foreground text-sm">
                Ảnh 1
              </div>
              <div className="aspect-square bg-muted rounded-lg border border-dashed flex items-center justify-center text-muted-foreground text-sm">
                Ảnh 2
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-5 shadow-sm space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertOctagon className="w-5 h-5 text-blue-700" />
              <h3 className="font-semibold text-lg text-blue-900">Phương án giải quyết</h3>
            </div>
            <p className="text-sm text-blue-800/80 mb-4">
              Dựa theo Blueprint §5, vui lòng chọn một trong các phương án xử lý dưới đây. Lựa chọn này sẽ cập nhật trạng thái lô hàng và ảnh hưởng đến tính toán chi phí.
            </p>

            <div className="space-y-3">
              <label 
                className={`flex items-start gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${decision === 'rework' ? 'border-primary bg-primary/5' : 'border-transparent bg-background hover:border-primary/30'}`}
                onClick={() => setDecision('rework')}
              >
                <div className="mt-0.5">
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${decision === 'rework' ? 'border-primary' : 'border-muted-foreground'}`}>
                    {decision === 'rework' && <div className="w-2 h-2 rounded-full bg-primary" />}
                  </div>
                </div>
                <div>
                  <div className="font-semibold flex items-center gap-2">
                    <RotateCcw className="w-4 h-4" /> Làm bù mẻ sau (Rework)
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">Yêu cầu thợ làm lại số lượng hỏng ở mẻ nung tiếp theo. Khách hàng vẫn nhận đủ hàng.</p>
                </div>
              </label>

              <label 
                className={`flex items-start gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${decision === 'discount' ? 'border-amber-500 bg-amber-500/5' : 'border-transparent bg-background hover:border-amber-500/30'}`}
                onClick={() => setDecision('discount')}
              >
                <div className="mt-0.5">
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${decision === 'discount' ? 'border-amber-500' : 'border-muted-foreground'}`}>
                    {decision === 'discount' && <div className="w-2 h-2 rounded-full bg-amber-500" />}
                  </div>
                </div>
                <div>
                  <div className="font-semibold flex items-center gap-2 text-amber-700">
                    <Tag className="w-4 h-4" /> Bán giảm giá (Discount)
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">Lỗi nhẹ, không ảnh hưởng công năng. Xin ý kiến khách hàng để giao với giá thấp hơn.</p>
                </div>
              </label>

              <label 
                className={`flex items-start gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${decision === 'scrap' ? 'border-red-500 bg-red-500/5' : 'border-transparent bg-background hover:border-red-500/30'}`}
                onClick={() => setDecision('scrap')}
              >
                <div className="mt-0.5">
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${decision === 'scrap' ? 'border-red-500' : 'border-muted-foreground'}`}>
                    {decision === 'scrap' && <div className="w-2 h-2 rounded-full bg-red-500" />}
                  </div>
                </div>
                <div>
                  <div className="font-semibold flex items-center gap-2 text-red-700">
                    <Trash2 className="w-4 h-4" /> Tiêu hủy (Scrap)
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">Lỗi nặng, đập bỏ để tránh lọt ra thị trường làm hỏng thương hiệu Phù Lãng. Trừ trực tiếp vào tỷ lệ hao hụt.</p>
                </div>
              </label>
            </div>

            <div className="pt-6">
              <button 
                onClick={handleSave}
                disabled={!decision}
                className="w-full h-12 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-5 h-5" />
                Xác nhận Quyết định
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
