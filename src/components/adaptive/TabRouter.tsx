"use client";

import React, { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import { MasterDetail } from "./MasterDetail";
import Link from "next/link";
import { usePathname } from "next/navigation";

/* ────────────────────────────────────────────
 * TabItem: Tab có href → điều hướng URL
 * SectionTabItem: Tab có id + content → nội dung tại chỗ
 * ──────────────────────────────────────────── */

interface TabItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
}

interface SectionTabItem {
  id: string;
  label: string;
  content: React.ReactNode;
}

/* ────────────────────────────────────────────
 * TabRouter — Tab điều hướng URL
 * Dùng cho layout: /app/quan-tri/*, chi tiết đơn hàng...
 * ──────────────────────────────────────────── */

export interface TabRouterProps {
  tabs: TabItem[];
  basePath?: string;
  children: React.ReactNode;
}

export function TabRouter({ tabs, basePath, children }: TabRouterProps) {
  const pathname = usePathname();
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Determine active tab based on pathname
  const activeHref = tabs.find(t => pathname === t.href)?.href
    || tabs.find(t => pathname.startsWith(t.href + "/"))?.href
    || tabs[0]?.href;

  if (isDesktop) {
    return (
      <div className="w-full">
        <div className="w-full flex border-b bg-transparent gap-6 px-0">
          {tabs.map((tab) => {
            const isActive = tab.href === activeHref;
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={`inline-flex items-center gap-2 px-0 py-3 border-b-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "border-primary text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                {tab.icon}
                {tab.label}
              </Link>
            );
          })}
        </div>
        <div className="pt-6">
          {children}
        </div>
      </div>
    );
  }

  // Mobile: MasterDetail style
  const [showDetail, setShowDetail] = useState(false);

  const MasterList = (
    <div className="flex flex-col gap-2 p-2">
      {tabs.map((tab) => (
        <Link key={tab.href} href={tab.href}>
          <Card 
            className="p-4 flex items-center justify-between cursor-pointer hover:bg-accent/50 active:scale-[0.98] transition-all"
          >
            <div className="flex items-center gap-3">
              {tab.icon}
              <span className="font-medium text-lg">{tab.label}</span>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </Card>
        </Link>
      ))}
    </div>
  );

  // On mobile, if we're on a sub-page (not the basePath), show the content directly
  const isOnSubPage = basePath && pathname !== basePath && pathname.startsWith(basePath);
  
  if (isOnSubPage) {
    return <div>{children}</div>;
  }

  return MasterList;
}

/* ────────────────────────────────────────────
 * SectionTabs — Tab nội dung tại chỗ
 * Dùng cho tab trong một trang (không đổi URL)
 * ──────────────────────────────────────────── */

export interface SectionTabsProps {
  tabs: SectionTabItem[];
  defaultTab?: string;
  title?: string;
}

export function SectionTabs({ tabs, defaultTab, title = "Mục lục" }: SectionTabsProps) {
  const [isDesktop, setIsDesktop] = useState(true);
  const [activeTab, setActiveTab] = useState<string | null>(null);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isDesktop) {
    return (
      <Tabs defaultValue={defaultTab || tabs[0]?.id} className="w-full">
        <TabsList className="w-full justify-start rounded-none border-b bg-transparent h-auto p-0 gap-6">
          {tabs.map((tab) => (
            <TabsTrigger 
              key={tab.id} 
              value={tab.id}
              className="rounded-none border-b-2 border-transparent px-0 py-3 data-[state=active]:border-primary data-[state=active]:shadow-none data-[state=active]:bg-transparent"
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        <div className="pt-6">
          {/* Use Tabs content mechanism */}
          {tabs.map((tab) => (
            <div key={tab.id} className="hidden data-[state=active]:block" data-state={
              (defaultTab || tabs[0]?.id) === tab.id ? "active" : "inactive"
            }>
              {tab.content}
            </div>
          ))}
        </div>
      </Tabs>
    );
  }

  // Mobile: MasterDetail pattern
  const activeContent = tabs.find(t => t.id === activeTab)?.content || null;

  const MasterList = (
    <div className="flex flex-col gap-2 p-2">
      {tabs.map((tab) => (
        <Card 
          key={tab.id} 
          className="p-4 flex items-center justify-between cursor-pointer hover:bg-accent/50 active:scale-[0.98] transition-all"
          onClick={() => setActiveTab(tab.id)}
        >
          <span className="font-medium text-lg">{tab.label}</span>
          <ChevronRight className="w-5 h-5 text-muted-foreground" />
        </Card>
      ))}
    </div>
  );

  return (
    <MasterDetail 
      master={MasterList}
      detail={activeContent}
      isDetailOpen={activeTab !== null}
      onBack={() => setActiveTab(null)}
      masterTitle={tabs.find(t => t.id === activeTab)?.label || title}
    />
  );
}

