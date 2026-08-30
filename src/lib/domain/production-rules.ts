/**
 * Tính số lượng dự phòng (qty_spare) cho đơn hàng.
 * Quy tắc (theo §5.4):
 * qty_spare = ceil(qty_ordered × max(tỷ_lệ_lỗi_hộ, 8%))
 * Tối thiểu 1 với đơn ≤ 10 cái.
 * 
 * @param qtyOrdered Số lượng đặt hàng
 * @param householdDefectRate Tỷ lệ lỗi của hộ (tính bằng phần trăm, ví dụ 12 = 12%)
 * @param minBaseDefectRate Mức rủi ro tối thiểu (mặc định 8%)
 */
export function calculateSpareQty(
  qtyOrdered: number,
  householdDefectRate: number,
  minBaseDefectRate: number = 8
): number {
  if (qtyOrdered <= 0) return 0;

  const effectiveRate = Math.max(householdDefectRate, minBaseDefectRate) / 100;
  let spare = Math.ceil(qtyOrdered * effectiveRate);

  if (qtyOrdered <= 10 && spare < 1) {
    spare = 1;
  }

  return spare;
}
