export type ScreeningScores = {
  fit: number; // Mức phù hợp với năng lực mạng lưới (x2)
  value: number; // Giá trị đơn hàng so với chi phí thiết kế + mẫu (x2)
  clarity: number; // Độ rõ của yêu cầu (x1)
  repeat: number; // Khả năng lặp lại / đặt lại (x1)
  compliance: number; // Rủi ro tuân thủ (x2), 0 = reject
  payment: number; // Khả năng thanh toán & điều kiện (x1)
};

export type InquiryDecision = 'accept' | 'park' | 'reject';

export interface ScreeningResult {
  score: number;
  decision: InquiryDecision;
  reason?: string;
}

export interface ScreeningSettings {
  acceptThreshold: number; // Mặc định 60
  parkThreshold: number; // Mặc định 40
}

/**
 * Tính điểm sàng lọc yêu cầu và đưa ra quyết định
 */
export function evaluateInquiry(scores: ScreeningScores, settings: ScreeningSettings = { acceptThreshold: 60, parkThreshold: 40 }): ScreeningResult {
  // Rủi ro tuân thủ = 0 -> từ chối bắt buộc
  if (scores.compliance === 0) {
    return {
      score: calculateTotalScore(scores),
      decision: 'reject',
      reason: 'Từ chối bắt buộc: Rủi ro tuân thủ ở mức 0.',
    };
  }

  const totalScore = calculateTotalScore(scores);

  if (totalScore >= settings.acceptThreshold) {
    return { score: totalScore, decision: 'accept' };
  }
  
  if (totalScore >= settings.parkThreshold) {
    return { score: totalScore, decision: 'park' };
  }

  return {
    score: totalScore,
    decision: 'reject',
    reason: 'Điểm tổng không đạt ngưỡng tối thiểu.',
  };
}

function calculateTotalScore(scores: ScreeningScores): number {
  // Trọng số theo blueprint
  // Fit (x2), Value (x2), Clarity (x1), Repeat (x1), Compliance (x2), Payment (x1)
  // Blueprint ghi 135 có thể là điểm sau khi quy đổi ra % hoặc một thang khác, nhưng ta tính dựa trên hệ số.
  // 6 tiêu chí * 5đ tối đa * 9 (tổng trọng số) = 45 điểm tối đa. 
  // Để đồng bộ với ngưỡng 60/135, ta nhân hệ số 3. (45 * 3 = 135)
  const baseScore = 
    (scores.fit * 2) +
    (scores.value * 2) +
    (scores.clarity * 1) +
    (scores.repeat * 1) +
    (scores.compliance * 2) +
    (scores.payment * 1);

  return baseScore * 3;
}
