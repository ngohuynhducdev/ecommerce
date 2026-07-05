"use client";

import { usePathname } from "next/navigation";

import { AnnouncementBar } from "./announcement-bar";
import { Navbar } from "./navbar";
import { Footer } from "./footer";
import { BottomNav } from "./bottom-nav";

// Auth pages are full-screen "popup" layouts in the design — no site chrome.
function isBareRoute(pathname: string | null): boolean {
  return pathname?.startsWith("/auth") ?? false;
}

export function SiteHeader() {
  if (isBareRoute(usePathname())) return null;
  return (
    <div className="sticky top-0 z-40">
      <AnnouncementBar />
      <Navbar />
    </div>
  );
}

export function SiteFooter() {
  if (isBareRoute(usePathname())) return null;
  return (
    <>
      <Footer />
      <BottomNav />
    </>
  );
}
