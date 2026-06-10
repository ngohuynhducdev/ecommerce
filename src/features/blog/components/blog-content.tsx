"use client";

import { useState } from "react";
import { BlogCard } from "./blog-card";
import type { BlogPost } from "@/features/blog/types";

type Tab = "all" | "featured";
type GridCols = 1 | 2 | 3 | 4;

const INITIAL_COUNT = 9;
const INCREMENT = 6;

function IconGrid4() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <rect x="0" y="0" width="3.5" height="3.5" rx="0.5" />
      <rect x="4.2" y="0" width="3.5" height="3.5" rx="0.5" />
      <rect x="8.4" y="0" width="3.5" height="3.5" rx="0.5" />
      <rect x="12.5" y="0" width="3.5" height="3.5" rx="0.5" />
      <rect x="0" y="4.2" width="3.5" height="3.5" rx="0.5" />
      <rect x="4.2" y="4.2" width="3.5" height="3.5" rx="0.5" />
      <rect x="8.4" y="4.2" width="3.5" height="3.5" rx="0.5" />
      <rect x="12.5" y="4.2" width="3.5" height="3.5" rx="0.5" />
      <rect x="0" y="8.4" width="3.5" height="3.5" rx="0.5" />
      <rect x="4.2" y="8.4" width="3.5" height="3.5" rx="0.5" />
      <rect x="8.4" y="8.4" width="3.5" height="3.5" rx="0.5" />
      <rect x="12.5" y="8.4" width="3.5" height="3.5" rx="0.5" />
      <rect x="0" y="12.5" width="3.5" height="3.5" rx="0.5" />
      <rect x="4.2" y="12.5" width="3.5" height="3.5" rx="0.5" />
      <rect x="8.4" y="12.5" width="3.5" height="3.5" rx="0.5" />
      <rect x="12.5" y="12.5" width="3.5" height="3.5" rx="0.5" />
    </svg>
  );
}

function IconGrid3() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <rect x="0" y="0" width="4.5" height="4.5" rx="0.5" />
      <rect x="5.7" y="0" width="4.5" height="4.5" rx="0.5" />
      <rect x="11.5" y="0" width="4.5" height="4.5" rx="0.5" />
      <rect x="0" y="5.7" width="4.5" height="4.5" rx="0.5" />
      <rect x="5.7" y="5.7" width="4.5" height="4.5" rx="0.5" />
      <rect x="11.5" y="5.7" width="4.5" height="4.5" rx="0.5" />
      <rect x="0" y="11.5" width="4.5" height="4.5" rx="0.5" />
      <rect x="5.7" y="11.5" width="4.5" height="4.5" rx="0.5" />
      <rect x="11.5" y="11.5" width="4.5" height="4.5" rx="0.5" />
    </svg>
  );
}

function IconGrid2() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <rect x="0" y="0" width="6.5" height="6.5" rx="0.5" />
      <rect x="9.5" y="0" width="6.5" height="6.5" rx="0.5" />
      <rect x="0" y="9.5" width="6.5" height="6.5" rx="0.5" />
      <rect x="9.5" y="9.5" width="6.5" height="6.5" rx="0.5" />
    </svg>
  );
}

function IconList() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <rect x="0" y="1" width="16" height="2.5" rx="0.5" />
      <rect x="0" y="6.7" width="16" height="2.5" rx="0.5" />
      <rect x="0" y="12.5" width="16" height="2.5" rx="0.5" />
    </svg>
  );
}

interface BlogContentProps {
  posts: BlogPost[];
}

export function BlogContent({ posts }: BlogContentProps) {
  const [activeTab, setActiveTab] = useState<Tab>("all");
  const [gridCols, setGridCols] = useState<GridCols>(3);
  const [visible, setVisible] = useState(INITIAL_COUNT);

  const filtered = activeTab === "featured" ? posts.slice(0, 3) : posts;
  const shown = filtered.slice(0, visible);
  const hasMore = visible < filtered.length;

  function handleTabChange(tab: Tab) {
    setActiveTab(tab);
    setVisible(INITIAL_COUNT);
  }

  const iconClass = (cols: GridCols) =>
    `p-1.5 rounded cursor-pointer transition-colors ${
      gridCols === cols ? "text-primary" : "text-[#C1C4C9] hover:text-primary"
    }`;

  const gridClass: Record<GridCols, string> = {
    1: "grid grid-cols-1 gap-8",
    2: "grid grid-cols-2 gap-8",
    3: "grid grid-cols-1 md:grid-cols-3 gap-8",
    4: "grid grid-cols-2 lg:grid-cols-4 gap-6",
  };

  return (
    <div>
      {/* Toolbar: tabs + sort + grid toggles */}
      <div className="flex items-center gap-6 border-b border-border mb-8">
        {/* Desktop tabs */}
        <div className="hidden md:flex items-center gap-6">
          {(["all", "featured"] as Tab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={`pb-3 text-sm font-medium capitalize transition-colors cursor-pointer border-b-2 -mb-px ${
                activeTab === tab
                  ? "border-primary text-primary"
                  : "border-transparent text-muted hover:text-primary"
              }`}
            >
              {tab === "all" ? "All Blog" : "Featured"}
            </button>
          ))}
        </div>

        {/* Mobile tab select */}
        <div className="md:hidden">
          <select
            value={activeTab}
            onChange={(e) => handleTabChange(e.target.value as Tab)}
            className="text-sm font-medium text-primary bg-transparent border border-border rounded px-3 py-1.5 cursor-pointer outline-none"
          >
            <option value="all">All Blog</option>
            <option value="featured">Featured</option>
          </select>
        </div>

        <div className="flex-1" />

        {/* Sort by (desktop) */}
        <div className="hidden md:flex items-center gap-1 text-sm text-primary">
          <span>Sort by</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="text-muted">
            <path d="m6 9 6 6 6-6" />
          </svg>
        </div>

        {/* Grid view toggles (desktop) */}
        <div className="hidden md:flex items-center gap-0.5 border-l border-border pl-4">
          <button className={iconClass(4)} onClick={() => setGridCols(4)} aria-label="4 columns"><IconGrid4 /></button>
          <button className={iconClass(3)} onClick={() => setGridCols(3)} aria-label="3 columns"><IconGrid3 /></button>
          <button className={iconClass(2)} onClick={() => setGridCols(2)} aria-label="2 columns"><IconGrid2 /></button>
          <button className={iconClass(1)} onClick={() => setGridCols(1)} aria-label="List view"><IconList /></button>
        </div>
      </div>

      {/* Grid */}
      <div className={gridClass[gridCols]}>
        {shown.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>

      {/* Show more */}
      {hasMore && (
        <div className="flex justify-center mt-12">
          <button
            onClick={() => setVisible((v) => v + INCREMENT)}
            className="border border-primary text-primary px-12 py-3 rounded-full text-sm hover:bg-primary hover:text-white transition-colors cursor-pointer"
          >
            Show more
          </button>
        </div>
      )}
    </div>
  );
}
