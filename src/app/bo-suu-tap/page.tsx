import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bộ sưu tập | Phù Lãng Tinh Hoa",
  description: "Các bộ sưu tập gốm thủ công Phù Lãng — giới hạn bản, đánh số từng sản phẩm.",
};

const collections = [
  { slug: "thu-lan", name: "Thu Lãng", edition: "50 bản", year: "2026", desc: "Bộ sưu tập men da lươn truyền thống, lấy cảm hứng từ mùa thu Phù Lãng", count: 8, status: "Đang bán" },
  { slug: "hoa-dat", name: "Hoa Đất", edition: "30 bản", year: "2026", desc: "Phù điêu trang trí nội thất, khắc hoa văn truyền thống Kinh Bắc", count: 5, status: "Đang bán" },
  { slug: "tra-dao", name: "Trà Đạo Phù Lãng", edition: "100 bản", year: "2025", desc: "Bộ ấm trà từ đất Phù Lãng, nung củi truyền thống", count: 12, status: "Đã bán hết" },
  { slug: "lang-nghe", name: "Làng Nghề", edition: "Không giới hạn", year: "2025", desc: "Dòng sản phẩm lưu niệm du lịch cho khách tham quan làng gốm", count: 20, status: "Đang bán" },
];

export default function CollectionsPage() {
  return (
    <div className="min-h-screen bg-[var(--pl-ivory)]">
      <nav className="sticky top-0 z-50 bg-[var(--pl-ivory)]/95 backdrop-blur-sm border-b border-[var(--pl-ash)]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[var(--pl-clay)] rounded-lg flex items-center justify-center text-white font-bold">P</div>
            <span className="font-heading font-bold text-xl text-[var(--pl-char)]">Phù Lãng Tinh Hoa</span>
          </Link>
          <Link href="/lien-he" className="px-5 py-2.5 bg-[var(--pl-clay)] text-white text-sm font-medium rounded-lg hover:bg-[var(--pl-eel)] transition-colors">Liên hệ</Link>
        </div>
      </nav>

      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-heading font-bold text-[var(--pl-char)]">Bộ sưu tập</h1>
          <p className="mt-4 text-lg text-[var(--pl-char)]/60 max-w-2xl">
            Mỗi bộ sưu tập kể một câu chuyện, giới hạn bản, đánh số từng sản phẩm.
          </p>
        </div>
      </section>

      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {collections.map((c, i) => (
              <Link key={i} href={`/bo-suu-tap/${c.slug}`} className="group bg-white rounded-2xl border border-[var(--pl-ash)]/30 overflow-hidden hover:shadow-xl hover:shadow-[var(--pl-clay)]/10 transition-all duration-300">
                <div className="aspect-[16/9] bg-gradient-to-br from-[var(--pl-eel)]/20 to-[var(--pl-clay)]/20 flex items-center justify-center">
                  <span className="text-6xl opacity-50 group-hover:scale-110 transition-transform">🏺</span>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-[var(--pl-clay)]/10 text-[var(--pl-clay)]">{c.year}</span>
                    <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-[var(--pl-jade)]/10 text-[var(--pl-jade)]">{c.edition}</span>
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${c.status === 'Đã bán hết' ? 'bg-gray-100 text-gray-500' : 'bg-green-50 text-green-600'}`}>{c.status}</span>
                  </div>
                  <h2 className="text-xl font-heading font-bold text-[var(--pl-char)] group-hover:text-[var(--pl-clay)] transition-colors">{c.name}</h2>
                  <p className="mt-2 text-sm text-[var(--pl-char)]/60">{c.desc}</p>
                  <p className="mt-3 text-xs text-[var(--pl-char)]/40">{c.count} thiết kế</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
