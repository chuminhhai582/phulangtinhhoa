"use client";

import React from "react";
import { TabRouter } from "@/components/adaptive/TabRouter";
import { Users, Tags, Settings2, Image as ImageIcon } from "lucide-react";

export default function CMSLayout({ children }: { children: React.ReactNode }) {
  const cmsTabs = [
    { label: "Người dùng", href: "/app/quan-tri/nguoi-dung", icon: <Users className="w-4 h-4" /> },
    { label: "Danh mục", href: "/app/quan-tri/danh-muc", icon: <Tags className="w-4 h-4" /> },
    { label: "Cấu hình", href: "/app/quan-tri/cau-hinh", icon: <Settings2 className="w-4 h-4" /> },
    { label: "Media", href: "/app/quan-tri/media", icon: <ImageIcon className="w-4 h-4" /> },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-heading font-bold">Quản trị hệ thống</h2>
        <p className="text-muted-foreground text-sm mt-1">CMS lõi quản lý dữ liệu nền tảng.</p>
      </div>
      
      <TabRouter tabs={cmsTabs} basePath="/app/quan-tri">
        <div className="pt-4">
          {children}
        </div>
      </TabRouter>
    </div>
  );
}
