"use client";

import { useState, useCallback } from "react";
import Image from "next/image";

const slides = [
  {
    src: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1600&h=800&fit=crop&auto=format&q=80",
    alt: "Modern living room with sofa",
  },
  {
    src: "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=1600&h=800&fit=crop&auto=format&q=80",
    alt: "Elegant bedroom setup",
  },
  {
    src: "https://images.unsplash.com/photo-1577140917170-285929fb55b7?w=1600&h=800&fit=crop&auto=format&q=80",
    alt: "Dining room furniture",
  },
];

function ChevronLeft() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 18l-6-6 6-6" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}

export function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  const prev = useCallback(
    () => setCurrent((c) => (c - 1 + slides.length) % slides.length),
    [],
  );
  const next = useCallback(
    () => setCurrent((c) => (c + 1) % slides.length),
    [],
  );

  return (
    <div className="px-5 lg:px-20 pt-6">
      <div className="relative w-full h-[45vh] md:h-[62vh] overflow-hidden bg-[#F3F5F7]">
        {slides.map((slide, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-700 ${
              i === current ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              sizes="(max-width: 1024px) 100vw, calc(100vw - 10rem)"
              className="object-cover"
              fetchPriority={i === 0 ? "high" : "auto"}
            />
          </div>
        ))}

        {/* Prev */}
        <button
          onClick={prev}
          aria-label="Previous slide"
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-11 h-11 bg-white rounded-full flex items-center justify-center shadow-md hover:scale-105 transition-transform z-10"
        >
          <ChevronLeft />
        </button>

        {/* Next */}
        <button
          onClick={next}
          aria-label="Next slide"
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-11 h-11 bg-white rounded-full flex items-center justify-center shadow-md hover:scale-105 transition-transform z-10"
        >
          <ChevronRight />
        </button>

        {/* Dots */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === current ? "w-8 bg-white" : "w-2 bg-white/50 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
