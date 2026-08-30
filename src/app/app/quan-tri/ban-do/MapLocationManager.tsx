"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import { Trash2, MapPin, Plus, Image as ImageIcon, Upload, Pencil } from "lucide-react";
import { addMapLocation, updateMapLocation, deleteMapLocation } from "./actions";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type Props = {
  initialLocations: any[];
  households: any[];
};

export function MapLocationManager({ initialLocations, households }: Props) {
  const router = useRouter();
  const supabase = createClient();
  const [locations, setLocations] = useState(initialLocations);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [formType, setFormType] = useState<"household" | "custom">("household");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [householdId, setHouseholdId] = useState("");
  const [customName, setCustomName] = useState("");
  const [customDesc, setCustomDesc] = useState("");
  const [galleryUrlsText, setGalleryUrlsText] = useState(""); 

  const resetForm = () => {
    setFormType("household");
    setLat(""); setLng(""); setHouseholdId(""); setCustomName(""); setCustomDesc(""); setGalleryUrlsText("");
    setEditingId(null);
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      toast.error("Kích thước file vượt quá 10MB");
      return;
    }

    setUploading(true);
    const toastId = toast.loading("Đang tải ảnh lên...");

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `map/${fileName}`;

      const { error } = await supabase.storage
        .from('public_media')
        .upload(filePath, file);

      if (error) throw error;

      const { data: { publicUrl } } = supabase.storage
        .from('public_media')
        .getPublicUrl(filePath);

      // Append url to the text box
      setGalleryUrlsText(prev => prev ? `${prev}, ${publicUrl}` : publicUrl);
      toast.success("Tải ảnh lên thành công", { id: toastId });
    } catch (err: any) {
      toast.error(`Lỗi tải lên: ${err.message}`, { id: toastId });
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
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
      gallery_urls: gallery_urls, 
    };

    let res;
    if (editingId) {
      res = await updateMapLocation(editingId, payload);
    } else {
      res = await addMapLocation(payload);
    }

    setLoading(false);

    if (res.success) {
      toast.success(editingId ? "Cập nhật thành công" : "Thêm địa điểm thành công");
      setShowForm(false);
      
      if (editingId) {
        setLocations(locations.map(l => l.id === editingId ? { ...l, ...res.data, households: households.find(h => h.id === householdId) } : l));
      } else {
        setLocations([res.data, ...locations]);
      }
      
      resetForm();
      router.refresh();
    } else {
      toast.error(res.error || "Có lỗi xảy ra");
    }
  };

  const handleEdit = (loc: any) => {
    setEditingId(loc.id);
    setFormType(loc.type);
    setLat(loc.lat?.toString() || "");
    setLng(loc.lng?.toString() || "");
    setHouseholdId(loc.household_id || "");
    setCustomName(loc.custom_name || "");
    setCustomDesc(loc.custom_description || "");
    setGalleryUrlsText(loc.gallery_urls?.join(", ") || "");
    setShowForm(true);
    // Cuộn lên đầu
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
          onClick={() => {
            if (showForm) {
              setShowForm(false);
              resetForm();
            } else {
              setShowForm(true);
              resetForm();
            }
          }}
          className="flex items-center gap-2 px-4 py-2 bg-[var(--pl-clay)] text-white rounded-md font-medium text-sm hover:bg-[var(--pl-eel)] transition-colors"
        >
          <Plus className="w-4 h-4" />
          {showForm ? "Đóng form" : "Thêm điểm mới"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-secondary/30 p-5 rounded-lg border space-y-4 shadow-inner">
          <h3 className="font-semibold text-[var(--pl-char)] mb-2 border-b pb-2">
            {editingId ? "Cập nhật địa điểm" : "Thêm địa điểm mới"}
          </h3>
          
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
              <input type="number" step="any" value={lat} onChange={(e) => setLat(e.target.value)} placeholder="21.123456" className="w-full h-10 px-3 border rounded text-sm bg-white" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Kinh độ (Longitude)</label>
              <input type="number" step="any" value={lng} onChange={(e) => setLng(e.target.value)} placeholder="106.123456" className="w-full h-10 px-3 border rounded text-sm bg-white" />
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
                <input type="text" value={customName} onChange={(e) => setCustomName(e.target.value)} placeholder="VD: Bến đò Lục Đầu Giang" className="w-full h-10 px-3 border rounded text-sm bg-white" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Mô tả ngắn</label>
                <textarea value={customDesc} onChange={(e) => setCustomDesc(e.target.value)} rows={3} className="w-full p-3 border rounded text-sm bg-white" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 flex items-center gap-2 justify-between">
                  <span className="flex items-center gap-2"><ImageIcon className="w-4 h-4" /> Link thư viện ảnh</span>
                  <label className="cursor-pointer flex items-center gap-1 text-[var(--pl-clay)] hover:underline text-xs bg-white px-2 py-1 border rounded shadow-sm">
                    <Upload className="w-3 h-3" /> Tải ảnh lên
                    <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} disabled={uploading} />
                  </label>
                </label>
                <textarea value={galleryUrlsText} onChange={(e) => setGalleryUrlsText(e.target.value)} placeholder="https://anh1.jpg, https://anh2.jpg" rows={2} className="w-full p-3 border rounded text-sm bg-white mt-1" />
                <p className="text-xs text-muted-foreground mt-1">Các link được cách nhau bằng dấu phẩy. Bạn có thể tự gõ link hoặc bấm nút Tải ảnh lên ở góc phải để hệ thống tự điền link.</p>
              </div>
            </div>
          )}

          <div className="flex justify-end pt-2 gap-3">
            <button type="button" onClick={() => {setShowForm(false); resetForm();}} className="px-6 py-2 border bg-white rounded font-medium hover:bg-gray-50 text-sm">
              Huỷ
            </button>
            <button type="submit" disabled={loading} className="px-6 py-2 bg-[var(--pl-clay)] text-white rounded font-medium disabled:opacity-50 text-sm hover:bg-[var(--pl-eel)] transition-colors">
              {loading ? "Đang lưu..." : (editingId ? "Cập nhật" : "Lưu toạ độ")}
            </button>
          </div>
        </form>
      )}

      <div className="border rounded-lg divide-y bg-white">
        {locations.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">Chưa có điểm nào trên bản đồ.</div>
        ) : locations.map((loc) => (
          <div key={loc.id} className="flex items-center justify-between p-4 hover:bg-secondary/20 transition-colors group cursor-pointer" onClick={() => handleEdit(loc)}>
            <div className="flex items-start gap-4">
              <div className="mt-1 p-2 bg-secondary rounded-full group-hover:bg-[var(--pl-clay)]/20 transition-colors">
                <MapPin className="w-5 h-5 text-muted-foreground group-hover:text-[var(--pl-clay)] transition-colors" />
              </div>
              <div>
                <h4 className="font-semibold group-hover:text-[var(--pl-clay)] transition-colors">
                  {loc.type === "household" ? loc.households?.name || "Hộ nghề (Lỗi data)" : loc.custom_name}
                </h4>
                <div className="text-sm text-muted-foreground flex gap-3 mt-1">
                  <span className="capitalize border px-1.5 rounded text-xs bg-gray-50">{loc.type}</span>
                  <span>{loc.lat}, {loc.lng}</span>
                  {loc.gallery_urls?.length > 0 && (
                    <span className="text-blue-500 font-medium">({loc.gallery_urls.length} ảnh)</span>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={(e) => { e.stopPropagation(); handleEdit(loc); }} className="p-2 text-blue-500 hover:bg-blue-50 rounded-md transition-colors" title="Chỉnh sửa">
                <Pencil className="w-5 h-5" />
              </button>
              <button onClick={(e) => { e.stopPropagation(); handleDelete(loc.id); }} disabled={loading} className="p-2 text-red-500 hover:bg-red-50 rounded-md transition-colors" title="Xoá">
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
