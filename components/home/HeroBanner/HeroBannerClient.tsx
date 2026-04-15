"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { BannerItem } from "@/lib/api/banners";

const FALLBACK_BANNERS = [
  {
    id: 1,
    title: "Không gian sống đẳng cấp",
    subtitle:
      "Khám phá bộ sưu tập nội thất mới nhất — tinh tế, bền vững, hài hòa",
    ctaText: "Mua sắm ngay",
    ctaLink: "/products",
    image: null as null,
  },
  {
    id: 2,
    title: "Phong cách Scandinavian",
    subtitle:
      "Đơn giản nhưng sang trọng — thiết kế Bắc Âu cho ngôi nhà hiện đại",
    ctaText: "Khám phá",
    ctaLink: "/categories",
    image: null as null,
  },
];

interface HeroBannerClientProps {
  banners: BannerItem[];
}

function BannerSlide({
  banner,
  strapiUrl,
}: {
  banner: (typeof FALLBACK_BANNERS)[0] | BannerItem;
  strapiUrl: string;
}) {
  const isStrapiItem = "attributes" in banner;
  const title = isStrapiItem ? banner.attributes.title : banner.title;
  const subtitle = isStrapiItem ? banner.attributes.subtitle : banner.subtitle;
  const ctaText = isStrapiItem
    ? (banner.attributes.ctaText ?? "Mua sắm ngay")
    : banner.ctaText;
  const ctaLink = isStrapiItem
    ? (banner.attributes.ctaLink ?? "/products")
    : banner.ctaLink;
  const imageUrl = isStrapiItem
    ? banner.attributes.image?.data?.attributes?.url
      ? `${strapiUrl}${banner.attributes.image.data.attributes.url}`
      : null
    : null;

  return (
    <div className="relative w-full h-full">
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-warm-800 via-warm-700 to-warm-600" />
      )}
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30" />
      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-xl">
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-serif font-bold text-white leading-tight">
              {title}
            </h1>
            {subtitle && (
              <p className="mt-4 text-base sm:text-lg text-white/85 leading-relaxed">
                {subtitle}
              </p>
            )}
            {ctaLink && ctaText && (
              <Link
                href={ctaLink}
                className="mt-8 inline-block px-8 py-3 bg-earth-500 hover:bg-earth-600 text-white font-semibold rounded-lg transition-colors text-sm sm:text-base"
              >
                {ctaText}
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function HeroBannerClient({ banners }: HeroBannerClientProps) {
  const strapiUrl =
    process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337";
  const slides =
    banners.length > 0
      ? banners
      : (FALLBACK_BANNERS as unknown as BannerItem[]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  function prev() {
    setCurrent((c) => (c - 1 + slides.length) % slides.length);
  }

  function next() {
    setCurrent((c) => (c + 1) % slides.length);
  }

  return (
    <div className="relative w-full h-[60vh] sm:h-[70vh] lg:h-screen max-h-[800px] overflow-hidden">
      {slides.map((banner, i) => (
        <div
          key={banner.id}
          className={`absolute inset-0 transition-opacity duration-700 ${
            i === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <BannerSlide banner={banner} strapiUrl={strapiUrl} />
        </div>
      ))}

      {slides.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors"
            aria-label="Slide trước"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors"
            aria-label="Slide tiếp"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Dots */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === current ? "bg-white w-6" : "bg-white/50"
                }`}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
