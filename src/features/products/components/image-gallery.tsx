"use client";

import { useState } from "react";
import { SafeImage } from "@/components/ui/safe-image";
import { cn } from "@/lib/utils";

interface ImageGalleryProps {
  images: string[];
  name: string;
  isNew?: boolean;
  discountPercent?: number;
}

export function ImageGallery({ images, name, isNew, discountPercent }: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  function handlePrev() {
    setSelectedIndex((prev) => (prev - 1 + images.length) % images.length);
  }

  function handleNext() {
    setSelectedIndex((prev) => (prev + 1) % images.length);
  }

  return (
    <div>
      {/* Main image */}
      <div className="aspect-square rounded-2xl overflow-hidden relative bg-[#F3F5F7] group">
        <SafeImage
          src={images[selectedIndex]}
          alt={name}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover cursor-zoom-in group-hover:scale-105 transition-transform duration-500"
          fetchPriority="high"
        />

        {/* Badges */}
        <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
          {isNew && (
            <span className="bg-white text-[#1C1C1C] text-xs uppercase font-medium px-2.5 py-1 rounded">
              NEW
            </span>
          )}
          {discountPercent && discountPercent > 0 ? (
            <span className="bg-[#38CB89] text-white text-xs font-medium px-2.5 py-1 rounded">
              -{discountPercent}%
            </span>
          ) : null}
        </div>

        {/* Prev arrow */}
        <button
          onClick={handlePrev}
          aria-label="Previous image"
          className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white shadow flex items-center justify-center cursor-pointer hover:bg-[#F3F5F7] transition-colors z-10"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        {/* Next arrow */}
        <button
          onClick={handleNext}
          aria-label="Next image"
          className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white shadow flex items-center justify-center cursor-pointer hover:bg-[#F3F5F7] transition-colors z-10"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-3 mt-4">
          {images.map((src, index) => (
            <button
              key={src}
              onClick={() => setSelectedIndex(index)}
              className={cn(
                "w-20 h-20 rounded-lg overflow-hidden cursor-pointer relative bg-[#F3F5F7] transition-all shrink-0",
                selectedIndex === index
                  ? "ring-2 ring-[#1C1C1C]"
                  : "ring-1 ring-transparent hover:ring-[#E8ECEF]"
              )}
              aria-label={`View image ${index + 1}`}
            >
              <SafeImage
                src={src}
                alt={`${name} thumbnail ${index + 1}`}
                fill
                sizes="80px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
