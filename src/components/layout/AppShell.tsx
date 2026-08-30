"use client";

import React, { useState, useEffect } from "react";
import { Home, Inbox, User, Settings, Plus, Menu, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface MenuItem {
  name: string;
  icon: LucideIcon;
  href: string;
}

interface AppShellProps {
  children: React.ReactNode;
  userRole?: string; // Tạm thời để string, sẽ dùng Enum sau
  menuItems?: MenuItem[];
}

// Placeholder cho menu
const defaultMenuItems = [
  { name: "Hôm nay", icon: Home, href: "/tho" },
  { name: "Đơn", icon: Inbox, href: "/tho/don" },
  { name: "Lò", icon: User, href: "/tho/lo" },
  { name: "Tiền", icon: Settings, href: "/tho/tien" },
];

export function AppShell({ children, userRole = "artisan", menuItems = defaultMenuItems }: AppShellProps) {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex h-[100dvh] w-full bg-background overflow-hidden">
      {/* Desktop & Tablet Sidebar */}
      <aside className="hidden md:flex flex-col bg-card border-r transition-all duration-300 ease-in-out w-[64px] lg:w-[240px] hover:w-[240px] z-20 group">
        <div className="h-16 flex items-center px-4 border-b shrink-0">
          <div className="w-8 h-8 bg-primary rounded flex items-center justify-center text-primary-foreground font-bold">
            P
          </div>
          <span className="ml-3 font-heading font-semibold text-lg hidden lg:block group-hover:block whitespace-nowrap overflow-hidden">
            Phù Lãng
          </span>
        </div>
        
        <nav className="flex-1 py-4 flex flex-col gap-2 px-2 overflow-y-auto">
          {menuItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="flex items-center h-10 px-3 rounded-md hover:bg-accent hover:text-accent-foreground text-muted-foreground transition-colors"
            >
              <item.icon className="w-5 h-5 shrink-0" />
              <span className="ml-3 font-medium hidden lg:block group-hover:block whitespace-nowrap overflow-hidden">
                {item.name}
              </span>
            </a>
          ))}
        </nav>
        
        <div className="p-4 border-t shrink-0 flex items-center">
          <div className="w-8 h-8 rounded-full bg-muted shrink-0" />
          <div className="ml-3 hidden lg:block group-hover:block whitespace-nowrap overflow-hidden">
            <p className="text-sm font-medium leading-none">Người dùng</p>
            <p className="text-xs text-muted-foreground mt-1">{userRole}</p>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header (Mobile only) */}
        <header className="h-14 border-b flex items-center px-4 md:hidden shrink-0 bg-card">
          <Menu className="w-6 h-6 mr-3 text-muted-foreground" />
          <h1 className="font-heading font-semibold text-lg">Phù Lãng Tinh Hoa</h1>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 pb-24 md:pb-6 relative scroll-smooth">
          {children}
        </div>
      </main>

      {/* Mobile Bottom Navigation (env safe-area-inset-bottom) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-card border-t flex items-center justify-around px-2 z-50 pb-[env(safe-area-inset-bottom)]">
        {menuItems.slice(0, 2).map((item) => (
          <a key={item.href} href={item.href} className="flex flex-col items-center justify-center w-16 h-full text-muted-foreground hover:text-primary">
            <item.icon className="w-5 h-5 mb-1" />
            <span className="text-[10px] font-medium leading-none">{item.name}</span>
          </a>
        ))}
        
        {/* Nút Thêm (FAB) */}
        <div className="relative -top-5">
          <button className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground shadow-lg active:scale-95 transition-transform">
            <Plus className="w-6 h-6" />
          </button>
        </div>

        {menuItems.slice(2, 4).map((item) => (
          <a key={item.href} href={item.href} className="flex flex-col items-center justify-center w-16 h-full text-muted-foreground hover:text-primary">
            <item.icon className="w-5 h-5 mb-1" />
            <span className="text-[10px] font-medium leading-none">{item.name}</span>
          </a>
        ))}
      </nav>
    </div>
  );
}
