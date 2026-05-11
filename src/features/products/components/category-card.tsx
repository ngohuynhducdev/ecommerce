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
      className="group relative flex h-full overflow-hidden rounded-2xl bg-[#F3F5F7]"
    >
      {/* Text — top left */}
      <div className="absolute top-6 left-6 z-10 md:top-8 md:left-8">
        <h3
          className={`font-semibold text-[#1C1C1C] leading-tight ${
            large ? "text-2xl md:text-3xl" : "text-xl md:text-2xl"
          }`}
        >
          {category.name}
        </h3>
        <span className="inline-flex items-center gap-1 mt-2 text-sm text-[#1C1C1C] border-b border-[#1C1C1C] pb-px group-hover:text-[#B88E2F] group-hover:border-[#B88E2F] transition-colors">
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
          className={`object-contain transition-transform duration-500 group-hover:scale-105 ${
            large
              ? "object-bottom px-6 pt-24 pb-4"
              : "object-bottom-right px-4 pt-20 pb-2"
          }`}
        />
      </div>
    </Link>
  );
}
