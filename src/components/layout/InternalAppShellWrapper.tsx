"use client";

import React from "react";
import { AppShell } from "@/components/layout/AppShell";
import { LayoutDashboard, Users, Map, CheckSquare, FileText, Settings, ShieldAlert } from "lucide-react";

const internalMenuItems = [
  { name: "Tổng quan", icon: LayoutDashboard, href: "/app" },
  { name: "Đơn hàng", icon: FileText, href: "/app/don-hang" },
  { name: "Hộ nghề", icon: Map, href: "/app/ho-nghe" },
  { name: "Chất lượng", icon: CheckSquare, href: "/app/chat-luong" },
  { name: "Khách hàng", icon: Users, href: "/app/khach-hang" },
  { name: "Yêu cầu", icon: ShieldAlert, href: "/app/yeu-cau" },
  { name: "Quản trị", icon: Settings, href: "/app/quan-tri" },
];

export function InternalAppShellWrapper({ children }: { children: React.ReactNode }) {
  return (
    <AppShell userRole="Điều phối viên" menuItems={internalMenuItems}>
      {children}
    </AppShell>
  );
}
