"use client";

import React, { useState, useEffect } from "react";
import { Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";

export interface FilterOption {
  id: string;
  label: string;
  options: { value: string; label: string }[];
}

interface FilterBarProps {
  filters: FilterOption[];
  activeFilters: Record<string, string[]>;
  onChange: (filterId: string, values: string[]) => void;
  onClear: () => void;
}

export function FilterBar({ filters, activeFilters = {}, onChange, onClear }: FilterBarProps) {
  const [isDesktop, setIsDesktop] = useState(true);
  const activeCount = Object.values(activeFilters).flat().length;

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 768); // md
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleFilter = (filterId: string, value: string) => {
    const current = activeFilters[filterId] || [];
    if (current.includes(value)) {
      onChange(filterId, current.filter(v => v !== value));
    } else {
      onChange(filterId, [...current, value]);
    }
  };

  const FilterContent = () => (
    <div className="flex flex-col gap-6">
      {filters.map(group => (
        <div key={group.id} className="space-y-3">
          <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wider">{group.label}</h4>
          <div className="flex flex-wrap gap-2">
            {group.options.map(opt => {
              const isActive = (activeFilters[group.id] || []).includes(opt.value);
              return (
                <Badge
                  key={opt.value}
                  variant={isActive ? "default" : "outline"}
                  className={`cursor-pointer ${isActive ? 'bg-primary' : 'hover:bg-accent'}`}
                  onClick={() => toggleFilter(group.id, opt.value)}
                >
                  {opt.label}
                </Badge>
              );
            })}
          </div>
        </div>
      ))}
      
      {activeCount > 0 && (
        <div className="pt-4 border-t mt-2">
          <Button variant="ghost" onClick={onClear} className="w-full text-destructive">
            Xóa bộ lọc
          </Button>
        </div>
      )}
    </div>
  );

  if (isDesktop) {
    return (
      <div className="flex flex-wrap items-center gap-4 p-2 bg-card border rounded-md">
        <div className="flex items-center text-muted-foreground mr-2">
          <Filter className="w-4 h-4 mr-2" />
          <span className="text-sm font-medium">Bộ lọc</span>
        </div>
        
        {filters.map(group => (
          <div key={group.id} className="flex items-center gap-2 border-l pl-4">
            <span className="text-sm font-medium">{group.label}:</span>
            <div className="flex gap-1">
              {group.options.slice(0, 3).map(opt => {
                const isActive = (activeFilters[group.id] || []).includes(opt.value);
                return (
                  <Badge
                    key={opt.value}
                    variant={isActive ? "default" : "secondary"}
                    className="cursor-pointer"
                    onClick={() => toggleFilter(group.id, opt.value)}
                  >
                    {opt.label}
                  </Badge>
                );
              })}
              {group.options.length > 3 && (
                <Badge variant="outline" className="cursor-pointer">
                  +{group.options.length - 3}
                </Badge>
              )}
            </div>
          </div>
        ))}

        {activeCount > 0 && (
          <Button variant="ghost" size="sm" onClick={onClear} className="ml-auto text-destructive h-7 px-2">
            Xóa ({activeCount})
          </Button>
        )}
      </div>
    );
  }

  // Mobile: Button + Bottom Sheet
  return (
    <div className="flex items-center gap-2">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" className="gap-2 relative">
            <Filter className="w-4 h-4" />
            Lọc
            {activeCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground w-5 h-5 rounded-full text-xs flex items-center justify-center">
                {activeCount}
              </span>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent side="bottom" className="max-h-[85vh] overflow-y-auto">
          <SheetHeader className="mb-6 border-b pb-4">
            <SheetTitle>Bộ lọc</SheetTitle>
          </SheetHeader>
          <FilterContent />
        </SheetContent>
      </Sheet>

      {/* Active chips horizontally scrollable */}
      {activeCount > 0 && (
        <div className="flex-1 overflow-x-auto hide-scrollbar flex items-center gap-2 pb-1">
          {filters.map(group => 
            (activeFilters[group.id] || []).map(val => {
              const opt = group.options.find(o => o.value === val);
              if (!opt) return null;
              return (
                <Badge key={`${group.id}-${val}`} variant="secondary" className="whitespace-nowrap flex items-center gap-1">
                  {opt.label}
                  <X className="w-3 h-3 cursor-pointer" onClick={() => toggleFilter(group.id, val)} />
                </Badge>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}
