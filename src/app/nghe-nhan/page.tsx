import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nghệ nhân Phù Lãng | Phù Lãng Tinh Hoa",
  description: "Những hộ nghề gốm Phù Lãng đã đồng ý chia sẻ câu chuyện và kỹ thuật truyền thống.",
};

const artisans = [
  { slug: "ho-ong-toi", name: "Hộ Ông Nguyễn Văn Tới", generation: 4, techniques: ["Vuốt tay", "Men da lươn", "Nung củi"], bio: "Đời thứ 4 nối nghiệp gốm Phù Lãng. Chuyên bình lớn men da lươn truyền thống." },
  { slug: "ho-ba-lan", name: "Hộ Bà Trần Thị Lan", generation: 3, techniques: ["Chuốt tay", "Khắc chìm", "Men tro trấu"], bio: "Nổi tiếng với kỹ thuật khắc hoa văn tinh xảo trên bề mặt gốm." },
  { slug: "ho-ong-hung", name: "Hộ Ông Phạm Văn Hùng", generation: 5, techniques: ["Vuốt tay", "Nung gas", "Men da lươn"], bio: "Đời thứ 5 làm gốm. Chuyên sản phẩm kích thước lớn cho kiến trúc." },
  { slug: "ho-chi-mai", name: "Hộ Chị Nguyễn Thị Mai", generation: 2, techniques: ["Đổ rót", "Men xanh đồng"], bio: "Thế hệ trẻ, kết hợp kỹ thuật hiện đại với chất liệu truyền thống." },
  { slug: "ho-ong-duc", name: "Hộ Ông Lê Văn Đức", generation: 4, techniques: ["Vuốt tay", "Men da lươn", "Nung củi"], bio: "Bảo tồn kỹ thuật nung bầu truyền thống, men chảy tự nhiên." },
  { slug: "ho-ong-thanh", name: "Hộ Ông Đỗ Văn Thành", generation: 3, techniques: ["Chuốt tay", "Tượng", "Men tro"], bio: "Chuyên gia tạo hình tượng linh vật, phong thủy từ gốm Phù Lãng." },
];

export default function ArtisansPage() {
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
          <h1 className="text-4xl sm:text-5xl font-heading font-bold text-[var(--pl-char)]">Nghệ nhân Phù Lãng</h1>
          <p className="mt-4 text-lg text-[var(--pl-char)]/60 max-w-2xl">
            Những hộ nghề đã đồng ý chia sẻ câu chuyện. Chúng tôi tôn trọng quyền riêng tư — chỉ hiển thị khi hộ đồng ý.
          </p>
        </div>
      </section>

      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {artisans.map((a, i) => (
              <Link key={i} href={`/nghe-nhan/${a.slug}`} className="group bg-white rounded-2xl border border-[var(--pl-ash)]/30 overflow-hidden hover:shadow-xl hover:shadow-[var(--pl-clay)]/10 transition-all duration-300">
                <div className="aspect-[4/3] bg-gradient-to-br from-[var(--pl-eel)]/15 to-[var(--pl-clay)]/15 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-[var(--pl-ash)]/30 flex items-center justify-center text-3xl">👤</div>
                </div>
                <div className="p-6">
                  <h2 className="text-lg font-heading font-bold text-[var(--pl-char)] group-hover:text-[var(--pl-clay)] transition-colors">{a.name}</h2>
                  <p className="text-sm text-[var(--pl-clay)] mt-1">Đời thứ {a.generation} làm nghề gốm</p>
                  <p className="text-sm text-[var(--pl-char)]/60 mt-3">{a.bio}</p>
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {a.techniques.map((t, j) => (
                      <span key={j} className="text-xs px-2 py-0.5 rounded-full bg-[var(--pl-ash)]/20 text-[var(--pl-char)]/60">{t}</span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
