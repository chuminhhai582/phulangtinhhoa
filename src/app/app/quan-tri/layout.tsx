"use client";

import React from "react";
import { TabRouter } from "@/components/adaptive/TabRouter";
import { Users, Tags, Settings2, Image as ImageIcon, Globe, FileSignature, Clock, FileText } from "lucide-react";

export default function CMSLayout({ children }: { children: React.ReactNode }) {
  const cmsTabs = [
    { label: "Người dùng", href: "/app/quan-tri/nguoi-dung", icon: <Users className="w-4 h-4" /> },
    { label: "Danh mục", href: "/app/quan-tri/danh-muc", icon: <Tags className="w-4 h-4" /> },
    { label: "Bản đồ", href: "/app/quan-tri/ban-do", icon: <Globe className="w-4 h-4" /> },
    { label: "Cấu hình", href: "/app/quan-tri/cau-hinh", icon: <Settings2 className="w-4 h-4" /> },
    { label: "Media", href: "/app/quan-tri/media", icon: <ImageIcon className="w-4 h-4" /> },
    { label: "Nội dung", href: "/app/quan-tri/noi-dung", icon: <FileText className="w-4 h-4" /> },
    { label: "Bản dịch", href: "/app/quan-tri/ban-dich", icon: <FileText className="w-4 h-4" /> },
    { label: "Mẫu", href: "/app/quan-tri/mau", icon: <FileSignature className="w-4 h-4" /> },
    { label: "Duyệt", href: "/app/quan-tri/duyet", icon: <Clock className="w-4 h-4" /> },
    { label: "Nhật ký", href: "/app/quan-tri/nhat-ky", icon: <Clock className="w-4 h-4" /> },
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
