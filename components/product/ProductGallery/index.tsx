"use client";

import Image from "next/image";
import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

interface ImageData {
  url: string;
  alternativeText: string;
  width: number;
  height: number;
}

interface ProductGalleryProps {
  images: { id: number; attributes: ImageData }[];
  strapiUrl: string;
}

export function ProductGallery({ images, strapiUrl }: ProductGalleryProps) {
  const [selected, setSelected] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  if (images.length === 0) {
    return <div className="aspect-square rounded-2xl bg-warm-200" />;
  }

  const current = images[selected];
  const src = `${strapiUrl}${current.attributes.url}`;

  function prev() {
    setSelected((s) => (s - 1 + images.length) % images.length);
  }

  function next() {
    setSelected((s) => (s + 1) % images.length);
  }

  return (
    <div className="flex flex-col gap-3">
      {/* Main image */}
      <div
        className="relative aspect-square rounded-2xl overflow-hidden bg-warm-100 cursor-zoom-in group"
        onClick={() => setLightboxOpen(true)}
      >
        <Image
          src={src}
          alt={current.attributes.alternativeText || "Product image"}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />
        <button className="absolute top-3 right-3 p-2 rounded-full bg-white/70 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
          <ZoomIn className="w-4 h-4 text-warm-700" />
        </button>
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors shadow-sm"
              aria-label="Ảnh trước"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors shadow-sm"
              aria-label="Ảnh sau"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnail strip */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((img, i) => (
            <button
              key={img.id}
              onClick={() => setSelected(i)}
              className={`relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-colors ${
                i === selected ? "border-earth-500" : "border-transparent"
              }`}
            >
              <Image
                src={`${strapiUrl}${img.attributes.url}`}
                alt={img.attributes.alternativeText || `Ảnh ${i + 1}`}
                fill
                sizes="64px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox */}
      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent className="max-w-3xl p-2 bg-black/95 border-0">
          <div className="relative aspect-square">
            <Image
              src={src}
              alt={current.attributes.alternativeText || "Product image"}
              fill
              sizes="80vw"
              className="object-contain"
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
