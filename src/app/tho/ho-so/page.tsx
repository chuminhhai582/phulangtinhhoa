"use client";
import React from "react";

export default function ArtisanProfilePage() {
  return (
    <div className="space-y-4 max-w-lg mx-auto">
      <h2 className="text-xl font-bold" style={{ fontSize: '20px' }}>Hồ sơ năng lực</h2>
      <div className="bg-card border rounded-xl p-5">
        <div className="flex items-center gap-4 mb-4"><div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center text-2xl">👤</div><div><p className="font-bold" style={{ fontSize: '17px' }}>Ông Nguyễn Văn Tới</p><p className="text-sm text-muted-foreground">Hộ PL-H-003 · Thôn Phù Lãng</p></div></div>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="bg-muted/50 rounded-lg p-3"><p className="text-muted-foreground">Thế hệ</p><p className="font-medium">Đời thứ 4</p></div>
          <div className="bg-muted/50 rounded-lg p-3"><p className="text-muted-foreground">Kinh nghiệm</p><p className="font-medium">35 năm</p></div>
          <div className="bg-muted/50 rounded-lg p-3"><p className="text-muted-foreground">Lò tối đa</p><p className="font-medium">Cao 1200mm</p></div>
          <div className="bg-muted/50 rounded-lg p-3"><p className="text-muted-foreground">Tỷ lệ lỗi</p><p className="font-medium text-green-600">5.2%</p></div>
        </div>
      </div>
      <div className="bg-card border rounded-xl p-5">
        <h3 className="font-bold mb-3" style={{ fontSize: '17px' }}>Kỹ thuật</h3>
        <div className="space-y-2">{["Vuốt tay chập chiếc", "Men da lươn truyền thống", "Nung củi lò bầu", "Khắc chìm"].map((t, i) => (<div key={i} className="flex items-center justify-between p-2 border rounded-lg"><span style={{ fontSize: '17px' }}>{t}</span><div className="flex gap-0.5">{[1,2,3,4,5].map(l => (<div key={l} className={`w-2.5 h-2.5 rounded-full ${l <= (5 - i) ? 'bg-primary' : 'bg-muted'}`} />))}</div></div>))}</div>
      </div>
      <div className="bg-card border rounded-xl p-5">
        <div className="flex items-center justify-between"><span style={{ fontSize: '17px' }}>Đồng ý hiển thị công khai</span><div className="w-12 h-7 bg-green-500 rounded-full relative"><div className="absolute right-1 top-1 w-5 h-5 bg-white rounded-full" /></div></div>
        <p className="text-xs text-muted-foreground mt-2">Tên và kỹ thuật sẽ hiển thị trên trang web cho khách hàng xem.</p>
      </div>
    </div>
  );
}
