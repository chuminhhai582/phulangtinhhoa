import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Năng lực mạng lưới | Phù Lãng Tinh Hoa",
  description: "Năng lực sản xuất gốm thủ công Phù Lãng: kỹ thuật, giới hạn kích thước, quy trình kiểm soát chất lượng 6 bước.",
};

const techniques = [
  { name: "Vuốt tay chập chiếc", group: "Tạo hình", desc: "Kỹ thuật truyền thống 700 năm, bàn xoay tay", level: 5, artisans: 18 },
  { name: "Đổ rót khuôn", group: "Tạo hình", desc: "Cho sản phẩm đồng đều kích thước, sản lượng lớn", level: 3, artisans: 12 },
  { name: "Chuốt tay", group: "Tạo hình", desc: "Tạo hình tượng, phù điêu, chi tiết phức tạp", level: 4, artisans: 8 },
  { name: "Men da lươn", group: "Men", desc: "Men truyền thống đặc trưng Phù Lãng, sắc nâu ấm", level: 5, artisans: 20 },
  { name: "Men tro trấu", group: "Men", desc: "Men từ tro trấu, tạo hiệu ứng tự nhiên độc đáo", level: 4, artisans: 15 },
  { name: "Men xanh đồng", group: "Men", desc: "Men đồng oxit, hiệu ứng xanh biến thiên", level: 3, artisans: 6 },
  { name: "Nung củi truyền thống", group: "Nung", desc: "Lò bầu, 3–4 ngày, men chảy tự nhiên", level: 5, artisans: 10 },
  { name: "Nung gas kiểm soát", group: "Nung", desc: "Kiểm soát nhiệt chính xác, thời gian ngắn hơn", level: 4, artisans: 16 },
  { name: "Khắc chìm", group: "Trang trí", desc: "Khắc hoa văn trực tiếp trên gốm mộc", level: 4, artisans: 14 },
];

const productLimits = [
  { type: "Bình hoa", maxH: "1500mm", maxD: "600mm", monthly: "~200 sản phẩm", lead: "30–45 ngày" },
  { type: "Tượng linh vật", maxH: "1200mm", maxD: "800mm", monthly: "~80 sản phẩm", lead: "45–60 ngày" },
  { type: "Ấm trà bộ", maxH: "200mm", maxD: "300mm", monthly: "~500 bộ", lead: "20–30 ngày" },
  { type: "Chậu bonsai", maxH: "400mm", maxD: "600mm", monthly: "~300 sản phẩm", lead: "25–35 ngày" },
  { type: "Phù điêu trang trí", maxH: "1000mm", maxD: "1200mm", monthly: "~50 tấm", lead: "40–60 ngày" },
  { type: "Đèn gốm", maxH: "600mm", maxD: "400mm", monthly: "~150 sản phẩm", lead: "25–40 ngày" },
];

export default function CapabilityPage() {
  return (
    <div className="min-h-screen bg-[var(--pl-ivory)]">
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-[var(--pl-ivory)]/95 backdrop-blur-sm border-b border-[var(--pl-ash)]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[var(--pl-clay)] rounded-lg flex items-center justify-center text-white font-bold">P</div>
            <span className="font-heading font-bold text-xl text-[var(--pl-char)]">Phù Lãng Tinh Hoa</span>
          </Link>
          <Link href="/lien-he" className="px-5 py-2.5 bg-[var(--pl-clay)] text-white text-sm font-medium rounded-lg hover:bg-[var(--pl-eel)] transition-colors">Liên hệ</Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-heading font-bold text-[var(--pl-char)]">Năng lực mạng lưới</h1>
          <p className="mt-4 text-lg text-[var(--pl-char)]/60 max-w-2xl">
            25+ hộ nghề với đa dạng kỹ thuật, lò nung và chuyên môn. Dưới đây là bản đồ năng lực hiện tại.
          </p>
        </div>
      </section>

      {/* Techniques */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-heading font-bold text-[var(--pl-char)] mb-8">Kỹ thuật sẵn có</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {techniques.map((t, i) => (
              <div key={i} className="bg-white rounded-xl border border-[var(--pl-ash)]/30 p-5 hover:shadow-md transition-all">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-[var(--pl-clay)]/10 text-[var(--pl-clay)]">{t.group}</span>
                  <div className="flex gap-0.5">
                    {[1,2,3,4,5].map(l => (
                      <div key={l} className={`w-2 h-2 rounded-full ${l <= t.level ? 'bg-[var(--pl-clay)]' : 'bg-[var(--pl-ash)]/30'}`} />
                    ))}
                  </div>
                </div>
                <h3 className="font-semibold text-[var(--pl-char)]">{t.name}</h3>
                <p className="text-sm text-[var(--pl-char)]/60 mt-1">{t.desc}</p>
                <p className="text-xs text-[var(--pl-char)]/40 mt-3">{t.artisans} hộ nghề thành thạo</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Limits */}
      <section className="py-20 bg-white/50 border-y border-[var(--pl-ash)]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-heading font-bold text-[var(--pl-char)] mb-8">Giới hạn sản phẩm</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--pl-ash)]/30">
                  <th className="text-left py-3 px-4 font-semibold text-[var(--pl-char)]">Loại sản phẩm</th>
                  <th className="text-left py-3 px-4 font-semibold text-[var(--pl-char)]">Chiều cao tối đa</th>
                  <th className="text-left py-3 px-4 font-semibold text-[var(--pl-char)]">Đường kính tối đa</th>
                  <th className="text-left py-3 px-4 font-semibold text-[var(--pl-char)]">Công suất / tháng</th>
                  <th className="text-left py-3 px-4 font-semibold text-[var(--pl-char)]">Thời gian hoàn thành</th>
                </tr>
              </thead>
              <tbody>
                {productLimits.map((p, i) => (
                  <tr key={i} className="border-b border-[var(--pl-ash)]/20 hover:bg-[var(--pl-clay)]/5 transition-colors">
                    <td className="py-3 px-4 font-medium">{p.type}</td>
                    <td className="py-3 px-4 text-[var(--pl-char)]/70">{p.maxH}</td>
                    <td className="py-3 px-4 text-[var(--pl-char)]/70">{p.maxD}</td>
                    <td className="py-3 px-4 text-[var(--pl-char)]/70">{p.monthly}</td>
                    <td className="py-3 px-4 text-[var(--pl-char)]/70">{p.lead}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 text-center">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-heading font-bold text-[var(--pl-char)]">Không chắc chắn yêu cầu có phù hợp?</h2>
          <p className="mt-3 text-[var(--pl-char)]/60">Gửi mô tả dự án — chúng tôi sẽ đánh giá miễn phí trong 48 giờ.</p>
          <Link href="/lien-he" className="mt-6 inline-flex px-8 py-4 bg-[var(--pl-clay)] text-white font-medium rounded-xl hover:bg-[var(--pl-eel)] transition-colors">
            Gửi yêu cầu
          </Link>
        </div>
      </section>
    </div>
  );
}
