"use client";

import { useEffect } from "react";
import { AlertTriangle, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("App error:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] gap-6 p-4 text-center">
      <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center">
        <AlertTriangle className="w-8 h-8 text-destructive" />
      </div>
      <div className="space-y-2 max-w-md">
        <h2 className="text-xl font-heading font-semibold">Đã xảy ra lỗi</h2>
        <p className="text-muted-foreground text-sm">
          {error.message || "Có lỗi không mong muốn. Vui lòng thử lại hoặc liên hệ quản trị viên."}
        </p>
        {error.digest && (
          <p className="text-xs text-muted-foreground/60 font-mono">
            Mã lỗi: {error.digest}
          </p>
        )}
      </div>
      <Button onClick={reset} className="gap-2">
        <RotateCcw className="w-4 h-4" />
        Thử lại
      </Button>
    </div>
  );
}
