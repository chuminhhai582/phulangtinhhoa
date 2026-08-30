"use client";
import React from "react";
import { BarChart3, Download } from "lucide-react";

const reports = [
  { id: 1, name: "GMV & doanh thu nền tảng", desc: "GMV, doanh thu, % trên GMV, theo tháng/thị trường", icon: "📊", metric: "1,200,000,000đ", period: "Tháng 8/2026" },
  { id: 2, name: "Thu nhập hộ nghề", desc: "Tiền hộ đã xác nhận nhận đủ, theo hộ/tháng", icon: "💰", metric: "+28% so đường cơ sở", period: "Mục tiêu: +35%" },
  { id: 3, name: "Giá trị trên mỗi mẻ nung", desc: "SUM(giá trị SP đạt) / số mẻ nung theo hộ", icon: "🔥", metric: "15,200,000đ/mẻ", period: "Chỉ số cốt lõi" },
  { id: 4, name: "Chất lượng", desc: "Tỷ lệ lỗi theo hộ/loại/nguyên nhân, xu hướng", icon: "✅", metric: "4.8%", period: "Mục tiêu: giảm ≥15%" },
  { id: 5, name: "Giao hàng", desc: "% đủ & đúng hạn, số ngày trễ trung bình", icon: "🚚", metric: "92%", period: "Mục tiêu: ≥90%" },
  { id: 6, name: "Vỡ hỏng vận chuyển", desc: "% theo tuyến / loại bao gói / hộ", icon: "💔", metric: "2.1%", period: "Mục tiêu: <3%" },
  { id: 7, name: "Khách hàng", desc: "Tỷ lệ mua lại, mức tập trung, thời gian bán TB", icon: "🤝", metric: "Cảnh báo: 42%", period: "Ngưỡng: 35%" },
  { id: 8, name: "Tác động & môi trường", desc: "Số hộ, việc làm, người trẻ, hộ chiếu, nhiên liệu", icon: "🌱", metric: "25 hộ hoạt động", period: "Bảng XI.1 hồ sơ" },
];

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div><h2 className="text-2xl font-heading font-bold">Báo cáo</h2><p className="text-muted-foreground text-sm mt-1">8 báo cáo vận hành theo khung hồ sơ dự thi.</p></div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {reports.map((r) => (
          <div key={r.id} className="bg-card border rounded-xl p-6 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{r.icon}</span>
                <div>
                  <h3 className="font-semibold">{r.id}. {r.name}</h3>
                  <p className="text-sm text-muted-foreground mt-0.5">{r.desc}</p>
                </div>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <div>
                <div className="text-lg font-bold">{r.metric}</div>
                <div className="text-xs text-muted-foreground">{r.period}</div>
              </div>
              <div className="flex gap-2">
                <button className="h-8 px-3 text-xs border rounded-md flex items-center hover:bg-muted"><Download className="w-3 h-3 mr-1" />Excel</button>
                <button className="h-8 px-3 text-xs border rounded-md flex items-center hover:bg-muted"><Download className="w-3 h-3 mr-1" />PDF</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <p className="text-xs text-muted-foreground text-center">Số liệu tính đến 30/08/2026. Chỉ tiêu là mục tiêu quản trị, không phải kết quả đã kiểm toán.</p>
    </div>
  );
}
