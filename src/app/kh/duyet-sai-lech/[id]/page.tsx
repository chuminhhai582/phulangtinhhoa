"use client";
import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, XCircle, AlertTriangle } from "lucide-react";

export default function DeviationApprovalPage({ params }: { params: { id: string } }) {
  const [decision, setDecision] = useState<"" | "accept" | "reject">("");

  return (
    <div className="space-y-6">
      <Link href="/kh" className="flex items-center gap-2 text-[var(--pl-char)]/60 hover:text-[var(--pl-clay)]"><ArrowLeft className="w-5 h-5" />Quay lại</Link>
      <div>
        <h1 className="text-2xl font-heading font-bold text-[var(--pl-char)]">Duyệt sai lệch</h1>
        <p className="text-[var(--pl-char)]/60 mt-1">Mã NC: {params.id} · Bình Thu Vàng — Lô #0138</p>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 flex gap-3">
        <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0" />
        <div>
          <h2 className="font-bold text-amber-800">Phát hiện sai lệch chất lượng</h2>
          <p className="text-sm text-amber-700 mt-1">Trong lô #0138 (18 sản phẩm), phát hiện <strong>3 sản phẩm</strong> có sắc men sáng hơn 1.5 bậc so với mẫu chuẩn — vượt ngưỡng nhóm &ldquo;Có dung sai&rdquo;.</p>
        </div>
      </div>

      {/* Evidence */}
      <div className="bg-white rounded-xl border p-6">
        <h2 className="font-bold mb-4">Bằng chứng (ảnh kiểm tra)</h2>
        <div className="grid grid-cols-3 gap-3">
          {[1,2,3].map(i => (
            <div key={i} className="aspect-square bg-gradient-to-br from-amber-100 to-amber-50 rounded-xl flex flex-col items-center justify-center">
              <span className="text-3xl opacity-40">🏺</span>
              <span className="text-xs text-amber-600 mt-1">SP #{i}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Options */}
      <div className="bg-white rounded-xl border p-6">
        <h2 className="font-bold mb-4">Đề xuất xử lý</h2>
        <div className="space-y-3">
          <div className="border rounded-lg p-4"><h3 className="font-medium text-sm">Phương án A: Chấp nhận giảm giá</h3><p className="text-sm text-[var(--pl-char)]/60 mt-1">Nhận 3 sản phẩm này với giảm giá 15%/sản phẩm. Tổng giảm: $24.75</p></div>
          <div className="border rounded-lg p-4"><h3 className="font-medium text-sm">Phương án B: Sản xuất lại</h3><p className="text-sm text-[var(--pl-char)]/60 mt-1">Sản xuất lại 3 sản phẩm. Thời gian thêm: ~15 ngày.</p></div>
        </div>
      </div>

      <div className="bg-white rounded-xl border p-6">
        <h2 className="font-bold mb-3">Quyết định</h2>
        <div className="flex gap-3">
          <button onClick={() => setDecision("accept")} className={`flex-1 h-12 rounded-xl font-medium flex items-center justify-center gap-2 transition-all ${decision === 'accept' ? 'bg-green-600 text-white' : 'border-2 border-green-200 text-green-700 hover:bg-green-50'}`}>
            <CheckCircle2 className="w-5 h-5" />Chấp nhận giảm giá
          </button>
          <button onClick={() => setDecision("reject")} className={`flex-1 h-12 rounded-xl font-medium flex items-center justify-center gap-2 transition-all ${decision === 'reject' ? 'bg-amber-600 text-white' : 'border-2 border-amber-200 text-amber-700 hover:bg-amber-50'}`}>
            <XCircle className="w-5 h-5" />Yêu cầu làm lại
          </button>
        </div>
        {decision && <textarea rows={3} placeholder="Ghi chú thêm (tùy chọn)..." className="w-full mt-3 px-4 py-3 border rounded-xl text-sm" />}
      </div>
    </div>
  );
}
