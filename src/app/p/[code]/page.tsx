import Link from "next/link";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: { code: string } }): Promise<Metadata> {
  return {
    title: `Hộ chiếu số ${params.code} | Phù Lãng Tinh Hoa`,
    description: `Thông tin truy xuất nguồn gốc sản phẩm gốm Phù Lãng - mã ${params.code}`,
  };
}

export default function PassportPage({ params }: { params: { code: string } }) {
  // Mock passport data — in real app loaded from Supabase
  const passport = {
    code: params.code,
    designName: "Bình Thu Vàng",
    collection: "Thu Lãng",
    serial: "07/50",
    household: "Hộ Ông Nguyễn Văn Tới",
    generation: 4,
    hamlet: "Thôn Phù Lãng",
    techniques: ["Vuốt tay chập chiếc", "Men da lươn truyền thống"],
    materials: "Đất sét Phù Lãng, men da lươn từ tro trấu và đất đỏ địa phương",
    firedAt: "15/08/2026",
    timeline: [
      { date: "01/07/2026", event: "Tạo hình", desc: "Vuốt tay trên bàn xoay" },
      { date: "10/07/2026", event: "Phơi khô & tráng men", desc: "Men da lươn 2 lớp" },
      { date: "14/08/2026", event: "Nung", desc: "Lò gas, 1200°C, 36 giờ" },
      { date: "16/08/2026", event: "Kiểm tra sau nung", desc: "Đạt — 4 ảnh kiểm tra" },
      { date: "20/08/2026", event: "Đóng gói", desc: "Kiện G-07, đệm xốp PE" },
    ],
    careVi: "Tránh va đập mạnh. Lau bằng khăn mềm ẩm. Không ngâm nước lâu. Đặt trên bề mặt phẳng.",
    careEn: "Avoid strong impact. Wipe with a soft damp cloth. Do not soak in water. Place on a flat surface.",
    storyVi: "Bình Thu Vàng lấy cảm hứng từ sắc vàng của lá bàng mùa thu Phù Lãng. Men da lươn truyền thống tạo nên sắc nâu ấm đặc trưng — mỗi bình một sắc, tùy vào vị trí trong lò và dòng lửa.",
    batchCode: "PL-B-2026-0142",
  };

  return (
    <div className="min-h-screen bg-[var(--pl-ivory)]">
      {/* Minimal header */}
      <header className="bg-[var(--pl-char)] text-white py-3">
        <div className="max-w-2xl mx-auto px-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 bg-[var(--pl-clay)] rounded flex items-center justify-center text-white font-bold text-sm">P</div>
            <span className="font-heading font-semibold text-sm">Phù Lãng Tinh Hoa</span>
          </Link>
          <button className="text-xs px-3 py-1 border border-white/30 rounded-full hover:bg-white/10 transition-colors">
            VI / EN
          </button>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8 space-y-8">
        {/* Product images placeholder */}
        <div className="aspect-[4/3] bg-gradient-to-br from-[var(--pl-eel)]/20 to-[var(--pl-clay)]/20 rounded-2xl flex items-center justify-center">
          <span className="text-8xl opacity-30">🏺</span>
        </div>

        {/* Title */}
        <div className="text-center">
          <h1 className="text-3xl font-heading font-bold text-[var(--pl-char)]">{passport.designName}</h1>
          <p className="mt-1 text-[var(--pl-clay)] font-medium">{passport.collection} · Bản {passport.serial}</p>
          <p className="mt-2 text-sm text-[var(--pl-char)]/50">Mã: {passport.code}</p>
        </div>

        {/* Author */}
        <div className="bg-white rounded-2xl border border-[var(--pl-ash)]/30 p-6">
          <h2 className="text-sm font-semibold text-[var(--pl-char)]/50 uppercase tracking-wider mb-4">Người làm ra tác phẩm này</h2>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--pl-eel)]/15 to-[var(--pl-clay)]/15 flex items-center justify-center text-2xl shrink-0">👤</div>
            <div>
              <h3 className="font-heading font-bold text-[var(--pl-char)]">{passport.household}</h3>
              <p className="text-sm text-[var(--pl-clay)]">Đời thứ {passport.generation} làm gốm · {passport.hamlet}</p>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {passport.techniques.map((t, i) => (
                  <span key={i} className="text-xs px-2 py-0.5 rounded-full bg-[var(--pl-clay)]/10 text-[var(--pl-clay)]">{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Materials */}
        <div className="bg-white rounded-2xl border border-[var(--pl-ash)]/30 p-6">
          <h2 className="text-sm font-semibold text-[var(--pl-char)]/50 uppercase tracking-wider mb-3">Vật liệu & Men</h2>
          <p className="text-sm text-[var(--pl-char)]/70 leading-relaxed">{passport.materials}</p>
        </div>

        {/* Timeline */}
        <div className="bg-white rounded-2xl border border-[var(--pl-ash)]/30 p-6">
          <h2 className="text-sm font-semibold text-[var(--pl-char)]/50 uppercase tracking-wider mb-4">Hành trình sản phẩm</h2>
          <div className="space-y-0">
            {passport.timeline.map((t, i) => (
              <div key={i} className="flex gap-4 pb-4 last:pb-0">
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full bg-[var(--pl-clay)] shrink-0" />
                  {i < passport.timeline.length - 1 && <div className="w-0.5 flex-1 bg-[var(--pl-ash)]/30 mt-1" />}
                </div>
                <div className="pb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-[var(--pl-char)]/40 font-medium">{t.date}</span>
                    <span className="font-medium text-sm text-[var(--pl-char)]">{t.event}</span>
                  </div>
                  <p className="text-xs text-[var(--pl-char)]/50 mt-0.5">{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Care */}
        <div className="bg-white rounded-2xl border border-[var(--pl-ash)]/30 p-6">
          <h2 className="text-sm font-semibold text-[var(--pl-char)]/50 uppercase tracking-wider mb-3">Hướng dẫn bảo quản</h2>
          <p className="text-sm text-[var(--pl-char)]/70 leading-relaxed">{passport.careVi}</p>
          <p className="text-sm text-[var(--pl-char)]/50 mt-2 italic">{passport.careEn}</p>
        </div>

        {/* Story */}
        <div className="bg-white rounded-2xl border border-[var(--pl-ash)]/30 p-6">
          <h2 className="text-sm font-semibold text-[var(--pl-char)]/50 uppercase tracking-wider mb-3">Câu chuyện thiết kế</h2>
          <p className="text-sm text-[var(--pl-char)]/70 leading-relaxed">{passport.storyVi}</p>
        </div>

        {/* Footer */}
        <div className="text-center py-6 border-t border-[var(--pl-ash)]/30">
          <p className="text-xs text-[var(--pl-char)]/40">
            Kiểm tra bởi Phù Lãng Tinh Hoa · Mã lô {passport.batchCode}
          </p>
          <Link href="/quy-trinh-chat-luong" className="text-xs text-[var(--pl-clay)] hover:underline mt-1 inline-block">
            Tìm hiểu quy trình chất lượng →
          </Link>
        </div>
      </main>
    </div>
  );
}
