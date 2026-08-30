export interface HouseholdProfile {
  id: string;
  status: 'active' | 'paused' | 'exited' | 'prospect' | 'surveyed' | 'signed';
  maxKilnHeight: number; // Kích thước lòng lò tối đa
  monthlyCapacityRemaining: number; // Công suất trống
  technicalMatchScore: number; // 0 - 1 (phù_hợp_kỹ_thuật)
  defectRate: number; // 0 - 100 (tỷ lệ lỗi phần trăm)
  onTimeRate: number; // 0 - 100 (tỷ lệ đúng hạn phần trăm)
  hasKilnSlotBeforeDeadline: boolean; // còn_chỗ_lò_trước_hạn
  experienceMatchScore: number; // 0 - 1 (kinh_nghiệm_loại_sản_phẩm_này)
}

export interface MatchingRequirement {
  productHeight: number;
  qtyRequired: number;
}

export interface MatchingResult {
  householdId: string;
  isEligible: boolean;
  score: number;
  ineligibleReasons: string[];
}

/**
 * Đánh giá sự phù hợp của hộ nghề với đơn hàng
 * 
 * score = 0.30 × phù_hợp_kỹ_thuật
 *       + 0.25 × (1 − tỷ_lệ_lỗi_chuẩn_hóa)
 *       + 0.20 × đúng_hạn
 *       + 0.15 × còn_chỗ_lò_trước_hạn
 *       + 0.10 × kinh_nghiệm_loại_sản_phẩm_này
 */
export function evaluateArtisanMatch(
  household: HouseholdProfile,
  requirement: MatchingRequirement
): MatchingResult {
  const ineligibleReasons: string[] = [];

  // Điều kiện cứng 1: Trạng thái không được là paused/exited
  if (household.status === 'paused') {
    ineligibleReasons.push('Hộ đang tạm nghỉ (paused).');
  } else if (household.status !== 'active' && household.status !== 'signed') {
    ineligibleReasons.push(`Hộ chưa sẵn sàng nhận đơn (trạng thái: ${household.status}).`);
  }

  // Điều kiện cứng 2: Kích thước lò
  if (requirement.productHeight > household.maxKilnHeight) {
    ineligibleReasons.push(`Sản phẩm (cao ${requirement.productHeight}mm) vượt quá chiều cao lòng lò tối đa (${household.maxKilnHeight}mm).`);
  }

  // Điều kiện cứng 3: Công suất trống
  if (household.monthlyCapacityRemaining < requirement.qtyRequired) {
    ineligibleReasons.push(`Công suất trống (${household.monthlyCapacityRemaining}) không đủ để sản xuất số lượng yêu cầu (${requirement.qtyRequired}).`);
  }

  const isEligible = ineligibleReasons.length === 0;

  // Nếu không đủ điều kiện cứng thì không xếp hạng (score = 0)
  if (!isEligible) {
    return { householdId: household.id, isEligible, score: 0, ineligibleReasons };
  }

  // Chuẩn hóa tỷ lệ lỗi về 0-1. Ví dụ lỗi tối đa 100% -> rate = 1.0
  const normalizedDefectRate = Math.min(Math.max(household.defectRate / 100, 0), 1);
  const normalizedOnTimeRate = Math.min(Math.max(household.onTimeRate / 100, 0), 1);

  const score = 
    (0.30 * household.technicalMatchScore) +
    (0.25 * (1 - normalizedDefectRate)) +
    (0.20 * normalizedOnTimeRate) +
    (0.15 * (household.hasKilnSlotBeforeDeadline ? 1 : 0)) +
    (0.10 * household.experienceMatchScore);

  // Return score from 0 to 100 (for UI representation)
  return { 
    householdId: household.id, 
    isEligible, 
    score: Number((score * 100).toFixed(1)), 
    ineligibleReasons 
  };
}
