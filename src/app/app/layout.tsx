import React from "react";
import { AppShell } from "@/components/layout/AppShell";
import { LayoutDashboard, Users, Map, CheckSquare, FileText, Settings, ShieldAlert } from "lucide-react";

export const metadata = {
  title: "Vận hành nội bộ | Phù Lãng Tinh Hoa",
};

const internalMenuItems = [
  { name: "Tổng quan", icon: LayoutDashboard, href: "/app" },
  { name: "Đơn hàng", icon: FileText, href: "/app/don-hang" },
  { name: "Hộ nghề", icon: Map, href: "/app/ho-nghe" },
  { name: "Chất lượng", icon: CheckSquare, href: "/app/chat-luong" },
  { name: "Khách hàng", icon: Users, href: "/app/khach-hang" },
  { name: "Yêu cầu", icon: ShieldAlert, href: "/app/yeu-cau" },
  { name: "Quản trị", icon: Settings, href: "/app/quan-tri" },
];

export default function InternalAppLayout({ children }: { children: React.ReactNode }) {
  // TODO: Get real user role from Supabase auth session
  return (
    <AppShell userRole="Điều phối viên" menuItems={internalMenuItems}>
      {children}
    </AppShell>
  );
}
