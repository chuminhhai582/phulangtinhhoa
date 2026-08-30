"use client";
import React from "react";
import { ArrowLeft, AlertTriangle, Send, FileText } from "lucide-react";
import Link from "next/link";

export default function QuoteBuilderPage({ params }: { params: { id: string } }) {
  const lines = [
    { design: "Bình Thu Vàng v3", qty: 100, unitCost: 350000, unitPrice: 55, lead: 35 },
    { design: "Ấm Trà Phù Lãng v2", qty: 100, unitCost: 180000, unitPrice: 30, lead: 25 },
  ];
  const designFee = 800; const coordFee = 1200; const packFee = 600; const logisticsEst = 1500; const txFeePct = 8;
  const subtotalGoods = lines.reduce((s, l) => s + l.qty * l.unitPrice, 0);
  const subtotal = subtotalGoods + designFee + coordFee + packFee + logisticsEst;
  const txFee = Math.round(subtotal * txFeePct / 100);
  const total = subtotal + txFee;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/app/bao-gia" className="p-2 -ml-2 rounded-full hover:bg-muted text-muted-foreground"><ArrowLeft className="w-5 h-5" /></Link>
        <div>
          <h2 className="text-2xl font-heading font-bold">Báo giá: {params.id}</h2>
          <p className="text-muted-foreground text-sm mt-1">ACME Corp · USD · FOB Hải Phòng · Hiệu lực: 30 ngày</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-card border rounded-xl p-6 shadow-sm">
          <h3 className="font-semibold mb-4">Cấu trúc giá</h3>
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-2">Hàng hóa</h4>
              {lines.map((l, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b text-sm">
                  <span>{l.design} × {l.qty}</span>
                  <span className="font-medium">${(l.qty * l.unitPrice).toLocaleString()}</span>
                </div>
              ))}
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Phí nghiên cứu & đồng thiết kế</span><span>${designFee}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Phí điều phối sản xuất & chất lượng</span><span>${coordFee}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Phí bao gói & hồ sơ</span><span>${packFee}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Vận chuyển ước tính (bên thứ ba)</span><span>${logisticsEst}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Phí giao dịch ({txFeePct}%)</span><span>${txFee}</span></div>
            </div>
            <div className="pt-4 border-t flex justify-between text-lg font-bold">
              <span>Tổng cộng</span><span className="text-primary">${total.toLocaleString()} USD</span>
            </div>
          </div>
          <div className="flex gap-3 mt-6">
            <button className="h-10 px-4 bg-primary text-primary-foreground rounded-md flex items-center text-sm font-medium hover:bg-primary/90"><Send className="w-4 h-4 mr-2" />Gửi báo giá</button>
            <button className="h-10 px-4 border rounded-md flex items-center text-sm font-medium hover:bg-muted"><FileText className="w-4 h-4 mr-2" />Xuất PDF</button>
          </div>
        </div>

        <div className="bg-card border rounded-xl p-6 shadow-sm">
          <h3 className="font-semibold mb-4">Kiểm tra lãi đóng góp</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Giá vốn hộ nghề</span><span>${(lines.reduce((s, l) => s + l.qty * l.unitCost / 24000, 0)).toFixed(0)}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Chi phí bên ngoài (est)</span><span>$750</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Doanh thu nền tảng</span><span>${(coordFee + txFee).toLocaleString()}</span></div>
            <div className="pt-3 border-t flex justify-between font-medium">
              <span>Lãi đóng góp</span>
              <span className="text-green-600">$1,950</span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-4">Lãi đóng góp dương — có thể gửi báo giá.</p>
        </div>
      </div>
    </div>
  );
}
