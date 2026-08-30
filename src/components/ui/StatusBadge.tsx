import React from "react";
import { STATUS_TONE_CLASSES, type StatusConfig, type StatusTone } from "@/lib/status";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  /** StatusConfig hoặc truyền trực tiếp label + tone */
  config?: StatusConfig;
  label?: string;
  tone?: StatusTone;
  className?: string;
}

/**
 * Badge trạng thái chuẩn hóa.
 * Dùng: <StatusBadge config={getStatus(ORDER_STATUS, row.status)} />
 * Hoặc: <StatusBadge label="Đạt" tone="success" />
 */
export function StatusBadge({ config, label, tone, className }: StatusBadgeProps) {
  const resolvedLabel = config?.label ?? label ?? "—";
  const resolvedTone = config?.tone ?? tone ?? "muted";

  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap",
        STATUS_TONE_CLASSES[resolvedTone],
        className
      )}
    >
      {resolvedLabel}
    </span>
  );
}
