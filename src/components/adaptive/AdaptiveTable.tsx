"use client";

import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card } from "@/components/ui/card";

export interface Column<T> {
  key: string;
  label: string;
  render?: (value: any, row: T) => React.ReactNode;
  isPrimary?: boolean;
  hideOnMobile?: boolean;
}

export interface AdaptiveTableProps<T> {
  data: T[];
  columns: Column<T>[];
  keyField?: string;
  onRowClick?: (row: T) => void;
}

export function AdaptiveTable<T extends Record<string, any>>({ data, columns, keyField = "id", onRowClick }: AdaptiveTableProps<T>) {
  const renderCell = (col: Column<T>, row: T) => {
    const value = row[col.key];
    if (col.render) return col.render(value, row);
    return String(value ?? "—");
  };

  const primaryCol = columns.find(c => c.isPrimary) || columns[0];
  const secondaryCols = columns.filter(c => c !== primaryCol && !c.hideOnMobile).slice(0, 3);

  return (
    <>
      {/* Desktop: Table — hidden dưới lg */}
      <div className="hidden lg:block rounded-md border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((col) => (
                <TableHead key={col.key}>{col.label}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row) => (
              <TableRow 
                key={row[keyField]} 
                onClick={() => onRowClick?.(row)}
                className={onRowClick ? "cursor-pointer hover:bg-muted/50" : ""}
              >
                {columns.map((col) => (
                  <TableCell key={col.key}>
                    {renderCell(col, row)}
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

      {/* Mobile: Card list — ẩn từ lg trở lên */}
      <div className="lg:hidden flex flex-col gap-3">
        {data.map((row) => (
          <Card 
            key={row[keyField]} 
            className={`p-4 flex flex-col gap-2 ${onRowClick ? 'cursor-pointer active:scale-[0.98] transition-transform motion-reduce:transition-none' : ''}`}
            onClick={() => onRowClick?.(row)}
          >
            <div className="flex justify-between items-start">
              <span className="font-semibold text-base">{renderCell(primaryCol, row)}</span>
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground mt-1">
              {secondaryCols.map((col) => (
                <div key={col.key} className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-wider">{col.label}</span>
                  <span>{renderCell(col, row)}</span>
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
    </>
  );
}

