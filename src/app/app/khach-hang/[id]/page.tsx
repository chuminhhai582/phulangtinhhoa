"use client";
import React from "react";
import { ArrowLeft, AlertTriangle } from "lucide-react";
import Link from "next/link";

export default function CustomerDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/app/khach-hang" className="p-2 -ml-2 rounded-full hover:bg-muted text-muted-foreground"><ArrowLeft className="w-5 h-5" /></Link>
        <div>
          <h2 className="text-2xl font-heading font-bold">ACME Corp</h2>
          <p className="text-muted-foreground text-sm mt-1">Mã: {params.id} · Singapore · Kiến trúc sư</p>
        </div>
      </div>

      {/* Concentration warning */}
      <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex gap-3 text-red-700">
        <AlertTriangle className="w-5 h-5 shrink-0" />
        <p className="text-sm"><strong>Cảnh báo tập trung:</strong> Khách hàng này chiếm 42% tổng doanh thu (vượt ngưỡng 35%).</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-card border rounded-xl p-6 shadow-sm">
            <h3 className="font-semibold mb-4">Thông tin khách hàng</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div><span className="text-muted-foreground">Công ty</span><p className="font-medium mt-0.5">ACME Corp Pte Ltd</p></div>
              <div><span className="text-muted-foreground">Liên hệ</span><p className="font-medium mt-0.5">John Smith</p></div>
              <div><span className="text-muted-foreground">Quốc gia</span><p className="font-medium mt-0.5">Singapore</p></div>
              <div><span className="text-muted-foreground">Tiền tệ</span><p className="font-medium mt-0.5">USD</p></div>
              <div><span className="text-muted-foreground">Incoterm mặc định</span><p className="font-medium mt-0.5">FOB Hải Phòng</p></div>
              <div><span className="text-muted-foreground">Điều kiện thanh toán</span><p className="font-medium mt-0.5">T/T 40/60</p></div>
            </div>
          </div>

          <div className="bg-card border rounded-xl p-6 shadow-sm mt-6">
            <h3 className="font-semibold mb-4">Lịch sử đơn hàng</h3>
            <div className="space-y-3">
              {["PL-O-2026-007", "PL-O-2026-004", "PL-O-2025-015"].map((code, i) => (
                <Link key={i} href={`/app/don-hang/${code}`} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div><span className="font-medium text-primary text-sm">{code}</span><span className="text-sm text-muted-foreground ml-3">{i === 0 ? 'Đang sản xuất' : i === 1 ? 'Đã giao' : 'Đã đóng'}</span></div>
                  <span className="text-sm text-muted-foreground">{i === 0 ? '150,000,000đ' : i === 1 ? '300,000,000đ' : '200,000,000đ'}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-card border rounded-xl p-6 shadow-sm">
            <h3 className="font-semibold mb-4">Chỉ số</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Tổng đơn hàng</span><span className="font-medium">5</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Tổng doanh thu</span><span className="font-medium">750,000,000đ</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Tỷ lệ doanh thu</span><span className="font-bold text-red-600">42%</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Tỷ lệ mua lại</span><span className="font-medium text-green-600">80%</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
