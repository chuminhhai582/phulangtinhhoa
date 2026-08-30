"use client";
import React from "react";
import { Globe, Edit3 } from "lucide-react";

const pages = [
  { slug: "/", title: "Trang chủ", lastEdited: "28/08/2026", published: true },
  { slug: "/nang-luc", title: "Năng lực mạng lưới", lastEdited: "25/08/2026", published: true },
  { slug: "/bo-suu-tap", title: "Bộ sưu tập", lastEdited: "20/08/2026", published: true },
  { slug: "/nghe-nhan", title: "Nghệ nhân", lastEdited: "22/08/2026", published: true },
  { slug: "/quy-trinh-chat-luong", title: "Quy trình chất lượng", lastEdited: "15/08/2026", published: true },
  { slug: "/lien-he", title: "Liên hệ", lastEdited: "10/08/2026", published: true },
];

export default function ContentPage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2"><Globe className="w-5 h-5 text-primary" /><span className="text-sm text-muted-foreground">Nội dung trang công khai</span></div>
      <div className="space-y-2">
        {pages.map((p) => (
          <div key={p.slug} className="flex items-center justify-between p-4 bg-card border rounded-xl hover:bg-muted/50 transition-colors">
            <div>
              <div className="flex items-center gap-3">
                <span className="font-medium">{p.title}</span>
                <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">{p.slug}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Sửa lần cuối: {p.lastEdited}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">Đã đăng</span>
              <button className="p-2 rounded-md hover:bg-muted"><Edit3 className="w-4 h-4" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
