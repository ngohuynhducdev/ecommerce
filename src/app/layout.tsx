import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

import { AnnouncementBar } from "@/features/shared/components/announcement-bar";
import { Navbar } from "@/features/shared/components/navbar";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "3legant — Furniture Store",
  description: "Minimalist furniture for modern living",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-(family-name:--font-poppins)">
        {/* Sticky header: announcement collapses → navbar naturally rises to top-0 */}
        <div className="sticky top-0 z-40">
          <AnnouncementBar />
          <Navbar />
        </div>

        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
