"use client";

import Link from "next/link";
import React, { useState } from "react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      

      <section className="py-16 lg:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-heading font-bold text-[var(--pl-char)]">Liên hệ</h1>
          <p className="mt-4 text-lg text-[var(--pl-char)]/60">
            Gửi yêu cầu hợp tác — chúng tôi sẽ phản hồi trong 48 giờ với đánh giá sơ bộ về khả năng thực hiện.
          </p>

          {submitted ? (
            <div className="mt-10 bg-[var(--pl-jade)]/10 border border-[var(--pl-jade)]/30 rounded-2xl p-8 text-center">
              <div className="text-5xl mb-4">✉️</div>
              <h2 className="text-2xl font-heading font-bold text-[var(--pl-jade)]">Đã gửi thành công!</h2>
              <p className="mt-3 text-[var(--pl-char)]/60">Chúng tôi sẽ phản hồi trong vòng 48 giờ.</p>
              <Link href="/" className="mt-6 inline-flex px-6 py-3 border border-[var(--pl-ash)] rounded-xl text-sm font-medium hover:border-[var(--pl-clay)] transition-colors">
                ← Về trang chủ
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-10 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[var(--pl-char)] mb-2">Họ và tên *</label>
                  <input type="text" required className="w-full h-12 px-4 border border-[var(--pl-ash)]/50 rounded-xl bg-white focus:border-[var(--pl-clay)] focus:ring-1 focus:ring-[var(--pl-clay)] outline-none transition-colors text-base" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--pl-char)] mb-2">Tổ chức / công ty</label>
                  <input type="text" className="w-full h-12 px-4 border border-[var(--pl-ash)]/50 rounded-xl bg-white focus:border-[var(--pl-clay)] focus:ring-1 focus:ring-[var(--pl-clay)] outline-none transition-colors text-base" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[var(--pl-char)] mb-2">Email *</label>
                  <input type="email" required className="w-full h-12 px-4 border border-[var(--pl-ash)]/50 rounded-xl bg-white focus:border-[var(--pl-clay)] focus:ring-1 focus:ring-[var(--pl-clay)] outline-none transition-colors text-base" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--pl-char)] mb-2">Quốc gia</label>
                  <input type="text" placeholder="Việt Nam" className="w-full h-12 px-4 border border-[var(--pl-ash)]/50 rounded-xl bg-white focus:border-[var(--pl-clay)] focus:ring-1 focus:ring-[var(--pl-clay)] outline-none transition-colors text-base" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--pl-char)] mb-2">Loại sản phẩm quan tâm</label>
                <select className="w-full h-12 px-4 border border-[var(--pl-ash)]/50 rounded-xl bg-white focus:border-[var(--pl-clay)] focus:ring-1 focus:ring-[var(--pl-clay)] outline-none transition-colors text-base">
                  <option value="">Chọn loại sản phẩm</option>
                  <option>Bình hoa / bình trang trí</option>
                  <option>Tượng / phù điêu</option>
                  <option>Ấm trà / bộ trà</option>
                  <option>Chậu bonsai</option>
                  <option>Đèn gốm</option>
                  <option>Vách / ốp tường</option>
                  <option>Khác</option>
                </select>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[var(--pl-char)] mb-2">Số lượng dự kiến</label>
                  <input type="number" placeholder="300" className="w-full h-12 px-4 border border-[var(--pl-ash)]/50 rounded-xl bg-white focus:border-[var(--pl-clay)] focus:ring-1 focus:ring-[var(--pl-clay)] outline-none transition-colors text-base" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--pl-char)] mb-2">Thời gian giao mong muốn</label>
                  <input type="text" placeholder="Q1 2027" className="w-full h-12 px-4 border border-[var(--pl-ash)]/50 rounded-xl bg-white focus:border-[var(--pl-clay)] focus:ring-1 focus:ring-[var(--pl-clay)] outline-none transition-colors text-base" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--pl-char)] mb-2">Mô tả yêu cầu *</label>
                <textarea required rows={5} placeholder="Mô tả dự án, kích thước, chất liệu mong muốn, thị trường đích..." className="w-full px-4 py-3 border border-[var(--pl-ash)]/50 rounded-xl bg-white focus:border-[var(--pl-clay)] focus:ring-1 focus:ring-[var(--pl-clay)] outline-none transition-colors text-base resize-none" />
              </div>
              <button type="submit" className="w-full sm:w-auto px-8 py-4 bg-[var(--pl-clay)] text-white font-medium rounded-xl hover:bg-[var(--pl-eel)] transition-all hover:shadow-lg text-base">
                Gửi yêu cầu
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
