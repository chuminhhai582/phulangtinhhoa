"use client";
import React from "react";
import { ArrowLeft, Flame, Thermometer, Clock } from "lucide-react";
import Link from "next/link";

export default function KilnDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-4 max-w-lg mx-auto">
      <Link href="/tho/lo" className="flex items-center gap-2 text-muted-foreground" style={{ minHeight: '48px' }}><ArrowLeft className="w-5 h-5" /><span style={{ fontSize: '17px' }}>Quay lại</span></Link>

      <div className="bg-orange-50 border border-orange-200 rounded-xl p-5 text-center">
        <Flame className="w-10 h-10 text-orange-600 mx-auto" />
        <h2 className="text-xl font-bold text-orange-800 mt-2" style={{ fontSize: '20px' }}>Lô {params.id}</h2>
        <p className="text-orange-600 mt-1 font-medium" style={{ fontSize: '17px' }}>Đang nung — giờ thứ 14</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-card border rounded-xl p-4 text-center"><Thermometer className="w-5 h-5 mx-auto text-red-500" /><p className="text-2xl font-bold mt-1">1200°C</p><p className="text-xs text-muted-foreground">Nhiệt độ mục tiêu</p></div>
        <div className="bg-card border rounded-xl p-4 text-center"><Clock className="w-5 h-5 mx-auto text-blue-500" /><p className="text-2xl font-bold mt-1">14/36h</p><p className="text-xs text-muted-foreground">Thời gian nung</p></div>
      </div>

      <div className="bg-card border rounded-xl p-5">
        <h3 className="font-bold" style={{ fontSize: '17px' }}>Sản phẩm trong lô</h3>
        <div className="mt-3 space-y-2">
          <div className="flex justify-between text-sm p-2 border rounded-lg"><span>Bình Thu Vàng × 6</span><span className="text-muted-foreground">Đơn PL-O-2026-007</span></div>
          <div className="flex justify-between text-sm p-2 border rounded-lg"><span>Bình Thu Vàng × 6</span><span className="text-muted-foreground">Đơn PL-O-2026-007</span></div>
          <div className="flex justify-between text-sm p-2 border rounded-lg"><span>SP riêng × 2</span><span className="text-muted-foreground">Hộ tự sản xuất</span></div>
        </div>
      </div>

      <button className="w-full h-14 bg-orange-600 text-white rounded-xl font-bold text-lg hover:bg-orange-700 transition-colors" style={{ minHeight: '48px', fontSize: '17px' }}>
        Ghi kết thúc nung
      </button>
    </div>
  );
}
