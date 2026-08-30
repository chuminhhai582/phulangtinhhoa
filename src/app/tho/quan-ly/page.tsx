"use client";
import React from "react";
import Link from "next/link";
import { Users, Flame, MapPin, Phone, FileText, Award, Settings } from "lucide-react";

const sections = [
  { href: "/tho/quan-ly/thanh-vien", icon: Users, title: "Thành viên hộ", desc: "Quản lý người trong hộ" },
  { href: "/tho/quan-ly/lo-nung", icon: Flame, title: "Thông tin lò nung", desc: "Kích thước, loại lò" },
  { href: "/tho/quan-ly/dia-chi", icon: MapPin, title: "Địa chỉ", desc: "Thôn, xóm, GPS" },
  { href: "/tho/quan-ly/lien-lac", icon: Phone, title: "Liên lạc", desc: "SĐT, Zalo" },
  { href: "/tho/quan-ly/giay-to", icon: FileText, title: "Giấy tờ", desc: "CCCD, sổ hộ khẩu" },
  { href: "/tho/quan-ly/ky-thuat", icon: Award, title: "Kỹ thuật", desc: "Cập nhật kỹ năng" },
  { href: "/tho/quan-ly/cai-dat", icon: Settings, title: "Cài đặt", desc: "Thông báo, ngôn ngữ" },
];

export default function ArtisanManagePage() {
  return (
    <div className="space-y-4 max-w-lg mx-auto">
      <h2 className="text-xl font-bold" style={{ fontSize: '20px' }}>Quản lý hộ nghề</h2>
      <div className="space-y-3">
        {sections.map((s) => (
          <Link key={s.href} href={s.href} className="flex items-center gap-4 bg-card border rounded-xl p-5 hover:shadow-md transition-all" style={{ minHeight: '48px' }}>
            <div className="p-3 rounded-lg bg-primary/10 text-primary"><s.icon className="w-6 h-6" /></div>
            <div><p className="font-bold" style={{ fontSize: '17px' }}>{s.title}</p><p className="text-sm text-muted-foreground">{s.desc}</p></div>
          </Link>
        ))}
      </div>
    </div>
  );
}
