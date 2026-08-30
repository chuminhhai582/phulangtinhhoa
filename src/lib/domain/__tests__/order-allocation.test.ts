import { describe, it, expect } from 'vitest';
import { validateAllocations, validatePaymentMilestones, calculateReferenceCostStructure } from '../order-allocation';

describe('Order Allocation Domain Logic', () => {
  describe('validateAllocations', () => {
    it('should be valid if difference is less than or equal to 1000', () => {
      const result = validateAllocations(1000000, [
        { partyType: 'household', amount: 730000 },
        { partyType: 'third_party', amount: 50500 },
        { partyType: 'platform', amount: 220000 },
      ]);
      expect(result.valid).toBe(true);
      expect(result.diff).toBe(500);
    });

    it('should be invalid if difference > 1000', () => {
      const result = validateAllocations(1000000, [
        { partyType: 'household', amount: 730000 },
        { partyType: 'third_party', amount: 48000 },
        { partyType: 'platform', amount: 220000 },
      ]);
      expect(result.valid).toBe(false);
      expect(result.diff).toBe(2000);
      expect(result.error).toContain('Chênh lệch cho phép tối đa 1.000đ');
    });
  });

  describe('validatePaymentMilestones', () => {
    it('should be valid with deposit >= min, pre_shipment, balance and total = 100', () => {
      const result = validatePaymentMilestones([
        { kind: 'deposit', pct: 40 },
        { kind: 'pre_shipment', pct: 40 },
        { kind: 'balance', pct: 20 },
      ], 40);
      expect(result.valid).toBe(true);
    });

    it('should be invalid if total is not 100%', () => {
      const result = validatePaymentMilestones([
        { kind: 'deposit', pct: 40 },
        { kind: 'pre_shipment', pct: 40 },
        { kind: 'balance', pct: 19 },
      ]);
      expect(result.valid).toBe(false);
      expect(result.error).toContain('Tổng tỷ lệ %');
    });

    it('should be invalid if deposit is missing or less than minimum', () => {
      const result = validatePaymentMilestones([
        { kind: 'deposit', pct: 30 },
        { kind: 'pre_shipment', pct: 50 },
        { kind: 'balance', pct: 20 },
      ], 40);
      expect(result.valid).toBe(false);
      expect(result.error).toContain('tỷ lệ tối thiểu 40%');
    });

    it('should be invalid if pre_shipment or balance is missing', () => {
      const result = validatePaymentMilestones([
        { kind: 'deposit', pct: 100 },
      ], 40);
      expect(result.valid).toBe(false);
      expect(result.error).toContain('Phải có các mốc thanh toán pre_shipment và balance');
    });
  });

  describe('calculateReferenceCostStructure', () => {
    it('should calculate 73%, 5%, 22% correctly', () => {
      const result = calculateReferenceCostStructure(300000000);
      expect(result.household).toBe(219000000);
      expect(result.thirdParty).toBe(15000000);
      expect(result.platform).toBe(66000000);
    });
  });
});
