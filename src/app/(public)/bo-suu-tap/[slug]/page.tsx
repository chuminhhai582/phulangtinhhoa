import Link from "next/link";

export default function CollectionDetailPage({ params }: { params: { slug: string } }) {
  // Mock data — in real app this comes from Supabase
  const collection = {
    name: "Thu Lãng",
    nameEn: "Autumn Lãng",
    edition: 50,
    year: 2026,
    narrative: "Lấy cảm hứng từ sắc thu Phù Lãng — khi lá bàng đổi màu và khói lò nung quyện vào sương sớm. Mỗi tác phẩm trong bộ sưu tập mang một sắc men da lươn riêng biệt, không cái nào giống cái nào — như chính mùa thu, mỗi năm một khác.",
    designs: [
      { id: "1", name: "Bình Thu Vàng", serial: "01/50", height: "320mm", technique: "Vuốt tay", household: "Hộ Ông Tới" },
      { id: "2", name: "Bình Thu Nâu", serial: "02/50", height: "280mm", technique: "Vuốt tay", household: "Hộ Bà Lan" },
      { id: "3", name: "Ấm Thu Sương", serial: "03/50", height: "150mm", technique: "Chuốt tay", household: "Hộ Ông Hùng" },
      { id: "4", name: "Chén Thu Lá", serial: "04/50", height: "80mm", technique: "Đổ rót", household: "Hộ Ông Tới" },
    ],
  };

  return (
    <>
      

      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-[var(--pl-clay)]/10 text-[var(--pl-clay)]">{collection.year}</span>
            <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-[var(--pl-jade)]/10 text-[var(--pl-jade)]">Giới hạn {collection.edition} bản</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-heading font-bold text-[var(--pl-char)]">{collection.name}</h1>
          <p className="mt-6 text-lg text-[var(--pl-char)]/70 max-w-3xl leading-relaxed">{collection.narrative}</p>
        </div>
      </section>

      {/* Gallery placeholder */}
      <section className="pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="aspect-[21/9] bg-gradient-to-br from-[var(--pl-eel)]/10 to-[var(--pl-clay)]/10 rounded-2xl flex items-center justify-center border border-[var(--pl-ash)]/20">
            <span className="text-6xl opacity-30">🏺 🏺 🏺</span>
          </div>
        </div>
      </section>

      {/* Designs */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-heading font-bold text-[var(--pl-char)] mb-6">Tác phẩm trong bộ sưu tập</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {collection.designs.map((d) => (
              <div key={d.id} className="bg-white rounded-xl border border-[var(--pl-ash)]/30 p-5 hover:shadow-md transition-all">
                <div className="aspect-square bg-gradient-to-br from-[var(--pl-eel)]/10 to-[var(--pl-clay)]/10 rounded-lg mb-4 flex items-center justify-center">
                  <span className="text-4xl opacity-40">🏺</span>
                </div>
                <div className="text-xs font-medium text-[var(--pl-clay)] mb-1">Bản {d.serial}</div>
                <h3 className="font-semibold text-[var(--pl-char)]">{d.name}</h3>
                <div className="mt-2 space-y-1 text-xs text-[var(--pl-char)]/50">
                  <p>Cao {d.height} · {d.technique}</p>
                  <p>{d.household}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}