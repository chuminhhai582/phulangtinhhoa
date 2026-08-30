"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath, unstable_noStore } from "next/cache";

export async function getMapLocations() {
  unstable_noStore();
  const supabase = createClient();
  const { data, error } = await supabase
    .from("map_locations")
    .select(`
      *,
      households (
        name,
        description,
        avatar_url
      )
    `)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching map locations:", error);
    return [];
  }
  return data;
}

export async function addMapLocation(payload: any) {
  const supabase = createClient();
  // We use .select() to force Supabase to return the inserted row.
  // If RLS blocks it, it will return an empty array or an error.
  const { data, error } = await supabase
    .from("map_locations")
    .insert(payload)
    .select();

  if (error) {
    return { success: false, error: error.message };
  }
  
  if (!data || data.length === 0) {
    return { success: false, error: "Bị chặn bởi phân quyền (RLS). Vui lòng kiểm tra lại câu lệnh SQL tạo bảng." };
  }

  revalidatePath("/app/quan-tri/ban-do");
  revalidatePath("/ban-do");
  return { success: true, data: data[0] };
}

export async function updateMapLocation(id: string, payload: any) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("map_locations")
    .update(payload)
    .eq("id", id)
    .select();

  if (error) {
    return { success: false, error: error.message };
  }
  
  if (!data || data.length === 0) {
    return { success: false, error: "Bị chặn bởi phân quyền (RLS) hoặc không tìm thấy ID." };
  }

  revalidatePath("/app/quan-tri/ban-do");
  revalidatePath("/ban-do");
  return { success: true, data: data[0] };
}

export async function deleteMapLocation(id: string) {
  const supabase = createClient();
  const { error } = await supabase
    .from("map_locations")
    .delete()
    .eq("id", id);

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath("/app/quan-tri/ban-do");
  revalidatePath("/ban-do");
  return { success: true };
}
