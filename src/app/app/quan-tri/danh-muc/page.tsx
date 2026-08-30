"use client";

import React, { useState } from "react";
import { AdaptiveTable } from "@/components/adaptive/AdaptiveTable";
import { ResponsiveDialog } from "@/components/adaptive/ResponsiveDialog";
import { FilterBar } from "@/components/adaptive/FilterBar";
import { Plus, Edit2, Trash } from "lucide-react";

const mockCategories = [
  { id: "1", type: "technique", code: "VUOT_TAY", name_vi: "Vuốt tay", name_en: "Hand-throwing", is_active: true },
  { id: "2", type: "technique", code: "DO_ROT", name_vi: "Đổ rót", name_en: "Slip casting", is_active: true },
  { id: "3", type: "product_type", code: "CHAU_CAY", name_vi: "Chậu cây", name_en: "Planter", is_active: true },
  { id: "4", type: "product_type", code: "BINH_HOA", name_vi: "Bình hoa", name_en: "Vase", is_active: false },
];

export default function CategoriesPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);

  const columns = [
    { key: "type", label: "Phân loại", render: (val: string) => <span className="uppercase text-xs font-semibold text-muted-foreground">{val}</span> },
    { key: "code", label: "Mã (Code)", render: (val: string) => <code className="bg-muted px-1.5 py-0.5 rounded text-sm">{val}</code> },
    { key: "name_vi", label: "Tên (Tiếng Việt)" },
    { key: "name_en", label: "Tên (Tiếng Anh)", render: (val: string) => <span className="text-muted-foreground italic">{val}</span> },
    { 
      key: "is_active", 
      label: "Trạng thái",
      render: (val: boolean) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${val ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
          {val ? 'Hoạt động' : 'Tạm ẩn'}
        </span>
      )
    },
    {
      key: "actions",
      label: "",
      render: (_: any, row: any) => (
        <div className="flex justify-end gap-2">
          <button 
            className="p-1.5 text-muted-foreground hover:text-primary transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              setEditingItem(row);
              setIsOpen(true);
            }}
          >
            <Edit2 className="w-4 h-4" />
          </button>
        </div>
      )
    }
  ];

  const filterConfigs = [
    {
      id: "type",
      label: "Phân loại",
      type: "select" as const,
      options: [
        { label: "Tất cả", value: "" },
        { label: "Kỹ thuật (technique)", value: "technique" },
        { label: "Loại SP (product_type)", value: "product_type" },
      ]
    },
    {
      id: "status",
      label: "Trạng thái",
      type: "select" as const,
      options: [
        { label: "Tất cả", value: "" },
        { label: "Hoạt động", value: "active" },
        { label: "Tạm ẩn", value: "inactive" },
      ]
    }
  ];

  const handleAddNew = () => {
    setEditingItem(null);
    setIsOpen(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-end">
        <FilterBar 
          filters={filterConfigs} 
          onFilterChange={(f) => } 
          onSearch={(s) => }
        />
        <button 
          onClick={handleAddNew}
          className="h-10 px-4 bg-primary text-primary-foreground rounded-md flex items-center text-sm font-medium hover:bg-primary/90 transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          Thêm danh mục
        </button>
      </div>

      <div className="bg-card border rounded-xl shadow-sm overflow-hidden">
        <AdaptiveTable 
          columns={columns} 
          data={mockCategories} 
          keyField="id" 
        />
      </div>

      <ResponsiveDialog
        open={isOpen}
        onOpenChange={(open) => { if (!open) setIsOpen(false); }}
        title={editingItem ? "Sửa danh mục" : "Thêm danh mục mới"}
      >
        <div className="space-y-4 pt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Phân loại</label>
              <select className="w-full h-10 px-3 border rounded-md bg-background text-sm">
                <option>Kỹ thuật (technique)</option>
                <option>Loại SP (product_type)</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Mã (Code)</label>
              <input type="text" className="w-full h-10 px-3 border rounded-md text-sm" placeholder="VD: VUOT_TAY" defaultValue={editingItem?.code} />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Tên (Tiếng Việt)</label>
            <input type="text" className="w-full h-10 px-3 border rounded-md text-sm" defaultValue={editingItem?.name_vi} />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Tên (Tiếng Anh)</label>
            <input type="text" className="w-full h-10 px-3 border rounded-md text-sm" defaultValue={editingItem?.name_en} />
          </div>

          <div className="flex items-center gap-2 pt-2">
            <input type="checkbox" id="active" defaultChecked={editingItem ? editingItem.is_active : true} className="rounded border-gray-300 text-primary" />
            <label htmlFor="active" className="text-sm">Hoạt động (Hiển thị trên form)</label>
          </div>

          <div className="pt-6 flex justify-end gap-3">
            <button 
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 text-sm font-medium border rounded-md hover:bg-accent transition-colors"
            >
              Hủy
            </button>
            <button 
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            >
              Lưu thay đổi
            </button>
          </div>
        </div>
      </ResponsiveDialog>
    </div>
  );
}
