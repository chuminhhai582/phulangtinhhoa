import { useSyncExternalStore } from "react";

/**
 * Hook dùng matchMedia để theo dõi breakpoint.
 * - Chỉ bắn sự kiện khi thực sự vượt ngưỡng (không phải mỗi pixel như resize)
 * - useSyncExternalStore xử lý đúng hydration
 * - Server fallback: false (mobile-first — khớp với đối tượng dùng chính)
 *
 * @example
 * const isDesktop = useMediaQuery("(min-width: 1024px)");
 * const isTablet = useMediaQuery("(min-width: 768px)");
 */
export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (callback) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", callback);
      return () => mql.removeEventListener("change", callback);
    },
    () => window.matchMedia(query).matches,
    () => false // Server fallback: mobile-first
  );
}
