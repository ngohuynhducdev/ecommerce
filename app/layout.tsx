import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { JotaiProvider } from "@/components/providers/JotaiProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Home Interior — Beautiful Furniture & Decor",
  description:
    "Khám phá bộ sưu tập nội thất và trang trí nhà cửa đẹp, tinh tế. Mang phong cách sống cao cấp vào không gian sống của bạn.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <JotaiProvider>{children}</JotaiProvider>
      </body>
    </html>
  );
}
