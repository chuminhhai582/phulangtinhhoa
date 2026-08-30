"use client";

import React from "react";
import { AppShell } from "@/components/layout/AppShell";
import { LayoutDashboard, Users, Map, CheckSquare, FileText, Settings, ShieldAlert, Palette, Calculator, ClipboardList, BarChart3, DollarSign, CalendarDays, Ship, FolderOpen } from "lucide-react";

const internalMenuItems = [
  { name: "Tổng quan", icon: LayoutDashboard, href: "/app" },
  { name: "Đơn hàng", icon: FileText, href: "/app/don-hang" },
  { name: "Hộ nghề", icon: Map, href: "/app/ho-nghe" },
  { name: "Thiết kế", icon: Palette, href: "/app/thiet-ke" },
  { name: "Chất lượng", icon: CheckSquare, href: "/app/chat-luong" },
  { name: "Khách hàng", icon: Users, href: "/app/khach-hang" },
  { name: "Yêu cầu", icon: ShieldAlert, href: "/app/yeu-cau" },
  { name: "Báo giá", icon: Calculator, href: "/app/bao-gia" },
  { name: "Kiểm chứng", icon: ClipboardList, href: "/app/kiem-chung" },
  { name: "Bộ sưu tập", icon: FolderOpen, href: "/app/bo-suu-tap" },
  { name: "Lịch lò", icon: CalendarDays, href: "/app/lich-lo" },
  { name: "Xuất khẩu", icon: Ship, href: "/app/xuat-khau" },
  { name: "Tài chính", icon: DollarSign, href: "/app/tai-chinh" },
  { name: "Báo cáo", icon: BarChart3, href: "/app/bao-cao" },
  { name: "Quản trị", icon: Settings, href: "/app/quan-tri" },
];

export function InternalAppShellWrapper({ children }: { children: React.ReactNode }) {
  return (
    <AppShell userRole="Điều phối viên" menuItems={internalMenuItems}>
      {children}
    </AppShell>
  );
}
