"use client";
import React from "react";
import { ArrowLeft, CheckCircle2, Circle, AlertCircle } from "lucide-react";
import Link from "next/link";

const checklist = [
  { doc: "Hợp đồng mua bán", status: "done", file: "contract.pdf" },
  { doc: "Hóa đơn thương mại", status: "done", file: "invoice.pdf" },
  { doc: "Phiếu đóng gói", status: "done", file: "packing_list.pdf" },
  { doc: "Chứng từ vận tải (B/L)", status: "pending", file: null },
  { doc: "Bảo hiểm hàng hóa", status: "pending", file: null },
  { doc: "C/O (Giấy chứng nhận xuất xứ)", status: "pending", file: null },
  { doc: "Hồ sơ chất lượng", status: "done", file: "qc_report.pdf" },
  { doc: "Hướng dẫn xử lý sự cố", status: "done", file: "handling.pdf" },
];

export default function ExportDetailPage({ params }: { params: { orderId: string } }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/app/xuat-khau" className="p-2 -ml-2 rounded-full hover:bg-muted text-muted-foreground"><ArrowLeft className="w-5 h-5" /></Link>
        <div>
          <h2 className="text-2xl font-heading font-bold">Xuất khẩu: {params.orderId}</h2>
          <p className="text-muted-foreground text-sm mt-1">ACME Corp · Singapore · FOB · ETD: 15/10/2026</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-card border rounded-xl p-6 shadow-sm">
            <h3 className="font-semibold mb-4">Bảng kiểm chứng từ (8 mục)</h3>
            <div className="space-y-3">
              {checklist.map((item, i) => (
                <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    {item.status === 'done' ? <CheckCircle2 className="w-5 h-5 text-green-500" /> : <Circle className="w-5 h-5 text-muted-foreground" />}
                    <span className={item.status === 'done' ? '' : 'text-muted-foreground'}>{item.doc}</span>
                  </div>
                  {item.file ? <span className="text-xs text-primary cursor-pointer hover:underline">{item.file}</span> : <span className="text-xs text-muted-foreground">Chưa tải lên</span>}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card border rounded-xl p-6 shadow-sm mt-6">
            <h3 className="font-semibold mb-4">Mã HS</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div><span className="text-muted-foreground">Mã HS</span><p className="font-medium mt-0.5">6914.10</p></div>
              <div>
                <span className="text-muted-foreground">Đơn vị đã xác nhận</span>
                <div className="flex items-center gap-2 mt-0.5">
                  <AlertCircle className="w-4 h-4 text-amber-500" />
                  <span className="text-amber-600 font-medium">Chưa xác nhận</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Cổng G6 chặn nếu chưa có người xác nhận mã HS.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-card border rounded-xl p-6 shadow-sm h-fit">
          <h3 className="font-semibold mb-4">Tiến độ</h3>
          <div className="text-center mb-4">
            <div className="text-4xl font-bold text-primary">5/8</div>
            <p className="text-sm text-muted-foreground">chứng từ hoàn tất</p>
          </div>
          <div className="h-3 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full" style={{ width: '62.5%' }} />
          </div>
        </div>
      </div>
    </div>
  );
}
