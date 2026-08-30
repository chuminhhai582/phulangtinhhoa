"use client";
import React from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ArtisanOrderDetailPage({ params }: { params: { code: string } }) {
  return (
    <div className="space-y-4 max-w-lg mx-auto">
      <Link href="/tho/don" className="flex items-center gap-2 text-muted-foreground" style={{ minHeight: '48px' }}><ArrowLeft className="w-5 h-5" /><span style={{ fontSize: '17px' }}>Quay lại</span></Link>

      {/* Sample images placeholder */}
      <div className="aspect-[4/3] bg-gradient-to-br from-[var(--pl-eel)]/10 to-[var(--pl-clay)]/10 rounded-xl flex items-center justify-center"><span className="text-6xl opacity-30">🏺</span></div>

      {/* Qty */}
      <div className="bg-card border rounded-xl p-5">
        <h3 className="font-bold" style={{ fontSize: '20px' }}>Làm bao nhiêu cái</h3>
        <p className="text-3xl font-bold text-primary mt-2">12 cái + 2 dự phòng</p>
        <p className="text-sm text-muted-foreground mt-2">Hạn giao: 14/09/2026 · Còn 15 ngày</p>
      </div>

      {/* Tolerance: Mandatory */}
      <div className="bg-red-50 border border-red-200 rounded-xl p-5">
        <h3 className="font-bold text-red-800" style={{ fontSize: '17px' }}>🔴 BẮT BUỘC ĐÚNG</h3>
        <div className="mt-3 space-y-2" style={{ fontSize: '17px' }}>
          <p>• Cao 320mm. Chấp nhận từ <strong>317 đến 323mm</strong>.</p>
          <p>• Miệng tròn đều, đường kính 100mm ± 2mm.</p>
          <p>• Đứng vững trên mặt phẳng, không lắc.</p>
        </div>
      </div>

      {/* Tolerance: With range */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
        <h3 className="font-bold text-amber-800" style={{ fontSize: '17px' }}>🟡 ĐƯỢC PHÉP KHÁC MỘT CHÚT</h3>
        <div className="mt-3 space-y-2" style={{ fontSize: '17px' }}>
          <p>• Sắc men: nâu da lươn, cho phép sáng/tối hơn 1 bậc.</p>
          <p>• Độ cong thân: ≤2mm trên 100mm.</p>
        </div>
      </div>

      {/* Tolerance: Unique */}
      <div className="bg-green-50 border border-green-200 rounded-xl p-5">
        <h3 className="font-bold text-green-800" style={{ fontSize: '17px' }}>🟢 CHỖ NÀY MỖI CÁI MỘT KHÁC LÀ BÌNH THƯỜNG</h3>
        <div className="mt-3 space-y-2" style={{ fontSize: '17px' }}>
          <p>• Vân men chảy — mỗi cái khác nhau là đúng.</p>
          <p>• Dấu tay tạo hình — đặc trưng thủ công.</p>
        </div>
      </div>

      {/* Payout info */}
      <div className="bg-card border rounded-xl p-5">
        <h3 className="font-bold" style={{ fontSize: '17px' }}>💰 Tiền hộ nhận cho đơn này</h3>
        <div className="mt-3 space-y-2 text-sm">
          <div className="flex justify-between"><span>Ứng nguyên liệu</span><span className="font-medium">5,000,000đ</span></div>
          <div className="flex justify-between"><span>Sau nung đạt</span><span className="font-medium">18,000,000đ</span></div>
          <div className="flex justify-between"><span>Sau giao hàng</span><span className="font-medium">7,000,000đ</span></div>
          <div className="pt-2 border-t flex justify-between font-bold"><span>Tổng</span><span className="text-primary">30,000,000đ</span></div>
        </div>
      </div>

      {/* Accept button */}
      <button className="w-full h-14 bg-primary text-primary-foreground rounded-xl font-bold text-lg hover:bg-primary/90 transition-colors" style={{ minHeight: '48px', fontSize: '17px' }}>
        Tôi nhận làm đơn này
      </button>
    </div>
  );
}
