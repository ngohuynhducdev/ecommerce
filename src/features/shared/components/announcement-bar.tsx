"use client";

import { useAtom } from "jotai";
import { X } from "lucide-react";
import { announcementVisibleAtom } from "../atoms";

export function AnnouncementBar() {
  const [visible, setVisible] = useAtom(announcementVisibleAtom);

  return (
    <div
      className={`overflow-hidden transition-all duration-300 ${
        visible ? "h-11 opacity-100" : "h-0 opacity-0 pointer-events-none"
      }`}
    >
      <div className="h-11 bg-[#1C1C1C] flex items-center justify-center relative px-10">
        <p className="text-white text-sm">
          Free Shipping On All Orders Over $50
        </p>
        <button
          onClick={() => setVisible(false)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors"
          aria-label="Dismiss announcement"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
