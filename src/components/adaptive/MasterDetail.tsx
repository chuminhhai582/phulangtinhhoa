"use client";

import React from "react";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMediaQuery } from "@/hooks/use-media-query";

interface MasterDetailProps {
  master: React.ReactNode;
  detail: React.ReactNode;
  isDetailOpen: boolean;
  onBack: () => void;
  masterTitle?: string;
}

export function MasterDetail({ master, detail, isDetailOpen, onBack, masterTitle = "Danh sách" }: MasterDetailProps) {
  const isDesktop = useMediaQuery("(min-width: 1440px)");

  if (isDesktop) {
    return (
      <div className="flex h-full w-full gap-6">
        <div className="w-[400px] shrink-0 border-r pr-6 flex flex-col h-full">
          <ScrollArea className="flex-1">{master}</ScrollArea>
        </div>
        <div className="flex-1 min-w-0 flex flex-col h-full">
          {isDetailOpen ? (
            <ScrollArea className="flex-1 bg-card rounded-lg border p-6">
              {detail}
            </ScrollArea>
          ) : (
            <div className="flex-1 flex items-center justify-center text-muted-foreground bg-muted/20 rounded-lg border border-dashed">
              Chọn một mục để xem chi tiết
            </div>
          )}
        </div>
      </div>
    );
  }

  // Mobile/Tablet View: Push Navigation
  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Master View */}
      <div 
        className={`absolute inset-0 transition-transform duration-300 ease-in-out ${
          isDetailOpen ? "-translate-x-full opacity-0 pointer-events-none" : "translate-x-0 opacity-100"
        }`}
      >
        <ScrollArea className="h-full pb-20">{master}</ScrollArea>
      </div>

      {/* Detail View */}
      <div 
        className={`absolute inset-0 bg-background transition-transform duration-300 ease-in-out z-10 flex flex-col ${
          isDetailOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0 pointer-events-none"
        }`}
      >
        <div className="h-14 border-b flex items-center px-2 shrink-0 bg-card sticky top-0 z-20">
          <Button variant="ghost" size="icon" onClick={onBack} className="mr-2">
            <ChevronLeft className="w-6 h-6" />
          </Button>
          <span className="font-semibold truncate">{masterTitle}</span>
        </div>
        <ScrollArea className="flex-1 p-4 pb-24">
          {detail}
        </ScrollArea>
      </div>
    </div>
  );
}
