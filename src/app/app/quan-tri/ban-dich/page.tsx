"use client";
import React from "react";
import { Globe2 } from "lucide-react";

const keys = [
  { key: "nav.home", vi: "Trang chủ", en: "Home" },
  { key: "nav.capability", vi: "Năng lực", en: "Capability" },
  { key: "nav.collections", vi: "Bộ sưu tập", en: "Collections" },
  { key: "nav.artisans", vi: "Nghệ nhân", en: "Artisans" },
  { key: "nav.quality", vi: "Chất lượng", en: "Quality" },
  { key: "nav.contact", vi: "Liên hệ", en: "Contact" },
  { key: "hero.title", vi: "Gốm Phù Lãng Tinh Hoa truyền thống", en: "Phù Lãng Fine Pottery — Traditional Excellence" },
  { key: "hero.subtitle", vi: "Kết nối nghệ nhân gốm 700 năm tuổi với thị trường quốc tế", en: "Connecting 700-year-old pottery artisans with the global market" },
  { key: "passport.title", vi: "Hộ chiếu số", en: "Digital Passport" },
  { key: "passport.author", vi: "Người làm ra tác phẩm này", en: "Crafted by" },
  { key: "tolerance.mandatory", vi: "Bắt buộc đúng", en: "Mandatory Exact" },
  { key: "tolerance.range", vi: "Có dung sai", en: "With Tolerance" },
  { key: "tolerance.unique", vi: "Đặc trưng thủ công", en: "Artisan Character" },
];

export default function TranslationsPage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2"><Globe2 className="w-5 h-5 text-primary" /><span className="text-sm text-muted-foreground">Bản dịch VI / EN — {keys.length} chuỗi</span></div>
      <div className="bg-card border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead><tr className="border-b"><th className="text-left p-3 font-medium text-muted-foreground">Key</th><th className="text-left p-3 font-medium">Tiếng Việt</th><th className="text-left p-3 font-medium">English</th></tr></thead>
          <tbody>{keys.map((k, i) => (<tr key={i} className="border-b hover:bg-muted/30"><td className="p-3 text-xs text-muted-foreground font-mono">{k.key}</td><td className="p-3">{k.vi}</td><td className="p-3 text-muted-foreground">{k.en}</td></tr>))}</tbody>
        </table>
      </div>
    </div>
  );
}
