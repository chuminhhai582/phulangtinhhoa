import Link from "next/link";
import { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { HeroBackgroundCarousel, type HeroMedia } from "@/components/home/HeroBackgroundCarousel";

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

export default async function HomePage() {
  const supabase = createClient();
  const { data: setting } = await supabase
    .from("settings")
    .select("value")
    .eq("key", "hero_media")
    .single();

  const heroMedia: HeroMedia[] = setting?.value || [];

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-[600px] lg:min-h-[70vh] 2xl:min-h-[80vh] flex items-center">
        <HeroBackgroundCarousel media={heroMedia} />
        
        <div className="max-w-7xl 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 relative z-30">
          <div className="max-w-3xl">
            <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md text-white text-sm font-medium mb-6 border border-white/20">
              <span className="w-2 h-2 rounded-full bg-[var(--pl-jade)] mr-2 animate-pulse shadow-[0_0_8px_var(--pl-jade)]" />
              Mạng lưới sản xuất gốm phân tán
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-white leading-tight drop-shadow-xl">
              Gốm Phù Lãng<br />
              <span className="text-[var(--pl-clay)]">Tinh Hoa</span> truyền thống
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-white/90 leading-relaxed max-w-2xl drop-shadow-lg">
              Kết nối nghệ nhân gốm 700 năm tuổi với thị trường quốc tế. 
              Mỗi sản phẩm có hộ chiếu số — truy xuất từ bàn tay tạo hình đến mẻ nung cuối cùng.
            </p>
            <div className="flex flex-wrap gap-4 mt-8">
              <Link href="/lien-he" className="px-8 py-4 bg-[var(--pl-clay)] text-white font-medium rounded-xl hover:bg-[var(--pl-eel)] transition-all hover:shadow-lg hover:shadow-[var(--pl-clay)]/20 text-base shadow-xl">
                Gửi yêu cầu hợp tác
              </Link>
              <Link href="/bo-suu-tap" className="px-8 py-4 border-2 border-white/70 text-white font-medium rounded-xl hover:border-white hover:bg-white/10 transition-colors text-base backdrop-blur-sm drop-shadow-md">
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
        <div className="max-w-7xl 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
        <div className="max-w-7xl 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
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
        <div className="max-w-7xl 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
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
        <div className="max-w-7xl 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
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
        <div className="max-w-7xl 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
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

    </>
  );
}
