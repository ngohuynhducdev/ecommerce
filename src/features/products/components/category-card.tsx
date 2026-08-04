import { SafeImage } from "@/components/ui/safe-image";
import Link from "next/link";
import type { Category } from "@/features/products/types";

interface CategoryCardProps {
  category: Category;
  large?: boolean;
}

export function CategoryCard({ category, large = false }: CategoryCardProps) {
  return (
    <Link
      href={`/shop?category=${category.slug}`}
      className="group relative flex h-full overflow-hidden rounded-2xl bg-mist"
    >
      {/* Scrim — keeps the ink text readable over whatever photo the CMS serves */}
      <div className="absolute inset-0 z-[5] bg-gradient-to-br from-white/95 from-0% via-white/45 via-20% to-transparent to-45%" />

      {/* Text — top left */}
      <div className="absolute top-6 left-6 z-10 md:top-8 md:left-8">
        <h3
          className={`font-semibold text-ink leading-tight ${
            large ? "text-2xl md:text-3xl" : "text-xl md:text-2xl"
          }`}
        >
          {category.name}
        </h3>
        <span className="inline-flex items-center gap-1 mt-2 text-sm text-ink border-b border-ink pb-px group-hover:text-gold group-hover:border-gold transition-colors">
          Shop Now →
        </span>
      </div>

      {/* Product image */}
      <div className="relative w-full h-full">
        <SafeImage
          src={category.image}
          alt={category.name}
          fill
          sizes={
            large
              ? "(max-width: 768px) 100vw, 50vw"
              : "(max-width: 768px) 100vw, 25vw"
          }
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
    </Link>
  );
}
