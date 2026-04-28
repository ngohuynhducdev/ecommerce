"use client";

import { useState, useEffect } from "react";

interface TocItem {
  id: string;
  label: string;
}

interface Props {
  items: TocItem[];
}

export function TableOfContents({ items }: Props) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "0% 0% -70% 0%", threshold: 0 },
    );

    items.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  return (
    <aside className="sticky top-8 h-fit">
      <p className="text-sm font-semibold mb-3">Table of Contents</p>
      <ul className="space-y-0.5">
        {items.map(({ id, label }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              className={`block text-sm py-1 pl-3 border-l-2 transition-colors ${
                activeId === id
                  ? "border-[#B88E2F] text-[#1C1C1C]"
                  : "border-transparent text-[#807D7E] hover:text-[#1C1C1C] hover:border-[#1C1C1C]"
              }`}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
