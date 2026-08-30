import Link from "next/link";

export default function ArtisanDetailPage({ params }: { params: { slug: string } }) {
  const artisan = {
    name: "Hộ Ông Nguyễn Văn Tới", generation: 4, hamlet: "Thôn Phù Lãng",
    bio: "Đời thứ 4 nối nghiệp gốm Phù Lãng. Ông Tới được biết đến với kỹ thuật vuốt tay chập chiếc tạo hình bình lớn — một kỹ năng đòi hỏi hàng chục năm rèn luyện. Mỗi sản phẩm từ tay ông mang dấu ấn riêng biệt của men da lươn nung củi truyền thống.",
    techniques: [
      { name: "Vuốt tay chập chiếc", level: 5, years: 35 },
      { name: "Men da lươn truyền thống", level: 5, years: 30 },
      { name: "Nung củi lò bầu", level: 4, years: 25 },
      { name: "Khắc chìm", level: 3, years: 15 },
    ],
    works: [
      { name: "Bình Thu Vàng", collection: "Thu Lãng", height: "320mm" },
      { name: "Bình Hoa Lớn", collection: "Đơn hàng riêng", height: "800mm" },
      { name: "Ấm Trà Phù Lãng", collection: "Trà Đạo", height: "150mm" },
    ],
  };

  return (
    <div className="min-h-screen bg-[var(--pl-ivory)]">
      <nav className="sticky top-0 z-50 bg-[var(--pl-ivory)]/95 backdrop-blur-sm border-b border-[var(--pl-ash)]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[var(--pl-clay)] rounded-lg flex items-center justify-center text-white font-bold">P</div>
            <span className="font-heading font-bold text-xl text-[var(--pl-char)]">Phù Lãng Tinh Hoa</span>
          </Link>
          <Link href="/nghe-nhan" className="text-sm text-[var(--pl-char)]/60 hover:text-[var(--pl-clay)]">← Tất cả nghệ nhân</Link>
        </div>
      </nav>

      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left: portrait */}
            <div>
              <div className="aspect-[3/4] bg-gradient-to-br from-[var(--pl-eel)]/15 to-[var(--pl-clay)]/15 rounded-2xl flex items-center justify-center mb-6">
                <div className="w-24 h-24 rounded-full bg-[var(--pl-ash)]/30 flex items-center justify-center text-5xl">👤</div>
              </div>
              <div className="bg-white rounded-xl p-5 border border-[var(--pl-ash)]/30">
                <h3 className="font-semibold text-sm text-[var(--pl-char)] mb-3">Thông tin</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-[var(--pl-char)]/50">Truyền thống</span><span className="font-medium">Đời thứ {artisan.generation}</span></div>
                  <div className="flex justify-between"><span className="text-[var(--pl-char)]/50">Địa chỉ</span><span className="font-medium">{artisan.hamlet}</span></div>
                  <div className="flex justify-between"><span className="text-[var(--pl-char)]/50">Tác phẩm</span><span className="font-medium">{artisan.works.length} tác phẩm</span></div>
                </div>
              </div>
            </div>

            {/* Right: info */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h1 className="text-3xl sm:text-4xl font-heading font-bold text-[var(--pl-char)]">{artisan.name}</h1>
                <p className="mt-2 text-[var(--pl-clay)] font-medium">Đời thứ {artisan.generation} làm nghề gốm Phù Lãng</p>
                <p className="mt-6 text-[var(--pl-char)]/70 leading-relaxed">{artisan.bio}</p>
              </div>

              <div>
                <h2 className="text-xl font-heading font-bold text-[var(--pl-char)] mb-4">Kỹ thuật thành thạo</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {artisan.techniques.map((t, i) => (
                    <div key={i} className="bg-white rounded-xl p-4 border border-[var(--pl-ash)]/30">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-sm">{t.name}</span>
                        <div className="flex gap-0.5">
                          {[1,2,3,4,5].map(l => (
                            <div key={l} className={`w-2 h-2 rounded-full ${l <= t.level ? 'bg-[var(--pl-clay)]' : 'bg-[var(--pl-ash)]/30'}`} />
                          ))}
                        </div>
                      </div>
                      <p className="text-xs text-[var(--pl-char)]/50">{t.years} năm kinh nghiệm</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-xl font-heading font-bold text-[var(--pl-char)] mb-4">Tác phẩm tiêu biểu</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {artisan.works.map((w, i) => (
                    <div key={i} className="bg-white rounded-xl border border-[var(--pl-ash)]/30 overflow-hidden">
                      <div className="aspect-square bg-gradient-to-br from-[var(--pl-eel)]/10 to-[var(--pl-clay)]/10 flex items-center justify-center">
                        <span className="text-4xl opacity-30">🏺</span>
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-sm">{w.name}</h3>
                        <p className="text-xs text-[var(--pl-char)]/50 mt-1">{w.collection} · Cao {w.height}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
