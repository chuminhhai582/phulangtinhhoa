"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath, unstable_noStore } from "next/cache";

export async function getMapLocations() {
  unstable_noStore();
  const supabase = createClient();

  // Step 1: Simple query without joins to test basic connectivity
  const { data: rawCount, error: countError } = await supabase
    .from("map_locations")
    .select("id", { count: "exact" });

  if (countError) {
    console.error("MAP DEBUG - Count query error:", countError);
    return { data: [], error: `Lỗi đếm: ${countError.message} (code: ${countError.code})` };
  }

  console.log("MAP DEBUG - Raw count:", rawCount?.length);

  // Step 2: Full query with joins
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
    console.error("MAP DEBUG - Full query error:", error);
    return { data: [], error: `Lỗi truy vấn: ${error.message} (code: ${error.code})` };
  }

  console.log("MAP DEBUG - Full query returned:", data?.length, "rows");
  return { data: data || [], error: null };
}

export async function addMapLocation(payload: any) {
  const supabase = createClient();
  
  console.log("MAP DEBUG - Inserting payload:", JSON.stringify(payload));
  
  const { data, error } = await supabase
    .from("map_locations")
    .insert(payload)
    .select();

  console.log("MAP DEBUG - Insert result:", { data, error });

  if (error) {
    return { success: false, error: `Lỗi insert: ${error.message} (code: ${error.code}, details: ${error.details})` };
  }
  
  if (!data || data.length === 0) {
    return { success: false, error: "Insert trả về rỗng - RLS đang chặn. Kiểm tra policy trên Supabase Dashboard." };
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
