import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

import { AnnouncementBar } from "@/features/shared/components/announcement-bar";
import { Navbar } from "@/features/shared/components/navbar";
import { BottomNav } from "@/features/shared/components/bottom-nav";
import { CartFlyout } from "@/features/cart/components/cart-flyout";
import { Footer } from "@/features/shared/components/footer";
import { Toaster } from "@/components/ui/sonner";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: {
    template: "%s | 3legant",
    default: "3legant — Furniture Store",
  },
  description: "Simply Unique / Simply Better. Discover modern furniture.",
  openGraph: {
    type: "website",
    images: ["/og-image.jpg"],
  },
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

        <main className="flex-1 pb-16 lg:pb-0 animate-fade-in">{children}</main>

        <Footer />

        {/* Fixed bottom nav — mobile only */}
        <BottomNav />

        {/* Global cart flyout — rendered once, controlled by cartOpenAtom */}
        <CartFlyout />

        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
