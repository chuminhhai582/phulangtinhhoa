export interface PassportData {
  materialsPublic: string;
  careVi: string;
  careEn: string;
  storyVi: string;
  storyEn: string;
  authorCredit: string;
  images: Array<{ url: string; approvedForPublic: boolean }>;
}

export interface PrivacyContext {
  customerName: string;
  contractCode: string;
  householdPublicConsent: boolean;
  inspectorName: string;
  inspectorContact: string;
}

export interface PrivacyCheckResult {
  isSafe: boolean;
  violations: string[];
}

/**
 * Kiểm tra cổng G-Privacy trước khi công bố hộ chiếu số (published = true)
 * Phục vụ tiêu chí "An toàn" trong hồ sơ dự thi.
 */
export function checkPassportPrivacy(
  passport: PassportData,
  context: PrivacyContext
): PrivacyCheckResult {
  const violations: string[] = [];

  // Gom tất cả các trường văn bản công khai để quét một lần
  const allText = [
    passport.materialsPublic,
    passport.careVi,
    passport.careEn,
    passport.storyVi,
    passport.storyEn,
    passport.authorCredit,
  ].join(' | ');

  // 1. Quét số điện thoại (đơn giản hóa)
  const phoneRegex = /(?:\+84|0)(?:\d[\s.-]?){8,10}\d/g;
  if (phoneRegex.test(allText)) {
    violations.push('Phát hiện dữ liệu giống số điện thoại trong văn bản công khai.');
  }

  // 2. Quét số tiền / ký hiệu tiền tệ / từ khóa giá
  const moneyRegex = /(\$|€|£|¥|VND|VNĐ|USD|EUR|giá:|price:|chi phí|cost:)/gi;
  if (moneyRegex.test(allText)) {
    violations.push('Phát hiện ký hiệu tiền tệ hoặc từ khóa liên quan đến giá bán.');
  }

  // 3. Quét tên khách hàng / hợp đồng
  if (context.customerName && allText.toLowerCase().includes(context.customerName.toLowerCase())) {
    violations.push('Phát hiện tên khách hàng B2B trong văn bản công khai.');
  }
  if (context.contractCode && allText.includes(context.contractCode)) {
    violations.push('Phát hiện mã hợp đồng trong văn bản công khai.');
  }

  // 4. Quyền tác giả & consent của hộ nghề
  if (passport.authorCredit.trim() !== '' && !context.householdPublicConsent) {
    violations.push('Tên nghệ nhân được ghi danh nhưng hộ sản xuất chưa ký đồng ý công khai thông tin (public_consent = false).');
  }

  // 5. Ảnh phải được đánh dấu approved_for_public
  const unapprovedImages = passport.images.filter(img => !img.approvedForPublic);
  if (unapprovedImages.length > 0) {
    violations.push(`Có ${unapprovedImages.length} ảnh chưa được duyệt để hiển thị công khai (thiếu cờ approvedForPublic).`);
  }

  // 6. Dữ liệu cá nhân của người kiểm tra (QC)
  if (context.inspectorName && allText.toLowerCase().includes(context.inspectorName.toLowerCase())) {
    violations.push('Phát hiện tên người kiểm tra chất lượng (QC) trong văn bản công khai.');
  }
  if (context.inspectorContact && allText.includes(context.inspectorContact)) {
    violations.push('Phát hiện thông tin liên hệ của người kiểm tra chất lượng (QC).');
  }

  return {
    isSafe: violations.length === 0,
    violations,
  };
}
