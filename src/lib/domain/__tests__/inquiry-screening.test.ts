import { describe, it, expect } from 'vitest';
import { evaluateInquiry } from '../inquiry-screening';

describe('Inquiry Screening Domain Logic', () => {
  it('should reject immediately if compliance risk is 0', () => {
    const scores = { fit: 5, value: 5, clarity: 5, repeat: 5, compliance: 0, payment: 5 };
    const result = evaluateInquiry(scores);
    
    expect(result.decision).toBe('reject');
    expect(result.reason).toContain('Từ chối bắt buộc');
  });

  it('should accept if total score >= 60', () => {
    // 4*2 + 4*2 + 4*1 + 4*1 + 4*2 + 4*1 = 36 * 3 = 108
    const scores = { fit: 4, value: 4, clarity: 4, repeat: 4, compliance: 4, payment: 4 };
    const result = evaluateInquiry(scores);
    
    expect(result.decision).toBe('accept');
    expect(result.score).toBeGreaterThanOrEqual(60);
  });

  it('should park if score is between 40 and 59', () => {
    // 2*2 + 2*2 + 1*1 + 1*1 + 2*2 + 1*1 = 15 * 3 = 45
    const scores = { fit: 2, value: 2, clarity: 1, repeat: 1, compliance: 2, payment: 1 };
    const result = evaluateInquiry(scores);
    
    expect(result.decision).toBe('park');
    expect(result.score).toBeGreaterThanOrEqual(40);
    expect(result.score).toBeLessThan(60);
  });

  it('should reject if score is less than 40', () => {
    // 1*2 + 1*2 + 1*1 + 1*1 + 1*2 + 1*1 = 9 * 3 = 27
    const scores = { fit: 1, value: 1, clarity: 1, repeat: 1, compliance: 1, payment: 1 };
    const result = evaluateInquiry(scores);
    
    expect(result.decision).toBe('reject');
    expect(result.score).toBeLessThan(40);
    expect(result.reason).toContain('không đạt ngưỡng tối thiểu');
  });
});
