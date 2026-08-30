import { redirect } from "next/navigation";

export default function AdminIndexPage() {
  // Tự động chuyển hướng trang Quản trị gốc sang mục Người dùng
  redirect("/app/quan-tri/nguoi-dung");
}
