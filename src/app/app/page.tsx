"use client";

import React from "react";
import { AdaptiveTable } from "@/components/adaptive/AdaptiveTable";
import { TrendingUp, AlertTriangle, CheckCircle, Package } from "lucide-react";

export default function DashboardPage() {
  // Mock data for dashboard
  const metrics = [
    { label: "Đơn hàng đang chạy", value: "12", icon: Package, color: "text-blue-500", bg: "bg-blue-500/10" },
    { label: "Tỷ lệ giao đúng hạn", value: "95%", icon: TrendingUp, color: "text-green-500", bg: "bg-green-500/10" },
    { label: "Sản phẩm vỡ hỏng", value: "3.2%", icon: AlertTriangle, color: "text-amber-500", bg: "bg-amber-500/10" },
    { label: "Lô hàng sẵn sàng xuất", value: "4", icon: CheckCircle, color: "text-emerald-500", bg: "bg-emerald-500/10" },
  ];

  const actionItems = [
    { id: "1", task: "Duyệt mẫu dự án ACME", priority: "Cao", time: "2 giờ trước" },
    { id: "2", task: "Xử lý hàng không phù hợp #NC-089", priority: "Cao", time: "4 giờ trước" },
    { id: "3", task: "Phân công hộ nghề cho đơn PL-2024-042", priority: "Trung bình", time: "1 ngày trước" },
  ];

  const columns = [
    { key: "task", label: "Tên công việc" },
    { 
      key: "priority", 
      label: "Mức độ",
      render: (val: any) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${val === 'Cao' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'}`}>
          {val}
        </span>
      )
    },
    { key: "time", label: "Thời gian" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-heading font-bold">Bảng điều khiển</h2>
          <p className="text-muted-foreground text-sm mt-1">Tổng quan tình hình mạng lưới sản xuất hôm nay.</p>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, i) => (
          <div key={i} className="bg-card border rounded-xl p-5 flex items-start gap-4">
            <div className={`p-3 rounded-lg ${metric.bg} ${metric.color}`}>
              <metric.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground font-medium">{metric.label}</p>
              <h3 className="text-2xl font-bold mt-1">{metric.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-lg font-semibold">Việc cần xử lý ngay</h3>
          <div className="bg-card border rounded-xl shadow-sm overflow-hidden">
            <AdaptiveTable 
              columns={columns} 
              data={actionItems} 
              keyField="id" 
              onRowClick={(row) => console.log('Clicked', row)}
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Cảnh báo hệ thống</h3>
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex gap-3 text-red-700">
            <AlertTriangle className="w-5 h-5 shrink-0" />
            <div className="text-sm">
              <p className="font-semibold mb-1">Mức tập trung khách hàng cao</p>
              <p>Khách hàng ACME Corp đang chiếm 42% tổng doanh thu (vượt ngưỡng cảnh báo 35%).</p>
            </div>
          </div>
          
          <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-4 flex gap-3 text-orange-700">
            <AlertTriangle className="w-5 h-5 shrink-0" />
            <div className="text-sm">
              <p className="font-semibold mb-1">Thiếu hộ nghề đạt chuẩn</p>
              <p>Chỉ có 2 hộ đáp ứng kỹ thuật Vuốt tay chập chiếc cho kích thước lớn.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
