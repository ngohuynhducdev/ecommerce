"use client";

import Link from "next/link";
import { useAtom } from "jotai";
import { announcementVisibleAtom } from "../atoms";

function CouponIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="6" width="20" height="12" rx="3" />
      <path d="M8 6v12" strokeDasharray="2 2" />
      <path d="M12 10h.01M12 14h.01" strokeWidth={2} strokeLinecap="round" />
    </svg>
  );
}

export function AnnouncementBar() {
  const [visible, setVisible] = useAtom(announcementVisibleAtom);

  return (
    <div
      className={`overflow-hidden transition-all duration-300 ${
        visible ? "h-11 opacity-100" : "h-0 opacity-0 pointer-events-none"
      }`}
    >
      <div className="h-11 bg-subtle flex items-center justify-center relative px-10">
        <div className="flex items-center gap-2.5">
          <span className="text-primary">
            <CouponIcon />
          </span>
          <p className="text-sm font-medium text-primary">
            30% off storewide —{" "}
            <span className="font-semibold">Limited time!</span>
          </p>
          <Link
            href="/shop"
            className="hidden sm:inline text-sm font-medium text-[#2563EB] underline underline-offset-2 hover:text-[#1d4ed8] transition-colors ml-1"
          >
            Shop Now →
          </Link>
        </div>
        <button
          onClick={() => setVisible(false)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-muted hover:text-primary transition-colors cursor-pointer"
          aria-label="Dismiss announcement"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
        </button>
      </div>
    </div>
  );
}
