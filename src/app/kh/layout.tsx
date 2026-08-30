import React from "react";

export const metadata = { title: "Cổng khách hàng | Phù Lãng Tinh Hoa" };

export default function CustomerPortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--pl-ivory)]">
      <header className="bg-white border-b border-[var(--pl-ash)]/30">
        <div className="max-w-3xl mx-auto px-4 flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[var(--pl-clay)] rounded-lg flex items-center justify-center text-white font-bold text-sm">P</div>
            <span className="font-heading font-semibold">Phù Lãng Tinh Hoa</span>
          </div>
          <span className="text-sm text-[var(--pl-char)]/60">Cổng khách hàng</span>
        </div>
      </header>
      <main className="max-w-3xl mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
