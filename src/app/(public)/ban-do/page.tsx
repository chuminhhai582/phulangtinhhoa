import React from "react";
import { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { InteractiveMap } from "./InteractiveMap";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Bản đồ số Làng gốm Phù Lãng | Phù Lãng Tinh Hoa",
  description: "Khám phá không gian 3D của làng gốm truyền thống Phù Lãng, Bắc Ninh. Xem chi tiết các lò gốm và điểm tham quan.",
};

export default async function MapPage() {
  const supabase = createClient();
  
  // Simple query without nested joins that could fail
  const { data: locations, error } = await supabase
    .from("map_locations")
    .select(`
      *,
      households (
        id,
        name,
        bio_vi,
        cover_image
      )
    `);

  if (error) {
    console.error("MAP PUBLIC ERROR:", error);
  }

  return (
    <div className="w-full flex flex-col bg-[var(--pl-ivory)]">
      <div className="px-4 py-4 sm:px-6 lg:px-8 border-b border-[var(--pl-ash)]/30">
        <h1 className="text-2xl font-bold font-heading text-[var(--pl-char)]">
          Bản đồ Làng nghề Phù Lãng
        </h1>
        <p className="text-sm text-[var(--pl-char)]/70">
          Khám phá các điểm đến, lò nung và hộ sản xuất trên không gian số 3D. Nhấn vào các biểu tượng để xem chi tiết.
        </p>
      </div>

      {error && (
        <div className="mx-4 mt-4 bg-red-50 border border-red-300 text-red-800 p-3 rounded-lg text-sm">
          ⚠️ Lỗi tải bản đồ: {error.message}
        </div>
      )}
      
      <InteractiveMap locations={locations || []} />
    </div>
  );
}
