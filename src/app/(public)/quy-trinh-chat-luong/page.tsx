import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quy trình chất lượng | Phù Lãng Tinh Hoa",
  description: "Hệ thống kiểm soát chất lượng 5 điểm, bộ dung sai 3 nhóm đặc tính — đảm bảo mỗi sản phẩm gốm đạt chuẩn.",
};

const checkpoints = [
  { code: "01", name: "Trước sản xuất", icon: "📋", desc: "Phiếu yêu cầu, biên bản duyệt mẫu, ảnh mẫu đất–men", who: "Phụ trách chất lượng" },
  { code: "02", name: "Trước nung", icon: "📐", desc: "≥3 ảnh, bảng đo kích thước đã tính bù co, ký hiệu lô, số lượng dự phòng", who: "Hộ nghề nhập, QC duyệt" },
  { code: "03", name: "Sau nung", icon: "🔥", desc: "≥4 ảnh, số đo, phân loại nứt/cong/màu, đếm đạt–hỏng", who: "Phụ trách chất lượng" },
  { code: "04", name: "Trước đóng gói", icon: "📦", desc: "Ảnh sản phẩm đã làm sạch, nhãn, vật liệu đệm, sơ đồ xếp", who: "Phụ trách chất lượng" },
  { code: "05", name: "Trước giao", icon: "🚢", desc: "Ảnh từng kiện, số kiện, trọng lượng, danh sách đóng gói", who: "Phụ trách xuất khẩu" },
];

const toleranceGroups = [
  { name: "Bắt buộc đúng", color: "bg-red-50 border-red-200 text-red-800", icon: "🔴", examples: ["Kích thước lắp đặt", "Đường kính miệng", "Độ ổn định đứng"], action: "Loại bỏ — không thương lượng" },
  { name: "Có dung sai", color: "bg-amber-50 border-amber-200 text-amber-800", icon: "🟡", examples: ["Sắc độ men ±1 bậc", "Độ cong ≤2mm/100mm", "Chiều cao ±3%"], action: "Đạt nếu trong ngưỡng" },
  { name: "Độc bản", color: "bg-green-50 border-green-200 text-green-800", icon: "🟢", examples: ["Vân men chảy", "Dấu tay tạo hình", "Sắc thái nung"], action: "Không phải lỗi — được chấp nhận từ khi duyệt mẫu" },
];

export default function QualityProcessPage() {
  return (
    <>
      

      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-heading font-bold text-[var(--pl-char)]">Quy trình chất lượng</h1>
          <p className="mt-4 text-lg text-[var(--pl-char)]/60 max-w-3xl">
            Gốm thủ công không thể đồng nhất như sản xuất công nghiệp. Thay vì ép thủ công thành công nghiệp, 
            chúng tôi xây dựng <strong>bộ dung sai ba nhóm đặc tính</strong> — nơi sự khác biệt được hiểu đúng, không phải lỗi.
          </p>
        </div>
      </section>

      {/* 3 Tolerance Groups */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-heading font-bold text-[var(--pl-char)] mb-8">Ba nhóm đặc tính</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {toleranceGroups.map((g, i) => (
              <div key={i} className={`rounded-2xl border-2 p-6 ${g.color}`}>
                <div className="text-3xl mb-4">{g.icon}</div>
                <h3 className="text-xl font-heading font-bold">{g.name}</h3>
                <p className="mt-3 text-sm font-medium opacity-80">{g.action}</p>
                <div className="mt-4 space-y-2">
                  {g.examples.map((e, j) => (
                    <div key={j} className="flex items-center gap-2 text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-50" />
                      {e}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 bg-white rounded-xl p-6 border border-[var(--pl-ash)]/30">
            <p className="text-sm text-[var(--pl-char)]/70 leading-relaxed">
              <strong>Cách hoạt động:</strong> Trước khi sản xuất, khách hàng ký chấp nhận toàn bộ bảng dung sai. 
              Nhóm &ldquo;Độc bản&rdquo; được giải thích rõ bằng ảnh minh họa — khách biết sẽ nhận sản phẩm mỗi cái mỗi khác, 
              và đó chính là giá trị thủ công. Sau khi ký, mọi khiếu nại thuộc nhóm này đều được đối chiếu với bản ký.
            </p>
          </div>
        </div>
      </section>

      {/* 5 Checkpoints */}
      <section className="py-20 bg-white/50 border-y border-[var(--pl-ash)]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-heading font-bold text-[var(--pl-char)] mb-8">5 điểm kiểm tra bắt buộc</h2>
          <div className="space-y-4">
            {checkpoints.map((cp) => (
              <div key={cp.code} className="bg-white rounded-xl border border-[var(--pl-ash)]/30 p-6 flex flex-col sm:flex-row gap-4 sm:gap-6 items-start">
                <div className="flex items-center gap-4 shrink-0">
                  <span className="text-3xl">{cp.icon}</span>
                  <div className="text-sm font-bold text-[var(--pl-clay)]">#{cp.code}</div>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-[var(--pl-char)]">{cp.name}</h3>
                  <p className="text-sm text-[var(--pl-char)]/60 mt-1">{cp.desc}</p>
                  <p className="text-xs text-[var(--pl-char)]/40 mt-2">Người thực hiện: {cp.who}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 text-center">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-heading font-bold text-[var(--pl-char)]">Muốn tìm hiểu thêm?</h2>
          <p className="mt-3 text-[var(--pl-char)]/60">Liên hệ để nhận mẫu chuẩn và bảng dung sai cho dự án của bạn.</p>
          <Link href="/lien-he" className="mt-6 inline-flex px-8 py-4 bg-[var(--pl-clay)] text-white font-medium rounded-xl hover:bg-[var(--pl-eel)] transition-colors">
            Liên hệ ngay
          </Link>
        </div>
      </section>
    </>
  );
}
