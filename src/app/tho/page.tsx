"use client";
import React from "react";
import Link from "next/link";
import { Flame, Camera, ChevronRight, WifiOff, Settings } from "lucide-react";

export default function ArtisanTodayPage() {
  return (
    <div className="space-y-4 max-w-lg mx-auto">
      {/* Greeting */}
      <div className="bg-card border rounded-xl p-5">
        <h2 className="text-xl font-bold" style={{ fontSize: '20px' }}>Chào bác Tới · Hộ PL-H-003</h2>
        <Link href="/tho/quan-ly" className="mt-2 inline-flex items-center text-sm text-primary font-medium"><Settings className="w-4 h-4 mr-1" />Quản lý hộ</Link>
      </div>

      {/* Offline queue warning */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3">
        <WifiOff className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div><p className="text-sm font-medium text-amber-800">2 việc chưa gửi được (mất mạng)</p><Link href="/tho/dong-bo" className="text-xs text-amber-600 hover:underline">Xem hàng đợi →</Link></div>
      </div>

      {/* Active kiln */}
      <div className="bg-orange-50 border border-orange-200 rounded-xl p-5">
        <div className="flex items-center gap-2 mb-2"><Flame className="w-5 h-5 text-orange-600" /><h3 className="font-bold text-orange-800" style={{ fontSize: '17px' }}>LÒ ĐANG NUNG</h3></div>
        <p className="text-sm text-orange-700">Lô PL-B-2026-0142 · giờ thứ 14</p>
        <Link href="/tho/lo/PL-B-2026-0142" className="mt-3 w-full h-12 bg-orange-600 text-white rounded-xl flex items-center justify-center font-medium text-base hover:bg-orange-700 transition-colors" style={{ minHeight: '48px' }}>
          Ghi kết thúc nung
        </Link>
      </div>

      {/* Today's tasks */}
      <div className="bg-card border rounded-xl p-5">
        <h3 className="font-bold mb-3" style={{ fontSize: '17px' }}>📦 VIỆC HÔM NAY</h3>
        <div className="space-y-3">
          <Link href="/tho/kiem-tra/batch-0143" className="flex items-center justify-between p-3 border rounded-xl hover:bg-muted/50 transition-colors" style={{ minHeight: '48px' }}>
            <div className="flex items-center gap-3"><Camera className="w-5 h-5 text-primary" /><div><p className="font-medium text-sm">Chụp ảnh trước nung — lô 0143</p></div></div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </Link>
          <div className="p-3 border rounded-xl" style={{ minHeight: '48px' }}>
            <p className="font-medium text-sm">Đơn PL-O-2026-007: còn 12 cái</p>
            <p className="text-xs text-muted-foreground mt-1">Hạn: 14/09 (còn 15 ngày)</p>
          </div>
        </div>
      </div>

      {/* Money */}
      <Link href="/tho/tien" className="block bg-green-50 border border-green-200 rounded-xl p-5 hover:bg-green-100/50 transition-colors">
        <h3 className="font-bold text-green-800" style={{ fontSize: '17px' }}>💰 SẮP NHẬN</h3>
        <p className="text-2xl font-bold text-green-700 mt-1">18.000.000đ</p>
        <p className="text-sm text-green-600 mt-1">sau khi nung đạt</p>
      </Link>
    </div>
  );
}
