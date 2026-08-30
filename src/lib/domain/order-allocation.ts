export interface Allocation {
  partyType: 'household' | 'third_party' | 'platform' | 'designer';
  amount: number;
}

export interface OrderMilestone {
  kind: 'deposit' | 'pre_shipment' | 'balance' | 'design_fee' | 'sample_fee';
  pct: number;
}

/**
 * Kiểm tra tính hợp lệ của phân bổ tiền (Tổng phân bổ phải bằng tổng giá trị đơn hàng, sai lệch < 1000đ)
 */
export function validateAllocations(totalValue: number, allocations: Allocation[]): { valid: boolean; diff: number; error?: string } {
  const sum = allocations.reduce((acc, curr) => acc + curr.amount, 0);
  const diff = Math.abs(sum - totalValue);

  if (diff > 1000) {
    return {
      valid: false,
      diff,
      error: `Phân bổ tiền không khớp giá trị đơn hàng. Chênh lệch cho phép tối đa 1.000đ. Đang chênh lệch ${diff}đ.`,
    };
  }

  return { valid: true, diff };
}

/**
 * Kiểm tra các mốc thanh toán có đạt yêu cầu hay không
 * Tối thiểu 3 mốc thanh toán khi tạo đơn: deposit (≥ settings.min_deposit_pct, mặc định 40%), pre_shipment, balance. Tổng % = 100.
 */
export function validatePaymentMilestones(
  milestones: OrderMilestone[],
  minDepositPct: number = 40
): { valid: boolean; error?: string } {
  const totalPct = milestones.reduce((acc, curr) => acc + curr.pct, 0);
  if (Math.abs(totalPct - 100) > 0.01) {
    return { valid: false, error: 'Tổng tỷ lệ % các mốc thanh toán phải bằng 100%.' };
  }

  const deposit = milestones.find(m => m.kind === 'deposit');
  if (!deposit || deposit.pct < minDepositPct) {
    return { valid: false, error: `Phải có mốc đặt cọc (deposit) với tỷ lệ tối thiểu ${minDepositPct}%.` };
  }

  const hasPreShipment = milestones.some(m => m.kind === 'pre_shipment');
  const hasBalance = milestones.some(m => m.kind === 'balance');

  if (!hasPreShipment || !hasBalance) {
    return { valid: false, error: 'Phải có các mốc thanh toán pre_shipment và balance.' };
  }

  return { valid: true };
}

/**
 * Tính toán cơ cấu chi phí tham khảo (mô hình 300 triệu)
 */
export function calculateReferenceCostStructure(totalValue: number): {
  household: number;
  thirdParty: number;
  platform: number;
} {
  return {
    household: totalValue * 0.73,
    thirdParty: totalValue * 0.05,
    platform: totalValue * 0.22,
  };
}
