/**
 * Hệ thống trạng thái trung tâm.
 * Thay vì hardcode color ở 155 chỗ, mọi page import từ đây.
 */

export type StatusTone = "default" | "info" | "success" | "warning" | "danger" | "muted";

export interface StatusConfig {
  label: string;
  tone: StatusTone;
}

export const STATUS_TONE_CLASSES: Record<StatusTone, string> = {
  default: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
  info: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  success: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  warning: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  danger: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  muted: "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-500",
};

// ─── Đơn hàng ───────────────────────────────
export const ORDER_STATUS: Record<string, StatusConfig> = {
  draft: { label: "Bản nháp", tone: "muted" },
  confirmed: { label: "Đã xác nhận", tone: "info" },
  in_production: { label: "Đang sản xuất", tone: "warning" },
  quality_check: { label: "Kiểm tra CL", tone: "info" },
  ready: { label: "Sẵn sàng giao", tone: "success" },
  shipped: { label: "Đã giao", tone: "success" },
  completed: { label: "Hoàn thành", tone: "success" },
  cancelled: { label: "Đã hủy", tone: "danger" },
};

// ─── Báo giá ────────────────────────────────
export const QUOTE_STATUS: Record<string, StatusConfig> = {
  draft: { label: "Bản nháp", tone: "muted" },
  sent: { label: "Đã gửi", tone: "info" },
  accepted: { label: "Đã chấp nhận", tone: "success" },
  rejected: { label: "Bị từ chối", tone: "danger" },
  expired: { label: "Hết hạn", tone: "muted" },
};

// ─── Thiết kế ───────────────────────────────
export const DESIGN_STATUS: Record<string, StatusConfig> = {
  draft: { label: "Bản nháp", tone: "muted" },
  in_review: { label: "Đang duyệt", tone: "warning" },
  approved: { label: "Đã duyệt", tone: "success" },
  retired: { label: "Ngừng dùng", tone: "danger" },
};

// ─── Chất lượng ─────────────────────────────
export const QC_RESULT: Record<string, StatusConfig> = {
  pending: { label: "Chờ duyệt", tone: "muted" },
  pass: { label: "Đạt", tone: "success" },
  conditional: { label: "Đạt có ĐK", tone: "warning" },
  fail: { label: "Không đạt", tone: "danger" },
};

export const NC_DECISION: Record<string, StatusConfig> = {
  pending: { label: "Cần quyết định", tone: "danger" },
  rework: { label: "Bù mẻ sau", tone: "info" },
  discount: { label: "Giảm giá bán", tone: "warning" },
  scrap: { label: "Xóa bỏ", tone: "danger" },
};

// ─── Yêu cầu ────────────────────────────────
export const INQUIRY_DECISION: Record<string, StatusConfig> = {
  pending: { label: "Chờ xử lý", tone: "muted" },
  accept: { label: "Chấp nhận", tone: "success" },
  park: { label: "Tạm giữ", tone: "warning" },
  reject: { label: "Từ chối", tone: "danger" },
};

// ─── Xuất khẩu ──────────────────────────────
export const EXPORT_STATUS: Record<string, StatusConfig> = {
  preparing: { label: "Đang chuẩn bị", tone: "warning" },
  almost_done: { label: "Gần hoàn tất", tone: "info" },
  ready: { label: "Sẵn sàng", tone: "success" },
};

// ─── Vai trò ────────────────────────────────
export const USER_ROLE: Record<string, StatusConfig> = {
  admin: { label: "Quản trị viên", tone: "danger" },
  coordinator: { label: "Điều phối", tone: "info" },
  qc: { label: "Chất lượng", tone: "success" },
  artisan: { label: "Hộ nghề", tone: "warning" },
  customer: { label: "Khách hàng", tone: "default" },
};

/**
 * Lookup helper — trả về config hoặc fallback mặc định
 */
export function getStatus(map: Record<string, StatusConfig>, key: string | null | undefined): StatusConfig {
  if (!key) return { label: "—", tone: "muted" };
  return map[key] ?? { label: key, tone: "muted" };
}
