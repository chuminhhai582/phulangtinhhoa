"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/nang-luc", label: "Năng lực" },
  { href: "/bo-suu-tap", label: "Bộ sưu tập" },
  { href: "/nghe-nhan", label: "Nghệ nhân" },
  { href: "/ban-do", label: "Bản đồ" },
  { href: "/quy-trinh-chat-luong", label: "Chất lượng" },
];

export function PublicHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-[var(--pl-ivory)] border-b border-[var(--pl-ash)]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[var(--pl-clay)] rounded-lg flex items-center justify-center text-white font-bold text-lg">
              P
            </div>
            <span className="font-heading font-bold text-xl text-[var(--pl-char)]">
              Phù Lãng Tinh Hoa
            </span>
          </Link>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-sm font-medium transition-colors",
                    isActive ? "text-[var(--pl-clay)]" : "text-[var(--pl-char)]/70 hover:text-[var(--pl-clay)]"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link
              href="/lien-he"
              className="px-5 py-2.5 bg-[var(--pl-clay)] text-white text-sm font-medium rounded-lg hover:bg-[var(--pl-eel)] transition-colors"
            >
              Liên hệ
            </Link>
          </div>

          {/* Mobile Nav */}
          <div className="md:hidden">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger render={(props) => (
                <Button variant="ghost" size="icon" {...props} aria-label="Mở menu">
                  <Menu className="w-5 h-5" />
                </Button>
              )} />
              <SheetContent side="right" className="w-[85vw] sm:w-[350px] bg-[var(--pl-ivory)] border-l-[var(--pl-ash)]/30 p-0">
                <div className="flex flex-col h-full">
                  <div className="p-4 border-b border-[var(--pl-ash)]/30 flex items-center justify-between">
                    <span className="font-heading font-bold text-lg text-[var(--pl-char)]">Menu</span>
                    <Button variant="ghost" size="icon" onClick={() => setOpen(false)} aria-label="Đóng menu">
                      <X className="w-5 h-5" />
                    </Button>
                  </div>
                  <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
                    <Link
                      href="/"
                      onClick={() => setOpen(false)}
                      className={cn("text-lg font-medium p-3 rounded-lg transition-colors", pathname === "/" ? "bg-[var(--pl-clay)]/10 text-[var(--pl-clay)]" : "text-[var(--pl-char)] hover:bg-[var(--pl-ash)]/20")}
                    >
                      Trang chủ
                    </Link>
                    {navLinks.map((link) => {
                      const isActive = pathname === link.href;
                      return (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={() => setOpen(false)}
                          className={cn(
                            "text-lg font-medium p-3 rounded-lg transition-colors",
                            isActive ? "bg-[var(--pl-clay)]/10 text-[var(--pl-clay)]" : "text-[var(--pl-char)] hover:bg-[var(--pl-ash)]/20"
                          )}
                        >
                          {link.label}
                        </Link>
                      );
                    })}
                  </div>
                  <div className="p-4 border-t border-[var(--pl-ash)]/30 mt-auto">
                    <Link
                      href="/lien-he"
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-center w-full py-4 bg-[var(--pl-clay)] text-white text-base font-medium rounded-xl hover:bg-[var(--pl-eel)] transition-colors"
                    >
                      Liên hệ hợp tác
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
