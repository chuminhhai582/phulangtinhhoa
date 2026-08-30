"use client";

import React from "react";
import { AppShell } from "@/components/layout/AppShell";
import { Home, FileText, Flame, DollarSign } from "lucide-react";

const artisanMenuItems = [
  { name: "Hôm nay", icon: Home, href: "/tho" },
  { name: "Đơn", icon: FileText, href: "/tho/don" },
  { name: "Lò", icon: Flame, href: "/tho/lo" },
  { name: "Tiền", icon: DollarSign, href: "/tho/tien" },
];

export default function ArtisanLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppShell userRole="Hộ nghề" menuItems={artisanMenuItems}>
      {children}
    </AppShell>
  );
}
