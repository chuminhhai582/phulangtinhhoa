import React from "react";
import { InternalAppShellWrapper } from "@/components/layout/InternalAppShellWrapper";

export const metadata = {
  title: "Vận hành nội bộ | Phù Lãng Tinh Hoa",
};

export default function InternalAppLayout({ children }: { children: React.ReactNode }) {
  // TODO: Get real user role from Supabase auth session
  return (
    <InternalAppShellWrapper>
      {children}
    </InternalAppShellWrapper>
  );
}
