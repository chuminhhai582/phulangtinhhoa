"use client";
import React from "react";

export default function CollectionsManagePage() {
  const collections = [
    { code: "PL-C-2026-01", name: "Thu Lãng", edition: 50, published: true, designs: 8, slug: "thu-lang" },
    { code: "PL-C-2026-02", name: "Hoa Đất", edition: 30, published: true, designs: 5, slug: "hoa-dat" },
    { code: "PL-C-2025-01", name: "Trà Đạo Phù Lãng", edition: 100, published: true, designs: 12, slug: "tra-dao" },
    { code: "PL-C-2025-02", name: "Làng Nghề", edition: null, published: true, designs: 20, slug: "lang-nghe" },
  ];

  return (
    <div className="space-y-6">
      <div><h2 className="text-2xl font-heading font-bold">Quản lý bộ sưu tập</h2><p className="text-muted-foreground text-sm mt-1">Bộ sưu tập và đánh số bản giới hạn.</p></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {collections.map((c) => (
          <div key={c.code} className="bg-card border rounded-xl p-5 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-muted-foreground">{c.code}</span>
              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${c.published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>{c.published ? 'Đã công bố' : 'Bản nháp'}</span>
            </div>
            <h3 className="font-semibold text-lg">{c.name}</h3>
            <div className="mt-2 text-sm text-muted-foreground">
              <span>{c.edition ? `Giới hạn ${c.edition} bản` : 'Không giới hạn'}</span> · <span>{c.designs} thiết kế</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
