"use client";

import React, { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export interface AdaptiveTableProps<T> {
  data: T[];
  columns: {
    header: string;
    accessorKey: keyof T;
    isPrimary?: boolean;
    isBadge?: boolean;
  }[];
  onRowClick?: (row: T) => void;
}

export function AdaptiveTable<T extends { id: string | number }>({ data, columns, onRowClick }: AdaptiveTableProps<T>) {
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024); // lg
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isDesktop) {
    return (
      <div className="rounded-md border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((col, idx) => (
                <TableHead key={idx}>{col.header}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row) => (
              <TableRow 
                key={row.id} 
                onClick={() => onRowClick?.(row)}
                className={onRowClick ? "cursor-pointer hover:bg-muted/50" : ""}
              >
                {columns.map((col, idx) => (
                  <TableCell key={idx}>
                    {col.isBadge ? (
                      <Badge variant="outline">{String(row[col.accessorKey])}</Badge>
                    ) : (
                      String(row[col.accessorKey])
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
            {data.length === 0 && (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  Không có dữ liệu.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    );
  }

  // Mobile View: Danh sách thẻ
  const primaryCol = columns.find(c => c.isPrimary) || columns[0];
  const badgeCol = columns.find(c => c.isBadge);
  const secondaryCols = columns.filter(c => !c.isPrimary && !c.isBadge).slice(0, 2);

  return (
    <div className="flex flex-col gap-3">
      {data.map((row) => (
        <Card 
          key={row.id} 
          className={`p-4 flex flex-col gap-2 ${onRowClick ? 'cursor-pointer active:scale-[0.98] transition-transform' : ''}`}
          onClick={() => onRowClick?.(row)}
        >
          <div className="flex justify-between items-start">
            <span className="font-semibold text-base">{String(row[primaryCol.accessorKey])}</span>
            {badgeCol && <Badge>{String(row[badgeCol.accessorKey])}</Badge>}
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground mt-1">
            {secondaryCols.map((col, idx) => (
              <div key={idx} className="flex flex-col">
                <span className="text-[10px] uppercase tracking-wider">{col.header}</span>
                <span>{String(row[col.accessorKey])}</span>
              </div>
            ))}
          </div>
        </Card>
      ))}
      {data.length === 0 && (
        <div className="text-center p-8 text-muted-foreground bg-muted/20 rounded-lg">
          Không có dữ liệu.
        </div>
      )}
    </div>
  );
}
