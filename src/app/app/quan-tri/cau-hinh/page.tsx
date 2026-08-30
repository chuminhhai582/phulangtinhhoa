"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import { Save } from "lucide-react";

const mockSettings = [
  { key: "min_deposit_pct", label_vi: "Tỷ lệ đặt cọc tối thiểu (%)", value: "40", type: "number" },
  { key: "min_qc_checkpoints", label_vi: "Số điểm kiểm tra tối thiểu mỗi đơn", value: "3", type: "number" },
  { key: "target_breakage_rate_pct", label_vi: "Ngưỡng vỡ hỏng mục tiêu (%)", value: "3", type: "number" },
  { key: "target_ontime_rate_pct", label_vi: "Ngưỡng giao đủ đúng hạn (%)", value: "90", type: "number" },
  { key: "customer_concentration_pct", label_vi: "Cảnh báo tập trung khách hàng (%)", value: "35", type: "number" },
  { key: "default_transaction_fee_pct", label_vi: "Phí giao dịch mặc định (%)", value: "8", type: "number" },
  { key: "quote_validity_days", label_vi: "Số ngày hiệu lực báo giá", value: "30", type: "number" },
  { key: "inquiry_accept_threshold", label_vi: "Điểm sàng lọc tối thiểu để nhận yêu cầu", value: "60", type: "number" },
];

export default function SettingsPage() {
  const [settings, setSettings] = useState(mockSettings);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    // Giả lập API
    setTimeout(() => {
      setIsSaving(false);
      toast.success("Đã lưu cấu hình thành công!");
    }, 1000);
  };

  const handleChange = (key: string, value: string) => {
    setSettings(settings.map(s => s.key === key ? { ...s, value } : s));
  };

  return (
    <div className="space-y-6">
      <div className="bg-card border rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-6 pb-4 border-b">Tham số vận hành cốt lõi (L5)</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          {settings.map((setting) => (
            <div key={setting.key} className="space-y-2">
              <label className="text-sm font-medium text-foreground block">
                {setting.label_vi}
              </label>
              <div className="relative">
                <input 
                  type={setting.type} 
                  value={setting.value}
                  onChange={(e) => handleChange(setting.key, e.target.value)}
                  className="w-full h-10 px-3 border rounded-md text-sm bg-background focus:ring-2 focus:ring-primary/20 outline-none transition-all" 
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground font-mono">
                  {setting.key}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 pt-6 border-t flex justify-end">
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="h-10 px-6 bg-primary text-primary-foreground rounded-md flex items-center text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            {isSaving ? (
              "Đang lưu..."
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Lưu cấu hình
              </>
            )}
          </button>
        </div>
      </div>
      
      <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 flex gap-3 text-amber-700">
        <div className="text-sm">
          <p className="font-semibold mb-1">Lưu ý bảo mật</p>
          <p>Mọi thay đổi cấu hình đều được ghi nhận vào nhật ký <code>audit_logs</code>. Việc thay đổi tỷ lệ cọc tối thiểu sẽ không ảnh hưởng đến các đơn hàng đã chốt hợp đồng.</p>
        </div>
      </div>
    </div>
  );
}
