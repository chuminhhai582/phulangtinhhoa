import Link from "next/link";
import { FileQuestion } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] gap-6 p-4 text-center">
      <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
        <FileQuestion className="w-8 h-8 text-muted-foreground" />
      </div>
      <div className="space-y-2 max-w-md">
        <h2 className="text-xl font-heading font-semibold">Không tìm thấy trang</h2>
        <p className="text-muted-foreground text-sm">
          Trang bạn đang tìm không tồn tại hoặc đã bị di chuyển.
        </p>
      </div>
      <Link href="/app" className="inline-flex items-center justify-center h-11 px-4 md:h-9 md:px-3 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/80 transition-colors">
        Về trang chính
      </Link>
    </div>
  );
}
