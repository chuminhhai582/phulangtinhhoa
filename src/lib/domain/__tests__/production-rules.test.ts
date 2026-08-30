import { describe, it, expect } from 'vitest';
import { calculateSpareQty } from '../production-rules';

describe('Production Rules Domain Logic', () => {
  describe('calculateSpareQty', () => {
    it('should calculate correctly with default min rate 8%', () => {
      // 100 * 8% = 8
      expect(calculateSpareQty(100, 5)).toBe(8);
      // 100 * 12% = 12
      expect(calculateSpareQty(100, 12)).toBe(12);
    });

    it('should apply ceil correctly', () => {
      // 15 * 8% = 1.2 -> ceil(1.2) = 2
      expect(calculateSpareQty(15, 5)).toBe(2);
      // 21 * 10% = 2.1 -> ceil(2.1) = 3
      expect(calculateSpareQty(21, 10)).toBe(3);
    });

    it('should force minimum 1 for orders <= 10', () => {
      // 5 * 8% = 0.4 -> ceil(0.4) = 1
      expect(calculateSpareQty(5, 5)).toBe(1);
      // Even if formula results in 0 somehow, if qty <= 10 it should be 1
      expect(calculateSpareQty(5, 0, 0)).toBe(1);
    });

    it('should return 0 for order qty 0', () => {
      expect(calculateSpareQty(0, 10)).toBe(0);
    });
  });
});
