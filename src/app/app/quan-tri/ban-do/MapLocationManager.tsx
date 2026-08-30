"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import { Trash2, MapPin, Plus, Image as ImageIcon } from "lucide-react";
import { addMapLocation, deleteMapLocation } from "./actions";
import { useRouter } from "next/navigation";

type Props = {
  initialLocations: any[];
  households: any[];
};

export function MapLocationManager({ initialLocations, households }: Props) {
  const router = useRouter();
  const [locations, setLocations] = useState(initialLocations);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  
  const [formType, setFormType] = useState<"household" | "custom">("household");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [householdId, setHouseholdId] = useState("");
  const [customName, setCustomName] = useState("");
  const [customDesc, setCustomDesc] = useState("");
  const [galleryUrlsText, setGalleryUrlsText] = useState(""); // Comma separated URLs

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!lat || !lng) {
      toast.error("Vui lòng nhập toạ độ");
      return;
    }
    if (formType === "household" && !householdId) {
      toast.error("Vui lòng chọn Hộ nghề");
      return;
    }
    if (formType === "custom" && !customName) {
      toast.error("Vui lòng nhập Tên địa điểm");
      return;
    }

    setLoading(true);
    const gallery_urls = galleryUrlsText.split(",").map(s => s.trim()).filter(Boolean);

    const payload = {
      lat: parseFloat(lat),
      lng: parseFloat(lng),
      type: formType,
      household_id: formType === "household" ? householdId : null,
      custom_name: formType === "custom" ? customName : null,
      custom_description: formType === "custom" ? customDesc : null,
      gallery_urls: gallery_urls, // Ensure it's an array
    };

    const res = await addMapLocation(payload);
    setLoading(false);

    if (res.success) {
      toast.success("Thêm địa điểm thành công");
      setShowForm(false);
      setLocations([res.data, ...locations]);
      setLat(""); setLng(""); setCustomName(""); setCustomDesc(""); setGalleryUrlsText("");
      // Force next.js to refresh server data
      router.refresh();
    } else {
      toast.error(res.error || "Có lỗi xảy ra");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Bạn có chắc muốn xoá điểm này khỏi bản đồ?")) return;
    
    setLoading(true);
    const res = await deleteMapLocation(id);
    setLoading(false);
    if (res.success) {
      toast.success("Đã xoá địa điểm");
      setLocations(locations.filter(l => l.id !== id));
      router.refresh();
    } else {
      toast.error("Lỗi: " + res.error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Danh sách Toạ độ</h2>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2 bg-[var(--pl-clay)] text-white rounded-md font-medium text-sm hover:bg-[var(--pl-eel)] transition-colors"
        >
          <Plus className="w-4 h-4" />
          {showForm ? "Đóng form" : "Thêm điểm mới"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleAdd} className="bg-secondary/30 p-5 rounded-lg border space-y-4">
          <div className="flex gap-4 mb-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" checked={formType === "household"} onChange={() => setFormType("household")} />
              <span>Hộ nghề có sẵn</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" checked={formType === "custom"} onChange={() => setFormType("custom")} />
              <span>Điểm tuỳ chỉnh</span>
            </label>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Vĩ độ (Latitude)</label>
              <input type="number" step="any" value={lat} onChange={(e) => setLat(e.target.value)} placeholder="21.123456" className="w-full h-10 px-3 border rounded text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Kinh độ (Longitude)</label>
              <input type="number" step="any" value={lng} onChange={(e) => setLng(e.target.value)} placeholder="106.123456" className="w-full h-10 px-3 border rounded text-sm" />
            </div>
          </div>

          {formType === "household" ? (
            <div>
              <label className="block text-sm font-medium mb-1">Chọn Hộ nghề</label>
              <select value={householdId} onChange={(e) => setHouseholdId(e.target.value)} className="w-full h-10 px-3 border rounded text-sm bg-white">
                <option value="">-- Chọn một hộ --</option>
                {households.map(h => <option key={h.id} value={h.id}>{h.name}</option>)}
              </select>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Tên địa điểm</label>
                <input type="text" value={customName} onChange={(e) => setCustomName(e.target.value)} placeholder="VD: Bến đò Lục Đầu Giang" className="w-full h-10 px-3 border rounded text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Mô tả ngắn</label>
                <textarea value={customDesc} onChange={(e) => setCustomDesc(e.target.value)} rows={3} className="w-full p-3 border rounded text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 flex items-center gap-2">
                  <ImageIcon className="w-4 h-4" /> Link thư viện ảnh (Nhiều ảnh cách nhau bằng dấu phẩy)
                </label>
                <textarea value={galleryUrlsText} onChange={(e) => setGalleryUrlsText(e.target.value)} placeholder="https://anh1.jpg, https://anh2.jpg" rows={2} className="w-full p-3 border rounded text-sm" />
                <p className="text-xs text-muted-foreground mt-1">Dùng tính năng này để tạo hiệu ứng 3D Arc xung quanh điểm ghim.</p>
              </div>
            </div>
          )}

          <div className="flex justify-end pt-2">
            <button type="submit" disabled={loading} className="px-6 py-2 bg-[var(--pl-clay)] text-white rounded font-medium disabled:opacity-50">
              {loading ? "Đang lưu..." : "Lưu toạ độ"}
            </button>
          </div>
        </form>
      )}

      <div className="border rounded-lg divide-y bg-white">
        {locations.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">Chưa có điểm nào trên bản đồ.</div>
        ) : locations.map((loc) => (
          <div key={loc.id} className="flex items-center justify-between p-4 hover:bg-secondary/20 transition-colors">
            <div className="flex items-start gap-4">
              <div className="mt-1 p-2 bg-secondary rounded-full">
                <MapPin className="w-5 h-5 text-muted-foreground" />
              </div>
              <div>
                <h4 className="font-semibold">
                  {loc.type === "household" ? loc.households?.name || "Hộ nghề (Lỗi data)" : loc.custom_name}
                </h4>
                <div className="text-sm text-muted-foreground flex gap-3 mt-1">
                  <span className="capitalize border px-1.5 rounded text-xs">{loc.type}</span>
                  <span>{loc.lat}, {loc.lng}</span>
                  {loc.gallery_urls?.length > 0 && (
                    <span className="text-blue-500 font-medium">({loc.gallery_urls.length} ảnh)</span>
                  )}
                </div>
              </div>
            </div>
            <button onClick={() => handleDelete(loc.id)} disabled={loading} className="p-2 text-red-500 hover:bg-red-50 rounded-md transition-colors">
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
