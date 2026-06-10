"use client";

import Link from "next/link";
import { useRef, useState, useCallback, useEffect } from "react";
import { ProductCard } from "@/features/products/components/product-card";
import type { Product } from "@/features/products/types";

interface OurProductsProps {
  products: Product[];
}

export function OurProducts({ products }: OurProductsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [progressPct, setProgressPct] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0);
  const dragScrollLeft = useRef(0);

  const updateProgress = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProgressPct(max > 0 ? ((el.scrollLeft + el.clientWidth) / el.scrollWidth) * 100 : 100);
  }, []);

  useEffect(() => {
    updateProgress();
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateProgress, { passive: true });
    return () => el.removeEventListener("scroll", updateProgress);
  }, [updateProgress]);

  // Convert vertical wheel to horizontal scroll (passive: false required for preventDefault)
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (e.deltaY === 0) return;
      e.preventDefault();
      el.scrollLeft += e.deltaY;
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  function handleMouseDown(e: React.MouseEvent<HTMLDivElement>) {
    const el = scrollRef.current;
    if (!el) return;
    setIsDragging(true);
    dragStartX.current = e.pageX - el.offsetLeft;
    dragScrollLeft.current = el.scrollLeft;
  }

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - dragStartX.current) * 1.5;
    scrollRef.current.scrollLeft = dragScrollLeft.current - walk;
  }

  function handleMouseUp() {
    setIsDragging(false);
  }

  return (
    <section className="py-20 px-8 lg:px-20">
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <h2 className="text-4xl lg:text-5xl font-bold text-primary leading-tight">
          New<br />Arrivals
        </h2>
        <Link
          href="/shop"
          className="hidden lg:inline-flex items-center gap-1 text-sm font-medium text-primary border-b border-primary pb-0.5 hover:text-accent hover:border-accent transition-colors self-end"
        >
          More Products →
        </Link>
      </div>

      {/* Carousel */}
      <div
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className={`flex items-start gap-5 overflow-x-auto [&::-webkit-scrollbar]:hidden select-none ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
        style={{ scrollbarWidth: "none" }}
      >
        {products.map((product) => (
          <div key={product.id} className={`flex-none w-60 lg:w-72 ${isDragging ? "pointer-events-none" : ""}`}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {/* Progress bar */}
      <div className="mt-6 h-0.5 bg-border rounded-full overflow-hidden">
        <div
          className="h-full bg-primary rounded-full transition-all duration-150"
          style={{ width: `${progressPct}%` }}
        />
      </div>

      {/* Mobile "More Products" link */}
      <div className="mt-6 flex justify-center lg:hidden">
        <Link
          href="/shop"
          className="inline-flex items-center gap-1 text-sm font-medium text-primary border-b border-primary pb-0.5 hover:text-accent hover:border-accent transition-colors"
        >
          More Products →
        </Link>
      </div>
    </section>
  );
}
