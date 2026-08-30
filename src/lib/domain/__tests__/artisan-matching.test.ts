import { describe, it, expect } from 'vitest';
import { evaluateArtisanMatch, HouseholdProfile, MatchingRequirement } from '../artisan-matching';

describe('Artisan Matching Domain Logic', () => {
  const defaultHousehold: HouseholdProfile = {
    id: 'h1',
    status: 'active',
    maxKilnHeight: 1000,
    monthlyCapacityRemaining: 500,
    technicalMatchScore: 1, // 100%
    defectRate: 5, // 5%
    onTimeRate: 95, // 95%
    hasKilnSlotBeforeDeadline: true, // 100%
    experienceMatchScore: 1, // 100%
  };

  const defaultRequirement: MatchingRequirement = {
    productHeight: 500,
    qtyRequired: 100,
  };

  it('should calculate correct score for a perfect match household', () => {
    // Score = 0.3(1) + 0.25(1-0.05) + 0.2(0.95) + 0.15(1) + 0.1(1) 
    //       = 0.3 + 0.2375 + 0.19 + 0.15 + 0.1 
    //       = 0.9775 (97.8%)
    const result = evaluateArtisanMatch(defaultHousehold, defaultRequirement);
    
    expect(result.isEligible).toBe(true);
    expect(result.ineligibleReasons.length).toBe(0);
    expect(result.score).toBeCloseTo(97.7, 0); // 97.7 or 97.8 depends on rounding
  });

  it('should be ineligible if status is paused', () => {
    const household = { ...defaultHousehold, status: 'paused' as const };
    const result = evaluateArtisanMatch(household, defaultRequirement);
    
    expect(result.isEligible).toBe(false);
    expect(result.ineligibleReasons).toContain('Hộ đang tạm nghỉ (paused).');
    expect(result.score).toBe(0);
  });

  it('should be ineligible if product height > max kiln height', () => {
    const requirement = { ...defaultRequirement, productHeight: 1200 };
    const result = evaluateArtisanMatch(defaultHousehold, requirement);
    
    expect(result.isEligible).toBe(false);
    expect(result.ineligibleReasons[0]).toContain('vượt quá chiều cao lòng lò tối đa');
  });

  it('should be ineligible if required qty > capacity remaining', () => {
    const requirement = { ...defaultRequirement, qtyRequired: 600 };
    const result = evaluateArtisanMatch(defaultHousehold, requirement);
    
    expect(result.isEligible).toBe(false);
    expect(result.ineligibleReasons[0]).toContain('Công suất trống');
  });

  it('should accumulate multiple ineligible reasons', () => {
    const household = { ...defaultHousehold, status: 'paused' as const, monthlyCapacityRemaining: 50 };
    const requirement = { productHeight: 1200, qtyRequired: 100 };
    const result = evaluateArtisanMatch(household, requirement);
    
    expect(result.isEligible).toBe(false);
    expect(result.ineligibleReasons.length).toBe(3);
  });
});
