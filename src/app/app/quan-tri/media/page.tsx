"use client";
import React from "react";
import { Upload, Image as ImageIcon, Film, FileText } from "lucide-react";

const mediaItems = [
  { name: "binh-thu-vang-hero.jpg", type: "image", size: "2.4 MB", date: "25/08/2026", used: 3 },
  { name: "quy-trinh-nung.mp4", type: "video", size: "45 MB", date: "20/08/2026", used: 1 },
  { name: "am-tra-catalog.pdf", type: "document", size: "8.2 MB", date: "15/08/2026", used: 2 },
  { name: "ong-toi-portrait.jpg", type: "image", size: "1.8 MB", date: "12/08/2026", used: 1 },
  { name: "ho-chieu-so-demo.jpg", type: "image", size: "0.9 MB", date: "10/08/2026", used: 4 },
];

export default function MediaPage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">{mediaItems.length} tệp · 58.3 MB</span>
        <button className="h-9 px-3 bg-primary text-primary-foreground rounded-md flex items-center text-sm font-medium hover:bg-primary/90"><Upload className="w-4 h-4 mr-1" />Tải lên</button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {mediaItems.map((m, i) => (
          <div key={i} className="bg-card border rounded-xl overflow-hidden hover:shadow-md transition-all group cursor-pointer">
            <div className="aspect-square bg-muted flex items-center justify-center">
              {m.type === 'image' ? <ImageIcon className="w-10 h-10 text-muted-foreground/30" /> : m.type === 'video' ? <Film className="w-10 h-10 text-muted-foreground/30" /> : <FileText className="w-10 h-10 text-muted-foreground/30" />}
            </div>
            <div className="p-3">
              <p className="text-sm font-medium truncate group-hover:text-primary transition-colors">{m.name}</p>
              <p className="text-xs text-muted-foreground">{m.size} · {m.date} · Dùng {m.used} nơi</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
