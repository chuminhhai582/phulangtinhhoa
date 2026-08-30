import type { Metadata } from "next";
import { Be_Vietnam_Pro, Lora } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const beVietnamPro = Be_Vietnam_Pro({ 
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
});

const lora = Lora({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-heading",
});

export const metadata: Metadata = {
  title: "Phù Lãng Tinh Hoa",
  description: "Hệ điều hành vận hành cho mạng lưới sản xuất gốm phân tán",
  manifest: "/manifest.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={cn(beVietnamPro.variable, lora.variable, "font-sans antialiased")}>
        {children}
      </body>
    </html>
  );
}
