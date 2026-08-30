import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";

// Dynamic import component chứa DnD (bỏ SSR vì DnD không chạy trên server)
const ToleranceBuilderContent = dynamic(
  () => import("./ToleranceBuilderContent"),
  { 
    ssr: false,
    loading: () => (
      <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <p className="text-muted-foreground">Đang tải công cụ thiết kế dung sai...</p>
      </div>
    )
  }
);

export default function Page({ params }: { params: { id: string } }) {
  return <ToleranceBuilderContent params={params} />;
}
