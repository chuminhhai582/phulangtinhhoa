import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Phù Lãng Tinh Hoa — Gốm thủ công Phù Lãng, Bắc Ninh",
  description: "Hệ điều hành vận hành cho mạng lưới sản xuất gốm thủ công phân tán tại Phù Lãng, Bắc Ninh. Truy xuất nguồn gốc, kiểm soát chất lượng, bảo vệ hộ nghề.",
};

const process6Steps = [
  { step: "01", title: "Tiếp nhận & sàng lọc", desc: "Đánh giá yêu cầu, chấm điểm phù hợp với năng lực mạng lưới" },
  { step: "02", title: "Đồng thiết kế & định giá", desc: "Làm việc cùng khách hàng, thiết lập mẫu chuẩn và bộ dung sai" },
  { step: "03", title: "Chọn hộ sản xuất", desc: "Thuật toán so khớp năng lực, lịch lò và lịch sử chất lượng" },
  { step: "04", title: "Chốt mẫu chuẩn", desc: "Khách hàng ký duyệt mẫu và bảng dung sai ba nhóm đặc tính" },
  { step: "05", title: "Sản xuất & kiểm tra", desc: "5 điểm kiểm tra bắt buộc, 6 cổng chặn không thể vượt" },
  { step: "06", title: "Xuất khẩu & học lại", desc: "Đóng gói, chứng từ, hộ chiếu số và báo cáo chất lượng" },
];

const capabilities = [
  { icon: "🏺", title: "Vuốt tay chập chiếc", desc: "Kỹ thuật truyền thống 700 năm, tạo hình bằng tay từng sản phẩm" },
  { icon: "🔥", title: "Nung củi & nung gas", desc: "Đa dạng lò nung, kiểm soát nhiệt độ tới 1280°C" },
  { icon: "🎨", title: "Men da lươn truyền thống", desc: "Men tro trấu, men da lươn — bản sắc riêng biệt của Phù Lãng" },
  { icon: "📐", title: "Kích thước lên đến 1.5m", desc: "Từ ấm trà tinh xảo đến bình lớn trang trí kiến trúc" },
  { icon: "✅", title: "Kiểm soát chất lượng 5 điểm", desc: "Mỗi sản phẩm qua 5 lần kiểm tra với ảnh chứng minh" },
  { icon: "📱", title: "Hộ chiếu số truy xuất", desc: "Quét QR để biết ai làm, khi nào nung, chất lượng ra sao" },
];

const stats = [
  { value: "700+", label: "năm truyền thống" },
  { value: "25+", label: "hộ nghề trong mạng lưới" },
  { value: "5", label: "điểm kiểm tra bắt buộc" },
  { value: "<3%", label: "tỷ lệ vỡ hỏng mục tiêu" },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[var(--pl-ivory)]">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-[var(--pl-ivory)]/95 backdrop-blur-sm border-b border-[var(--pl-ash)]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-[var(--pl-clay)] rounded-lg flex items-center justify-center text-white font-bold text-lg">P</div>
              <span className="font-heading font-bold text-xl text-[var(--pl-char)]">Phù Lãng Tinh Hoa</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <Link href="/nang-luc" className="text-sm font-medium text-[var(--pl-char)]/70 hover:text-[var(--pl-clay)] transition-colors">Năng lực</Link>
              <Link href="/bo-suu-tap" className="text-sm font-medium text-[var(--pl-char)]/70 hover:text-[var(--pl-clay)] transition-colors">Bộ sưu tập</Link>
              <Link href="/nghe-nhan" className="text-sm font-medium text-[var(--pl-char)]/70 hover:text-[var(--pl-clay)] transition-colors">Nghệ nhân</Link>
              <Link href="/quy-trinh-chat-luong" className="text-sm font-medium text-[var(--pl-char)]/70 hover:text-[var(--pl-clay)] transition-colors">Chất lượng</Link>
              <Link href="/lien-he" className="px-5 py-2.5 bg-[var(--pl-clay)] text-white text-sm font-medium rounded-lg hover:bg-[var(--pl-eel)] transition-colors">Liên hệ</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--pl-eel)]/5 via-transparent to-[var(--pl-clay)]/5" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 relative">
          <div className="max-w-3xl">
            <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-[var(--pl-clay)]/10 text-[var(--pl-clay)] text-sm font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-[var(--pl-jade)] mr-2 animate-pulse" />
              Mạng lưới sản xuất gốm phân tán
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-[var(--pl-char)] leading-tight">
              Gốm Phù Lãng<br />
              <span className="text-[var(--pl-clay)]">Tinh Hoa</span> truyền thống
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-[var(--pl-char)]/70 leading-relaxed max-w-2xl">
              Kết nối nghệ nhân gốm 700 năm tuổi với thị trường quốc tế. 
              Mỗi sản phẩm có hộ chiếu số — truy xuất từ bàn tay tạo hình đến mẻ nung cuối cùng.
            </p>
            <div className="flex flex-wrap gap-4 mt-8">
              <Link href="/lien-he" className="px-8 py-4 bg-[var(--pl-clay)] text-white font-medium rounded-xl hover:bg-[var(--pl-eel)] transition-all hover:shadow-lg hover:shadow-[var(--pl-clay)]/20 text-base">
                Gửi yêu cầu hợp tác
              </Link>
              <Link href="/bo-suu-tap" className="px-8 py-4 border-2 border-[var(--pl-ash)] text-[var(--pl-char)] font-medium rounded-xl hover:border-[var(--pl-clay)] hover:text-[var(--pl-clay)] transition-colors text-base">
                Xem bộ sưu tập
              </Link>
            </div>
          </div>
        </div>
        {/* Decorative pottery pattern */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-gradient-to-br from-[var(--pl-clay)]/10 to-[var(--pl-eel)]/10 blur-3xl hidden lg:block" />
      </section>

      {/* Stats */}
      <section className="border-y border-[var(--pl-ash)]/30 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {stats.map((s, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl sm:text-4xl font-heading font-bold text-[var(--pl-clay)]">{s.value}</div>
                <div className="mt-1 text-sm text-[var(--pl-char)]/60 font-medium">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-[var(--pl-char)]">Năng lực mạng lưới</h2>
            <p className="mt-4 text-[var(--pl-char)]/60 text-lg">Từ kỹ thuật truyền thống đến quy trình kiểm soát chất lượng hiện đại</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((cap, i) => (
              <div key={i} className="group p-6 bg-white rounded-2xl border border-[var(--pl-ash)]/30 hover:border-[var(--pl-clay)]/30 hover:shadow-lg hover:shadow-[var(--pl-clay)]/5 transition-all duration-300">
                <div className="text-4xl mb-4">{cap.icon}</div>
                <h3 className="text-lg font-semibold text-[var(--pl-char)] group-hover:text-[var(--pl-clay)] transition-colors">{cap.title}</h3>
                <p className="mt-2 text-sm text-[var(--pl-char)]/60 leading-relaxed">{cap.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/nang-luc" className="inline-flex items-center text-[var(--pl-clay)] font-medium hover:underline">
              Xem đầy đủ năng lực mạng lưới →
            </Link>
          </div>
        </div>
      </section>

      {/* 6-Step Process */}
      <section className="py-20 lg:py-28 bg-white/50 border-y border-[var(--pl-ash)]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-[var(--pl-char)]">Quy trình 6 bước</h2>
            <p className="mt-4 text-[var(--pl-char)]/60 text-lg">Từ yêu cầu đến giao hàng — mỗi bước có cổng chặn không thể vượt</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {process6Steps.map((step, i) => (
              <div key={i} className="relative p-6 bg-white rounded-2xl border border-[var(--pl-ash)]/30 hover:border-[var(--pl-eel-light)]/50 transition-all">
                <div className="text-sm font-bold text-[var(--pl-clay)] mb-3">BƯỚC {step.step}</div>
                <h3 className="text-lg font-semibold text-[var(--pl-char)]">{step.title}</h3>
                <p className="mt-2 text-sm text-[var(--pl-char)]/60 leading-relaxed">{step.desc}</p>
                {i < process6Steps.length - 1 && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 text-[var(--pl-ash)] text-2xl">→</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Digital Passport CTA */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-[var(--pl-eel)] to-[var(--pl-char)] rounded-3xl p-8 sm:p-12 lg:p-16 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDE4YzAtOS45NC04LjA2LTE4LTE4LTE4djM2YzkuOTQgMCAxOC04LjA2IDE4LTE4eiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
            <div className="relative max-w-2xl">
              <h2 className="text-3xl sm:text-4xl font-heading font-bold">Hộ chiếu số cho mỗi sản phẩm</h2>
              <p className="mt-4 text-white/80 text-lg leading-relaxed">
                Mỗi tác phẩm gốm mang một mã QR duy nhất. Khách hàng quét để biết: ai làm, lô nung nào, 
                kiểm tra chất lượng ra sao — minh bạch từ bàn tay nghệ nhân đến tận nơi trưng bày.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/p/PL-P-26A7K3" className="px-6 py-3 bg-white text-[var(--pl-eel)] font-medium rounded-xl hover:bg-white/90 transition-colors">
                  Xem hộ chiếu mẫu →
                </Link>
                <Link href="/quy-trinh-chat-luong" className="px-6 py-3 border border-white/30 text-white font-medium rounded-xl hover:bg-white/10 transition-colors">
                  Tìm hiểu quy trình
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Contact */}
      <section className="py-20 lg:py-28 bg-white/50 border-t border-[var(--pl-ash)]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-[var(--pl-char)]">Bắt đầu dự án cùng chúng tôi</h2>
          <p className="mt-4 text-[var(--pl-char)]/60 text-lg max-w-xl mx-auto">
            Gửi yêu cầu của bạn — chúng tôi sẽ phản hồi trong 48 giờ với đánh giá sơ bộ về khả năng thực hiện.
          </p>
          <div className="mt-8">
            <Link href="/lien-he" className="inline-flex px-8 py-4 bg-[var(--pl-clay)] text-white font-medium rounded-xl hover:bg-[var(--pl-eel)] transition-all hover:shadow-lg text-base">
              Liên hệ ngay
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[var(--pl-ash)]/30 bg-[var(--pl-char)] text-white/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 bg-[var(--pl-clay)] rounded-lg flex items-center justify-center text-white font-bold">P</div>
                <span className="font-heading font-bold text-xl text-white">Phù Lãng Tinh Hoa</span>
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
    </div>
  );
}
