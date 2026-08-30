"use client";
import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, XCircle } from "lucide-react";

export default function SampleApprovalPage({ params }: { params: { id: string } }) {
  const [decision, setDecision] = useState<"" | "approve" | "reject">("");

  return (
    <div className="space-y-6">
      <Link href="/kh" className="flex items-center gap-2 text-[var(--pl-char)]/60 hover:text-[var(--pl-clay)]"><ArrowLeft className="w-5 h-5" />Quay lại</Link>
      <div>
        <h1 className="text-2xl font-heading font-bold text-[var(--pl-char)]">Duyệt mẫu chuẩn</h1>
        <p className="text-[var(--pl-char)]/60 mt-1">Bình Thu Vàng v3 · Mã: {params.id}</p>
      </div>

      {/* Sample gallery */}
      <div className="grid grid-cols-2 gap-3">
        {[1,2,3,4].map(i => (
          <div key={i} className="aspect-square bg-gradient-to-br from-[var(--pl-eel)]/10 to-[var(--pl-clay)]/10 rounded-xl flex items-center justify-center"><span className="text-4xl opacity-30">🏺</span></div>
        ))}
      </div>

      {/* Tolerance table */}
      <div className="bg-white rounded-xl border p-6">
        <h2 className="font-bold mb-4">Bảng dung sai — Xin ký xác nhận</h2>
        <div className="space-y-3">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4"><h3 className="font-bold text-red-800 text-sm">🔴 Bắt buộc đúng</h3><ul className="mt-2 text-sm text-red-700 space-y-1"><li>• Chiều cao: 320mm ± 3mm</li><li>• Miệng tròn: ∅100mm ± 2mm</li><li>• Đứng vững, không lắc</li></ul></div>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4"><h3 className="font-bold text-amber-800 text-sm">🟡 Có dung sai</h3><ul className="mt-2 text-sm text-amber-700 space-y-1"><li>• Sắc men: nâu da lươn ± 1 bậc</li><li>• Độ cong: ≤2mm/100mm</li></ul></div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4"><h3 className="font-bold text-green-800 text-sm">🟢 Đặc trưng thủ công (chấp nhận)</h3><ul className="mt-2 text-sm text-green-700 space-y-1"><li>• Vân men chảy tự nhiên</li><li>• Dấu tay tạo hình</li><li>• Sắc thái nung nhẹ khác nhau</li></ul></div>
        </div>
      </div>

      {/* Digital signature */}
      <div className="bg-white rounded-xl border p-6">
        <h2 className="font-bold mb-3">Ký duyệt điện tử</h2>
        <p className="text-sm text-[var(--pl-char)]/60 mb-4">Bằng cách ký duyệt, bạn xác nhận đã xem mẫu chuẩn và đồng ý với toàn bộ bảng dung sai ở trên.</p>
        <div className="flex gap-3">
          <button onClick={() => setDecision("approve")} className={`flex-1 h-12 rounded-xl font-medium flex items-center justify-center gap-2 transition-all ${decision === 'approve' ? 'bg-green-600 text-white' : 'border-2 border-green-200 text-green-700 hover:bg-green-50'}`}>
            <CheckCircle2 className="w-5 h-5" />Duyệt & ký
          </button>
          <button onClick={() => setDecision("reject")} className={`flex-1 h-12 rounded-xl font-medium flex items-center justify-center gap-2 transition-all ${decision === 'reject' ? 'bg-red-600 text-white' : 'border-2 border-red-200 text-red-700 hover:bg-red-50'}`}>
            <XCircle className="w-5 h-5" />Yêu cầu chỉnh sửa
          </button>
        </div>
        {decision === 'reject' && <textarea rows={3} placeholder="Ghi chú lý do yêu cầu chỉnh sửa..." className="w-full mt-3 px-4 py-3 border rounded-xl text-sm" />}
      </div>
    </div>
  );
}
