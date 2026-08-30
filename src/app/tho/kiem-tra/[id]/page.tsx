"use client";
import React from "react";
import { ArrowLeft, Camera, CheckCircle2 } from "lucide-react";
import Link from "next/link";

const steps = [
  { name: "Chụp mặt trước", desc: "≥3 ảnh, rõ nét", minPhotos: 3, done: 0 },
  { name: "Đo kích thước", desc: "Nhập chiều cao (mm)", minPhotos: 1, done: 0 },
  { name: "Ghi số lượng", desc: "Đếm sản phẩm, bao gồm dự phòng", minPhotos: 0, done: 0 },
  { name: "Ký hiệu lô", desc: "Chụp ảnh nhãn lô", minPhotos: 1, done: 0 },
];

export default function InspectionPage({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-4 max-w-lg mx-auto">
      <Link href="/tho" className="flex items-center gap-2 text-muted-foreground" style={{ minHeight: '48px' }}><ArrowLeft className="w-5 h-5" /><span style={{ fontSize: '17px' }}>Quay lại</span></Link>

      <div className="bg-primary/5 border border-primary/20 rounded-xl p-5">
        <h2 className="text-xl font-bold" style={{ fontSize: '20px' }}>Kiểm tra: {params.id}</h2>
        <p className="text-muted-foreground mt-1" style={{ fontSize: '17px' }}>Điểm kiểm tra #2 — Trước nung</p>
        <p className="text-xs text-muted-foreground mt-2">Chụp đủ ảnh → nhập số đo → bấm gửi. Offline cũng được, sẽ tự gửi khi có mạng.</p>
      </div>

      <div className="space-y-3">
        {steps.map((step, i) => (
          <div key={i} className="bg-card border rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold" style={{ fontSize: '17px' }}>Bước {i + 1}: {step.name}</h3>
              {step.done >= (step.minPhotos || 1) ? <CheckCircle2 className="w-6 h-6 text-green-500" /> : <span className="text-xs text-muted-foreground">{step.done}/{step.minPhotos || '—'}</span>}
            </div>
            <p className="text-sm text-muted-foreground mb-3">{step.desc}</p>
            {step.minPhotos > 0 && (
              <button className="w-full h-14 border-2 border-dashed border-primary/30 rounded-xl flex items-center justify-center gap-2 text-primary font-medium hover:bg-primary/5 transition-colors" style={{ minHeight: '48px', fontSize: '17px' }}>
                <Camera className="w-6 h-6" />Chụp ảnh
              </button>
            )}
            {step.minPhotos === 0 && (
              <input type="number" placeholder="Nhập số lượng" className="w-full h-14 px-4 border-2 rounded-xl text-center text-xl font-bold" style={{ minHeight: '48px', fontSize: '20px' }} />
            )}
          </div>
        ))}
      </div>

      <button className="w-full h-14 bg-primary text-primary-foreground rounded-xl font-bold text-lg opacity-50 cursor-not-allowed" style={{ minHeight: '48px', fontSize: '17px' }}>
        Chưa đủ ảnh — chưa thể gửi
      </button>
    </div>
  );
}
