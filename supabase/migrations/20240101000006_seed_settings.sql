-- Seed bắt buộc cho `settings`
insert into settings (key, value, label_vi) values
 ('min_deposit_pct',            '40',      'Tỷ lệ đặt cọc tối thiểu (%)'),
 ('min_qc_checkpoints',         '3',       'Số điểm kiểm tra tối thiểu mỗi đơn'),
 ('target_breakage_rate_pct',   '3',       'Ngưỡng vỡ hỏng mục tiêu (%)'),
 ('target_ontime_rate_pct',     '90',      'Ngưỡng giao đủ đúng hạn (%)'),
 ('customer_concentration_pct', '35',      'Cảnh báo tập trung một khách hàng (%)'),
 ('default_transaction_fee_pct','8',       'Phí giao dịch mặc định (%)'),
 ('quote_validity_days',        '30',      'Số ngày hiệu lực báo giá'),
 ('inquiry_accept_threshold',   '60',      'Điểm sàng lọc tối thiểu để nhận yêu cầu'),
 ('currencies',                 '["VND","USD","EUR","SGD","JPY"]', 'Tiền tệ sử dụng'),
 ('company_profile',            '{}',      'Thông tin pháp nhân trên chứng từ')
on conflict (key) do nothing;
