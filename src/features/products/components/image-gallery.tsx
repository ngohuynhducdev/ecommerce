"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ImageGalleryProps {
  images: string[];
  name: string;
  isOnSale?: boolean;
}

export function ImageGallery({ images, name, isOnSale }: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div>
      <div className="aspect-square rounded-2xl overflow-hidden relative bg-[#FAFAFA] group">
        <Image
          src={images[selectedIndex]}
          alt={name}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover cursor-zoom-in group-hover:scale-105 transition-transform duration-500"
          priority
        />
        {isOnSale && (
          <span className="absolute top-4 left-4 bg-[#E97171] text-white text-xs px-2 py-0.5 rounded z-10">
            Sale
          </span>
        )}
      </div>

      {images.length > 1 && (
        <div className="flex gap-3 mt-4">
          {images.map((src, index) => (
            <button
              key={src}
              onClick={() => setSelectedIndex(index)}
              className={cn(
                "w-20 h-20 rounded-lg overflow-hidden cursor-pointer relative bg-[#FAFAFA] transition-all",
                selectedIndex === index
                  ? "ring-2 ring-[#1C1C1C]"
                  : "ring-1 ring-transparent hover:ring-[#E8ECEF]"
              )}
              aria-label={`View image ${index + 1}`}
            >
              <Image
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
