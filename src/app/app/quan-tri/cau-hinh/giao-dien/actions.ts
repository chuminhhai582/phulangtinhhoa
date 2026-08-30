"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function updateHeroMediaAction(mediaData: any[]) {
  const supabase = createClient();
  
  const { error } = await supabase
    .from("settings")
    .upsert({ 
      key: "hero_media", 
      value: mediaData, 
      label_vi: "Media nền Trang chủ", 
      description: "Danh sách ảnh/video hiển thị ở background trang chủ" 
    });

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath("/");
  return { success: true };
}
