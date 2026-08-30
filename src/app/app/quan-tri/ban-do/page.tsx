import React from "react";
import { getMapLocations } from "./actions";
import { MapLocationManager } from "./MapLocationManager";
import { createClient } from "@/lib/supabase/server";

export const metadata = {
  title: "Quản lý Bản đồ | Phù Lãng Tinh Hoa",
};

export default async function MapCMSPage() {
  const locations = await getMapLocations();
  
  // Fetch households for dropdown
  const supabase = createClient();
  const { data: households } = await supabase
    .from("households")
    .select("id, name");

  return (
    <div className="max-w-5xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Quản lý Bản đồ số</h1>
        <p className="text-muted-foreground mt-1">Ghim toạ độ các hộ nghề và điểm tham quan lên Bản đồ 3D.</p>
      </div>

      <div className="bg-card border rounded-xl p-6 shadow-sm">
        <MapLocationManager initialLocations={locations || []} households={households || []} />
      </div>
    </div>
  );
}
