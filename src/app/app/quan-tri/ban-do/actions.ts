"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function getMapLocations() {
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
  const { error } = await supabase
    .from("map_locations")
    .insert(payload);

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath("/app/quan-tri/ban-do");
  revalidatePath("/ban-do");
  return { success: true };
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
