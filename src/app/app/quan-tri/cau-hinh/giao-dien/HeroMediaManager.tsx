"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import { Trash2, Plus, GripVertical, Image as ImageIcon, Video, Link as LinkIcon, Upload } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { updateHeroMediaAction } from "./actions";

export type HeroMedia = {
  id: string;
  type: "image" | "video";
  url: string;
};

export function HeroMediaManager({ initialData }: { initialData: HeroMedia[] }) {
  const [mediaList, setMediaList] = useState<HeroMedia[]>(initialData || []);
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  const handleAddExternal = () => {
    const url = prompt("Nhập URL (Ảnh, MP4, Youtube, Vimeo...):");
    if (!url) return;
    
    // Auto detect type based on url
    const isVideo = url.includes("youtube.com") || url.includes("youtu.be") || url.includes("vimeo.com") || url.endsWith(".mp4");
    
    setMediaList([...mediaList, {
      id: Date.now().toString(),
      type: isVideo ? "video" : "image",
      url
    }]);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check size limit (e.g. 20MB)
    if (file.size > 20 * 1024 * 1024) {
      toast.error("Kích thước file vượt quá 20MB");
      return;
    }

    setLoading(true);
    const toastId = toast.loading("Đang tải lên...");

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `hero/${fileName}`;

      const { data, error } = await supabase.storage
        .from('public_media')
        .upload(filePath, file);

      if (error) throw error;

      const { data: { publicUrl } } = supabase.storage
        .from('public_media')
        .getPublicUrl(filePath);

      setMediaList([...mediaList, {
        id: Date.now().toString(),
        type: file.type.startsWith("video/") ? "video" : "image",
        url: publicUrl
      }]);
      toast.success("Tải lên thành công!", { id: toastId });
    } catch (err: any) {
      toast.error(`Lỗi tải lên: ${err.message}`, { id: toastId });
    } finally {
      setLoading(false);
      // Reset input
      e.target.value = '';
    }
  };

  const removeMedia = (id: string) => {
    setMediaList(mediaList.filter(m => m.id !== id));
  };

  const moveUp = (index: number) => {
    if (index === 0) return;
    const newList = [...mediaList];
    const temp = newList[index];
    newList[index] = newList[index - 1];
    newList[index - 1] = temp;
    setMediaList(newList);
  };

  const moveDown = (index: number) => {
    if (index === mediaList.length - 1) return;
    const newList = [...mediaList];
    const temp = newList[index];
    newList[index] = newList[index + 1];
    newList[index + 1] = temp;
    setMediaList(newList);
  };

  const handleSave = async () => {
    setLoading(true);
    const res = await updateHeroMediaAction(mediaList);
    setLoading(false);
    if (res.success) {
      toast.success("Đã lưu cấu hình giao diện!");
    } else {
      toast.error("Có lỗi xảy ra khi lưu: " + res.error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold">Media Nền Trang chủ (Hero Background)</h2>
          <p className="text-sm text-muted-foreground mt-1">Hỗ trợ ảnh tĩnh, video MP4 tải lên (Max 20MB) hoặc link Youtube/Vimeo.</p>
        </div>
        <button 
          onClick={handleSave} 
          disabled={loading}
          className="px-4 py-2 bg-[var(--pl-clay)] text-white rounded-md font-medium disabled:opacity-50"
        >
          {loading ? "Đang xử lý..." : "Lưu thay đổi"}
        </button>
      </div>

      <div className="flex gap-4">
        <label className="flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-md cursor-pointer hover:bg-secondary/80">
          <Upload className="w-4 h-4" />
          <span>Tải file lên</span>
          <input type="file" accept="image/*,video/mp4" className="hidden" onChange={handleFileUpload} disabled={loading} />
        </label>
        <button onClick={handleAddExternal} disabled={loading} className="flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-secondary/50">
          <LinkIcon className="w-4 h-4" />
          <span>Thêm từ link ngoài</span>
        </button>
      </div>

      <div className="space-y-3 mt-6">
        {mediaList.length === 0 && (
          <div className="text-center p-12 border-2 border-dashed rounded-lg text-muted-foreground">
            Chưa có media nào. Hãy tải lên ảnh/video đầu tiên.
          </div>
        )}
        {mediaList.map((item, index) => (
          <div key={item.id} className="flex items-center gap-4 p-3 bg-card border rounded-lg shadow-sm">
            <div className="flex flex-col gap-1">
              <button onClick={() => moveUp(index)} disabled={index === 0} className="p-1 hover:bg-secondary rounded disabled:opacity-30">▲</button>
              <button onClick={() => moveDown(index)} disabled={index === mediaList.length - 1} className="p-1 hover:bg-secondary rounded disabled:opacity-30">▼</button>
            </div>
            
            <div className="w-24 h-16 bg-black/10 rounded overflow-hidden flex-shrink-0 flex items-center justify-center">
              {item.type === "image" ? (
                <img src={item.url} alt="" className="w-full h-full object-cover" />
              ) : (
                <Video className="w-8 h-8 text-muted-foreground" />
              )}
            </div>

            <div className="flex-1 truncate">
              <div className="flex items-center gap-2">
                {item.type === "image" ? <ImageIcon className="w-4 h-4" /> : <Video className="w-4 h-4" />}
                <span className="font-medium capitalize">{item.type}</span>
              </div>
              <p className="text-xs text-muted-foreground truncate mt-1">{item.url}</p>
            </div>

            <button onClick={() => removeMedia(item.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-md shrink-0">
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
