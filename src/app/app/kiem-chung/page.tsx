"use client";

import React from "react";
import { AlertTriangle } from "lucide-react";

const stages = [
  { name: "Phỏng vấn vấn đề", target: 20, confirmTarget: 8, current: 14, confirmed: 6, icon: "🎤" },
  { name: "Thử hồ sơ chào hàng", target: 8, confirmTarget: 3, current: 5, confirmed: 2, icon: "📄" },
  { name: "Mẫu trả phí", target: 5, confirmTarget: 2, current: 2, confirmed: 1, icon: "🏺" },
  { name: "Đơn hàng thử nghiệm", target: 3, confirmTarget: 1, current: 1, confirmed: 0, icon: "📦" },
];

export default function ValidationPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-heading font-bold">Kiểm chứng nhu cầu</h2>
        <p className="text-muted-foreground text-sm mt-1">Phễu 4 bậc kiểm chứng theo cổng quyết định 90 ngày.</p>
      </div>

      {/* Warning banner */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3 text-amber-800">
        <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
        <p className="text-sm">
          <strong>Lượt thích, lượt xem và lời khen không được tính là bằng chứng.</strong> Mẫu tặng miễn phí không tính vào bậc 3.
        </p>
      </div>

      {/* Funnel stages */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {stages.map((s, i) => {
          const progressPct = Math.round((s.current / s.target) * 100);
          const confirmPct = Math.round((s.confirmed / s.confirmTarget) * 100);
          const isGreen = s.current >= s.target && s.confirmed >= s.confirmTarget;
          const isYellow = s.current >= s.target || s.confirmed >= s.confirmTarget;

          return (
            <div key={i} className="bg-card border rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{s.icon}</span>
                  <div>
                    <h3 className="font-semibold">Bậc {i + 1}: {s.name}</h3>
                  </div>
                </div>
                <div className={`w-4 h-4 rounded-full ${isGreen ? 'bg-green-500' : isYellow ? 'bg-amber-400' : 'bg-red-400'}`} />
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="text-muted-foreground">Số lượng</span>
                    <span className="font-medium">{s.current} / {s.target}</span>
                  </div>
                  <div className="h-2.5 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${Math.min(progressPct, 100)}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="text-muted-foreground">Xác nhận đạt ngưỡng</span>
                    <span className="font-medium">{s.confirmed} / {s.confirmTarget}</span>
                  </div>
                  <div className="h-2.5 bg-muted rounded-full overflow-hidden">
                    <div className={`h-full rounded-full transition-all ${confirmPct >= 100 ? 'bg-green-500' : 'bg-amber-400'}`} style={{ width: `${Math.min(confirmPct, 100)}%` }} />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
