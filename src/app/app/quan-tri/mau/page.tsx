"use client";
import React from "react";
import { FileSignature, Edit3, Copy } from "lucide-react";

const templates = [
  { name: "Hợp đồng mua bán", type: "Chứng từ", lang: "VI+EN", lastEdit: "20/08/2026", vars: 12 },
  { name: "Hóa đơn thương mại", type: "Chứng từ", lang: "EN", lastEdit: "18/08/2026", vars: 15 },
  { name: "Phiếu đóng gói", type: "Chứng từ", lang: "EN", lastEdit: "15/08/2026", vars: 8 },
  { name: "Xác nhận đơn hàng", type: "Email", lang: "VI+EN", lastEdit: "22/08/2026", vars: 6 },
  { name: "Nhắc thanh toán", type: "Email", lang: "VI+EN", lastEdit: "10/08/2026", vars: 5 },
  { name: "Báo cáo chất lượng", type: "Báo cáo", lang: "EN", lastEdit: "25/08/2026", vars: 20 },
  { name: "Hộ chiếu số", type: "Hộ chiếu", lang: "VI+EN", lastEdit: "28/08/2026", vars: 18 },
];

export default function TemplatesPage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2"><FileSignature className="w-5 h-5 text-primary" /><span className="text-sm text-muted-foreground">{templates.length} mẫu chứng từ & email</span></div>
      <div className="space-y-2">
        {templates.map((t, i) => (
          <div key={i} className="flex items-center justify-between p-4 bg-card border rounded-xl hover:bg-muted/50 transition-colors">
            <div>
              <div className="flex items-center gap-3">
                <span className="font-medium">{t.name}</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-muted">{t.type}</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-blue-50 text-blue-600">{t.lang}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Sửa: {t.lastEdit} · {t.vars} biến</p>
            </div>
            <div className="flex gap-1">
              <button className="p-2 rounded-md hover:bg-muted"><Edit3 className="w-4 h-4" /></button>
              <button className="p-2 rounded-md hover:bg-muted"><Copy className="w-4 h-4" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
