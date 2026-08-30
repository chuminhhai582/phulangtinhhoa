import Link from "next/link";

export function PublicFooter() {
  return (
    <footer className="border-t border-[var(--pl-ash)]/30 bg-[var(--pl-char)] text-white/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 bg-[var(--pl-clay)] rounded-lg flex items-center justify-center text-white font-bold">
                P
              </div>
              <span className="font-heading font-bold text-xl text-white">
                Phù Lãng Tinh Hoa
              </span>
            </div>
            <p className="text-sm text-white/50 max-w-sm leading-relaxed">
              Hệ điều hành vận hành cho mạng lưới sản xuất gốm thủ công phân tán tại Phù Lãng, Quế Võ, Bắc Ninh.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-3 text-sm">Khám phá</h4>
            <div className="flex flex-col gap-2">
              <Link href="/nang-luc" className="text-sm hover:text-white transition-colors">Năng lực</Link>
              <Link href="/bo-suu-tap" className="text-sm hover:text-white transition-colors">Bộ sưu tập</Link>
              <Link href="/nghe-nhan" className="text-sm hover:text-white transition-colors">Nghệ nhân</Link>
              <Link href="/quy-trinh-chat-luong" className="text-sm hover:text-white transition-colors">Chất lượng</Link>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-3 text-sm">Liên hệ</h4>
            <div className="flex flex-col gap-2 text-sm">
              <span>Phù Lãng, Quế Võ, Bắc Ninh</span>
              <Link href="/lien-he" className="hover:text-white transition-colors">Gửi yêu cầu →</Link>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-white/10 text-sm text-white/40 text-center">
          © 2026 Phù Lãng Tinh Hoa. Dự án Khởi nghiệp ĐMST tỉnh Bắc Ninh.
        </div>
      </div>
    </footer>
  );
}
