"use client";

import React from "react";
import { TabRouter } from "@/components/adaptive/TabRouter";
import { ArrowLeft, Layers, Shield, Key, Package, DollarSign } from "lucide-react";
import Link from "next/link";

export default function DesignDetailPage({ params }: { params: { id: string } }) {
  const tabs = [
    { label: "Phiên bản", href: `/app/thiet-ke/${params.id}/phien-ban`, icon: <Layers className="w-4 h-4" /> },
    { label: "Dung sai", href: `/app/thiet-ke/${params.id}/dung-sai`, icon: <Shield className="w-4 h-4" /> },
    { label: "Quyền", href: `/app/thiet-ke/${params.id}/quyen`, icon: <Key className="w-4 h-4" /> },
    { label: "Bao gói", href: `/app/thiet-ke/${params.id}/bao-goi`, icon: <Package className="w-4 h-4" /> },
    { label: "Chi phí", href: `/app/thiet-ke/${params.id}/chi-phi`, icon: <DollarSign className="w-4 h-4" /> },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/app/thiet-ke" className="p-2 -ml-2 rounded-full hover:bg-muted text-muted-foreground transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-heading font-bold">Bình Thu Vàng</h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">Đã duyệt</span>
            <span className="text-xs text-muted-foreground">v3</span>
          </div>
          <p className="text-muted-foreground text-sm mt-1">Mã: {params.id} · Bộ sưu tập: Thu Lãng · Loại: Bình hoa</p>
        </div>
      </div>

      <div className="bg-card border rounded-xl overflow-hidden shadow-sm">
        <TabRouter tabs={tabs} basePath={`/app/thiet-ke/${params.id}`}>
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4">Các phiên bản</h3>
            <div className="space-y-3">
              {[3, 2, 1].map(v => (
                <div key={v} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center text-2xl opacity-30">🏺</div>
                    <div>
                      <div className="font-medium">Phiên bản {v}</div>
                      <div className="text-sm text-muted-foreground">320 × 180mm · 1200g · Đất Phù Lãng · Men da lươn</div>
                      {v === 3 && <span className="text-xs text-primary font-medium">Phiên bản hiện tại</span>}
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">{v === 3 ? "15/07/2026" : v === 2 ? "01/06/2026" : "10/05/2026"}</span>
                </div>
              ))}
            </div>
          </div>
        </TabRouter>
      </div>
    </div>
  );
}
