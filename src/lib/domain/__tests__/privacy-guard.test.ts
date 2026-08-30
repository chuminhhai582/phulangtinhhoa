import { describe, it, expect } from 'vitest';
import { checkPassportPrivacy, PassportData, PrivacyContext } from '../privacy-guard';

describe('Privacy Guard Domain Logic', () => {
  const defaultContext: PrivacyContext = {
    customerName: 'Acme Corp',
    contractCode: 'ACME-2026',
    householdPublicConsent: true,
    inspectorName: 'Nguyen Van QC',
    inspectorContact: 'nguyenvanqc@phulang.vn'
  };

  const defaultPassport: PassportData = {
    materialsPublic: 'Đất sét đỏ, men tro tự nhiên',
    careVi: 'Rửa bằng tay',
    careEn: 'Hand wash only',
    storyVi: 'Lấy cảm hứng từ thiên nhiên',
    storyEn: 'Inspired by nature',
    authorCredit: 'Hộ ông Tới',
    images: [{ url: 'image1.jpg', approvedForPublic: true }]
  };

  it('should pass for a clean passport', () => {
    const result = checkPassportPrivacy(defaultPassport, defaultContext);
    expect(result.isSafe).toBe(true);
    expect(result.violations.length).toBe(0);
  });

  it('should fail if phone number is detected', () => {
    const passport = { ...defaultPassport, storyVi: 'Liên hệ 0901234567 để biết thêm' };
    const result = checkPassportPrivacy(passport, defaultContext);
    
    expect(result.isSafe).toBe(false);
    expect(result.violations[0]).toContain('số điện thoại');
  });

  it('should fail if price keywords or currency are detected', () => {
    const passport = { ...defaultPassport, careVi: 'Giá: 500 VND' };
    const result = checkPassportPrivacy(passport, defaultContext);
    
    expect(result.isSafe).toBe(false);
    expect(result.violations[0]).toContain('ký hiệu tiền tệ');
  });

  it('should fail if customer name is detected', () => {
    const passport = { ...defaultPassport, storyVi: 'Làm riêng cho Acme Corp.' };
    const result = checkPassportPrivacy(passport, defaultContext);
    
    expect(result.isSafe).toBe(false);
    expect(result.violations[0]).toContain('khách hàng B2B');
  });

  it('should fail if household has not consented but author credit is present', () => {
    const context = { ...defaultContext, householdPublicConsent: false };
    const result = checkPassportPrivacy(defaultPassport, context);
    
    expect(result.isSafe).toBe(false);
    expect(result.violations[0]).toContain('chưa ký đồng ý công khai thông tin');
  });

  it('should fail if any image is not approved', () => {
    const passport = { ...defaultPassport, images: [
      { url: 'image1.jpg', approvedForPublic: true },
      { url: 'image2.jpg', approvedForPublic: false }
    ]};
    const result = checkPassportPrivacy(passport, defaultContext);
    
    expect(result.isSafe).toBe(false);
    expect(result.violations[0]).toContain('chưa được duyệt để hiển thị công khai');
  });

  it('should fail if inspector info is detected', () => {
    const passport = { ...defaultPassport, storyVi: 'Kiểm tra bởi Nguyen Van QC' };
    const result = checkPassportPrivacy(passport, defaultContext);
    
    expect(result.isSafe).toBe(false);
    expect(result.violations[0]).toContain('tên người kiểm tra');
  });
});
