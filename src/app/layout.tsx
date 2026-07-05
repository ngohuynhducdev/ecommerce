import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

import { SiteHeader, SiteFooter } from "@/features/shared/components/site-chrome";
import { CartFlyout } from "@/features/cart/components/cart-flyout";
import { AuthModal } from "@/features/auth/components/auth-modal";
import { Toaster } from "@/components/ui/sonner";
import { SITE_URL } from "@/lib/site";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
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
        {/* Header + footer are hidden on bare routes (auth) — see site-chrome */}
        <SiteHeader />

        <main className="flex-1 pb-16 lg:pb-0 animate-fade-in">{children}</main>

        <SiteFooter />

        {/* Global cart flyout — rendered once, controlled by cartOpenAtom */}
        <CartFlyout />

        {/* Global auth modal — controlled by authModalOpenAtom */}
        <AuthModal />

        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
