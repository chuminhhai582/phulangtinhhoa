# PHÙ LÃNG TINH HOA — BẢN ĐẶC TẢ ỨNG DỤNG (BLUEPRINT v1.0)

> Tài liệu dành cho AI code generator (Antigravity / Claude Code / Cursor) và cho lập trình viên.
> Nguồn gốc yêu cầu: Hồ sơ dự thi Khởi nghiệp ĐMST tỉnh Bắc Ninh 2026 — mục VII "Giải pháp công nghệ và quản trị dữ liệu".
> Ngày lập: 30/08/2026 · Phiên bản: **1.2**
> Bổ sung so với v1.0: Phần 13 — CMS quản trị · Phần 14 — Không gian quản lý của hộ nghề · **Phần 15 — Kiến trúc đa thiết bị**
> Ngôn ngữ hệ thống: Tiếng Việt (mặc định) + Tiếng Anh (đối ngoại)

---

## PHẦN 0 — TÓM TẮT ĐIỀU HÀNH KỸ THUẬT

### 0.1. Ứng dụng này là gì

Một **hệ điều hành vận hành (operations platform)** cho mạng lưới sản xuất gốm phân tán, không phải một website bán hàng. Phần mềm làm đúng năm việc mà hồ sơ dự thi đã cam kết:

| # | Phân hệ | Câu hỏi nghiệp vụ nó trả lời |
|---|---|---|
| 1 | **Hồ sơ hộ nghề** | Đơn hàng này giao cho hộ nào thì không vỡ cam kết? |
| 2 | **Hồ sơ thiết kế** | Cái gì được phép khác nhau, cái gì bắt buộc giống? Ai sở hữu thiết kế? |
| 3 | **Quản trị đơn hàng** | Đơn đang ở đâu, ai đang giữ, tiền đã đến mốc nào? |
| 4 | **Hộ chiếu số** | Sản phẩm này ai làm, lô nào, kiểm tra ra sao? |
| 5 | **Báo cáo** | Hộ nghề thực nhận bao nhiêu? Giao đúng hẹn bao nhiêu %? Lỗi giảm chưa? |

### 0.2. Ứng dụng này KHÔNG làm (chốt phạm vi, cấm AI tự thêm)

- ❌ Không có cổng thanh toán trực tuyến trong MVP. Thanh toán quốc tế ghi nhận thủ công theo chứng từ.
- ❌ Không dùng blockchain / NFT (hồ sơ dự thi đã loại trừ rõ ràng).
- ❌ Không dùng ảnh AI tạo sinh thay ảnh sản phẩm thật ở bất kỳ trang chào bán nào.
- ❌ Không có module tuân thủ cho đồ tiếp xúc thực phẩm, đồ trẻ em, kết cấu chịu lực, thiết bị điện.
- ❌ Không có giỏ hàng / checkout B2C. Đây là mô hình B2B theo hợp đồng.
- ❌ Không tự động chốt giá bằng AI. Giá luôn do người duyệt.

### 0.3. Phân tầng theo tốc độ thay đổi (quyết định mức đầu tư thiết kế)

| Tầng | Nội dung | Tốc độ đổi | Chiến lược |
|---|---|---|---|
| **L1 — Schema** | `households`, `designs`, `orders`, `production_batches`, `qc_inspections`, `order_allocations` | ~ năm | **Thiết kế kỹ ở Phần 4. Sai ở đây là làm lại từ đầu.** |
| **L2 — Quy tắc nghiệp vụ** | Máy trạng thái đơn hàng, cổng chặn (gate), công thức chia tiền, quy tắc dung sai | ~ quý | Tách thành `lib/domain/*`, không nhúng vào component |
| **L3 — API / Server Actions** | Route handler, RPC Supabase | ~ tháng | Contract rõ, có version |
| **L4 — Giao diện** | Trang, form, bảng | ~ tuần | shadcn/ui, component hóa |
| **L5 — Cấu hình & nội dung** | % phí, ngưỡng vỡ hỏng, tỷ giá, thông tin công ty, văn bản trang công khai | ~ ngày | **Bảng `settings` + `content_blocks`, sửa qua `/app/cai-dat`. Cấm hardcode.** |

**Danh sách cấm hardcode (bắt buộc nằm trong `settings`):** tỷ lệ phí giao dịch, tỷ lệ đặt cọc tối thiểu, ngưỡng vỡ hỏng mục tiêu (3%), ngưỡng giao đúng hẹn (90%), ngưỡng tập trung khách hàng (35%), số điểm kiểm tra tối thiểu (3), thời hạn hiệu lực báo giá, danh sách tiền tệ và tỷ giá, thông tin pháp nhân, email/điện thoại đầu mối.

### 0.4. Tech stack

```
Framework   : Next.js 14 (App Router) + TypeScript (strict)
UI          : Tailwind CSS + shadcn/ui + lucide-react
Backend     : Supabase (PostgreSQL 15 + Row Level Security + Auth + Storage + Realtime)
Hosting     : Vercel (app) + Supabase Cloud (Singapore region — gần thị trường đích)
Form        : react-hook-form + zod (schema dùng chung client/server)
Bảng dữ liệu: TanStack Table v8
Biểu đồ     : Recharts
Ngày tháng  : date-fns + date-fns-tz (Asia/Ho_Chi_Minh)
i18n        : next-intl (vi mặc định, en cho trang công khai + cổng khách hàng)
PWA         : Serwist (kế thừa next-pwa) + Dexie.js cho hàng đợi ngoại tuyến
Thích ứng   : Tailwind breakpoints + CSS container queries; vaul (tấm trượt đáy);
              react-virtual (ảo hóa hàng). Một mã nguồn cho mọi thiết bị — xem Phần 15
Ảnh         : Supabase Storage + next/image, nén phía client bằng browser-image-compression
QR          : thư viện qrcode (tạo), quét bằng camera web
Xuất file   : ExcelJS (xlsx), @react-pdf/renderer (pdf chứng từ)
Email       : Resend
Test        : Vitest (domain logic) + Playwright (5 luồng nghiệm thu ở Phần 10)
```

**Lý do chọn:** hạ tầng phải chạy được với ngân sách 550 triệu đồng/18 tháng và một người phụ trách công nghệ. Supabase cho phép dùng RLS làm lớp phân quyền thật ở tầng dữ liệu — điều bắt buộc vì hệ thống chứa giá nội bộ của hộ nghề và dữ liệu cá nhân.

### 0.5. Bảng màu và chữ (design tokens)

Lấy từ bản sắc vật liệu Phù Lãng: men da lươn, đất nung, tro trấu.

```css
/* app/globals.css — @layer base :root */
--pl-clay:      #B4552D;  /* đất nung — màu hành động chính */
--pl-eel:       #7A4A21;  /* men da lươn — màu thương hiệu */
--pl-eel-light: #A9743C;
--pl-ash:       #C9BCA4;  /* men tro — viền, nền phụ */
--pl-ivory:     #F5F0E6;  /* nền trang */
--pl-char:      #2A2422;  /* chữ chính */
--pl-kiln:      #D98324;  /* cảnh báo / đang nung */
--pl-jade:      #4F6F52;  /* trạng thái đạt */
--pl-fault:     #A63D40;  /* lỗi / không đạt */
```

- Chữ giao diện: **Be Vietnam Pro** (hỗ trợ dấu tiếng Việt tốt, có sẵn trên Google Fonts).
- Chữ trang công khai / kể chuyện: **Lora** cho tiêu đề.
- Cỡ chữ tối thiểu trong ứng dụng hộ nghề: **17px**, nút bấm cao tối thiểu **48px** (người dùng là thợ thủ công, dùng điện thoại, tay có thể dính đất).
- Chế độ tương phản cao là mặc định ở `/tho/*` — dùng ngoài sân, nắng gắt.
- Vùng chạm tối thiểu **44px** toàn hệ thống, **48px** trong `/tho/*`; cỡ chữ ô nhập ≥16px.
- Điểm ngắt: `sm 640` · `md 768` · `lg 1024` · `xl 1440`. Quy tắc thích ứng đầy đủ ở **Phần 15**.

---

## PHẦN 1 — NGƯỜI DÙNG VÀ PHÂN QUYỀN

### 1.1. Tám vai trò

| Mã vai trò | Tên hiển thị | Ai | Thiết bị chính |
|---|---|---|---|
| `admin` | Quản trị hệ thống | Trưởng dự án | Máy tính |
| `coordinator` | Điều phối viên | Nhân sự vận hành | Máy tính + điện thoại |
| `designer` | Phụ trách thiết kế | Nhà thiết kế nội bộ/cộng tác | Máy tính |
| `qc` | Phụ trách chất lượng | Phụ trách làng nghề & chất lượng | **Điện thoại** (tại xưởng) |
| `export` | Phụ trách xuất khẩu | Nhân sự chứng từ & hậu cần | Máy tính |
| `accountant` | Kế toán | Kiêm nhiệm giai đoạn đầu | Máy tính |
| `artisan` | Hộ nghề | Chủ hộ hoặc người nhà được ủy quyền | **Điện thoại, mạng yếu** |
| `customer` | Khách hàng B2B | Kiến trúc sư, nhà phân phối, khách sạn | Máy tính, song ngữ |

Người chưa đăng nhập (`public`) chỉ xem được trang giới thiệu, bộ sưu tập đã công bố và **hộ chiếu số**.

### 1.2. Ma trận quyền (nguồn chân lý để viết RLS ở Phần 4)

Ký hiệu: `F` toàn quyền · `C` tạo · `R` đọc · `U` sửa · `A` duyệt · `Ro` chỉ bản ghi của mình · `—` không truy cập

| Bảng / dữ liệu | admin | coordinator | designer | qc | export | accountant | artisan | customer |
|---|---|---|---|---|---|---|---|---|
| Hồ sơ hộ nghề (công khai) | F | RU | R | RU | R | R | Ro RU | R |
| **Hồ sơ hộ nghề (điện thoại, giá nhận, tỷ lệ lỗi)** | F | R | — | R | — | R | Ro | **—** |
| Lịch lò | F | RU | R | RU | R | — | Ro CU | — |
| Hồ sơ thiết kế + phiên bản | F | R | F | R | R | — | Ro (bản được giao) | R (bản đã duyệt cho mình) |
| Bộ dung sai | F | R | CU | R | R | — | Ro | R (bản đã duyệt) |
| Quyền khai thác thiết kế | F | R | CU | — | R | R | Ro | R (phạm vi của mình) |
| Yêu cầu / sàng lọc | F | F | R | — | R | — | — | Ro |
| Báo giá | F | CU | R | — | R | R | — | R (bản đã gửi) |
| **Giá vốn trả hộ (`unit_cost`)** | F | RU | — | — | — | R | Ro | **—** |
| Đơn hàng | F | F | R | R | RU | R | Ro | Ro |
| Phân bổ tiền `order_allocations` | F | RU | — | — | — | R | Ro (phần của mình) | — |
| Mốc thanh toán khách | F | RU | — | — | R | RU | — | Ro |
| Chi trả hộ nghề | F | RU | — | — | — | RU | Ro + xác nhận đã nhận | — |
| Lô sản xuất | F | RU | R | RU | R | — | Ro CU | R (tóm tắt) |
| Phiếu kiểm tra QC | F | R | R | **F** | R | — | Ro C (ảnh, số đo) | R (ảnh được phép) |
| Sản phẩm không phù hợp | F | RU | R | F | R | R | Ro | Ro + duyệt phương án |
| Đóng gói & chứng từ | F | R | — | R | F | R | — | Ro (bộ được phép) |
| Hộ chiếu số | F | CU | R | R | R | — | Ro + đồng ý công khai | R |
| Báo cáo tổng | F | R | — | R | R | R | **Chỉ số của mình** | — |
| Cài đặt, người dùng, nhật ký | F | — | — | — | — | — | — | — |
| CMS: danh mục, nội dung, media, bản dịch | F | CU | CU (nội dung, media) | — | CU (mẫu chứng từ) | — | — | — |
| CMS: cấu hình trọng yếu, cờ tính năng | F | — | — | — | — | — | — | — |
| Hàng đợi kiểm duyệt | F | A | — | A (phiếu QC) | — | — | C (gửi đề nghị) | — |
| Thành viên trong hộ | F | R | — | — | — | — | Ro F (chỉ chủ hộ) | — |
| Báo cáo riêng của hộ | F | R | — | — | — | R | Ro (chỉ chủ hộ) | — |

**Ba quy tắc bảo mật bất di bất dịch:**

1. `customer` **không bao giờ** đọc được `order_lines.unit_cost`, `households.phone`, `households.internal_notes`, `order_allocations`, `household_payouts`, hay danh tính hộ khác trong cùng đơn.
2. `artisan` chỉ thấy dòng đơn được phân công cho chính hộ mình. Không thấy giá bán cho khách, không thấy hộ khác.
3. Mọi thay đổi trên `designs`, `tolerance_sets`, `order_lines.unit_cost`, `payment_milestones`, `qc_inspections` đều ghi `audit_logs` — không có ngoại lệ, kể cả `admin`.

---

## PHẦN 2 — SƠ ĐỒ TRANG (SITEMAP)

### 2.1. Khu công khai — `/` (song ngữ vi/en)

```
/                          Trang chủ — hồ sơ năng lực song ngữ
/nang-luc                  Năng lực mạng lưới: kỹ thuật, giới hạn kích thước, quy trình 6 bước
/bo-suu-tap                Danh sách bộ sưu tập đã công bố
/bo-suu-tap/[slug]         Chi tiết bộ sưu tập: câu chuyện, ảnh, số bản, tác giả
/nghe-nhan                 Hộ nghề đã đồng ý công khai
/nghe-nhan/[slug]          Hồ sơ nghệ nhân: kỹ thuật, câu chuyện, tác phẩm (KHÔNG có SĐT)
/quy-trinh-chat-luong      Giải thích mẫu chuẩn + dung sai thủ công (bán niềm tin)
/p/[code]                  ★ HỘ CHIẾU SỐ — đích đến của mã QR trên sản phẩm
/lien-he                   Biểu mẫu yêu cầu → tạo bản ghi `inquiries`
/en/...                    Bản tiếng Anh của toàn bộ nhánh trên
```

### 2.2. Khu vận hành nội bộ — `/app/*` (đăng nhập bắt buộc)

```
/app                       Bảng điều khiển theo vai trò
/app/kiem-chung            ★ Kiểm chứng nhu cầu: phỏng vấn, phễu, ngưỡng đi tiếp
/app/yeu-cau               Yêu cầu đến + phiếu sàng lọc chấm điểm
/app/yeu-cau/[id]
/app/khach-hang            Danh sách khách hàng B2B
/app/khach-hang/[id]       Hồ sơ + lịch sử + mức tập trung doanh thu
/app/thiet-ke              Thư viện hồ sơ thiết kế
/app/thiet-ke/[id]         Tab: Phiên bản | Dung sai | Quyền | Bao gói | Chi phí mục tiêu
/app/thiet-ke/[id]/dung-sai        Trình dựng bộ dung sai 3 nhóm đặc tính
/app/bo-suu-tap            Quản lý bộ sưu tập & đánh số bản
/app/bao-gia               Báo giá
/app/bao-gia/[id]          Trình dựng báo giá + xuất PDF song ngữ
/app/don-hang              Bảng Kanban theo trạng thái + danh sách
/app/don-hang/[code]       Tab: Tổng quan | Phân công | Lô | Chất lượng | Tiền | Đóng gói | Chứng từ | Hộ chiếu
/app/ho-nghe               ★ Bản đồ năng lực hộ nghề (bảng + bộ lọc + so sánh)
/app/ho-nghe/[id]          Tab: Năng lực | Lò | Mẫu | Lịch sử chất lượng | Thu nhập | Hợp đồng
/app/lich-lo               Lịch lò toàn mạng lưới (dạng tuần/tháng)
/app/mau                   Mẫu trả phí
/app/chat-luong            Hàng đợi kiểm tra + sản phẩm không phù hợp
/app/chat-luong/nc/[id]    Xử lý một sản phẩm không phù hợp
/app/xuat-khau             Bàn xuất khẩu: danh sách lô hàng
/app/xuat-khau/[orderId]   Bảng kiểm chứng từ + đóng gói + vận chuyển
/app/tai-chinh             Mốc thanh toán, chi trả hộ, đối soát phân bổ
/app/bao-cao               8 báo cáo ở Phần 9
/app/quan-tri              ★ CMS quản trị — 9 module, xem Phần 13
/app/quan-tri/nguoi-dung   Người dùng, vai trò, ma trận quyền sinh từ RLS
/app/quan-tri/danh-muc     Danh mục hệ thống (kỹ thuật, loại sản phẩm, thị trường…)
/app/quan-tri/cau-hinh     Cấu hình vận hành có sàn cứng và xác nhận 2 bước
/app/quan-tri/noi-dung     Trang công khai — trình dựng khối, song ngữ, SEO
/app/quan-tri/media        Thư viện ảnh, duyệt ảnh cho công khai, xóa EXIF
/app/quan-tri/ban-dich     Bản dịch VI/EN, lọc "thiếu tiếng Anh"
/app/quan-tri/mau          Mẫu chứng từ và mẫu email
/app/quan-tri/duyet        ★ Hàng đợi kiểm duyệt (6 loại)
/app/quan-tri/nhat-ky      Nhật ký, nhật ký cổng chặn, xuất dữ liệu, cờ tính năng
```

### 2.3. Ứng dụng hộ nghề (PWA) — `/tho/*` (chỉ tiếng Việt, mobile-first, chạy ngoại tuyến)

```
/tho                       Hôm nay: việc cần làm, lò đang chạy, tiền sắp nhận
/tho/don                   Đơn được giao cho hộ mình
/tho/don/[code]            Làm gì, bao nhiêu cái, mẫu chuẩn, dung sai (diễn giải bằng lời), hạn giao
/tho/lo                    Nhật ký lò: bắt đầu nung → kết thúc → đếm đạt/hỏng
/tho/lo/[id]
/tho/kiem-tra/[id]         ★ Chụp ảnh kiểm tra theo hướng dẫn từng bước
/tho/tien                  Tiền: dự kiến nhận, đã nhận, nút "Xác nhận đã nhận đủ"
/tho/ho-so                 Hồ sơ năng lực của hộ — tự cập nhật, chờ điều phối viên xác nhận
/tho/dong-bo               Hàng đợi chưa gửi được (khi mất mạng)

── Chế độ quản lý hộ (xem Phần 14) — đáp ứng tới màn hình máy tính ──
/tho/quan-ly               ★ Tổng quan hộ: chỉ số riêng, thông báo, việc chờ duyệt
/tho/quan-ly/ho-so         Hồ sơ năng lực — hộ tự sửa, đi qua duyệt
/tho/quan-ly/lo            Lò và lịch nung, gồm cả mẻ riêng của gia đình
/tho/quan-ly/tac-pham      Danh mục tác phẩm của hộ + xin hiển thị công khai
/tho/quan-ly/thanh-vien    Thành viên trong hộ (chỉ chủ hộ)
/tho/quan-ly/dong-y        ★ Đồng ý & riêng tư + bản đồ "ai nhìn thấy gì"
/tho/quan-ly/bao-cao       Báo cáo của hộ + bản in xác nhận thu nhập (chỉ chủ hộ)
```

### 2.4. Cổng khách hàng — `/kh/*` (song ngữ)

```
/kh                        Dự án của tôi
/kh/don/[code]             Dòng thời gian trạng thái, ảnh kiểm tra được phép, chứng từ
/kh/duyet-mau/[id]         ★ Duyệt mẫu chuẩn + chấp nhận bộ dung sai (có chữ ký điện tử)
/kh/duyet-sai-lech/[id]    Duyệt phương án xử lý sản phẩm không phù hợp
/kh/tai-lieu               Kho chứng từ của khách
/kh/thiet-ke               Hồ sơ thiết kế đã duyệt + phạm vi quyền sử dụng
```

---

## PHẦN 3 — QUY TRÌNH NGHIỆP VỤ VÀ MÁY TRẠNG THÁI

### 3.1. Quy trình sáu bước (khớp Hình 1 của hồ sơ dự thi)

```
[1] Tiếp nhận & sàng lọc  →  [2] Đồng thiết kế & định giá  →  [3] Chọn hộ sản xuất
        ↓                            ↓                              ↓
   inquiries                   designs + quotes              order_lines.household_id
                                                                    ↓
[6] Xuất khẩu & học lại  ←  [5] Sản xuất & kiểm tra  ←  [4] Chốt mẫu chuẩn
        ↓                            ↓                              ↓
   shipments + NC             batches + qc_inspections        samples (trả phí)
```

### 3.2. Máy trạng thái đơn hàng (`orders.status`)

```
co_design → quoted → contracted → sample_approved → assigned → in_production
                                                                     ↓
closed ← delivered ← shipped ← ready_to_ship ← packing ← qc_passed ← qc_hold
```
Trạng thái phụ có thể vào từ bất kỳ đâu: `on_hold`, `cancelled`.

### 3.3. Sáu cổng chặn cứng (hard gates) — **AI phải cài ở tầng database, không chỉ ở UI**

| Cổng | Chuyển từ → đến | Điều kiện bắt buộc |
|---|---|---|
| **G1** | `contracted` → `sample_approved` | Có `samples.status = 'approved'` **và** khách đã ký chấp nhận `tolerance_set` (bản ghi `sample_approvals` có `signed_at`) |
| **G2** | `sample_approved` → `assigned` | Mỗi `order_line` có `household_id`, `unit_cost` > 0, và hộ đã bấm xác nhận (`assignment_confirmed_at`) |
| **G3** | `assigned` → `in_production` | Mốc `deposit` có `status = 'paid'` **và** đã đặt chỗ `kiln_schedules`. *(Quy tắc hồ sơ: không đặt nguyên liệu và lịch lò trước khi nhận đủ đặt cọc.)* |
| **G4** | `in_production` → `packing` | Đủ **tối thiểu 3** điểm kiểm tra có kết quả `pass`/`conditional`, bắt buộc gồm `post_firing`; mọi `nonconformities` đang mở phải có `decision` |
| **G5** | `packing` → `ready_to_ship` | Có `packing_lists` với ảnh từng kiện; đủ 5/5 điểm kiểm tra |
| **G6** | `ready_to_ship` → `shipped` | `export_docs_checklist` đủ mục bắt buộc; mốc `pre_shipment` đã `paid`; mã HS có người xác nhận (`hs_verified_by`) |

Cài đặt: một trigger `BEFORE UPDATE ON orders` gọi hàm `assert_order_gate(old_status, new_status, order_id)`, ném `EXCEPTION` kèm thông điệp tiếng Việt để UI hiển thị nguyên văn.

### 3.4. Máy trạng thái lô sản xuất (`production_batches.status`)

```
planned → forming → drying → glazing → firing → cooling → sorted → done
                                                              ↓
                                                          cancelled
```
Khi vào `sorted`, bắt buộc nhập `qty_passed` và `qty_failed`; hệ thống tự tính `defect_rate` và cập nhật `households.rolling_defect_rate` (trung bình động 6 lô gần nhất).

### 3.5. Năm điểm kiểm tra chất lượng (cố định, không cho phép xóa)

| Mã | Tên | Bằng chứng bắt buộc | Người nhập |
|---|---|---|---|
| `pre_production` | Trước sản xuất | Phiếu yêu cầu, biên bản duyệt mẫu, ảnh mẫu đất–men | `qc` |
| `pre_firing` | Trước nung | ≥3 ảnh, bảng đo kích thước (đã tính bù co), ký hiệu lô, số lượng dự phòng | `artisan` nhập, `qc` duyệt |
| `post_firing` | Sau nung | ≥4 ảnh, số đo, phân loại nứt/cong/màu, đếm đạt–hỏng | `qc` |
| `pre_packing` | Trước đóng gói | Ảnh sản phẩm đã làm sạch, nhãn, vật liệu đệm, sơ đồ xếp | `qc` |
| `pre_shipping` | Trước giao | Ảnh từng kiện, số kiện, trọng lượng, danh sách đóng gói | `export` |

### 3.6. Quy tắc dung sai — ba nhóm đặc tính

Đây là điểm mới cốt lõi của mô hình, phải được mã hóa thành dữ liệu chứ không phải văn bản tự do:

| Nhóm | `tolerance_class` | Ví dụ | Xử lý khi lệch |
|---|---|---|---|
| Bắt buộc | `bat_buoc` | Kích thước lắp đặt, đường kính miệng, độ ổn định đứng | **Loại bỏ**, không thương lượng |
| Có dung sai | `co_dung_sai` | Sắc độ men ±1 bậc thang màu, độ cong ≤2mm/100mm, chiều cao ±3% | Đạt nếu trong ngưỡng; ghi nhận thực đo |
| Độc bản | `doc_ban` | Vân men chảy, dấu tay tạo hình, sắc thái nung | **Không phải lỗi.** Đã được khách chấp nhận từ khi duyệt mẫu |

Khách hàng ký chấp nhận toàn bộ bảng này tại `/kh/duyet-mau/[id]`. Sau khi ký, mọi khiếu nại thuộc nhóm `doc_ban` đều được hệ thống tự đối chiếu và hiển thị bản ký để giải quyết tranh chấp.

### 3.7. Quy tắc tiền — cơ chế bảo vệ hộ nghề

Chuẩn hóa từ bảng kinh tế đơn hàng mẫu (300 triệu đồng) trong hồ sơ:

```
Tổng giá trị đơn hàng             = 100%   (300 tr)
├── Thanh toán hộ nghề & sản xuất =  73%   (219 tr)  → household_payouts
├── Kiểm nghiệm, hậu cần bên ngoài=   5%   ( 15 tr)  → third-party
└── Doanh thu dịch vụ nền tảng    =  22%   ( 66 tr)
```

**Bốn ràng buộc bắt buộc cài trong database:**

1. `SUM(order_allocations.amount) = orders.total_value` — kiểm tra bằng trigger, sai lệch cho phép < 1.000đ do làm tròn.
2. `order_lines.unit_cost` bị **khóa** sau khi hộ xác nhận phân công. Muốn sửa phải tạo `cost_change_requests` có lý do, chữ ký hộ nghề, và ghi `audit_logs`. → *Mã hóa quy tắc: "Nền tảng không ép hộ nghề giảm giá để bù cho một báo giá thiếu chính xác."*
3. Tối thiểu **3 mốc thanh toán** khi tạo đơn: `deposit` (≥ `settings.min_deposit_pct`, mặc định 40%), `pre_shipment`, `balance`. Tổng % = 100.
4. Hộ nghề có nút **"Xác nhận đã nhận đủ tiền"** ở `/tho/tien`. Chỉ số `household_payouts.confirmed_by_household_at` mới được tính vào báo cáo thu nhập hộ — không lấy số kế toán ghi đơn phương.

### 3.8. Quy tắc sàng lọc yêu cầu (`inquiries.screening_score`)

Chấm 6 tiêu chí, mỗi tiêu chí 0–5, tổng tối đa 30:

| Tiêu chí | Trọng số |
|---|---|
| Mức phù hợp với năng lực mạng lưới | ×2 |
| Giá trị đơn hàng so với chi phí thiết kế + mẫu | ×2 |
| Độ rõ của yêu cầu | ×1 |
| Khả năng lặp lại / đặt lại | ×1 |
| Rủi ro tuân thủ (thực phẩm, điện, trẻ em → điểm 0 = từ chối) | ×2 |
| Khả năng thanh toán & điều kiện | ×1 |

Ngưỡng mặc định (`settings.inquiry_accept_threshold`): ≥ 60/135 → `accept`; 40–59 → `park`; < 40 hoặc rủi ro tuân thủ = 0 → `reject` bắt buộc kèm `reject_reason`.

---

## PHẦN 4 — CẤU TRÚC DỮ LIỆU (SUPABASE / POSTGRESQL)

> Đây là tầng L1. Đầu tư kỹ ở đây. Toàn bộ SQL dưới đây có thể dán trực tiếp vào Supabase SQL Editor theo thứ tự.

### 4.1. Kiểu liệt kê (enums)

```sql
create type user_role         as enum ('admin','coordinator','designer','qc','export','accountant','artisan','customer');
create type household_status  as enum ('prospect','surveyed','signed','active','paused','exited');
create type kiln_type         as enum ('cui','gas','dien','bau','khac');
create type design_status     as enum ('draft','in_review','approved','retired');
create type tolerance_class   as enum ('bat_buoc','co_dung_sai','doc_ban');
create type inquiry_decision  as enum ('pending','accept','park','reject');
create type quote_status      as enum ('draft','sent','accepted','rejected','expired');
create type order_status      as enum ('co_design','quoted','contracted','sample_approved','assigned',
                                       'in_production','qc_hold','packing','ready_to_ship','shipped',
                                       'delivered','closed','on_hold','cancelled');
create type batch_status      as enum ('planned','forming','drying','glazing','firing','cooling','sorted','done','cancelled');
create type qc_checkpoint     as enum ('pre_production','pre_firing','post_firing','pre_packing','pre_shipping');
create type qc_result         as enum ('pass','conditional','fail');
create type nc_cause          as enum ('design','material','forming','firing','packing','transport','expectation');
create type nc_decision       as enum ('rework','remake','downgrade','refund','accept_conditional','scrap');
create type milestone_kind    as enum ('deposit','pre_shipment','balance','design_fee','sample_fee');
create type milestone_status  as enum ('pending','invoiced','paid','overdue','waived');
create type payout_status     as enum ('planned','due','paid','confirmed');
create type sample_status     as enum ('requested','quoted','paid','making','shipped','approved','rejected','cancelled');
create type interview_stage   as enum ('problem','offer_test','paid_sample','pilot_order');
create type party_type        as enum ('household','third_party','platform','designer');
```

### 4.2. Người dùng, nhật ký, cấu hình

```sql
-- Mở rộng auth.users của Supabase
create table profiles (
  id            uuid primary key references auth.users(id) on delete cascade,
  full_name     text not null,
  role          user_role not null,
  phone         text,
  email         text,
  locale        text not null default 'vi',
  household_id  uuid,          -- chỉ khác null khi role='artisan'
  customer_id   uuid,          -- chỉ khác null khi role='customer'
  is_active     boolean not null default true,
  last_seen_at  timestamptz,
  created_at    timestamptz not null default now(),
  constraint chk_artisan_link  check (role <> 'artisan'  or household_id is not null),
  constraint chk_customer_link check (role <> 'customer' or customer_id  is not null)
);

-- Hàm trợ giúp cho RLS — dùng lại ở mọi policy
create or replace function my_role() returns user_role language sql stable security definer as
$$ select role from profiles where id = auth.uid() $$;

create or replace function my_household() returns uuid language sql stable security definer as
$$ select household_id from profiles where id = auth.uid() $$;

create or replace function my_customer() returns uuid language sql stable security definer as
$$ select customer_id from profiles where id = auth.uid() $$;

create or replace function is_staff() returns boolean language sql stable security definer as
$$ select role in ('admin','coordinator','designer','qc','export','accountant') from profiles where id = auth.uid() $$;

-- Nhật ký thay đổi: KHÔNG có policy UPDATE/DELETE cho bất kỳ ai
create table audit_logs (
  id           bigserial primary key,
  actor_id     uuid references profiles(id),
  actor_role   user_role,
  entity_type  text not null,
  entity_id    uuid not null,
  action       text not null,           -- 'create' | 'update' | 'delete' | 'approve' | 'gate_blocked'
  field_diff   jsonb,                   -- { field: {before, after} }
  reason       text,
  created_at   timestamptz not null default now()
);
create index on audit_logs (entity_type, entity_id, created_at desc);

-- Tầng L5: mọi cấu hình thay đổi thường xuyên
create table settings (
  key         text primary key,
  value       jsonb not null,
  label_vi    text not null,
  description text,
  updated_by  uuid references profiles(id),
  updated_at  timestamptz not null default now()
);

-- Nội dung trang công khai, sửa không cần deploy
create table content_blocks (
  id         uuid primary key default gen_random_uuid(),
  slug       text not null,
  locale     text not null default 'vi',
  title      text,
  body_md    text,
  media      jsonb default '[]',
  published  boolean not null default false,
  unique (slug, locale)
);
```

**Seed bắt buộc cho `settings`:**

```sql
insert into settings (key, value, label_vi) values
 ('min_deposit_pct',            '40',      'Tỷ lệ đặt cọc tối thiểu (%)'),
 ('min_qc_checkpoints',         '3',       'Số điểm kiểm tra tối thiểu mỗi đơn'),
 ('target_breakage_rate_pct',   '3',       'Ngưỡng vỡ hỏng mục tiêu (%)'),
 ('target_ontime_rate_pct',     '90',      'Ngưỡng giao đủ đúng hạn (%)'),
 ('customer_concentration_pct', '35',      'Cảnh báo tập trung một khách hàng (%)'),
 ('default_transaction_fee_pct','8',       'Phí giao dịch mặc định (%)'),
 ('quote_validity_days',        '30',      'Số ngày hiệu lực báo giá'),
 ('inquiry_accept_threshold',   '60',      'Điểm sàng lọc tối thiểu để nhận yêu cầu'),
 ('currencies',                 '["VND","USD","EUR","SGD","JPY"]', 'Tiền tệ sử dụng'),
 ('company_profile',            '{}',      'Thông tin pháp nhân trên chứng từ');
```

### 4.3. Hộ nghề và năng lực sản xuất

```sql
create table households (
  id                    uuid primary key default gen_random_uuid(),
  code                  text unique not null,               -- PL-H-001
  name                  text not null,                      -- tên hộ / xưởng
  owner_name            text not null,
  generation            smallint,                           -- đời thứ mấy làm nghề
  address               text,
  hamlet                text,
  -- Dữ liệu riêng tư: KHÔNG lộ qua RLS cho customer/public
  phone                 text,
  email                 text,
  id_note               text,
  internal_notes        text,
  -- Dữ liệu công khai (chỉ khi public_consent = true)
  public_slug           text unique,
  public_consent        boolean not null default false,
  consent_signed_at     timestamptz,
  consent_file          text,
  bio_vi                text,
  bio_en                text,
  cover_image           text,
  -- Chỉ số năng lực (do hệ thống tính, không nhập tay)
  status                household_status not null default 'prospect',
  rolling_defect_rate   numeric(5,2),        -- % trung bình 6 lô gần nhất
  ontime_rate           numeric(5,2),
  orders_completed      int not null default 0,
  verified_by           uuid references profiles(id),
  verified_at           timestamptz,
  joined_at             date,
  created_at            timestamptz not null default now()
);

create table techniques (                    -- danh mục kỹ thuật, seed sẵn
  id        uuid primary key default gen_random_uuid(),
  code      text unique not null,
  name_vi   text not null,
  name_en   text not null,
  group_key text not null                    -- tao_hinh | men | trang_tri | nung
);

create table household_techniques (
  household_id  uuid references households(id) on delete cascade,
  technique_id  uuid references techniques(id),
  skill_level   smallint check (skill_level between 1 and 5),
  years_exp     smallint,
  evidence      jsonb default '[]',          -- [{url, caption, taken_at}]
  primary key (household_id, technique_id)
);

create table kilns (
  id               uuid primary key default gen_random_uuid(),
  household_id     uuid not null references households(id) on delete cascade,
  name             text not null,
  type             kiln_type not null,
  inner_w_mm       int, inner_d_mm int, inner_h_mm int,
  max_piece_h_mm   int not null,             -- giới hạn chiều cao sản phẩm — dùng để chặn phân công sai
  capacity_pieces  int,
  max_temp_c       int,
  cycle_days       numeric(3,1) not null default 3,
  notes            text
);

create table kiln_schedules (
  id            uuid primary key default gen_random_uuid(),
  kiln_id       uuid not null references kilns(id) on delete cascade,
  start_date    date not null,
  end_date      date not null,
  status        text not null default 'planned',   -- planned|firing|cooling|done|cancelled
  order_line_id uuid,                              -- null = mẻ riêng của hộ
  capacity_used_pct smallint,
  notes         text,
  created_by    uuid references profiles(id),
  constraint chk_dates check (end_date >= start_date)
);
create index on kiln_schedules (kiln_id, start_date);

create table household_capacity (
  household_id     uuid references households(id) on delete cascade,
  product_type     text not null,           -- binh | tuong | phu_dieu | chau | den | vach | khac
  max_height_mm    int,
  max_diameter_mm  int,
  monthly_pieces   int,
  min_batch        int not null default 1,
  lead_time_days   int not null,
  baseline_defect_rate numeric(5,2),
  primary key (household_id, product_type)
);

create table household_materials (
  id           uuid primary key default gen_random_uuid(),
  household_id uuid not null references households(id) on delete cascade,
  kind         text not null,               -- 'clay' | 'glaze'
  name         text not null,               -- vd: 'men da lươn truyền thống'
  source       text,
  lead_time_days int,
  notes        text
);

create table household_samples (            -- danh mục mẫu sẵn có của hộ
  id           uuid primary key default gen_random_uuid(),
  household_id uuid not null references households(id) on delete cascade,
  name         text not null,
  photos       jsonb default '[]',
  h_mm int, w_mm int, d_mm int,
  technique_id uuid references techniques(id),
  price_from   numeric(14,2),
  price_to     numeric(14,2)
);
```

### 4.4. Thiết kế, dung sai, quyền

```sql
create table collections (
  id            uuid primary key default gen_random_uuid(),
  code          text unique not null,        -- PL-C-2026-01
  slug          text unique not null,
  name_vi       text not null, name_en text,
  narrative_vi  text, narrative_en text,
  edition_size  int,                          -- số bản giới hạn; null = không giới hạn
  numbering     text default 'NN/TT',
  launch_date   date,
  cover_image   text,
  published     boolean not null default false
);

create table designs (
  id             uuid primary key default gen_random_uuid(),
  code           text unique not null,        -- PL-D-2026-014
  title_vi       text not null, title_en text,
  collection_id  uuid references collections(id),
  product_type   text not null,
  designer_id    uuid references profiles(id),
  household_id   uuid references households(id),   -- đồng tác giả kỹ thuật
  status         design_status not null default 'draft',
  current_version int not null default 1,
  story_vi       text, story_en text,
  is_public      boolean not null default false,
  created_at     timestamptz not null default now()
);

create table design_versions (
  id               uuid primary key default gen_random_uuid(),
  design_id        uuid not null references designs(id) on delete cascade,
  version_no       int not null,
  drawings         jsonb default '[]',        -- [{url, type:'2d'|'3d'|'photo', caption}]
  h_mm int, w_mm int, d_mm int, weight_g int,
  clay_ref         text,
  glaze_ref        text,
  shrinkage_pct    numeric(4,1),              -- bù co khi tạo hình
  tolerance_set_id uuid,
  packaging_plan   jsonb,                     -- {cushion, orientation, stack_limit, carton_dims, tested:boolean}
  target_cost      numeric(14,2),             -- giá dự kiến trả hộ
  target_price     numeric(14,2),
  changelog        text,
  created_by       uuid references profiles(id),
  approved_by      uuid references profiles(id),
  approved_at      timestamptz,
  created_at       timestamptz not null default now(),
  unique (design_id, version_no)
);

create table tolerance_sets (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  design_id  uuid references designs(id) on delete cascade,
  created_by uuid references profiles(id),
  created_at timestamptz not null default now()
);

create table tolerance_items (
  id               uuid primary key default gen_random_uuid(),
  set_id           uuid not null references tolerance_sets(id) on delete cascade,
  attribute_vi     text not null,             -- 'Chiều cao', 'Sắc độ men', 'Vân men chảy'
  attribute_en     text,
  class            tolerance_class not null,
  nominal          text,                      -- '320' hoặc 'nâu da lươn bậc 3'
  tol_minus        text, tol_plus text,
  unit             text,                      -- 'mm' | 'bậc' | '%'
  method           text not null,             -- cách đo: 'thước cặp', 'so bảng màu chuẩn'
  accept_criteria  text not null,
  sort_order       smallint not null default 0
);

create table design_rights (
  id           uuid primary key default gen_random_uuid(),
  design_id    uuid not null references designs(id) on delete cascade,
  holder_type  party_type not null,
  holder_id    uuid,                          -- profiles.id hoặc households.id hoặc customers.id
  share_pct    numeric(5,2) not null,
  usage_scope  text not null,                 -- 'trưng bày' | 'bán lẻ' | 'in ấn quảng cáo'
  territory    text,
  exclusive    boolean not null default false,
  valid_from   date, valid_to date,
  contract_file text,
  constraint chk_share check (share_pct >= 0 and share_pct <= 100)
);
-- Ràng buộc: tổng share_pct trên mỗi design_id phải = 100 khi design.status='approved' (trigger)
```

### 4.5. Kiểm chứng nhu cầu (module riêng, phục vụ cổng quyết định 90 ngày)

```sql
create table interviews (
  id                 uuid primary key default gen_random_uuid(),
  stage              interview_stage not null default 'problem',
  segment            text not null,            -- architect | hospitality | distributor | corporate_gift
  org_name           text not null,
  country            text,
  contact_name       text,
  interviewer_id     uuid references profiles(id),
  held_at            date not null,
  problem_confirmed  boolean,                  -- xác nhận vấn đề đủ lớn?
  will_review_deck   boolean,
  will_pay_sample    boolean,
  requested_quote    boolean,
  budget_note        text,
  rejection_reason   text,
  minutes_md         text not null,            -- biên bản, bắt buộc
  attachments        jsonb default '[]',
  customer_id        uuid,                     -- liên kết khi đã trở thành khách hàng
  created_at         timestamptz not null default now()
);
```
Bảng này cấp dữ liệu cho màn hình `/app/kiem-chung` — đối chiếu trực tiếp với 4 ngưỡng đi tiếp trong hồ sơ (20 phỏng vấn / ≥8 xác nhận · 8 thử hồ sơ / ≥3 yêu cầu báo giá · ≤5 mẫu / ≥2 trả phí · ≤3 đơn thử / ≥1 thanh toán thật).

### 4.6. Khách hàng, yêu cầu, báo giá

```sql
create table customers (
  id              uuid primary key default gen_random_uuid(),
  code            text unique not null,
  company_name    text not null,
  segment         text not null,
  country         text not null,
  city            text,
  contact_name    text, contact_email text, contact_phone text,
  currency        text not null default 'USD',
  incoterm_default text,
  payment_terms   text,
  credit_limit    numeric(14,2),
  owner_id        uuid references profiles(id),
  source          text,
  status          text not null default 'active',
  created_at      timestamptz not null default now()
);

create table inquiries (
  id              uuid primary key default gen_random_uuid(),
  code            text unique not null,
  customer_id     uuid references customers(id),
  prospect_name   text,                        -- khi chưa là khách hàng
  channel         text,                        -- web_form | event | referral | outbound
  received_at     timestamptz not null default now(),
  summary         text not null,
  product_type    text,
  quantity        int,
  budget_amount   numeric(14,2), budget_currency text,
  target_market   text,
  deadline        date,
  compliance_flags jsonb default '[]',         -- ['food_contact','electrical','children']
  score_detail    jsonb,                       -- {fit:5, value:4, clarity:3, repeat:4, compliance:5, payment:3}
  screening_score smallint,
  decision        inquiry_decision not null default 'pending',
  reject_reason   text,
  owner_id        uuid references profiles(id)
);

create table quotes (
  id            uuid primary key default gen_random_uuid(),
  code          text unique not null,
  inquiry_id    uuid references inquiries(id),
  customer_id   uuid not null references customers(id),
  currency      text not null,
  fx_rate       numeric(14,6) not null,        -- quy đổi về VND tại thời điểm báo giá
  incoterm      text not null,
  valid_until   date not null,
  design_fee    numeric(14,2) not null default 0,
  coordination_fee numeric(14,2) not null default 0,
  transaction_fee_pct numeric(5,2) not null default 0,
  packing_fee   numeric(14,2) not null default 0,
  logistics_est numeric(14,2) not null default 0,
  subtotal      numeric(14,2) not null default 0,
  total         numeric(14,2) not null default 0,
  status        quote_status not null default 'draft',
  sent_at       timestamptz, accepted_at timestamptz,
  pdf_vi        text, pdf_en text,
  created_by    uuid references profiles(id)
);

create table quote_lines (
  id                uuid primary key default gen_random_uuid(),
  quote_id          uuid not null references quotes(id) on delete cascade,
  design_id         uuid references designs(id),
  design_version_id uuid references design_versions(id),
  description_vi    text not null, description_en text,
  qty               int not null,
  unit_cost_household numeric(14,2) not null,   -- ⚠ RLS: customer không đọc được cột này
  unit_price        numeric(14,2) not null,
  lead_time_days    int,
  sort_order        smallint default 0
);
```

### 4.7. Đơn hàng, phân công, tiền

```sql
create table orders (
  id               uuid primary key default gen_random_uuid(),
  code             text unique not null,        -- PL-O-2026-007
  customer_id      uuid not null references customers(id),
  quote_id         uuid references quotes(id),
  status           order_status not null default 'co_design',
  currency         text not null,
  fx_rate          numeric(14,6) not null,
  incoterm         text not null,
  total_value      numeric(14,2) not null,      -- theo VND để đối soát phân bổ
  market           text,
  promised_ship_date date,
  actual_ship_date   date,
  contract_file    text,
  owner_id         uuid references profiles(id),
  risk_flags       jsonb default '[]',
  created_at       timestamptz not null default now(),
  closed_at        timestamptz
);

create table order_lines (
  id                uuid primary key default gen_random_uuid(),
  order_id          uuid not null references orders(id) on delete cascade,
  design_id         uuid not null references designs(id),
  design_version_id uuid not null references design_versions(id),
  tolerance_set_id  uuid references tolerance_sets(id),
  household_id      uuid references households(id),
  qty_ordered       int not null,
  qty_spare         int not null default 0,     -- số dự phòng, quy tắc ở §5.4
  unit_price        numeric(14,2) not null,
  unit_cost         numeric(14,2),              -- ⚠ khóa sau khi hộ xác nhận
  cost_locked_at    timestamptz,
  assignment_confirmed_at timestamptz,
  status            text not null default 'pending'
);
create index on order_lines (household_id, status);

create table order_allocations (
  id          uuid primary key default gen_random_uuid(),
  order_id    uuid not null references orders(id) on delete cascade,
  party_type  party_type not null,
  party_id    uuid,
  amount      numeric(14,2) not null,
  pct         numeric(5,2),
  note        text
);

create table payment_milestones (
  id          uuid primary key default gen_random_uuid(),
  order_id    uuid not null references orders(id) on delete cascade,
  kind        milestone_kind not null,
  label       text not null,
  pct         numeric(5,2) not null,
  amount      numeric(14,2) not null,
  due_rule    text,                             -- 'ký hợp đồng +0', 'trước giao hàng -7'
  due_date    date,
  status      milestone_status not null default 'pending',
  invoice_no  text,
  paid_at     timestamptz,
  evidence    jsonb default '[]',
  sort_order  smallint default 0
);

create table household_payouts (
  id             uuid primary key default gen_random_uuid(),
  order_line_id  uuid not null references order_lines(id) on delete cascade,
  household_id   uuid not null references households(id),
  milestone      text not null,                 -- 'ứng nguyên liệu' | 'sau nung đạt' | 'sau giao hàng'
  amount         numeric(14,2) not null,
  status         payout_status not null default 'planned',
  due_date       date,
  paid_at        timestamptz,
  evidence       jsonb default '[]',
  confirmed_by_household_at timestamptz,         -- ★ chỉ số này mới vào báo cáo thu nhập
  created_at     timestamptz not null default now()
);

create table cost_change_requests (
  id             uuid primary key default gen_random_uuid(),
  order_line_id  uuid not null references order_lines(id),
  old_cost       numeric(14,2) not null,
  new_cost       numeric(14,2) not null,
  reason         text not null,
  requested_by   uuid references profiles(id),
  household_agreed_at timestamptz,
  approved_by    uuid references profiles(id),
  status         text not null default 'pending',
  created_at     timestamptz not null default now()
);

create table samples (
  id            uuid primary key default gen_random_uuid(),
  code          text unique not null,
  inquiry_id    uuid references inquiries(id),
  design_id     uuid references designs(id),
  customer_id   uuid references customers(id),
  household_id  uuid references households(id),
  fee           numeric(14,2) not null default 0,
  fee_paid      boolean not null default false,  -- ★ ngưỡng kiểm chứng: mẫu MIỄN PHÍ không tính là bằng chứng
  status        sample_status not null default 'requested',
  photos        jsonb default '[]',
  feedback      text,
  shipped_at    timestamptz, decided_at timestamptz
);

create table sample_approvals (
  id               uuid primary key default gen_random_uuid(),
  sample_id        uuid not null references samples(id) on delete cascade,
  tolerance_set_id uuid not null references tolerance_sets(id),
  approved_by_name text not null,
  approved_by_email text,
  signature_data   text,                        -- ảnh chữ ký hoặc hash xác nhận
  ip_hash          text,
  signed_at        timestamptz not null default now(),
  snapshot         jsonb not null               -- bản chụp toàn bộ tolerance_items tại thời điểm ký
);
```

> **Lưu ý cho AI code:** cột `snapshot` là bắt buộc. Nếu sau này bộ dung sai thay đổi, bản đã ký vẫn phải tra lại được nguyên trạng — đây là bằng chứng giải quyết tranh chấp.

### 4.8. Sản xuất, chất lượng, sai lệch

```sql
create table production_batches (
  id              uuid primary key default gen_random_uuid(),
  code            text unique not null,          -- PL-B-2026-0142
  order_line_id   uuid references order_lines(id),
  household_id    uuid not null references households(id),
  kiln_id         uuid references kilns(id),
  kiln_schedule_id uuid references kiln_schedules(id),
  status          batch_status not null default 'planned',
  qty_planned     int not null,
  qty_started     int, qty_fired int, qty_passed int, qty_failed int,
  clay_lot        text,
  glaze_lot       text,
  fired_at        timestamptz,
  fuel_note       text,                          -- dữ liệu môi trường: nhiên liệu/điện dùng
  defect_rate     numeric(5,2) generated always as
                    (case when qty_fired > 0 then round(qty_failed::numeric*100/qty_fired,2) end) stored,
  created_at      timestamptz not null default now()
);

create table qc_inspections (
  id             uuid primary key default gen_random_uuid(),
  order_line_id  uuid references order_lines(id),
  batch_id       uuid references production_batches(id),
  checkpoint     qc_checkpoint not null,
  inspector_id   uuid references profiles(id),
  inspected_at   timestamptz not null default now(),
  result         qc_result not null,
  measurements   jsonb default '[]',             -- [{tolerance_item_id, measured, pass:boolean}]
  photos         jsonb not null default '[]',    -- [{url, angle, taken_at, geo?}]
  notes          text,
  household_signed_at timestamptz,
  next_action    text,
  offline_id     text unique,                    -- khóa chống trùng khi đồng bộ từ PWA
  constraint chk_photos check (jsonb_array_length(photos) >= 1)
);
create index on qc_inspections (order_line_id, checkpoint);

create table nonconformities (
  id                uuid primary key default gen_random_uuid(),
  code              text unique not null,
  batch_id          uuid references production_batches(id),
  order_line_id     uuid references order_lines(id),
  qty               int not null,
  cause             nc_cause not null,
  description       text not null,
  photos            jsonb not null default '[]',
  decision          nc_decision,
  requires_customer_approval boolean not null default false,
  customer_approved_at timestamptz,
  cost_impact       numeric(14,2),
  cost_bearer       party_type,
  preventive_action text,
  owner_id          uuid references profiles(id),
  status            text not null default 'open',
  closed_at         timestamptz,
  created_at        timestamptz not null default now()
);
```

### 4.9. Đóng gói, xuất khẩu, chứng từ

```sql
create table packing_lists (
  id           uuid primary key default gen_random_uuid(),
  order_id     uuid not null references orders(id) on delete cascade,
  carton_no    text not null,
  l_mm int, w_mm int, h_mm int,
  gross_kg     numeric(8,2), net_kg numeric(8,2),
  contents     jsonb not null,                 -- [{order_line_id, passport_code, qty}]
  cushioning   text,
  stack_limit  smallint,
  photos       jsonb not null default '[]',
  unique (order_id, carton_no)
);

create table export_docs (
  id             uuid primary key default gen_random_uuid(),
  order_id       uuid not null references orders(id) on delete cascade,
  hs_code        text,
  hs_verified_by text,                          -- ★ tên đơn vị khai báo đã kiểm tra
  hs_verified_at timestamptz,
  co_type        text,                          -- 'Form B' | 'Form D' | ...
  co_status      text,
  checklist      jsonb not null default '{}',   -- {commercial_invoice:{status,file}, packing_list:{...}, ...}
  notes          text
);

create table shipments (
  id             uuid primary key default gen_random_uuid(),
  order_id       uuid not null references orders(id) on delete cascade,
  carrier        text, awb_bl_no text,
  incoterm       text,
  etd date, eta date, delivered_at date,
  insurance_note text,
  breakage_qty   int not null default 0,
  breakage_rate  numeric(5,2),
  claim_status   text,
  claim_file     text
);

create table documents (
  id          uuid primary key default gen_random_uuid(),
  entity_type text not null,                    -- 'order' | 'household' | 'design' | 'customer'
  entity_id   uuid not null,
  doc_type    text not null,
  file_url    text not null,
  version     smallint not null default 1,
  visible_to  text[] not null default '{staff}',-- {'staff'} | {'staff','customer'} | {'staff','artisan'}
  uploaded_by uuid references profiles(id),
  created_at  timestamptz not null default now()
);
create index on documents (entity_type, entity_id);
```

### 4.10. Hộ chiếu số ★

```sql
create table product_passports (
  id                uuid primary key default gen_random_uuid(),
  public_code       text unique not null,        -- PL-P-26A7K3 (ngắn, in được lên tem)
  order_line_id     uuid references order_lines(id),
  batch_id          uuid references production_batches(id),
  design_id         uuid not null references designs(id),
  design_version_id uuid references design_versions(id),
  household_id      uuid not null references households(id),
  collection_id     uuid references collections(id),
  serial_no         text,                        -- '07/50'
  fired_at          date,
  -- ⚠ CHỈ những trường dưới đây được render ra trang công khai
  materials_public  text,
  care_vi           text, care_en text,
  story_vi          text, story_en text,
  author_credit     text,                        -- rỗng nếu households.public_consent = false
  images            jsonb not null default '[]',
  published         boolean not null default false,
  published_at      timestamptz,
  published_by      uuid references profiles(id),
  privacy_checked_at timestamptz,                -- ★ G-Privacy: bắt buộc trước khi published=true
  view_count        int not null default 0
);

create table passport_views (
  id           bigserial primary key,
  passport_id  uuid references product_passports(id) on delete cascade,
  viewed_at    timestamptz not null default now(),
  country_code text,
  referrer     text
  -- KHÔNG lưu IP, không lưu user-agent đầy đủ, không đặt cookie theo dõi
);
```

### 4.11. Đo lường tác động

```sql
create table impact_metrics (
  id           uuid primary key default gen_random_uuid(),
  period       date not null,                    -- ngày đầu tháng
  metric_code  text not null,                    -- 'household_net_income' | 'value_per_firing' |
                                                 -- 'active_households' | 'defect_rate' | 'breakage_rate' |
                                                 -- 'ontime_rate' | 'youth_participation' | 'passport_coverage'
  household_id uuid references households(id),   -- null = toàn mạng lưới
  baseline     numeric(14,2),
  value        numeric(14,2) not null,
  evidence_ref text,
  computed_at  timestamptz not null default now(),
  unique (period, metric_code, household_id)
);
```

### 4.12. Sinh mã tự động

```sql
create sequence seq_household; create sequence seq_design; create sequence seq_order;
create sequence seq_batch;     create sequence seq_quote;  create sequence seq_nc;

create or replace function gen_code(prefix text, seq text, digits int default 3)
returns text language sql as
$$ select prefix || lpad(nextval(seq)::text, digits, '0') $$;

-- Ví dụ trigger cho orders
create or replace function trg_order_code() returns trigger language plpgsql as $$
begin
  if new.code is null then
    new.code := 'PL-O-' || to_char(now(),'YYYY') || '-' || lpad(nextval('seq_order')::text, 3, '0');
  end if;
  return new;
end $$;
create trigger set_order_code before insert on orders for each row execute function trg_order_code();
```

Mã hộ chiếu công khai dùng bảng chữ Crockford Base32 (bỏ I, L, O, U để tránh đọc nhầm), độ dài 6 ký tự sau tiền tố: `PL-P-26A7K3`.

### 4.13. Row Level Security — các policy quan trọng nhất

```sql
alter table households        enable row level security;
alter table order_lines       enable row level security;
alter table household_payouts enable row level security;
alter table qc_inspections    enable row level security;
alter table product_passports enable row level security;
-- ... bật cho TẤT CẢ bảng, không sót bảng nào

-- Nhân sự nội bộ đọc toàn bộ hộ nghề
create policy hh_staff_read on households for select
  using (is_staff());

-- Hộ nghề chỉ đọc chính mình
create policy hh_self on households for select
  using (id = my_household());

-- Khách hàng chỉ thấy hộ đã đồng ý công khai (và không thấy cột riêng tư — dùng VIEW bên dưới)
create policy hh_customer_public on households for select
  using (my_role() = 'customer' and public_consent = true);

-- ★ Che cột riêng tư bằng view, vì RLS của Postgres là theo DÒNG không theo CỘT
create view households_public as
  select id, code, name, owner_name, generation, hamlet, public_slug,
         bio_vi, bio_en, cover_image, status
  from households where public_consent = true;
grant select on households_public to anon, authenticated;

-- order_lines: hộ nghề chỉ thấy dòng của mình
create policy ol_artisan on order_lines for select
  using (household_id = my_household());

-- order_lines: khách hàng thấy dòng thuộc đơn của mình — nhưng KHÔNG được đọc unit_cost
create view order_lines_customer as
  select id, order_id, design_id, design_version_id, qty_ordered, unit_price, status
  from order_lines
  where order_id in (select id from orders where customer_id = my_customer());

-- household_payouts: chỉ hộ đó, kế toán, điều phối, admin
create policy hp_access on household_payouts for select
  using (household_id = my_household()
      or my_role() in ('admin','coordinator','accountant'));

-- Hộ nghề tự xác nhận đã nhận tiền — chỉ được sửa đúng một cột
create policy hp_confirm on household_payouts for update
  using (household_id = my_household())
  with check (household_id = my_household());
-- kèm trigger chặn mọi cột khác ngoài confirmed_by_household_at

-- Hộ chiếu số: ai cũng đọc được bản đã công bố
create policy pp_public on product_passports for select
  using (published = true);
create policy pp_staff on product_passports for all
  using (is_staff());
```

### 4.14. Ba trigger bắt buộc

```sql
-- (1) Cổng chuyển trạng thái đơn hàng
create or replace function assert_order_gate() returns trigger language plpgsql as $$
declare v_msg text; v_cnt int;
begin
  if new.status = old.status then return new; end if;

  if new.status = 'in_production' then
    select count(*) into v_cnt from payment_milestones
      where order_id = new.id and kind = 'deposit' and status = 'paid';
    if v_cnt = 0 then
      raise exception 'G3: Chưa nhận đủ tiền đặt cọc. Không được đặt nguyên liệu và lịch lò.';
    end if;
  end if;

  if new.status = 'packing' then
    select count(distinct checkpoint) into v_cnt from qc_inspections i
      join order_lines l on l.id = i.order_line_id
      where l.order_id = new.id and i.result in ('pass','conditional');
    if v_cnt < (select (value::text)::int from settings where key='min_qc_checkpoints') then
      raise exception 'G4: Đơn hàng chưa đủ số điểm kiểm tra bắt buộc (hiện có %).', v_cnt;
    end if;
    if exists (select 1 from nonconformities n join order_lines l on l.id=n.order_line_id
               where l.order_id = new.id and n.decision is null) then
      raise exception 'G4: Còn sản phẩm không phù hợp chưa có phương án xử lý.';
    end if;
  end if;

  if new.status = 'shipped' then
    if not exists (select 1 from export_docs where order_id = new.id and hs_verified_by is not null) then
      raise exception 'G6: Mã HS chưa được đơn vị khai báo xác nhận.';
    end if;
  end if;

  return new;
end $$;
create trigger t_order_gate before update of status on orders
  for each row execute function assert_order_gate();

-- (2) Phân bổ tiền phải khớp tổng giá trị đơn
create or replace function assert_allocation_sum() returns trigger language plpgsql as $$
declare v_sum numeric; v_total numeric;
begin
  select coalesce(sum(amount),0) into v_sum from order_allocations
    where order_id = coalesce(new.order_id, old.order_id);
  select total_value into v_total from orders
    where id = coalesce(new.order_id, old.order_id);
  if abs(v_sum - v_total) > 1000 then
    raise exception 'Phân bổ tiền (%) không khớp giá trị đơn hàng (%). Chênh lệch cho phép tối đa 1.000đ.', v_sum, v_total;
  end if;
  return null;
end $$;
create constraint trigger t_alloc_sum after insert or update or delete on order_allocations
  deferrable initially deferred for each row execute function assert_allocation_sum();

-- (3) Khóa giá vốn trả hộ sau khi hộ đã xác nhận
create or replace function protect_unit_cost() returns trigger language plpgsql as $$
begin
  if old.cost_locked_at is not null and new.unit_cost is distinct from old.unit_cost then
    if not exists (select 1 from cost_change_requests
                   where order_line_id = old.id and status = 'approved'
                     and new_cost = new.unit_cost and household_agreed_at is not null) then
      raise exception 'Giá trả hộ đã khóa. Phải có yêu cầu thay đổi được hộ nghề đồng ý và người có thẩm quyền duyệt.';
    end if;
  end if;
  return new;
end $$;
create trigger t_protect_cost before update on order_lines
  for each row execute function protect_unit_cost();
```

---

## PHẦN 5 — ĐẶC TẢ MÀN HÌNH NỘI BỘ (`/app/*`)

> Mọi màn hình trong phần này lắp từ bảy mẫu thích ứng M1–M7 ở §15.5 và chạy được trên cả máy tính lẫn điện thoại. Cách xử lý năm màn hình khó nhất nằm ở §15.6.

### 5.1. `/app` — Bảng điều khiển

Bố cục: sidebar trái cố định 240px (thu gọn còn icon trên tablet), nội dung chính lưới 12 cột.

**Thẻ chỉ số (hàng 1, 4 thẻ):**
| Thẻ | Nguồn dữ liệu | Cảnh báo |
|---|---|---|
| GMV tháng này / mục tiêu năm | `SUM(orders.total_value)` với `status ≥ contracted` | Đỏ nếu < 70% nhịp kế hoạch |
| Đơn đang chạy theo trạng thái | Đếm `orders` nhóm theo `status` | — |
| Giao đúng hạn 90 ngày | `actual_ship_date <= promised_ship_date` | Đỏ nếu < 90% |
| Tỷ lệ lỗi trung bình | Trung bình `production_batches.defect_rate` 6 lô gần nhất | Đỏ nếu tăng so với quý trước |

**Hàng 2 — "Việc cần xử lý ngay" (danh sách gộp, ưu tiên theo mức chặn):**
1. Đơn bị chặn ở cổng (G1–G6) — hiện rõ chặn vì lý do gì, nút đi thẳng đến chỗ khắc phục
2. Phiếu kiểm tra chờ duyệt
3. Sản phẩm không phù hợp chưa có phương án
4. Mốc thanh toán quá hạn
5. Chi trả hộ nghề đã đến hạn nhưng chưa xác nhận nhận đủ

**Hàng 3 — Lịch lò 14 ngày tới** (dải ngang, mỗi hộ một hàng) và **Cảnh báo tập trung khách hàng** (nếu một khách vượt `settings.customer_concentration_pct`).

Dashboard đổi theo vai trò: `qc` mở thẳng vào hàng đợi kiểm tra; `export` mở vào bảng kiểm chứng từ; `accountant` mở vào mốc thanh toán.

### 5.2. `/app/ho-nghe` — Bản đồ năng lực hộ nghề ★

Đây là màn hình khác biệt nhất của sản phẩm. Không phải danh bạ, mà là **công cụ ra quyết định phân công**.

**Chế độ Bảng (mặc định):** cột `Mã · Tên hộ · Kỹ thuật (chip) · Loại sản phẩm · Cao tối đa (mm) · Công suất/tháng · Lò trống gần nhất · Tỷ lệ lỗi · Đúng hạn · Đơn đang chạy · Trạng thái`. Sắp xếp và lọc mọi cột. Tỷ lệ lỗi tô nền theo thang: <5% xanh, 5–12% vàng, >12% đỏ.

**Chế độ So khớp:** nhập yêu cầu (loại sản phẩm, cao × rộng, số lượng, hạn giao) → hệ thống trả về danh sách hộ đủ điều kiện, xếp hạng theo điểm:

```
score = 0.30 × phù_hợp_kỹ_thuật
      + 0.25 × (1 − tỷ_lệ_lỗi_chuẩn_hóa)
      + 0.20 × đúng_hạn
      + 0.15 × còn_chỗ_lò_trước_hạn
      + 0.10 × kinh_nghiệm_loại_sản_phẩm_này
```
Hộ **không đủ điều kiện cứng** (vượt `kilns.max_piece_h_mm`, hết công suất, đang `paused`) bị loại khỏi danh sách kèm lý do hiển thị rõ — không xếp hạng thấp mà giấu lý do.

**`/app/ho-nghe/[id]` — 6 tab:**
- **Năng lực**: kỹ thuật + mức thành thạo, giới hạn kích thước theo loại sản phẩm, nguyên liệu sẵn có, ảnh chứng minh
- **Lò**: danh sách lò với kích thước lòng lò, lịch nung dạng lịch tháng
- **Mẫu**: danh mục mẫu sẵn có của hộ (là nguồn ý tưởng cho đồng thiết kế)
- **Lịch sử chất lượng**: biểu đồ tỷ lệ lỗi theo lô, phân loại nguyên nhân, các sản phẩm không phù hợp liên quan
- **Thu nhập**: tổng đã chi trả theo tháng, số ngày thanh toán trung bình, tỷ lệ đã xác nhận nhận đủ. *Chỉ `admin`, `coordinator`, `accountant` xem được.*
- **Hợp đồng & đồng ý**: nguyên tắc tham gia, đồng ý sử dụng dữ liệu, đồng ý công khai hình ảnh — kèm file ký

### 5.3. `/app/thiet-ke/[id]/dung-sai` — Trình dựng bộ dung sai ★

Giao diện ba cột tương ứng ba nhóm đặc tính, kéo–thả giữa các cột.

| Cột | Màu | Ràng buộc nhập |
|---|---|---|
| Bắt buộc | đỏ `--pl-fault` | Phải có `nominal`, `method`, `accept_criteria` |
| Có dung sai | vàng `--pl-kiln` | Phải có `tol_minus`, `tol_plus`, `unit` |
| Độc bản | xanh `--pl-jade` | Phải có mô tả bằng lời + tối thiểu 2 ảnh minh họa "khác nhau thế nào vẫn đạt" |

Nút **"Xem như khách hàng"** hiển thị đúng bản mà khách sẽ ký, có ảnh minh họa, dịch sang tiếng Anh. Nút **"Xem như hộ nghề"** hiển thị bản diễn giải đơn giản, dùng câu ngắn, kèm ảnh — không có số liệu kỹ thuật thừa.

Mẫu bắt buộc có sẵn khi tạo mới (bấm là điền): chiều cao, đường kính miệng, đường kính chân, độ dày thành, độ cong thân, độ phẳng chân đế, sắc độ men, độ bóng, vết nứt chân chim, biến dạng miệng.

### 5.4. `/app/don-hang/[code]` — Màn hình trung tâm

**Đầu trang cố định:** mã đơn · khách hàng · giá trị · Incoterm · hạn giao cam kết · thanh trạng thái 13 bước · **Chỉ báo cổng**: nếu đang bị chặn thì hiện băng đỏ *"Không thể chuyển sang [trạng thái] — thiếu: [danh sách]"* với liên kết đi thẳng đến chỗ khắc phục.

**Tab 1 — Tổng quan:** dòng thời gian sự kiện, người phụ trách, tệp hợp đồng, rủi ro đã gắn cờ.

**Tab 2 — Phân công:** bảng `order_lines`. Mỗi dòng: thiết kế + phiên bản, số lượng + **số dự phòng**, hộ được giao, giá vốn (ẩn với vai trò không có quyền), trạng thái xác nhận của hộ, chỗ lò đã đặt.
> **Quy tắc số dự phòng (`qty_spare`)** — tính tự động, cho phép ghi đè có lý do:
> `qty_spare = ceil(qty_ordered × max(tỷ_lệ_lỗi_hộ, 8%) )`, tối thiểu 1 với đơn ≤ 10 cái.

**Tab 3 — Lô sản xuất:** danh sách `production_batches` với thanh tiến độ theo máy trạng thái lô, số đạt/hỏng, lô đất và lô men, ngày nung.

**Tab 4 — Chất lượng:** 5 ô điểm kiểm tra dạng lưới. Mỗi ô: trạng thái (chưa có / đạt / có điều kiện / không đạt), người kiểm, thời gian, số ảnh. Bấm vào mở thư viện ảnh có số đo chồng lên. Phía dưới: danh sách sản phẩm không phù hợp.

**Tab 5 — Tiền:** hai bảng cạnh nhau —
- Trái: mốc thanh toán khách (kind, %, số tiền, hạn, trạng thái, hóa đơn)
- Phải: chi trả hộ nghề (hộ, mốc, số tiền, đã trả chưa, **hộ đã xác nhận nhận đủ chưa**)
Dưới cùng: **Bảng đối soát phân bổ** so sánh `SUM(order_allocations)` với `total_value`, hiện chênh lệch bằng số đỏ nếu không khớp.

**Tab 6 — Đóng gói:** danh sách kiện, kích thước, trọng lượng, ảnh từng kiện, sơ đồ xếp, giới hạn chồng.

**Tab 7 — Chứng từ:** bảng kiểm 8 mục (hợp đồng, hóa đơn thương mại, phiếu đóng gói, chứng từ vận tải, bảo hiểm, C/O, hồ sơ chất lượng, hướng dẫn xử lý sự cố). Mỗi mục: trạng thái + tệp + người duyệt. Ô mã HS có ô bắt buộc **"Đơn vị/người đã xác nhận"** — không có thì cổng G6 chặn.

**Tab 8 — Hộ chiếu:** sinh hộ chiếu số hàng loạt cho các sản phẩm đạt; xem trước; chạy **kiểm tra riêng tư**; công bố; tải tệp QR để in tem.

### 5.5. `/app/chat-luong` — Hàng đợi kiểm tra

Ba làn: **Chờ kiểm** · **Chờ duyệt** (hộ đã nhập, `qc` xác nhận) · **Không đạt cần xử lý**.
Mỗi thẻ hiện: mã lô, hộ, thiết kế, điểm kiểm tra, thời gian chờ. Quá 48 giờ thì đổi màu.

**`/app/chat-luong/nc/[id]` — quy trình 4 bước cố định** (khớp mục IX.4 hồ sơ):
1. Cách ly & ghi nhận: ảnh, số đo, mã lô — *không cho sửa hồ sơ gốc để hợp thức hóa*
2. Phân loại nguyên nhân: 7 nhóm (`nc_cause`)
3. Quyết định: sửa / làm lại / hạ cấp có thông báo / hoàn tiền / chấp nhận có điều kiện / loại bỏ. Nếu thay đổi tiêu chí đã ký thì **bắt buộc** gửi khách duyệt qua `/kh/duyet-sai-lech/[id]`
4. Cập nhật: chi phí lỗi, hành động phòng ngừa cho đơn tiếp theo, cập nhật hồ sơ năng lực hộ

### 5.6. `/app/kiem-chung` — Kiểm chứng nhu cầu

Phễu 4 bậc, mỗi bậc là một thẻ lớn có: số hiện tại / ngưỡng, thanh tiến độ, đèn xanh–đỏ.

| Bậc | Ngưỡng đi tiếp (từ hồ sơ, để trong `settings`) |
|---|---|
| Phỏng vấn vấn đề | 20 cuộc, ≥8 xác nhận vấn đề đủ lớn và đồng ý xem hồ sơ mẫu |
| Thử hồ sơ chào hàng | 8 khách, ≥3 yêu cầu chỉnh mẫu hoặc đề nghị báo giá thật |
| Mẫu trả phí | ≤5 cơ hội, **≥2 mẫu có `fee_paid = true`** |
| Đơn hàng thử nghiệm | ≤3 cơ hội, ≥1 đơn thanh toán thật + nghiệm thu + phản hồi |

Băng cảnh báo cố định phía trên: *"Lượt thích, lượt xem và lời khen không được tính là bằng chứng. Mẫu tặng miễn phí không tính vào bậc 3."* — hệ thống không cho phép đánh dấu `fee_paid = true` nếu `fee = 0`.

### 5.7. `/app/bao-gia/[id]` — Trình dựng báo giá

Cấu trúc giá hiển thị **tách bạch** (yêu cầu từ hồ sơ: khách phải biết phần nào là hàng hóa, phần nào là thiết kế, kiểm tra, đóng gói, vận chuyển):

```
Hàng hóa (theo dòng thiết kế)              ......
Phí nghiên cứu & đồng thiết kế             ......
Phí điều phối sản xuất & chất lượng        ......
Phí bao gói & hồ sơ                        ......
Vận chuyển ước tính (bên thứ ba, tách rõ)  ......
Phí giao dịch (%)                          ......
─────────────────────────────────────────────
Tổng cộng · Incoterm · Tiền tệ · Tỷ giá · Hiệu lực đến
```

Bảng bên phải (chỉ nội bộ) hiển thị **kiểm tra lãi đóng góp theo mô hình 300 triệu**: giá vốn hộ, chi phí bên ngoài, doanh thu nền tảng, chi phí biến đổi ước tính, lãi đóng góp trước và sau chi phí tìm khách. Nếu lãi đóng góp sau chi phí tìm khách **âm**, nút "Gửi báo giá" bị vô hiệu, kèm cảnh báo: *"Đơn này lỗ. Điều chỉnh giá hoặc phạm vi, không được cắt giá trả hộ nghề."*

Xuất PDF hai bản: tiếng Việt (nội bộ/hộ) và tiếng Anh (khách hàng quốc tế).

### 5.8. `/app/bao-cao` — Tám báo cáo

| # | Báo cáo | Chỉ số chính | Đích |
|---|---|---|---|
| 1 | GMV & doanh thu nền tảng | GMV, doanh thu, % trên GMV, theo tháng/thị trường/dòng sản phẩm | Kế hoạch tài chính |
| 2 | **Thu nhập hộ nghề** | Tiền hộ **đã xác nhận nhận đủ**, theo hộ/tháng, tăng trưởng so đường cơ sở | Mục tiêu +35% |
| 3 | **Giá trị trên mỗi mẻ nung** | `SUM(giá trị sản phẩm đạt) / số mẻ nung` theo hộ | Chỉ số cốt lõi của mô hình |
| 4 | Chất lượng | Tỷ lệ lỗi theo hộ/loại sản phẩm/nguyên nhân, xu hướng | Mục tiêu giảm ≥15% |
| 5 | Giao hàng | % đủ & đúng hạn, số ngày trễ trung bình | Mục tiêu ≥90% |
| 6 | Vỡ hỏng | % theo tuyến vận chuyển / loại bao gói / hộ | Mục tiêu <3% |
| 7 | Khách hàng | Tỷ lệ mua lại, mức tập trung, thời gian bán trung bình | Cảnh báo >35% |
| 8 | Tác động & môi trường | Số hộ hoạt động, việc làm, tỷ lệ có người trẻ tham gia, độ phủ hộ chiếu, nhiên liệu/số mẻ | Bảng XI.1 hồ sơ |

Mọi báo cáo có nút **Xuất Excel** và **Xuất PDF**, kèm dòng chân: *"Số liệu tính đến [thời điểm]. Chỉ tiêu là mục tiêu quản trị, không phải kết quả đã kiểm toán."*

---

## PHẦN 6 — ỨNG DỤNG HỘ NGHỀ (PWA) — `/tho/*` ★

Đây là phân hệ dễ thất bại nhất. Nếu hộ nghề không dùng được, toàn bộ dữ liệu truy xuất sụp đổ.

> Màn hình chủ đạo là điện thoại, nhưng `/tho/*` **không khóa ở mobile**: mở trên máy tính phải dùng được đầy đủ, vì nhiều hộ nhờ con cháu nhập liệu trên máy. Xem §15.3.

### 6.1. Nguyên tắc thiết kế bắt buộc

1. **Một màn hình một việc.** Không tab, không menu nhiều tầng. Điều hướng đáy 4 mục: Hôm nay · Đơn · Lò · Tiền.
2. **Chữ tối thiểu 17px, nút cao tối thiểu 48px, vùng chạm cách nhau ≥8px.**
3. **Không dùng thuật ngữ kỹ thuật.** "Dung sai ±3mm" → *"Cao 320mm. Chấp nhận từ 317 đến 323mm."*
4. **Ảnh là ngôn ngữ chính.** Mỗi yêu cầu đều có ảnh mẫu chuẩn đặt cạnh ô nhập.
5. **Chạy được khi mất mạng.** Xem đơn, chụp ảnh kiểm tra, ghi nhật ký lò, đếm đạt/hỏng — tất cả vào hàng đợi, tự gửi khi có mạng.
6. **Không bao giờ hiện giá bán cho khách, không hiện hộ khác.**

### 6.2. `/tho` — Hôm nay

```
┌──────────────────────────────────┐
│ Chào bác Tới · Hộ PL-H-003       │
│ ⚠ 2 việc chưa gửi được (mất mạng)│  ← chỉ hiện khi có hàng đợi
├──────────────────────────────────┤
│ 🔥 LÒ ĐANG NUNG                  │
│ Lô PL-B-2026-0142 · giờ thứ 14   │
│ [ Ghi kết thúc nung ]            │
├──────────────────────────────────┤
│ 📦 VIỆC HÔM NAY                  │
│ • Chụp ảnh trước nung — lô 0143  │
│   [ Chụp ngay ]                  │
│ • Đơn PL-O-2026-007: còn 12 cái  │
│   Hạn: 14/09 (còn 15 ngày)       │
├──────────────────────────────────┤
│ 💰 SẮP NHẬN                      │
│ 18.000.000đ · sau khi nung đạt   │
└──────────────────────────────────┘
```

### 6.3. `/tho/don/[code]` — Đơn được giao

Thứ tự khối, không đổi: **(1)** Ảnh mẫu chuẩn cỡ lớn, vuốt ngang · **(2)** Làm bao nhiêu cái: `12 cái + 2 cái dự phòng` · **(3)** Hạn giao, đếm ngược · **(4)** *"Bắt buộc đúng"* — danh sách nhóm `bat_buoc` diễn giải bằng lời, nền đỏ nhạt · **(5)** *"Được phép khác một chút"* — nhóm `co_dung_sai`, nền vàng nhạt · **(6)** *"Chỗ này mỗi cái một khác là bình thường"* — nhóm `doc_ban`, nền xanh nhạt, kèm ảnh minh họa · **(7)** Tiền hộ nhận cho đơn này và các mốc chi trả · **(8)** Nút lớn `[ Tôi nhận làm đơn này ]` → ghi `assignment_confirmed_at`, mở cổng G2.

### 6.4. `/tho/kiem-tra/[id]` — Chụp ảnh kiểm tra theo hướng dẫn

Từng bước một, không cho bỏ qua:

```
Bước 1/4 — Chụp toàn thân, chính diện
[ khung ngắm với ảnh mẫu mờ chồng lên để canh góc ]
[ 📷 Chụp ]

Bước 2/4 — Chụp chân đế
Bước 3/4 — Đo chiều cao rồi chụp cả thước trong ảnh
          Nhập số đo: [ ____ ] mm    (Đạt: 317–323)
          → hiện ngay ✅ ĐẠT hoặc ⚠ NGOÀI NGƯỠNG
Bước 4/4 — Đếm số cái
          Đạt: [ __ ]   Hỏng: [ __ ]
          Lý do hỏng: ○ Nứt ○ Cong ○ Sai màu men ○ Vỡ khi ra lò ○ Khác
```

Kết thúc: `[ Gửi ]`. Mất mạng thì hiện *"Đã lưu trong máy. Sẽ tự gửi khi có mạng."* — **không bao giờ hiện lỗi kỹ thuật cho hộ nghề.**

Cài đặt: nén ảnh xuống ≤1600px cạnh dài / ~400KB trước khi lưu vào IndexedDB; mỗi bản ghi mang `offline_id` (UUID sinh tại máy) để chống trùng khi đồng bộ.

### 6.5. `/tho/tien` — Tiền

Ba khối: **Sắp nhận** (theo mốc, kèm điều kiện) · **Đã chuyển** (ngày, số tiền, ảnh chứng từ, nút lớn `[ Xác nhận tôi đã nhận đủ ]`) · **Tổng năm nay** (biểu đồ cột theo tháng, chỉ số của hộ mình).

> Nút xác nhận này là **cơ chế minh bạch quan trọng nhất** của toàn hệ thống. Báo cáo thu nhập hộ nghề chỉ đếm số đã được hộ xác nhận. Đừng để AI code bỏ qua vì "trùng với trạng thái đã trả".

### 6.6. Kiến trúc ngoại tuyến

```ts
// lib/offline/outbox.ts
type OutboxItem = {
  id: string;            // offline_id, uuid sinh tại máy
  kind: 'qc_inspection' | 'batch_update' | 'kiln_log' | 'payout_confirm';
  payload: unknown;
  blobs: { key: string; blob: Blob }[];   // ảnh chờ tải lên
  createdAt: number;
  attempts: number;
  lastError?: string;
};
```
- Lưu bằng **Dexie.js**; ảnh giữ dạng Blob trong IndexedDB.
- Đồng bộ qua **Background Sync API**, dự phòng bằng kiểm tra khi mở app và khi `online` được kích hoạt.
- Máy chủ chống trùng bằng `qc_inspections.offline_id UNIQUE` → gửi lại nhiều lần vẫn an toàn.
- Xung đột: bản ghi kiểm tra là **chỉ thêm mới**, không sửa — nên không có xung đột thật. Với `production_batches`, áp dụng ghi sau thắng nhưng ghi lại toàn bộ vào `audit_logs`.
- Tài nguyên đọc được lưu đệm sẵn: đơn được giao trong 30 ngày, ảnh mẫu chuẩn, bộ dung sai đã diễn giải.

---

## PHẦN 7 — HỘ CHIẾU SỐ VÀ CỔNG KHÁCH HÀNG

### 7.1. `/p/[code]` — Trang hộ chiếu số ★

Đích đến của mã QR dán dưới đáy sản phẩm. Tải trong dưới 1,5 giây trên mạng 3G (đây là trang khách quốc tế mở lần đầu — nó thay mặt cả dự án).

**Bố cục dọc, tự đổi ngôn ngữ theo trình duyệt, có nút chuyển VI/EN:**

1. Ảnh sản phẩm thật (thư viện vuốt ngang) — ảnh chụp, không phải ảnh dựng
2. Tên tác phẩm · Bộ sưu tập · **Số bản: 07/50**
3. **Người làm ra tác phẩm này** — ảnh chân dung, tên hộ, đời thứ mấy làm nghề, kỹ thuật sử dụng. *Chỉ hiện khi `households.public_consent = true`; nếu không, ghi "Nghệ nhân Phù Lãng" không định danh.*
4. Vật liệu và men (mô tả công khai, không lộ công thức)
5. **Hành trình sản phẩm** — dòng thời gian: ngày tạo hình → ngày nung → ngày kiểm tra đạt → ngày đóng gói. Có 2–3 ảnh kiểm tra được duyệt cho công khai.
6. Hướng dẫn bảo quản (song ngữ)
7. Câu chuyện thiết kế
8. Chân trang: *"Kiểm tra bởi Phù Lãng Tinh Hoa · Mã lô PL-B-2026-0142"* + liên kết `/quy-trinh-chat-luong`

### 7.2. Cổng riêng tư — bắt buộc trước khi công bố (G-Privacy)

Hàm `assert_passport_privacy(passport_id)` chạy trước khi cho `published = true`. **Chặn nếu phát hiện bất kỳ trường hợp nào:**

| Kiểm tra | Hành động khi vi phạm |
|---|---|
| Bất kỳ trường văn bản công khai nào khớp mẫu số điện thoại (`0\d{9,10}`, `+84…`) | Chặn |
| Chứa số tiền, ký hiệu tiền tệ, từ khóa giá | Chặn |
| Chứa tên khách hàng hoặc mã hợp đồng | Chặn |
| `author_credit` khác rỗng nhưng `households.public_consent = false` | Chặn |
| Ảnh đính kèm chưa được đánh dấu `approved_for_public` | Chặn |
| Chứa dữ liệu cá nhân của người kiểm tra (tên đầy đủ + liên hệ) | Chặn |

Sau khi qua, ghi `privacy_checked_at` và ghi `audit_logs` với người bấm công bố. → *Trực tiếp đáp ứng tiêu chí nghiệm thu "An toàn" ở mục VII.4 hồ sơ.*

### 7.3. In tem QR

`/app/don-hang/[code]` → tab Hộ chiếu → `[ Tải tệp tem ]` sinh PDF khổ A4, mỗi trang 24 tem (35×35mm), mỗi tem gồm: QR, mã `PL-P-26A7K3`, số bản `07/50`, chữ nhỏ "Phù Lãng · Việt Nam". Mức sửa lỗi QR đặt ở **mức H** (30%) vì tem dán lên gốm men bóng, dễ xước.

### 7.4. `/kh/duyet-mau/[id]` — Duyệt mẫu chuẩn ★

Trang quyết định của toàn bộ mô hình chất lượng. Khách hàng thấy:

- Ảnh mẫu thật, nhiều góc, có thước trong ảnh
- **Bảng ba nhóm đặc tính** với nhãn tiếng Anh rõ ràng: *Must match exactly* / *Acceptable variation* / *Unique to each piece — this is intended*
- Với nhóm thứ ba: ảnh so sánh 2–3 sản phẩm khác nhau kèm chú thích *"Cả ba đều đạt"* — đây là chỗ **bán được sự khác biệt thủ công** thay vì phải xin lỗi vì nó
- Ô ghi chú yêu cầu chỉnh sửa
- Hai nút: `Yêu cầu chỉnh mẫu` · `Chấp nhận mẫu chuẩn và bộ dung sai`

Khi chấp nhận: nhập họ tên + email, ký bằng chuột/ngón tay, hệ thống lưu `sample_approvals` kèm **bản chụp toàn bộ bảng dung sai** (`snapshot`), gửi email xác nhận đính kèm PDF cho cả hai bên. Cổng G1 mở.

### 7.5. `/kh/don/[code]` — Theo dõi đơn hàng

Khách thấy: dòng thời gian trạng thái (tên thân thiện, không phải mã trạng thái nội bộ), ảnh kiểm tra **đã được duyệt cho khách xem**, mốc thanh toán và hóa đơn của mình, chứng từ có `visible_to` chứa `customer`, ngày giao dự kiến và cập nhật khi thay đổi (kèm lý do).

Khách **không** thấy: tên hộ sản xuất (trừ khi hộ đồng ý công khai), giá vốn, tỷ lệ lỗi nội bộ, hộ khác, phân bổ tiền.

---

## PHẦN 8 — TRÍ TUỆ NHÂN TẠO CÓ KIỂM SOÁT

Hồ sơ dự thi giới hạn rất rõ: AI chỉ ở vai trò hỗ trợ, mọi thông số kỹ thuật, giá, quyền tác giả và nội dung công khai **phải có người duyệt**. Cài đặt theo đúng ranh giới đó.

| # | Tính năng | Đầu vào → Đầu ra | Cơ chế người duyệt | Ưu tiên |
|---|---|---|---|---|
| 1 | Phát hiện trường dữ liệu thiếu | Hồ sơ hộ / đơn hàng → danh sách trường trống quan trọng | Chỉ gợi ý, không tự điền | MVP |
| 2 | Dự thảo bản dịch VI→EN | Câu chuyện, mô tả, hướng dẫn bảo quản | Trạng thái `draft_translation`, phải có người bấm duyệt mới hiển thị công khai | MVP |
| 3 | Phân loại ảnh kiểm tra | Ảnh → gợi ý nhãn: nứt / cong / lỗi men / đạt | **Chỉ gợi ý.** Kết luận đạt–hỏng luôn do `qc` bấm | V1 |
| 4 | Gợi ý từ khóa & mô tả sản phẩm | Thiết kế + kỹ thuật → dự thảo mô tả bán hàng | Người viết sửa trước khi đăng | V1 |
| 5 | Dự thảo bộ dung sai | Loại sản phẩm + kích thước → gợi ý các đặc tính cần đưa vào | Nhà thiết kế phải phân nhóm và duyệt từng dòng | V1 |
| 6 | Tóm tắt biên bản phỏng vấn | Biên bản dài → 5 gạch đầu dòng + gắn cờ ngưỡng | Không tự đổi `problem_confirmed` | V2 |

**Bốn quy tắc cứng khi cài AI:**
```
1. Không có tính năng AI nào được ghi trực tiếp vào: designs, design_versions,
   tolerance_items, quotes, order_lines.unit_cost, qc_inspections.result,
   product_passports (khi published=true).
   → AI chỉ ghi vào bảng ai_suggestions với trạng thái 'pending'.
2. Mọi nội dung do AI sinh ra đều mang cờ ai_generated = true và hiển thị
   nhãn "Bản dự thảo — chờ duyệt" cho tới khi có approved_by.
3. Không dùng ảnh tạo sinh ở bất kỳ đâu trong luồng chào bán. Chặn ở tầng upload.
4. Ghi lại prompt và phiên bản mô hình vào ai_suggestions.meta để truy vết.
```

```sql
create table ai_suggestions (
  id           uuid primary key default gen_random_uuid(),
  entity_type  text not null, entity_id uuid not null, field text not null,
  suggestion   jsonb not null,
  model        text, meta jsonb,
  status       text not null default 'pending',   -- pending | accepted | rejected | edited
  reviewed_by  uuid references profiles(id), reviewed_at timestamptz,
  created_at   timestamptz not null default now()
);
```

---

## PHẦN 9 — BẢO MẬT, DỮ LIỆU CÁ NHÂN VÀ VẬN HÀNH

### 9.1. Năm cam kết bảo vệ dữ liệu (từ mục VII.3 hồ sơ) → cách cài đặt

| Cam kết trong hồ sơ | Cài đặt kỹ thuật |
|---|---|
| Chỉ thu thập dữ liệu cần thiết; ghi rõ mục đích, thời hạn lưu, quyền sửa/xóa | Bảng `consents` ghi từng mục đích riêng; trang `/tho/ho-so` có nút "Yêu cầu sửa hoặc xóa dữ liệu của tôi" tạo phiếu cho `admin` xử lý trong 15 ngày |
| Phân quyền theo vai trò; khách không truy cập bí quyết, giá nội bộ, thông tin cá nhân hộ | RLS ở Phần 4.13 + view che cột + kiểm thử tự động ở Phần 10.3 |
| Nhật ký thay đổi với thiết kế, mẫu chuẩn, điểm kiểm tra, thanh toán | Trigger ghi `audit_logs` trên 6 bảng; bảng này không có policy UPDATE/DELETE |
| Sao lưu định kỳ, xác thực nhiều lớp cho quản trị, khóa quyền ngay khi rời dự án | Supabase PITR 7 ngày + xuất hằng tuần ra kho riêng; bật MFA bắt buộc cho `admin`, `accountant`; quy trình rời dự án ở §9.4 |
| Không dùng chuỗi khối để tạo ấn tượng | Không có phụ thuộc blockchain trong dự án. Ghi rõ trong README |

```sql
create table consents (
  id           uuid primary key default gen_random_uuid(),
  subject_type text not null,          -- 'household' | 'customer' | 'profile'
  subject_id   uuid not null,
  purpose      text not null,          -- 'lưu hồ sơ năng lực' | 'công khai hình ảnh' |
                                       -- 'ghi tên tác giả' | 'nhận email'
  granted      boolean not null,
  granted_at   timestamptz not null default now(),
  revoked_at   timestamptz,
  evidence     text,                   -- file ký hoặc ảnh biên bản
  retention_until date
);
```

### 9.2. Phân loại dữ liệu và quy tắc lưu trữ

| Mức | Ví dụ | Quy tắc |
|---|---|---|
| **Công khai** | Hộ chiếu số đã công bố, bộ sưu tập, hồ sơ nghệ nhân đã đồng ý | Cache CDN, không cookie theo dõi |
| **Nội bộ** | Thiết kế, dung sai, phiếu kiểm tra, lịch lò | Chỉ nhân sự; RLS |
| **Nhạy cảm** | Giá vốn hộ, phân bổ tiền, chi trả, hợp đồng | Chỉ `admin`/`coordinator`/`accountant`; mọi truy cập ghi log |
| **Cá nhân** | SĐT hộ nghề, giấy tờ, liên hệ khách | Không xuất ra bất kỳ báo cáo, API công khai hay tệp xuất nào; lưu tối thiểu, xóa theo `retention_until` |

### 9.3. Storage — cấu trúc bucket

```
public-media/         ← công khai: ảnh hộ chiếu đã duyệt, ảnh bộ sưu tập, chân dung đã đồng ý
  passports/{code}/…
  collections/{slug}/…
internal-media/       ← ký URL có hạn 60 phút, không public
  qc/{order_line_id}/{checkpoint}/…
  batches/{batch_code}/…
  designs/{design_id}/v{n}/…
documents/            ← ký URL, kiểm tra visible_to trước khi cấp
  orders/{order_code}/{doc_type}/…
  households/{code}/consents/…
```
Quy tắc: ảnh nội bộ **không bao giờ** được sao chép sang `public-media` bằng tay. Chỉ có hành động "Duyệt ảnh cho công khai" mới copy, và nó xóa toàn bộ metadata EXIF (đặc biệt là GPS) trước khi copy.

### 9.4. Quy trình rời dự án (offboarding)

Một hành động duy nhất trong `/app/cai-dat/nguoi-dung`: đặt `is_active = false` → khóa đăng nhập tức thì, thu hồi mọi session Supabase, chuyển giao các bản ghi `owner_id` cho người được chỉ định, ghi `audit_logs`. Không xóa tài khoản để giữ nguyên vết lịch sử.

### 9.5. Hiệu năng mục tiêu

> Bảng dưới đây được **thay thế và mở rộng bởi §15.9** (ngân sách theo từng thiết bị và từng mạng). Giữ lại ở đây để tra nhanh.

| Trang | Mục tiêu |
|---|---|
| `/p/[code]` hộ chiếu số | LCP < 1,5s trên 3G mô phỏng; tải tối đa 250KB JS |
| `/tho/*` | Dùng được hoàn toàn khi ngoại tuyến; tương tác đầu tiên < 2s |
| `/app/ho-nghe` với 200 hộ | Kết xuất bảng < 300ms (ảo hóa hàng) |
| `/app/don-hang/[code]` | Tải đủ 8 tab < 1,2s (tải trễ theo tab) |

---

## PHẦN 10 — TIÊU CHÍ NGHIỆM THU VÀ KIỂM THỬ

### 10.1. Ánh xạ trực tiếp từ mục VII.4 của hồ sơ dự thi

| Tiêu chí hồ sơ | Ngưỡng | Cách hệ thống chứng minh |
|---|---|---|
| **Tính đầy đủ** | 100% hộ thử nghiệm có hồ sơ năng lực; 100% đơn có mã lô, mẫu chuẩn và ≥3 điểm kiểm tra | Truy vấn kiểm tra ở §10.2, hiển thị thành thẻ trên `/app` |
| **Khả dụng** | Hộ nghề cập nhật trạng thái được trên điện thoại; tạo hồ sơ đơn hàng ≤20 phút khi đã có dữ liệu | Kiểm thử Playwright đo thời gian thật; nhật ký thao tác thực tế của hộ |
| **Truy xuất** | Từ mã sản phẩm tìm được hộ, lô, ảnh kiểm tra, phiên bản hồ sơ | Playwright: nhập `PL-P-…` → khẳng định 4 thực thể xuất hiện |
| **An toàn** | Không lộ SĐT, giá nội bộ, hợp đồng, dữ liệu cá nhân qua QR | Cổng G-Privacy §7.2 + bộ kiểm thử RLS §10.3 |
| **Khả năng xuất dữ liệu** | Xuất hồ sơ đơn hàng và lịch sử kiểm tra thành tệp | Nút "Xuất hồ sơ đơn hàng" → ZIP (PDF + XLSX + JSON + ảnh) |

### 10.2. Truy vấn kiểm tra tính đầy đủ (chạy hằng đêm, kết quả lên dashboard)

```sql
-- Hộ thử nghiệm thiếu dữ liệu năng lực
select h.code, h.name,
       (h.phone is null)                                      as thieu_lien_he,
       not exists(select 1 from household_techniques t where t.household_id=h.id) as thieu_ky_thuat,
       not exists(select 1 from kilns k where k.household_id=h.id)                as thieu_lo,
       not exists(select 1 from household_capacity c where c.household_id=h.id)   as thieu_cong_suat,
       (h.verified_by is null)                                as chua_xac_nhan
from households h
where h.status in ('signed','active');

-- Đơn hàng thiếu điều kiện truy xuất
select o.code,
       not exists(select 1 from production_batches b
                  join order_lines l on l.id=b.order_line_id where l.order_id=o.id) as thieu_ma_lo,
       not exists(select 1 from sample_approvals sa
                  join samples s on s.id=sa.sample_id where s.design_id in
                  (select design_id from order_lines where order_id=o.id))          as thieu_duyet_mau,
       (select count(distinct i.checkpoint) from qc_inspections i
        join order_lines l on l.id=i.order_line_id where l.order_id=o.id)          as so_diem_kiem_tra
from orders o
where o.status not in ('co_design','quoted','cancelled');
```

### 10.3. Bộ kiểm thử phân quyền (bắt buộc chạy trong CI trước mọi lần triển khai)

Với mỗi vai trò, đăng nhập bằng tài khoản kiểm thử và khẳng định:

```
[artisan]  SELECT households WHERE id <> my_household()       → 0 dòng
[artisan]  SELECT order_lines WHERE household_id <> mine      → 0 dòng
[artisan]  SELECT order_lines.unit_price                      → không đọc được / null
[artisan]  UPDATE household_payouts SET amount = 999          → bị từ chối
[customer] SELECT order_lines.unit_cost                       → không đọc được
[customer] SELECT households.phone                            → không đọc được
[customer] SELECT household_payouts                           → 0 dòng
[customer] SELECT orders WHERE customer_id <> mine            → 0 dòng
[anon]     SELECT product_passports WHERE published = false   → 0 dòng
[anon]     SELECT households                                  → 0 dòng (chỉ view households_public)
[qc]       UPDATE order_lines SET unit_cost                   → bị từ chối
[bất kỳ]   DELETE FROM audit_logs                             → bị từ chối
```

### 10.4. Năm kịch bản Playwright bắt buộc (nghiệm thu MVP)

1. **Vòng đời đầy đủ**: tạo yêu cầu → chấm sàng lọc → tạo thiết kế + dung sai → báo giá → hợp đồng → duyệt mẫu (ký) → phân công hộ → hộ xác nhận → ghi cọc đã trả → sản xuất → 5 điểm kiểm tra → đóng gói → chứng từ → giao → sinh và công bố hộ chiếu. **Khẳng định: không cổng nào bị bỏ qua.**
2. **Cổng chặn hoạt động**: thử chuyển sang `in_production` khi chưa ghi nhận cọc → nhận đúng thông báo tiếng Việt "G3: Chưa nhận đủ tiền đặt cọc…".
3. **Truy xuất**: mở `/p/{code}` → khẳng định hiện đúng hộ, lô, ngày nung, ảnh kiểm tra; đồng thời khẳng định **không** xuất hiện chuỗi khớp mẫu số điện thoại hay ký hiệu tiền tệ.
4. **Ngoại tuyến**: bật chế độ offline → hộ nghề tạo phiếu kiểm tra kèm 3 ảnh → bật lại mạng → khẳng định bản ghi lên máy chủ đúng một lần (thử gửi lại 2 lần, `offline_id` chặn trùng).
5. **20 phút**: đo thời gian tạo hồ sơ đơn hàng hoàn chỉnh từ dữ liệu có sẵn — phải < 20 phút với thao tác của một điều phối viên đã quen việc.

---

## PHẦN 11 — LỘ TRÌNH XÂY DỰNG

Khớp với kế hoạch 90 ngày và các cổng kiểm chứng của hồ sơ dự thi. Ứng dụng tối thiểu phải xong trong **tuần 7–10**.

### Giai đoạn MVP — tuần 7–10 (bắt buộc để qua cổng 90 ngày)

| Tuần | Hạng mục | Định nghĩa hoàn thành |
|---|---|---|
| 7 | Nền tảng: Supabase, schema §4.1–4.4, RLS, đăng nhập | Bộ kiểm thử §10.3 chạy xanh |
| 7 | **Khung giao diện thích ứng**: AppShell + bảy mẫu M1–M7 (§15.4–15.5) + manifest PWA | Một màn hình mẫu chạy đúng ở cả ba cỡ 360 / 768 / 1280 mà không có mã riêng cho mobile |
| 7–8 | Hồ sơ hộ nghề + lò + năng lực + nhập liệu khảo sát | 5–6 hộ có hồ sơ đầy đủ, truy vấn §10.2 không trả trường thiếu |
| 8 | Hồ sơ thiết kế + trình dựng dung sai 3 nhóm | 3 hồ sơ thiết kế hoàn chỉnh có bộ dung sai |
| 8–9 | Đơn hàng + phân công + máy trạng thái + 6 cổng chặn | Kịch bản Playwright 1 và 2 chạy xanh |
| 9 | Lô sản xuất + 5 điểm kiểm tra + PWA hộ nghề (đọc + chụp ảnh + ngoại tuyến) | Kịch bản 4 chạy xanh; 1 hộ thật dùng được không cần hướng dẫn lại |
| 10 | Hộ chiếu số + cổng riêng tư + in tem QR + xuất hồ sơ đơn hàng | Kịch bản 3 và 5 chạy xanh |
| 9–10 | **CMS lõi**: người dùng & vai trò, danh mục, cấu hình có sàn cứng, hàng đợi kiểm duyệt, nhật ký | Không còn danh mục nào nằm trong mã nguồn; sửa được một cấu hình trọng yếu và thấy vết trong nhật ký |
| 10 | **Không gian hộ nghề tối thiểu**: tổng quan, hồ sơ năng lực có duyệt, lò & lịch nung, thành viên | Một hộ tự cập nhật công suất, thay đổi vào hàng đợi, điều phối viên duyệt, bản đồ năng lực đổi theo |

**Nằm ngoài MVP, tuyệt đối không làm trong 90 ngày:** cổng khách hàng, báo giá PDF song ngữ, bàn xuất khẩu đầy đủ, 8 báo cáo, mọi tính năng AI trừ phát hiện trường thiếu.

### Giai đoạn V1 — tháng 4–6 (trùng "Tạo mẫu và hệ thống")
Cổng khách hàng `/kh/*` + duyệt mẫu có chữ ký · Báo giá + PDF song ngữ · Mẫu trả phí · Module kiểm chứng nhu cầu · Sản phẩm không phù hợp · Chi trả hộ + nút xác nhận nhận đủ · Báo cáo 1–4.
**CMS:** trình dựng nội dung trang công khai, thư viện media với luồng duyệt ảnh, bản dịch, mẫu chứng từ & email.
**Hộ nghề:** danh mục tác phẩm, màn hình đồng ý & riêng tư kèm bản đồ "ai nhìn thấy gì", báo cáo của hộ và bản in xác nhận thu nhập.

### Giai đoạn V1.5 — tháng 7–12 (trùng "Bán thử có kiểm soát")
Bàn xuất khẩu + bảng kiểm chứng từ · Đóng gói + vận chuyển + vỡ hỏng · Báo cáo 5–8 · Trang công khai song ngữ đầy đủ · AI mục 2–5 · Thông báo email.

### Giai đoạn V2 — tháng 13–24 (trùng "Củng cố" và "Mở rộng có điều kiện")
Đa làng nghề (thêm `villages`, tách không gian dữ liệu theo làng — *hồ sơ yêu cầu: không gom chung thành một nhãn hiệu làm mờ nguồn gốc*) · Sổ tay nhân rộng dạng số · Cổng nhà thiết kế cộng tác · Dữ liệu môi trường theo mẻ nung · API cho đối tác phân phối.

> **Cảnh báo phạm vi cho AI code:** đây là dự án của một người phụ trách công nghệ với ngân sách 550 triệu đồng cho 18 tháng. Nếu một tính năng không nằm trong bảng lộ trình trên, **không xây**. Ưu tiên tuyệt đối: dữ liệu đúng > cổng chặn hoạt động > hộ nghề dùng được > giao diện đẹp.

---

## PHẦN 12 — PROMPT DÁN VÀO AI CODE

### 12.1. Prompt chính (dán vào Antigravity / Claude Code khi khởi tạo dự án)

```
Xây dựng ứng dụng "Phù Lãng Tinh Hoa" theo đúng bản đặc tả đính kèm (blueprint.md).

BỐI CẢNH
Đây là hệ điều hành vận hành cho một mạng lưới sản xuất gốm thủ công phân tán tại
Phù Lãng, Bắc Ninh. Người dùng gồm nhân sự điều phối (máy tính), hộ nghề thủ công
(điện thoại, mạng yếu, không quen phần mềm) và khách hàng B2B quốc tế (song ngữ).

STACK BẮT BUỘC
Next.js 14 App Router + TypeScript strict + Tailwind + shadcn/ui + Supabase
(PostgreSQL, RLS, Auth, Storage) + Vercel. PWA bằng Serwist, hàng đợi ngoại tuyến
bằng Dexie.js. Form dùng react-hook-form + zod. i18n dùng next-intl (vi mặc định).

THỨ TỰ THỰC HIỆN — làm đúng thứ tự này, không nhảy cóc
1. Chạy toàn bộ SQL ở Phần 4 (enums → bảng → view → policy → trigger → seed settings).
2. Viết bộ kiểm thử phân quyền ở §10.3 TRƯỚC khi làm giao diện. Phải xanh mới đi tiếp.
3. Tách toàn bộ quy tắc nghiệp vụ ở Phần 3 vào lib/domain/*.ts, có test Vitest riêng,
   không phụ thuộc React hay Supabase client.
4. Dựng /app (nội bộ) theo Phần 5.
5. Dựng /tho (PWA hộ nghề) theo Phần 6 — đây là phần khó nhất, dành thời gian nhất.
6. Dựng /p/[code] và /kh/* theo Phần 7.
7. Dựng /app/quan-tri (Phần 13) và /tho/quan-ly (Phần 14).

BƯỚC 0 — LÀM TRƯỚC TẤT CẢ MÀN HÌNH NGHIỆP VỤ
Dựng khung giao diện thích ứng theo Phần 15: component AppShell (thanh bên ≥lg / thanh
dưới <md, thực đơn theo vai trò §15.4) và bảy mẫu dùng lại M1–M7 ở §15.5
(AdaptiveTable, chủ–chi tiết, TabRouter, ResponsiveDialog, StepForm, FilterBar,
PhotoCapture), cùng design token điểm ngắt và manifest PWA. Mọi màn hình ở các bước
sau chỉ được lắp từ bảy mẫu này, không tự dựng bố cục riêng. Lưu ý: CMS lõi (người dùng,
   danh mục, cấu hình, hàng đợi kiểm duyệt) phải làm SỚM, ngay sau bước 4 — vì các bước
   sau phụ thuộc vào danh mục và cấu hình đọc từ cơ sở dữ liệu chứ không phải hằng số.

RÀNG BUỘC TUYỆT ĐỐI
- Sáu cổng chặn ở §3.3 phải cài bằng TRIGGER TRONG DATABASE, không chỉ kiểm tra ở UI.
- Cột order_lines.unit_cost và households.phone không bao giờ được lộ cho vai trò
  customer — kiểm chứng bằng test, không chỉ bằng điều kiện ẩn hiện trong JSX.
- Mọi giá trị ở "tầng L5" (§0.3) đọc từ bảng settings. Cấm hardcode số.
- Trang /tho/* phải hoạt động khi ngoại tuyến và không bao giờ hiện thông báo lỗi
  kỹ thuật cho hộ nghề. Chữ tối thiểu 17px, nút cao tối thiểu 48px.
- Không thêm cổng thanh toán, blockchain, ảnh AI tạo sinh, hay giỏ hàng B2C.
- CMS chỉ quản lý cấu hình, danh mục, nội dung và người dùng. CMS TUYỆT ĐỐI KHÔNG được
  có màn hình sửa trực tiếp đơn hàng, phiếu kiểm tra, bản ký duyệt mẫu hay nhật ký.
- Hộ nghề sửa hồ sơ năng lực thì thay đổi phải vào hàng đợi duyệt, KHÔNG áp dụng ngay,
  vì dữ liệu này điều khiển thuật toán phân bổ đơn hàng.
- Một hộ có nhiều tài khoản. Chỉ vai trò owner trong hộ mới xem được tiền và báo cáo.
- Toàn bộ nhãn giao diện, thông báo lỗi và tên trạng thái viết bằng tiếng Việt tự nhiên,
  không dùng tiếng Anh lẫn lộn, không dùng mã trạng thái thô cho người dùng cuối.
- MỘT mã nguồn cho mọi thiết bị. Cấm tạo route riêng cho điện thoại, cấm nhận dạng
  user-agent để đổi trang, cấm viết hai component riêng cho cùng một bảng dữ liệu.
  Viết CSS mobile-first, mở rộng bằng sm/md/lg/xl.
- Vùng chạm ≥44px toàn hệ thống (48px trong /tho), cỡ chữ ô nhập ≥16px, dùng 100dvh
  thay 100vh, chừa env(safe-area-inset-bottom). Không dùng hover làm cách DUY NHẤT để
  lộ một hành động.
- Băng cảnh báo cổng chặn ở màn hình đơn hàng không bao giờ được ẩn ở cỡ màn hình nào.

ĐỊNH NGHĨA HOÀN THÀNH
Năm kịch bản Playwright ở §10.4 chạy xanh. Truy vấn §10.2 không trả về trường thiếu
với dữ liệu mẫu 6 hộ và 3 đơn hàng.

Bắt đầu bằng bước 1. Sau mỗi bước, dừng lại và báo cáo những gì đã tạo trước khi đi tiếp.
```

### 12.2. Prompt từng phần (khi AI bị giới hạn ngữ cảnh)

```
[P0 — Khung UI]  Dựng AppShell thích ứng §15.4 và bảy mẫu M1–M7 §15.5, kèm token điểm ngắt,
                 manifest PWA §15.8 và ba tầng ngoại tuyến. Làm TRƯỚC mọi màn hình nghiệp vụ.

[P1 — CSDL]      Tạo migration Supabase từ Phần 4 của blueprint. Đủ enums, bảng, view che cột,
                 policy RLS, 3 trigger bắt buộc, sinh mã tự động, seed settings. Kèm file
                 seed dữ liệu mẫu: 6 hộ nghề, 12 kỹ thuật, 3 thiết kế có dung sai, 2 khách,
                 3 đơn ở các trạng thái khác nhau.

[P2 — Nghiệp vụ] Cài lib/domain/: orderStateMachine.ts (13 trạng thái + 6 cổng §3.3),
                 allocation.ts (kiểm tra tổng phân bổ), tolerance.ts (đánh giá số đo theo
                 3 nhóm), matching.ts (công thức xếp hạng hộ §5.2), screening.ts (chấm điểm
                 sàng lọc §3.8), spare.ts (số dự phòng §5.4). Mỗi file có test Vitest.

[P3 — App nội bộ] Dựng /app theo Phần 5 bằng các mẫu ở P0: dashboard, bản đồ năng lực hộ nghề,
                 trình dựng dung sai, màn hình đơn hàng 8 tab với chỉ báo cổng chặn.
                 Áp dụng đúng cách xử lý 5 màn hình khó ở §15.6 — đặc biệt: bản đồ năng lực
                 mở mặc định ở chế độ So khớp khi <lg; trình dựng báo giá chỉ cho xem trên
                 điện thoại, không cho soạn mới.

[P4 — PWA hộ]    Dựng /tho theo Phần 6: 4 mục điều hướng đáy, luồng chụp ảnh kiểm tra
                 từng bước, nhật ký lò, màn hình tiền có nút xác nhận nhận đủ, hàng đợi
                 ngoại tuyến Dexie + Background Sync + chống trùng bằng offline_id.

[P5 — Công khai] Dựng /p/[code] (hộ chiếu số, LCP < 1,5s), cổng riêng tư §7.2, sinh PDF
                 tem QR mức sửa lỗi H, và /kh/duyet-mau/[id] có chữ ký + snapshot dung sai.

[P6 — Báo cáo]   8 báo cáo §5.8 với xuất Excel và PDF, cùng job hằng đêm tính impact_metrics.

[P7 — CMS]       Dựng /app/quan-tri theo Phần 13: 9 module. Ưu tiên theo thứ tự người dùng,
                 danh mục, cấu hình (có sàn cứng §13.5 và xác nhận 2 bước), hàng đợi kiểm
                 duyệt §13.10, nhật ký. Sau đó mới tới nội dung, media, bản dịch, mẫu.
                 Ma trận quyền ở /app/quan-tri/nguoi-dung phải sinh từ policy RLS đang chạy,
                 không hardcode bảng tĩnh.

[P8 — Hộ nghề]   Dựng /tho/quan-ly theo Phần 14: 7 màn hình, hai chế độ Làm việc ⇄ Quản lý hộ,
                 phân quyền owner/worker qua household_members, luồng duyệt thay đổi hồ sơ
                 §14.5 (tách rõ thay đổi ảnh hưởng phân bổ và không ảnh hưởng), bản đồ
                 "ai nhìn thấy gì" sinh từ RLS, và PDF xác nhận thu nhập có mã tra cứu.
                 Đăng nhập bằng số điện thoại + OTP, phiên 90 ngày.
```

---

---

## PHẦN 13 — CMS QUẢN TRỊ HỆ THỐNG (`/app/quan-tri/*`)

### 13.1. Vì sao cần CMS riêng, và ranh giới của nó

CMS tồn tại để giữ đúng lời hứa ở §0.3: **mọi thứ thuộc tầng L5 phải sửa được mà không cần lập trình viên và không cần triển khai lại**. Dự án chỉ có một người phụ trách công nghệ; nếu đổi một mức phí hay một đoạn văn trang chủ cũng phải mở mã nguồn thì hệ thống sẽ chết dần.

**Ranh giới cứng — CMS được và không được đụng vào gì:**

| CMS ĐƯỢC sửa | CMS KHÔNG ĐƯỢC sửa |
|---|---|
| Cấu hình vận hành (`settings`) | Đơn hàng, báo giá, phiếu kiểm tra đã ghi nhận |
| Danh mục hệ thống (kỹ thuật, loại sản phẩm, nguyên nhân lỗi) | Bản ký duyệt mẫu (`sample_approvals.snapshot`) |
| Nội dung trang công khai, ảnh, bản dịch | Nhật ký `audit_logs` |
| Người dùng, vai trò, quyền truy cập | Giá vốn đã khóa (`order_lines.unit_cost`) |
| Mẫu chứng từ và mẫu email | Kết quả kiểm tra chất lượng đã ký |
| Cờ tính năng, thông báo hệ thống | Lịch sử chi trả đã được hộ nghề xác nhận |

> Nguyên tắc: CMS quản lý **khung và cấu hình**. Dữ liệu nghiệp vụ đã chốt là bằng chứng, không phải nội dung. Nếu một bản ghi cần sửa vì nhập sai, hệ thống tạo bản ghi đính chính có lý do và người ký — không sửa đè.

### 13.2. Chín module

| # | Module | URL | Vai trò truy cập |
|---|---|---|---|
| 1 | Người dùng & vai trò | `/app/quan-tri/nguoi-dung` | `admin` |
| 2 | Danh mục hệ thống | `/app/quan-tri/danh-muc` | `admin`, `coordinator` |
| 3 | Cấu hình vận hành | `/app/quan-tri/cau-hinh` | `admin` |
| 4 | Nội dung trang công khai | `/app/quan-tri/noi-dung` | `admin`, `coordinator`, `designer` |
| 5 | Thư viện media | `/app/quan-tri/media` | `admin`, `coordinator`, `designer` |
| 6 | Bản dịch (i18n) | `/app/quan-tri/ban-dich` | `admin`, `coordinator` |
| 7 | Mẫu chứng từ & email | `/app/quan-tri/mau` | `admin`, `export` |
| 8 | **Hàng đợi kiểm duyệt** | `/app/quan-tri/duyet` | `admin`, `coordinator` |
| 9 | Nhật ký & dữ liệu | `/app/quan-tri/nhat-ky` | `admin` |

### 13.3. Module 1 — Người dùng & vai trò

Bảng người dùng: họ tên · vai trò · hộ nghề/khách hàng liên kết · lần đăng nhập gần nhất · trạng thái · MFA đã bật chưa.

Hành động: **Mời người dùng** (email hoặc số điện thoại → gửi liên kết đặt mật khẩu, hạn 72 giờ) · **Đổi vai trò** (bắt buộc nhập lý do, ghi `audit_logs`) · **Vô hiệu hóa** (§9.4: khóa đăng nhập, thu hồi session, chuyển giao `owner_id`, **không xóa tài khoản**) · **Buộc bật MFA**.

Bảng phụ **"Ai đang xem được gì"**: chọn một vai trò → hệ thống hiển thị ma trận quyền §1.2 ở dạng đọc được, sinh trực tiếp từ policy RLS đang chạy chứ không phải bảng tĩnh viết tay. Đây là công cụ để trả lời câu hỏi của hộ nghề: *"Khách hàng có nhìn thấy số điện thoại của tôi không?"*

Với vai trò `artisan`, cột "Hộ nghề" cho phép một người thuộc **một hộ duy nhất**; nhiều người có thể cùng thuộc một hộ (xem §14.3).

### 13.4. Module 2 — Danh mục hệ thống

Thay cho việc chôn các danh sách vào mã nguồn, toàn bộ danh mục nằm trong bảng `taxonomy_terms` chung, quản lý qua một giao diện duy nhất.

| Nhóm danh mục | `taxonomy` | Có được xóa không |
|---|---|---|
| Kỹ thuật gốm | `technique` | Có, nếu chưa hộ nào dùng |
| Loại sản phẩm | `product_type` | Có, nếu chưa thiết kế nào dùng |
| Loại men / loại đất | `glaze`, `clay` | Có |
| Nguyên nhân lỗi | `nc_cause` | **Không** — cố định 7 nhóm |
| Điểm kiểm tra | `qc_checkpoint` | **Không** — cố định 5 điểm |
| Phân khúc khách hàng | `customer_segment` | Có |
| Thị trường xuất khẩu | `market` | Có |
| Điều kiện giao hàng | `incoterm` | Có |
| Loại chứng từ | `doc_type` | Có |
| Vai trò trong hộ | `household_member_role` | **Không** |

Mỗi mục có: mã · tên tiếng Việt · tên tiếng Anh · nhóm · thứ tự · đang dùng ở bao nhiêu bản ghi · trạng thái (đang dùng / ngừng dùng). **Không cho xóa cứng** mục đang được tham chiếu — chỉ cho đặt `ngừng dùng`, khi đó mục biến mất khỏi các ô chọn mới nhưng dữ liệu cũ vẫn hiển thị đúng.

### 13.5. Module 3 — Cấu hình vận hành, có bảo vệ

Danh sách `settings` nhóm theo chủ đề: Tài chính · Chất lượng · Sàng lọc · Chứng từ · Pháp nhân · Giao diện.

Mỗi mục: nhãn tiếng Việt · giá trị hiện tại · kiểu dữ liệu · mô tả · người sửa gần nhất · lịch sử thay đổi.

**Bốn cơ chế bảo vệ bắt buộc:**

1. **Xác thực kiểu dữ liệu** bằng schema lưu trong cột `value_schema`, kiểm tra ở cả client và server.
2. **Ngưỡng sàn không được phá.** Một số cấu hình là cam kết trong hồ sơ dự thi, không phải tùy chọn. Hệ thống chặn nếu đặt thấp hơn sàn:

| Khóa | Sàn cứng | Lý do |
|---|---|---|
| `min_qc_checkpoints` | ≥ 3 | Cam kết "100% đơn hàng có ít nhất 03 điểm kiểm tra" |
| `min_deposit_pct` | ≥ 30 | Bảo vệ dòng tiền, không tài trợ khách bằng tiền hộ nghề |
| `target_breakage_rate_pct` | ≤ 5 | Mục tiêu công bố là dưới 3% |
| `target_ontime_rate_pct` | ≥ 85 | Mục tiêu công bố là 90% |
| `customer_concentration_pct` | ≤ 40 | Ngưỡng cảnh báo phụ thuộc một khách |

3. **Cấu hình trọng yếu (`is_critical = true`) cần hai bước**: nhập lý do → hộp xác nhận nêu rõ hệ quả → ghi `audit_logs` kèm giá trị trước/sau.
4. **Không có nút "Khôi phục mặc định" hàng loạt.** Chỉ khôi phục từng mục, có ghi log.

### 13.6. Module 4 — Nội dung trang công khai (page builder)

Không phải trình soạn thảo tự do. Dùng **khối cố định** để trang công khai luôn đúng thương hiệu và luôn nhanh.

| Khối | Dùng ở đâu | Trường nhập |
|---|---|---|
| `hero` | Trang chủ | Tiêu đề, phụ đề, ảnh nền, nút hành động |
| `capability_grid` | `/nang-luc` | 3–6 thẻ: biểu tượng, tiêu đề, mô tả |
| `process_steps` | `/nang-luc` | 6 bước quy trình, tự lấy từ §3.1 nhưng cho sửa lời |
| `collection_grid` | Trang chủ, `/bo-suu-tap` | Chọn bộ sưu tập đã công bố |
| `artisan_grid` | `/nghe-nhan` | **Chỉ hiện hộ có `public_consent = true`** — hệ thống lọc, người biên tập không tự thêm được |
| `story` | Nhiều trang | Văn bản Markdown + ảnh |
| `quote` | Nhiều trang | Trích dẫn khách hàng đã xin phép, tên, tổ chức |
| `faq` | `/quy-trinh-chat-luong` | Cặp hỏi–đáp |
| `cta_form` | Cuối trang | Biểu mẫu tạo `inquiries` |

Mỗi trang có: bản nháp / đã xuất bản, xem trước theo thiết bị, phiên bản tiếng Việt và tiếng Anh song song (cột đôi, thấy ngay chỗ nào chưa dịch), trường SEO (tiêu đề, mô tả, ảnh chia sẻ), và lịch xuất bản.

**Ràng buộc:** không cho chèn HTML thô, không cho nhúng script bên ngoài. Trang công khai là mặt tiền đối ngoại của một hồ sơ dự thi cấp tỉnh — không đánh đổi an toàn lấy sự linh hoạt.

### 13.7. Module 5 — Thư viện media

Lưới ảnh có bộ lọc theo: bucket (công khai / nội bộ), thực thể liên quan, hộ nghề, đã xóa EXIF chưa, trạng thái đồng ý.

**Quy tắc quan trọng nhất — ảnh không tự đi từ nội bộ sang công khai.** Chỉ có hành động **"Duyệt ảnh cho công khai"** mới sao chép sang `public-media`, và hành động đó tự động: xóa toàn bộ metadata EXIF (đặc biệt GPS), tạo các kích thước phái sinh, kiểm tra hộ nghề liên quan có `public_consent`, ghi `audit_logs`.

Mỗi tệp có: mô tả thay thế (alt) bắt buộc trước khi dùng ở trang công khai · người chụp · ngày chụp · hộ nghề liên quan · trạng thái đồng ý.

### 13.8. Module 6 — Bản dịch

Bảng `translations`: khóa · tiếng Việt · tiếng Anh · ngữ cảnh · trạng thái (`missing` / `draft_ai` / `approved`).

Bộ lọc mặc định mở ở **"Thiếu bản tiếng Anh"** — vì đây là hệ thống hướng xuất khẩu, thiếu dịch là lỗi vận hành chứ không phải chuyện nhỏ. Nội dung do AI dự thảo (§8, mục 2) đổ về đây ở trạng thái `draft_ai`, hiển thị nhãn vàng, **không được dùng ở trang công khai cho tới khi có người duyệt**.

Nhập/xuất CSV để gửi cho người dịch bên ngoài.

### 13.9. Module 7 — Mẫu chứng từ & email

| Loại | Mẫu |
|---|---|
| Chứng từ | Báo giá (VI/EN), hóa đơn thương mại, phiếu đóng gói, biên bản duyệt mẫu, phiếu kiểm tra, hồ sơ chất lượng bàn giao |
| Email | Mời người dùng, gửi báo giá, yêu cầu duyệt mẫu, thông báo mốc thanh toán, thông báo giao hàng, thông báo chi trả cho hộ nghề |

Soạn bằng khối + biến động (`{{order.code}}`, `{{customer.company_name}}`, `{{household.name}}`). Có nút **Xem trước với dữ liệu thật** (chọn một đơn hàng có sẵn). Đầu trang chứng từ lấy từ `settings.company_profile` — đổi thông tin pháp nhân một chỗ, đổi trên toàn bộ chứng từ.

### 13.10. Module 8 — Hàng đợi kiểm duyệt ★

Một màn hình gom mọi thứ đang chờ người có thẩm quyền quyết định. Đây là module nối trực tiếp CMS với không gian của hộ nghề ở Phần 14.

| Loại chờ duyệt | Nguồn | Người duyệt | Hệ quả nếu chậm |
|---|---|---|---|
| Thay đổi hồ sơ năng lực hộ | `/tho/quan-ly/ho-so` | `coordinator` | Phân công đơn dựa trên dữ liệu cũ → nhận đơn vượt năng lực |
| Ảnh hộ nghề xin công khai | `/tho/quan-ly/tac-pham` | `coordinator` | Chậm cập nhật trang `/nghe-nhan` |
| Hộ chiếu số chờ công bố | Tab Hộ chiếu | `coordinator` | Khách quét QR không ra gì |
| Yêu cầu đổi giá vốn | `cost_change_requests` | `admin` | Sản xuất đình trệ |
| Phiếu kiểm tra hộ nhập chờ xác nhận | `/tho/kiem-tra` | `qc` | Cổng G4 chặn đơn |
| Yêu cầu sửa/xóa dữ liệu cá nhân | `/tho/quan-ly/dong-y` | `admin` | **Vi phạm cam kết 15 ngày ở §9.1** |

Mỗi mục hiển thị: nội dung thay đổi dạng so sánh **trước → sau**, người đề nghị, thời gian chờ. Quá hạn thì đổi màu. Duyệt hoặc từ chối đều **bắt buộc nhập lý do** khi từ chối, và lý do đó hiển thị lại cho hộ nghề bằng lời dễ hiểu.

### 13.11. Module 9 — Nhật ký & dữ liệu

- **Nhật ký thay đổi**: lọc theo thực thể, người thực hiện, khoảng thời gian, loại hành động. Có bộ lọc riêng cho các hành động nhạy cảm: đổi vai trò, đổi cấu hình trọng yếu, đổi giá vốn, công bố hộ chiếu, vô hiệu hóa người dùng.
- **Nhật ký cổng chặn**: mọi lần một cổng G1–G6 chặn thao tác đều được ghi. Đây là dữ liệu quý — nó cho biết quy trình đang vướng ở đâu, và là bằng chứng cho ban giám khảo rằng cam kết chất lượng được thực thi chứ không phải khẩu hiệu.
- **Xuất dữ liệu**: xuất toàn bộ một đơn hàng (ZIP: PDF + XLSX + JSON + ảnh), xuất hồ sơ một hộ nghề, xuất toàn bộ cơ sở dữ liệu dạng JSON để bàn giao. → Đáp ứng tiêu chí "Khả năng xuất dữ liệu" ở mục VII.4.
- **Tình trạng hệ thống**: lần sao lưu gần nhất, số bản ghi trong hàng đợi ngoại tuyến chưa đồng bộ, dung lượng lưu trữ, số tài khoản chưa bật MFA.
- **Cờ tính năng**: bật/tắt từng phân hệ để triển khai dần (ví dụ tắt cổng khách hàng trong 90 ngày đầu).

### 13.12. Schema bổ sung cho CMS

```sql
-- Danh mục dùng chung
create table taxonomy_terms (
  id         uuid primary key default gen_random_uuid(),
  taxonomy   text not null,              -- 'technique' | 'product_type' | 'market' | ...
  code       text not null,
  name_vi    text not null,
  name_en    text,
  group_key  text,
  meta       jsonb default '{}',
  sort_order smallint not null default 0,
  is_system  boolean not null default false,   -- true = không cho xóa, không cho đổi mã
  is_active  boolean not null default true,
  created_at timestamptz not null default now(),
  unique (taxonomy, code)
);

-- Mở rộng settings cho CMS
alter table settings
  add column value_schema jsonb,               -- JSON Schema để xác thực
  add column group_key    text default 'chung',
  add column is_critical  boolean not null default false,
  add column min_value    numeric,             -- sàn cứng §13.5
  add column max_value    numeric;

-- Trang & khối nội dung
create table content_pages (
  id           uuid primary key default gen_random_uuid(),
  slug         text not null,
  locale       text not null default 'vi',
  title        text not null,
  seo_title    text, seo_description text, seo_image text,
  status       text not null default 'draft',   -- draft | published | scheduled
  publish_at   timestamptz,
  updated_by   uuid references profiles(id),
  updated_at   timestamptz not null default now(),
  unique (slug, locale)
);

create table content_block_instances (
  id         uuid primary key default gen_random_uuid(),
  page_id    uuid not null references content_pages(id) on delete cascade,
  block_type text not null,               -- hero | capability_grid | process_steps | ...
  props      jsonb not null default '{}',
  sort_order smallint not null default 0
);

-- Thư viện media
create table media_assets (
  id            uuid primary key default gen_random_uuid(),
  bucket        text not null,             -- public-media | internal-media | documents
  path          text not null,
  mime          text not null,
  width int, height int, size_bytes bigint,
  alt_vi        text, alt_en text,
  taken_at      date,
  photographer  text,
  household_id  uuid references households(id),
  entity_type   text, entity_id uuid,
  exif_stripped boolean not null default false,
  approved_for_public boolean not null default false,
  approved_by   uuid references profiles(id), approved_at timestamptz,
  created_at    timestamptz not null default now(),
  unique (bucket, path)
);

-- Bản dịch
create table translations (
  key        text not null,
  namespace  text not null default 'app',
  vi         text,
  en         text,
  context    text,
  status     text not null default 'missing',  -- missing | draft_ai | approved
  updated_by uuid references profiles(id),
  updated_at timestamptz not null default now(),
  primary key (namespace, key)
);

-- Mẫu chứng từ & email
create table templates (
  id         uuid primary key default gen_random_uuid(),
  code       text unique not null,
  kind       text not null,                    -- 'document' | 'email'
  name_vi    text not null,
  subject_vi text, subject_en text,
  body_vi    text not null, body_en text,
  variables  jsonb default '[]',
  is_active  boolean not null default true,
  updated_by uuid references profiles(id),
  updated_at timestamptz not null default now()
);

-- Hàng đợi kiểm duyệt
create table moderation_queue (
  id            uuid primary key default gen_random_uuid(),
  kind          text not null,                 -- profile_change | media_public | passport_publish |
                                               -- cost_change | qc_confirm | data_request
  entity_type   text not null, entity_id uuid not null,
  payload       jsonb not null,                -- {before, after}
  submitted_by  uuid references profiles(id),
  submitted_at  timestamptz not null default now(),
  status        text not null default 'pending',
  decided_by    uuid references profiles(id), decided_at timestamptz,
  reason        text,                          -- bắt buộc khi từ chối
  sla_hours     smallint not null default 72
);
create index on moderation_queue (status, submitted_at);

-- Cờ tính năng
create table feature_flags (
  key         text primary key,
  enabled     boolean not null default false,
  label_vi    text not null,
  description text,
  updated_by  uuid references profiles(id),
  updated_at  timestamptz not null default now()
);

-- Thông báo & thông tin chung
create table notifications (
  id         bigserial primary key,
  user_id    uuid not null references profiles(id) on delete cascade,
  kind       text not null,
  title      text not null, body text,
  link       text,
  read_at    timestamptz,
  created_at timestamptz not null default now()
);
create index on notifications (user_id, read_at, created_at desc);

create table announcements (                    -- admin gửi tới hộ nghề hoặc toàn hệ thống
  id          uuid primary key default gen_random_uuid(),
  audience    text not null,                    -- 'all' | 'artisans' | 'staff' | 'customers'
  title       text not null, body_md text not null,
  pinned      boolean not null default false,
  publish_at  timestamptz not null default now(),
  expires_at  timestamptz,
  created_by  uuid references profiles(id)
);

-- Chuẩn bị đa làng nghề (V2) — tạo bảng từ đầu, chưa dùng
create table villages (
  id       uuid primary key default gen_random_uuid(),
  code     text unique not null,               -- 'PL' = Phù Lãng
  name_vi  text not null, name_en text,
  province text,
  is_active boolean not null default true
);
alter table households add column village_id uuid references villages(id);
```

> **Lưu ý thiết kế:** tạo `villages` ngay từ MVP dù chỉ có một làng. Thêm khóa ngoại vào bảng trống thì rẻ; thêm vào bảng có 25 hộ và hàng nghìn lô sản xuất ở năm thứ ba thì đắt. Hồ sơ dự thi đã nêu định hướng nhân rộng và yêu cầu *"dữ liệu, tên gọi và bản sắc của từng làng nghề phải được quản trị riêng"* — schema phải sẵn sàng cho điều đó.

---

## PHẦN 14 — KHÔNG GIAN QUẢN LÝ CỦA HỘ NGHỀ (`/tho/quan-ly/*`) ★

### 14.1. Hai chế độ, một ứng dụng

`/tho` ở Phần 6 là **chế độ làm việc**: hôm nay làm gì, chụp gì, nhận bao nhiêu tiền. Tối giản, dùng một tay, ngoài sân.

`/tho/quan-ly` là **chế độ quản lý**: hộ nghề tự quản trị dữ liệu của chính mình. Dùng khi ngồi yên, có thể trên máy tính hoặc do con cháu hỗ trợ nhập liệu. Giao diện đáp ứng tới cỡ màn hình máy tính, không khóa ở mobile.

Chuyển đổi bằng một nút ở góc trên: `Làm việc` ⇄ `Quản lý hộ`.

### 14.2. Ba nguyên tắc

1. **Hộ nghề là chủ dữ liệu của mình, không phải đối tượng bị quản lý.** Họ phải xem được, sửa được và biết chính xác ai nhìn thấy gì. Hồ sơ dự thi đặt vấn đề "hộ nghề không tin tưởng nền tảng" là rủi ro mức Trung bình/Cao — màn hình này chính là biện pháp kiểm soát rủi ro đó.
2. **Nhưng dữ liệu năng lực điều khiển việc phân bổ đơn hàng.** Nếu hộ tự nâng công suất từ 40 lên 200 sản phẩm/tháng mà không ai kiểm chứng, hệ thống sẽ giao đơn vượt năng lực và cả mạng lưới vỡ cam kết. Vì vậy: **sửa được, nhưng đi qua duyệt** (§14.5).
3. **Chủ hộ và thợ thấy khác nhau.** Tiền, hợp đồng và báo cáo thu nhập chỉ chủ hộ thấy.

### 14.3. Thành viên trong hộ

Một hộ có nhiều người dùng. Phân hai vai trò trong hộ (không phải vai trò hệ thống):

| Quyền | `owner` (chủ hộ) | `worker` (thành viên) |
|---|---|---|
| Xem đơn được giao | ✅ | ✅ |
| Chụp ảnh kiểm tra, ghi nhật ký lò | ✅ | ✅ |
| Nhận đơn (`Tôi nhận làm đơn này`) | ✅ | ❌ |
| Xem tiền, mốc chi trả, xác nhận đã nhận đủ | ✅ | ❌ |
| Sửa hồ sơ năng lực, lò, tác phẩm | ✅ | Đề xuất, chủ hộ gửi đi |
| Mời/gỡ thành viên | ✅ | ❌ |
| Đổi thiết lập đồng ý & riêng tư | ✅ | ❌ |
| Xem báo cáo của hộ | ✅ | ❌ |

Mời thành viên bằng số điện thoại → hệ thống gửi tin nhắn có liên kết. Không cần email — nhiều thợ không dùng email.

### 14.4. Bảy màn hình

**1. `/tho/quan-ly` — Tổng quan hộ**

Bốn thẻ chỉ số **của riêng hộ**: đơn đang làm · tỷ lệ đạt 6 lô gần nhất · giao đúng hạn · thu nhập tháng này (chỉ chủ hộ).
Kèm một dòng so sánh ẩn danh: *"Tỷ lệ đạt của hộ đang cao hơn mức trung bình mạng lưới"* — không bao giờ nêu tên hộ khác, không xếp hạng công khai. Mục đích là tạo động lực, không tạo cạnh tranh gây mất đoàn kết trong làng.
Phía dưới: thông báo từ ban điều phối (`announcements`), việc đang chờ hộ xử lý, thay đổi đang chờ duyệt.

**2. `/tho/quan-ly/ho-so` — Hồ sơ năng lực**

Hộ tự xem và sửa: kỹ thuật thành thạo (chọn từ danh mục + tự đánh giá mức 1–5) · loại sản phẩm làm được · giới hạn kích thước từng loại · công suất tháng · số lượng tối thiểu mỗi đợt · thời gian hoàn thành thường lệ · nguyên liệu và men sẵn có · giới thiệu về hộ (tiếng Việt).

Mỗi trường sửa đổi hiện nhãn **"Đang chờ duyệt"** màu vàng cho tới khi điều phối viên xác nhận. Bên cạnh mỗi trường có dòng nhỏ giải thích **vì sao cần đúng**: ví dụ ở ô chiều cao tối đa — *"Con số này quyết định hệ thống có giao cho hộ những đơn hàng cao hơn hay không. Ghi đúng giúp tránh nhận đơn không làm được."*

**3. `/tho/quan-ly/lo` — Quản lý lò và lịch nung**

Danh sách lò của hộ: tên, loại, kích thước lòng lò, chiều cao sản phẩm tối đa, nhiệt độ tối đa, số ngày một chu kỳ.
Lịch nung dạng lịch tháng, hộ tự đánh dấu: mẻ thuộc đơn hàng của nền tảng (hệ thống tự điền) và **mẻ riêng của hộ** (hộ tự thêm).

> Việc ghi cả mẻ riêng là mấu chốt. Nếu lịch lò chỉ có đơn của nền tảng, điều phối viên sẽ tưởng lò trống và giao đơn chồng lịch. Màn hình phải nói rõ lợi ích cho hộ: *"Ghi cả mẻ riêng của gia đình để chúng tôi không giao đơn trùng lịch lò."* Không ép, không phạt.

**4. `/tho/quan-ly/tac-pham` — Danh mục tác phẩm của hộ**

Hộ tự đăng ảnh các sản phẩm mình từng làm: ảnh, tên, kích thước, kỹ thuật, khoảng giá tham khảo.
Hai công dụng: là nguồn ý tưởng cho khâu đồng thiết kế, và là hồ sơ giới thiệu trên trang `/nghe-nhan/[slug]`.
Mỗi tác phẩm có công tắc **"Cho phép hiển thị công khai"**. Bật lên thì vào hàng đợi kiểm duyệt (§13.10), không lên trang ngay.

**5. `/tho/quan-ly/thanh-vien` — Thành viên** *(chỉ chủ hộ)*

Danh sách người trong hộ, vai trò, lần hoạt động gần nhất. Mời bằng số điện thoại. Gỡ quyền có hiệu lực ngay.

**6. `/tho/quan-ly/dong-y` — Quyền riêng tư và đồng ý** ★

Đây là màn hình quan trọng nhất về mặt niềm tin. Bốn công tắc độc lập, tương ứng bốn bản ghi `consents`:

| Công tắc | Giải thích hiển thị cho hộ |
|---|---|
| Lưu hồ sơ năng lực | "Để hệ thống biết nên giao đơn nào cho hộ." |
| Công khai hình ảnh | "Ảnh hộ và tác phẩm có thể xuất hiện trên trang giới thiệu và mạng xã hội." |
| Ghi tên tác giả trên hộ chiếu số | "Khách hàng quét mã trên sản phẩm sẽ thấy tên hộ. Tắt đi thì chỉ ghi 'Nghệ nhân Phù Lãng'." |
| Nhận thông báo | "Tin nhắn về đơn hàng, lịch lò và chi trả." |

Bên dưới là bản đồ minh bạch **"Ai nhìn thấy gì về hộ tôi"** — ba cột: *Chỉ hộ tôi* · *Hộ tôi và ban điều phối* · *Khách hàng và người ngoài nhìn thấy*. Sinh trực tiếp từ policy RLS đang chạy, không viết tay. Số điện thoại, giá nhận, tỷ lệ lỗi phải nằm rõ ràng ở cột thứ hai.

Cuối trang: nút **"Yêu cầu sửa hoặc xóa dữ liệu của tôi"** → tạo mục trong hàng đợi kiểm duyệt với hạn xử lý 15 ngày (§9.1).

**7. `/tho/quan-ly/bao-cao` — Báo cáo của hộ** *(chỉ chủ hộ)*

Bốn biểu đồ đơn giản, không thuật ngữ: thu nhập theo tháng · giá trị trung bình mỗi mẻ nung · tỷ lệ đạt theo lô và nguyên nhân hỏng · số ngày từ khi giao hàng đến khi nhận đủ tiền.

Nút **"Tải bản in xác nhận thu nhập"** sinh PDF có mã tra cứu, liệt kê các khoản hộ đã nhận và đã xác nhận trong khoảng thời gian chọn. Hộ có thể dùng khi cần chứng minh thu nhập với ngân hàng hoặc chương trình hỗ trợ.

> Đây là tính năng nhỏ về mặt kỹ thuật nhưng lớn về mặt giá trị xã hội: nó biến "làm nghề" thành một hoạt động kinh tế có chứng từ. Rất đáng nhấn mạnh khi thuyết trình trước ban giám khảo.

### 14.5. Luồng duyệt thay đổi hồ sơ

Không phải mọi thay đổi đều cần duyệt. Phân hai loại:

| Loại | Ví dụ | Xử lý |
|---|---|---|
| **Ảnh hưởng phân bổ đơn** | Kỹ thuật, giới hạn kích thước, công suất, thời gian hoàn thành, thông số lò | Vào `moderation_queue`, giữ nguyên giá trị cũ cho tới khi duyệt. Hạn 72 giờ |
| **Không ảnh hưởng phân bổ** | Giới thiệu về hộ, ảnh đại diện, nguyên liệu ưa dùng, lịch lò mẻ riêng | Có hiệu lực ngay, kiểm duyệt sau |

Ba bước: hộ sửa → hệ thống ghi `household_profile_changes` với `before/after` và đẩy vào hàng đợi → điều phối viên duyệt (nếu là thay đổi lớn thì có thể yêu cầu xác minh tại chỗ, đánh dấu `needs_site_visit`).

Khi từ chối, lý do hiển thị lại cho hộ bằng lời dễ hiểu — không hiện mã lỗi, không hiện tên bảng dữ liệu.

### 14.6. Schema bổ sung cho không gian hộ nghề

```sql
create table household_members (
  id            uuid primary key default gen_random_uuid(),
  household_id  uuid not null references households(id) on delete cascade,
  profile_id    uuid not null references profiles(id) on delete cascade,
  member_role   text not null default 'worker',   -- 'owner' | 'worker'
  invited_by    uuid references profiles(id),
  joined_at     timestamptz not null default now(),
  removed_at    timestamptz,
  unique (household_id, profile_id)
);
-- Mỗi hộ phải có đúng ít nhất một owner đang hoạt động (trigger kiểm tra)

create table household_invites (
  id           uuid primary key default gen_random_uuid(),
  household_id uuid not null references households(id) on delete cascade,
  phone        text not null,
  member_role  text not null default 'worker',
  token        text unique not null,
  expires_at   timestamptz not null,
  accepted_at  timestamptz,
  created_by   uuid references profiles(id)
);

create table household_profile_changes (
  id            uuid primary key default gen_random_uuid(),
  household_id  uuid not null references households(id) on delete cascade,
  scope         text not null,                  -- 'capability' | 'kiln' | 'material' | 'bio' | 'sample'
  target_table  text not null, target_id uuid,
  before_data   jsonb, after_data jsonb not null,
  affects_allocation boolean not null default true,
  submitted_by  uuid references profiles(id),
  submitted_at  timestamptz not null default now(),
  status        text not null default 'pending', -- pending | approved | rejected | auto_applied
  needs_site_visit boolean not null default false,
  decided_by    uuid references profiles(id), decided_at timestamptz,
  reason_vi     text
);
create index on household_profile_changes (status, submitted_at);
```

**Hàm trợ giúp RLS bổ sung** (thay `my_household()` ở §4.2 để hỗ trợ nhiều thành viên):

```sql
create or replace function my_household() returns uuid language sql stable security definer as $$
  select household_id from household_members
  where profile_id = auth.uid() and removed_at is null
  limit 1
$$;

create or replace function is_household_owner() returns boolean language sql stable security definer as $$
  select exists (select 1 from household_members
                 where profile_id = auth.uid() and member_role = 'owner' and removed_at is null)
$$;

-- Tiền chỉ chủ hộ xem được
drop policy if exists hp_access on household_payouts;
create policy hp_access on household_payouts for select
  using ((household_id = my_household() and is_household_owner())
      or my_role() in ('admin','coordinator','accountant'));
```

### 14.7. Ba lỗi phải tránh khi cài phần này

1. **Đừng bắt hộ nghề đăng nhập bằng email và mật khẩu phức tạp.** Dùng đăng nhập bằng số điện thoại + mã OTP, phiên đăng nhập dài (90 ngày), sinh trắc học của thiết bị nếu có. Mỗi lần đăng nhập lại là một lần mất một người dùng.
2. **Đừng hiển thị trạng thái "Bị từ chối" trần trụi.** Luôn kèm lý do bằng lời và một hành động cụ thể để sửa.
3. **Đừng gộp chế độ làm việc và chế độ quản lý vào một màn hình rối.** Người thợ mở app giữa ca làm chỉ cần biết hôm nay chụp gì. Mọi thứ khác phải ở sau một nút bấm.

---

---

## PHẦN 15 — KIẾN TRÚC ĐA THIẾT BỊ (RESPONSIVE) ★

### 15.1. Nguyên tắc nền

**Một mã nguồn. Một cây định tuyến. Bố cục thích ứng theo chiều rộng khả dụng.**

- ❌ Không có tên miền `m.` riêng cho điện thoại.
- ❌ Không có route riêng kiểu `/mobile/*` hay `/desktop/*`.
- ❌ Không nhận dạng thiết bị qua `user-agent` để đổi trang. Dùng **container query** và điểm ngắt CSS.
- ❌ Không có component `<MobileOrderTable>` và `<DesktopOrderTable>` là hai file khác nhau. Một component, hai cách kết xuất.
- ✅ Viết CSS theo lối mobile-first: kiểu mặc định là cho màn hình hẹp, mở rộng dần bằng `sm: md: lg: xl:`.

> Lý do rất thực tế: dự án có một người phụ trách công nghệ. Hai bộ giao diện nghĩa là hai chỗ phải sửa mỗi khi nghiệp vụ đổi, và sớm muộn một trong hai sẽ lệch. Lệch giao diện trong hệ thống có cổng chặn chất lượng là lỗi vận hành, không phải lỗi thẩm mỹ.

### 15.2. Điểm ngắt và ngữ cảnh sử dụng thật

| Dải | Tailwind | Thiết bị | Ai dùng ở dải này, làm gì |
|---|---|---|---|
| < 640px | mặc định | Điện thoại | Hộ nghề tại xưởng · `qc` chụp ảnh tại chỗ · điều phối viên duyệt việc khi đi đường · khách quét QR |
| 640–1023 | `sm` `md` | Máy tính bảng | `qc` cầm tay đi kiểm tra · khách hàng xem hồ sơ mẫu · trưng bày tại hội chợ |
| 1024–1439 | `lg` | Máy tính xách tay | Điều phối, thiết kế, kế toán, xuất khẩu — phần lớn công việc bàn giấy |
| ≥ 1440 | `xl` `2xl` | Màn hình lớn | Bản đồ năng lực, lịch lò toàn mạng lưới, báo cáo, đối soát tiền |

### 15.3. Màn hình chủ đạo của từng khu — cơ sở để quyết định đánh đổi

Thích ứng không có nghĩa mọi khu vực đều quan trọng như nhau ở mọi cỡ màn hình. Bảng này quyết định khi phải hy sinh thì hy sinh ở đâu.

| Khu | Chủ đạo | Yêu cầu ở màn hình còn lại |
|---|---|---|
| `/p/[code]` hộ chiếu số | **Điện thoại** | Máy tính chỉ cần hiển thị đẹp, không có yêu cầu đặc biệt |
| `/tho/*` hộ nghề | **Điện thoại** | Máy tính phải dùng được **đầy đủ** — thực tế nhiều hộ nhờ con cháu nhập liệu trên máy |
| `/app/*` vận hành | **Máy tính xách tay** | Điện thoại phải làm được trọn vẹn tập con "việc ngoài hiện trường": duyệt hàng đợi, xem đơn, cập nhật trạng thái, chụp ảnh kiểm tra, tra cứu hồ sơ hộ |
| `/kh/*` khách hàng | **Máy tính xách tay** | Điện thoại phải **đọc và duyệt mẫu được** — khách mở email trên điện thoại là chuyện thường |
| `/app/quan-tri/*` CMS | **Máy tính xách tay** | Điện thoại chỉ cần: hàng đợi kiểm duyệt, nhật ký, thông báo. Phần soạn nội dung không tối ưu cho điện thoại |

### 15.4. Mô hình điều hướng thích ứng

Một component `<AppShell>` duy nhất, chọn bố cục theo chiều rộng:

| Dải | Điều hướng chính | Hành động chính | Bộ lọc |
|---|---|---|---|
| ≥ `lg` | Thanh bên cố định 240px + đường dẫn phân cấp | Nút ở góc trên phải nội dung | Thanh lọc ngang cố định |
| `md` | Thanh bên thu gọn còn biểu tượng 64px, mở rộng khi rê chuột | Như trên | Thanh lọc ngang, cuộn ngang được |
| < `md` | **Thanh dưới 5 mục** + mục "Thêm" mở ngăn kéo toàn màn hình | Nút dính đáy hoặc nút nổi | Nút "Lọc" mở tấm trượt, hiển thị chip đã chọn |

Thanh dưới cho từng vai trò (5 mục, chọn theo tần suất dùng thật):

```
coordinator : Việc cần làm · Đơn hàng · Hộ nghề · Chất lượng · Thêm
qc          : Hàng đợi · Chụp kiểm tra · Sai lệch · Lô · Thêm
export      : Lô hàng · Chứng từ · Đóng gói · Đơn · Thêm
accountant  : Mốc thu · Chi trả hộ · Đối soát · Báo cáo · Thêm
artisan     : Hôm nay · Đơn · Lò · Tiền · Quản lý hộ
customer    : Dự án · Chờ tôi duyệt · Tài liệu · Thiết kế · Thêm
```

Cây định tuyến **không đổi** giữa các dải. Một liên kết chia sẻ từ máy tính mở trên điện thoại phải ra đúng nội dung đó.

### 15.5. Bảy mẫu thích ứng dùng lại toàn hệ thống

Đây là phần cần cài đặt **trước tiên**, trước mọi màn hình nghiệp vụ. Mỗi mẫu là một component dùng chung; mọi màn hình ở Phần 5, 6, 7, 13, 14 đều lắp từ bảy mẫu này.

**M1 · `<AdaptiveTable>` — Bảng ↔ Danh sách thẻ**

Khai báo cột một lần, kèm vai trò hiển thị. `≥ lg` kết xuất bảng đầy đủ; `< lg` kết xuất danh sách thẻ chỉ gồm các trường được đánh dấu.

```ts
<AdaptiveTable
  data={households}
  columns={[
    { key: 'name',        label: 'Tên hộ',      role: 'primary' },
    { key: 'code',        label: 'Mã',          role: 'secondary' },
    { key: 'techniques',  label: 'Kỹ thuật',    role: 'secondary', render: Chips },
    { key: 'maxHeight',   label: 'Cao tối đa',  role: 'meta' },
    { key: 'defectRate',  label: 'Tỷ lệ lỗi',   role: 'badge', tone: defectTone },
    { key: 'capacity',    label: 'Công suất',   role: 'desktopOnly' },
    { key: 'nextKiln',    label: 'Lò trống',    role: 'desktopOnly' },
  ]}
  rowHref={(h) => `/app/ho-nghe/${h.id}`}
  actions={[...]}   // desktop: menu ba chấm · mobile: vuốt hoặc nút trong thẻ
/>
```
Quy tắc: thẻ trên điện thoại tối đa **1 trường chính + 2 phụ + 1 huy hiệu**. Nhiều hơn là thẻ trở thành bảng bị bóp méo.

**M2 · Bố cục chủ–chi tiết**
`≥ xl`: hai cột, danh sách bên trái 380px, chi tiết bên phải, chọn không rời trang.
`< xl`: điều hướng đẩy — bấm vào một mục là sang trang chi tiết, có nút quay lại giữ nguyên vị trí cuộn và bộ lọc của danh sách.

**M3 · `<TabRouter>` — Tab ↔ Trang con**
Màn hình đơn hàng có 8 tab. `≥ lg`: tab ngang. `< lg`: trang mục lục liệt kê 8 mục kèm chỉ báo trạng thái, mỗi tab là một trang con.
URL giống nhau ở cả hai: `/app/don-hang/[code]/[tab]`. Trên máy tính, `[tab]` chỉ đổi tab đang chọn.

**M4 · `<ResponsiveDialog>` — Hộp thoại ↔ Tấm trượt đáy**
`≥ md` kết xuất hộp thoại giữa màn hình; `< md` kết xuất tấm trượt từ đáy (dùng thư viện `vaul`), kéo xuống để đóng, có tay nắm. Cùng một API.

**M5 · `<StepForm>` — Biểu mẫu dài ↔ nhiều bước**
Cùng một schema `zod`. `≥ lg`: một trang, hai cột. `< lg`: chia bước theo nhóm trường, có thanh tiến độ và **tự lưu nháp sau mỗi bước** — người dùng điện thoại hay bị gián đoạn.
Áp dụng cho: khảo sát hộ nghề, tạo hồ sơ thiết kế, dựng đơn hàng, phiếu sàng lọc.

**M6 · `<FilterBar>` — Thanh lọc ↔ Tấm trượt lọc**
`< md`: nút "Lọc (3)" mở tấm trượt; các bộ lọc đang bật hiện thành chip cuộn ngang ngay dưới tiêu đề, chạm vào chip để gỡ.

**M7 · `<PhotoCapture>` — Chụp ảnh mọi thiết bị**
```html
<input type="file" accept="image/*" capture="environment" multiple>
```
Trên điện thoại mở thẳng camera sau; trên máy tính mở hộp chọn tệp và cho kéo–thả. Cùng một component, cùng luồng nén phía client (≤1600px, ~400KB) và cùng hàng đợi tải lên.

### 15.6. Năm màn hình khó nhất — xử lý cụ thể, không né tránh

| Màn hình | Vấn đề trên điện thoại | Cách xử lý |
|---|---|---|
| **Bản đồ năng lực hộ** (§5.2, 11 cột) | Bảng rộng không thể nén | `< lg` **mặc định mở ở chế độ So khớp**, không phải chế độ Bảng: nhập yêu cầu → nhận danh sách hộ xếp hạng dạng thẻ. Chế độ Bảng vẫn vào được, cuộn ngang, ghim cột tên hộ |
| **Trình dựng dung sai 3 cột kéo–thả** (§5.3) | Kéo–thả trên cảm ứng rất dễ sai | `< lg` bỏ kéo–thả: ba nhóm thành ba mục gập, mỗi dòng có nút "Đổi nhóm" mở tấm trượt chọn. Chức năng tương đương, thao tác khác |
| **Đơn hàng 8 tab** (§5.4) | Quá nhiều thông tin một trang | Dùng M3. Đầu trang cố định (mã đơn, trạng thái, **băng cảnh báo cổng chặn**) luôn hiển thị ở mọi cỡ — đây là thông tin không được phép ẩn |
| **Lịch lò toàn mạng lưới** (§5.2) | Ma trận hộ × ngày không nén được | `< lg` chuyển sang **dòng thời gian theo ngày**: cuộn dọc theo ngày, mỗi ngày liệt kê các lò đang nung, lọc theo hộ. Máy tính giữ dạng ma trận |
| **Trình dựng báo giá** (§5.7) | Nhiều cột, nhiều phép tính liên hoàn, sai một ô là sai giá | **Giới hạn có chủ ý:** điện thoại chỉ *xem, gửi lại, theo dõi* báo giá. Soạn mới hoặc sửa cấu trúc giá thì hiện thông báo tử tế: *"Soạn báo giá cần nhiều cột số liệu. Hãy mở trên máy tính để tránh nhập sai giá."* kèm nút gửi liên kết sang máy |

> Chỗ cuối là đánh đổi có ý thức. Không phải mọi tác vụ đều nên làm được trên điện thoại. Một báo giá sai vì bấm nhầm trên màn hình 5 inch tốn nhiều hơn sự bất tiện phải mở máy tính.

### 15.7. Quy tắc chạm, kích thước, nhập liệu

Áp dụng **toàn hệ thống**, không riêng `/tho`:

1. Vùng chạm tối thiểu **44×44px** ở mọi khu; **48×48px** trong `/tho/*`. Khoảng cách giữa hai vùng chạm ≥ 8px.
2. **Không dùng rê chuột (hover) làm cách duy nhất để lộ một hành động.** Mọi hành động ẩn sau hover trên máy tính phải có lối vào bằng chạm trên điện thoại.
3. Cỡ chữ ô nhập **≥16px** — nhỏ hơn thì Safari trên iOS tự phóng to trang khi lấy nét.
4. Đúng kiểu bàn phím: `type="tel"` cho điện thoại, `inputMode="numeric"` cho số đo và số lượng, `inputMode="decimal"` cho tiền, `type="date"` cho ngày.
5. Dùng `100dvh` thay `100vh` — thanh địa chỉ trình duyệt di động co giãn làm `100vh` bị cắt đáy.
6. Chừa vùng an toàn: `env(safe-area-inset-bottom)` cho thanh dưới và nút dính đáy trên iPhone.
7. Bảng số liệu tài chính luôn dùng chữ số cùng chiều rộng (`font-variant-numeric: tabular-nums`) để cột số thẳng hàng ở mọi cỡ.
8. Chịu được phóng chữ hệ thống **200%** mà không vỡ bố cục hay che mất nút.

### 15.8. Ứng dụng cài đặt được (PWA) cho mọi vai trò

Không chỉ hộ nghề. Mọi vai trò đều cài được lên màn hình chính — điều phối viên đi khảo sát làng nghề cũng cần mở nhanh như một ứng dụng.

```json
// manifest.webmanifest
{
  "name": "Phù Lãng Tinh Hoa",
  "short_name": "Phù Lãng",
  "display": "standalone",
  "orientation": "any",
  "theme_color": "#7A4A21",
  "background_color": "#F5F0E6",
  "shortcuts": [
    { "name": "Chụp ảnh kiểm tra", "url": "/tho/kiem-tra/moi" },
    { "name": "Việc cần làm",      "url": "/app" },
    { "name": "Quét mã sản phẩm",  "url": "/app/tra-cuu" }
  ]
}
```
Lối tắt hiển thị theo vai trò của người đăng nhập.

**Phạm vi ngoại tuyến phân ba tầng — không hứa quá khả năng:**

| Tầng | Khu vực | Mức hỗ trợ |
|---|---|---|
| **A — Ngoại tuyến đầy đủ** | `/tho/*` | Xem đơn được giao, chụp ảnh kiểm tra, ghi nhật ký lò, đếm đạt–hỏng. Hàng đợi Dexie §6.6 |
| **B — Đọc ngoại tuyến** | `/app/don-hang`, `/app/ho-nghe`, `/app/chat-luong` | Xem lại dữ liệu đã tải trong phiên gần nhất, có nhãn "Dữ liệu lúc 14:32, chưa cập nhật". Không cho ghi |
| **C — Cần kết nối** | `/kh/*`, `/app/quan-tri/*`, báo cáo, dựng báo giá | Hiện trang giải thích tử tế kèm nút thử lại. Không giả vờ hoạt động |

### 15.9. Ngân sách hiệu năng theo thiết bị *(thay thế §9.5)*

| Khu | Thiết bị & mạng | Mục tiêu | Ngân sách JS |
|---|---|---|---|
| `/p/[code]` | Điện thoại phổ thông, 3G | LCP < 1,5s | < 250KB |
| `/tho/*` | Điện thoại phổ thông, 3G / ngoại tuyến | Tương tác được < 2s | < 300KB |
| `/app/*` | Điện thoại, 4G | LCP < 2,5s | < 400KB mỗi route |
| `/app/*` | Máy tính, cáp quang | LCP < 1,5s | — |
| `/kh/*` | Máy tính hoặc điện thoại, 4G | LCP < 2s | < 300KB |

**Kỹ thuật bắt buộc để đạt ngân sách:**
- Server Component là mặc định. Chỉ đánh dấu `'use client'` ở đúng nhánh cần tương tác.
- Tải trễ theo route và theo tab. Recharts chỉ nạp ở route có biểu đồ. Trình dựng dung sai chỉ nạp khi mở.
- Ảo hóa hàng cho mọi bảng có thể vượt 100 dòng.
- `next/image` với `sizes` khai báo đúng theo điểm ngắt — không tải ảnh 2000px xuống điện thoại.
- Phông chữ: chỉ nạp hai độ đậm của Be Vietnam Pro, `display: swap`, tập ký tự Việt.
- Trang `/p/[code]` sinh tĩnh, tái sinh theo yêu cầu khi hộ chiếu được cập nhật.

### 15.10. Ma trận kiểm thử thiết bị

| Cỡ | Đại diện | Bắt buộc kiểm |
|---|---|---|
| 360×640 | Android phổ thông — **thiết bị thật của hộ nghề** | `/tho/*` toàn bộ, `/p/[code]` |
| 390×844 | iPhone | `/p/[code]`, `/kh/duyet-mau`, thanh dưới + vùng an toàn |
| 768×1024 | Máy tính bảng | `/app/chat-luong`, chụp ảnh kiểm tra |
| 1280×800 | Máy tính xách tay | Toàn bộ `/app`, `/app/quan-tri` |
| 1920×1080 | Màn hình lớn | Bản đồ năng lực, lịch lò, báo cáo |

Năm kịch bản Playwright ở §10.4 chạy trên **ba cỡ**: 360, 768, 1280. Bổ sung bốn phép kiểm:

```
☐ Xoay ngang điện thoại giữa lúc đang chụp ảnh kiểm tra → không mất dữ liệu đã nhập
☐ Phóng chữ hệ thống 200% → không nút nào bị che, không chữ nào bị cắt
☐ Chỉ dùng bàn phím trên máy tính → đi hết được luồng duyệt mẫu và duyệt hàng đợi
☐ Băng cảnh báo cổng chặn hiển thị ở cả ba cỡ, không bị đẩy ra ngoài màn hình
```

### 15.11. Thứ tự thực hiện

Thích ứng làm **ngay từ đầu**, không phải "làm máy tính trước, mobile sau". Chi phí thêm khoảng 15–20% thời gian dựng giao diện, nhưng thay thế hoàn toàn việc phải duy trì hai bộ giao diện hoặc làm ứng dụng gốc về sau.

Tuần 7, trước bất kỳ màn hình nghiệp vụ nào, dựng xong **khung giao diện**: `<AppShell>` + bảy mẫu M1–M7 + design token điểm ngắt + manifest PWA. Đây là điều kiện tiên quyết trong prompt ở §12.1.

---

## PHỤ LỤC A — DANH MỤC SEED

**Kỹ thuật (`techniques`)** — nhóm `tao_hinh`: vuốt tay trên bàn xoay, đắp nổi, khắc chìm, in khuôn, ghép mảnh · nhóm `men`: men da lươn truyền thống, men tro, men chảy, men rạn, để mộc không men · nhóm `trang_tri`: đắp phù điêu, khắc vạch, vẽ men, chấm men · nhóm `nung`: nung củi lò bầu, nung gas, nung điện, nung khử.

**Loại sản phẩm (`product_type`)**: `binh` bình/lọ · `tuong` tượng · `phu_dieu` phù điêu · `chau` chậu · `den` đèn trang trí (không tích hợp điện) · `vach` vách gốm/cấu kiện trang trí · `qua_tang` vật phẩm quà tặng · `khac`.

**Nguyên nhân lỗi (`nc_cause`)**: thiết kế · nguyên liệu · tạo hình · nung · đóng gói · vận chuyển · kỳ vọng chưa rõ.

**Phân khúc khách hàng (`customers.segment`)**: `architect` kiến trúc sư & thiết kế nội thất · `hospitality` khách sạn/nhà hàng/bất động sản · `distributor` nhà phân phối thiết kế & thủ công cao cấp · `corporate_gift` doanh nghiệp & cơ quan đặt quà tặng.

## PHỤ LỤC B — TỪ ĐIỂN THUẬT NGỮ SONG NGỮ (cho i18n và chứng từ)

| Tiếng Việt | English | Ghi chú |
|---|---|---|
| Hộ nghề | Artisan household | Không dịch là "supplier" — hộ là đồng tác giả |
| Mẫu chuẩn | Master sample | |
| Bộ dung sai | Tolerance set | |
| Đặc tính bắt buộc | Must-match attribute | |
| Đặc tính có dung sai | Acceptable variation | |
| Đặc tính độc bản | Unique-to-each-piece | Không dịch là "defect" hay "variance" |
| Điểm kiểm tra | Inspection checkpoint | |
| Lô sản xuất | Production batch | |
| Hộ chiếu số sản phẩm | Product passport | |
| Sản phẩm không phù hợp | Nonconformity | Thuật ngữ chuẩn ISO 9001 |
| Mẻ nung | Firing / kiln load | |
| Giá trị hàng hóa giao dịch | Gross Merchandise Value (GMV) | Không phải doanh thu |
| Đồng thiết kế | Co-design | |
| Bản đồ năng lực | Capability map | |

## PHỤ LỤC C — DANH SÁCH KIỂM TRA TRƯỚC KHI BÀN GIAO

```
☐ Bộ kiểm thử phân quyền §10.3 xanh toàn bộ
☐ Năm kịch bản Playwright §10.4 xanh toàn bộ
☐ Truy vấn tính đầy đủ §10.2 không trả trường thiếu với dữ liệu thật
☐ MFA đã bật cho tài khoản admin và accountant
☐ PITR Supabase đã bật, đã thử khôi phục một lần
☐ Không còn số nào bị hardcode — soát toàn bộ mã theo danh sách §0.3
☐ Trang /p/[code] đạt LCP < 1,5s trên 3G mô phỏng
☐ Một hộ nghề thật đã dùng /tho hoàn thành một phiếu kiểm tra mà không cần hướng dẫn lại
☐ Đã xuất thử một hồ sơ đơn hàng đầy đủ ra tệp ZIP và mở được ngoài hệ thống
☐ Đã chạy cổng riêng tư trên 10 hộ chiếu thật, không có cảnh báo nào
☐ README ghi rõ: không dùng blockchain, không dùng ảnh AI tạo sinh trong luồng chào bán
☐ Không còn danh mục nào (kỹ thuật, loại sản phẩm, thị trường…) nằm trong mã nguồn
☐ Thử đặt min_qc_checkpoints = 2 → hệ thống chặn kèm giải thích sàn cứng
☐ Một hộ nghề thật đã tự cập nhật hồ sơ năng lực, thay đổi vào hàng đợi và được duyệt
☐ Thành viên vai trò worker không xem được màn hình tiền và báo cáo của hộ
☐ Bản đồ "ai nhìn thấy gì" ở /tho/quan-ly/dong-y khớp đúng với policy RLS đang chạy
☐ Ảnh nội bộ không thể lọt sang bucket công khai bằng đường nào khác ngoài nút duyệt
☐ Năm kịch bản Playwright chạy xanh ở cả ba cỡ 360 / 768 / 1280
☐ Soát toàn bộ mã: không có route, component hay nhánh nào phân biệt theo user-agent
☐ Phóng chữ hệ thống 200% → không nút nào bị che ở mọi khu
☐ Xoay ngang giữa lúc chụp ảnh kiểm tra → không mất dữ liệu đã nhập
☐ Đo Lighthouse trên 3G mô phỏng: /p đạt LCP <1,5s, /tho tương tác được <2s
☐ Cài được ứng dụng lên màn hình chính ở cả Android, iOS và máy tính
```

---

*Tài liệu này là tầng đặc tả. Khi mâu thuẫn với hồ sơ dự thi (HS_TECHFEST_2026), hồ sơ dự thi là bản gốc có hiệu lực cao hơn — cập nhật lại đặc tả, không sửa hồ sơ để hợp thức hóa phần mềm.*
