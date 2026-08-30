import React from "react";
import { createClient } from "@/lib/supabase/server";
import { HeroMediaManager } from "./HeroMediaManager";

export const metadata = {
  title: "Cấu hình giao diện | Phù Lãng Tinh Hoa",
};

export default async function CMSUIConfigPage() {
  const supabase = createClient();
  const { data: setting } = await supabase
    .from("settings")
    .select("value")
    .eq("key", "hero_media")
    .single();

  const initialMedia = setting?.value || [];

  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Cấu hình Giao diện</h1>
        <p className="text-muted-foreground mt-1">Tuỳ chỉnh các thành phần hiển thị trên trang chủ Public.</p>
      </div>

      <div className="bg-card border rounded-xl p-6">
        <HeroMediaManager initialData={initialMedia} />
      </div>
    </div>
  );
}
