"use client";

import React from "react";
import { TabRouter } from "@/components/adaptive/TabRouter";
import { ArrowLeft, LayoutDashboard, CheckSquare, DollarSign, Users, AlertCircle } from "lucide-react";
import Link from "next/link";

export default function OrderDetailPage({ params }: { params: { code: string } }) {
  const tabs = [
    { label: "Tổng quan", href: `/app/don-hang/${params.code}/tong-quan`, icon: <LayoutDashboard className="w-4 h-4" /> },
    { label: "Phân công & Lô", href: `/app/don-hang/${params.code}/phan-cong`, icon: <Users className="w-4 h-4" /> },
    { label: "Chất lượng", href: `/app/don-hang/${params.code}/chat-luong`, icon: <CheckSquare className="w-4 h-4" /> },
    { label: "Thanh toán", href: `/app/don-hang/${params.code}/thanh-toan`, icon: <DollarSign className="w-4 h-4" /> },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href="/app/don-hang" className="p-2 -ml-2 rounded-full hover:bg-muted text-muted-foreground transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-heading font-bold">{params.code}</h2>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-700">Đang sản xuất</span>
            </div>
            <p className="text-muted-foreground text-sm mt-1">Khách hàng: ACME Corp • Thiết kế: Bình hoa Mùa Xuân</p>
          </div>
        </div>
        
        <div className="flex gap-2">
          <button className="px-4 py-2 border rounded-md text-sm font-medium hover:bg-accent transition-colors">
            Hủy đơn hàng
          </button>
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors">
            Chuyển trạng thái
          </button>
        </div>
      </div>

      {/* Cổng chặn G3 */}
      <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex gap-3 text-red-800 shadow-sm">
        <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-red-600" />
        <div className="text-sm">
          <p className="font-semibold mb-1">Cổng chặn G3: Vi phạm quy tắc thanh toán</p>
          <p>Chưa nhận đủ tiền đặt cọc (yêu cầu tối thiểu 40%). Không được phép xuất nguyên liệu và đặt lịch lò cho các hộ sản xuất.</p>
        </div>
      </div>

      <div className="bg-card border rounded-xl overflow-hidden shadow-sm">
        <TabRouter tabs={tabs} basePath={`/app/don-hang/${params.code}`}>
          <div className="p-6 min-h-[400px]">
            {/* Nội dung mẫu cho Tab Tổng quan */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Thông tin sản xuất</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-muted/50 rounded-lg border">
                      <p className="text-sm text-muted-foreground mb-1">Tổng số lượng đặt</p>
                      <p className="text-2xl font-bold">300 <span className="text-sm font-normal text-muted-foreground">sản phẩm</span></p>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-lg border">
                      <p className="text-sm text-muted-foreground mb-1">Dự phòng bù hao</p>
                      <p className="text-2xl font-bold">24 <span className="text-sm font-normal text-muted-foreground">sản phẩm</span></p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Tiến độ tổng thể</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm font-medium">
                        <span>Tạo hình (150/324)</span>
                        <span>46%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: '46%' }}></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm font-medium">
                        <span>Nung (0/324)</span>
                        <span>0%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-orange-500 h-2 rounded-full" style={{ width: '0%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Các mốc quan trọng</h3>
                  <div className="space-y-4 relative before:absolute before:inset-0 before:ml-2.5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
                    <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                      <div className="flex items-center justify-center w-5 h-5 rounded-full border-2 border-primary bg-background shrink-0 ml-0 md:ml-auto md:mr-0 z-10"></div>
                      <div className="w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] p-3 rounded-lg border bg-card shadow-sm ml-4 md:ml-0 md:mr-6">
                        <div className="flex justify-between items-center mb-1">
                          <h4 className="font-semibold text-sm text-primary">Ký hợp đồng</h4>
                        </div>
                        <p className="text-xs text-muted-foreground">20/10/2024</p>
                      </div>
                    </div>
                    <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                      <div className="flex items-center justify-center w-5 h-5 rounded-full border-2 border-muted-foreground bg-background shrink-0 ml-0 md:ml-auto md:mr-0 z-10"></div>
                      <div className="w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] p-3 rounded-lg border border-dashed bg-muted/30 ml-4 md:ml-0 md:mr-6">
                        <div className="flex justify-between items-center mb-1">
                          <h4 className="font-semibold text-sm text-muted-foreground">Hạn chót giao hàng</h4>
                        </div>
                        <p className="text-xs text-muted-foreground">15/12/2024</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabRouter>
      </div>
    </div>
  );
}
