"use client";
import React from "react";

const days = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];
const households = ["PL-H-001 Ông Tới", "PL-H-002 Bà Lan", "PL-H-003 Ông Hùng", "PL-H-004 Chị Mai", "PL-H-005 Ông Đức"];
const schedules: Record<string, Record<number, { type: string; color: string }>> = {
  "PL-H-001 Ông Tới": { 0: { type: "Nung", color: "bg-orange-200" }, 1: { type: "Nung", color: "bg-orange-200" }, 2: { type: "Làm nguội", color: "bg-blue-100" }, 5: { type: "Nung riêng", color: "bg-purple-100" }, 6: { type: "Nung riêng", color: "bg-purple-100" } },
  "PL-H-002 Bà Lan": { 3: { type: "Nung", color: "bg-orange-200" }, 4: { type: "Nung", color: "bg-orange-200" }, 5: { type: "Làm nguội", color: "bg-blue-100" } },
  "PL-H-003 Ông Hùng": { 1: { type: "Nung", color: "bg-orange-200" }, 2: { type: "Nung", color: "bg-orange-200" }, 3: { type: "Làm nguội", color: "bg-blue-100" } },
};

export default function KilnSchedulePage() {
  return (
    <div className="space-y-6">
      <div><h2 className="text-2xl font-heading font-bold">Lịch lò toàn mạng lưới</h2><p className="text-muted-foreground text-sm mt-1">14 ngày tới — mỗi hộ một hàng.</p></div>
      <div className="bg-card border rounded-xl shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left p-3 font-medium sticky left-0 bg-card z-10 min-w-[160px]">Hộ nghề</th>
              {[...Array(14)].map((_, i) => (
                <th key={i} className="p-3 font-medium text-center min-w-[80px]">
                  <div className="text-xs text-muted-foreground">{days[i % 7]}</div>
                  <div className="text-sm">{i + 1}/09</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {households.map((hh) => (
              <tr key={hh} className="border-b hover:bg-muted/30">
                <td className="p-3 font-medium sticky left-0 bg-card z-10">{hh}</td>
                {[...Array(14)].map((_, i) => {
                  const sched = schedules[hh]?.[i];
                  return (
                    <td key={i} className="p-1.5 text-center">
                      {sched ? (
                        <div className={`px-2 py-1.5 rounded-md text-xs font-medium ${sched.color}`}>{sched.type}</div>
                      ) : (
                        <div className="text-muted-foreground/30">—</div>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex gap-4 text-xs">
        <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-orange-200" />Đang nung (đơn hàng)</div>
        <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-blue-100" />Làm nguội</div>
        <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-purple-100" />Mẻ riêng của hộ</div>
      </div>
    </div>
  );
}
