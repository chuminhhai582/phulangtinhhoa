"use client";

import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import { MasterDetail } from "./MasterDetail";

interface TabItem {
  id: string;
  label: string;
  content: React.ReactNode;
}

export interface TabRouterProps {
  tabs: TabItem[];
  defaultTab?: string;
  title?: string;
}

export function TabRouter({ tabs, defaultTab, title = "Mục lục" }: TabRouterProps) {
  const [isDesktop, setIsDesktop] = useState(true);
  const [activeTab, setActiveTab] = useState<string | null>(null);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024); // lg
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
          {tabs.map((tab) => (
            <TabsContent key={tab.id} value={tab.id} className="mt-0 outline-none">
              {tab.content}
            </TabsContent>
          ))}
        </div>
      </Tabs>
    );
  }

  // Mobile: Render as MasterDetail where master is a list of tabs
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
