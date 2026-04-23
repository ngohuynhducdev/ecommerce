import Image from "next/image";
import Link from "next/link";
import type { Category } from "@/features/products/types";

interface CategoryCardProps {
  category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link href={`/shop?category=${category.slug}`} className="group block">
      <div className="relative overflow-hidden rounded-xl aspect-square">
        <Image
          src={category.image}
          alt={category.name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <p className="text-center font-medium mt-4">{category.name}</p>
      <p className="text-sm text-[#807D7E] hover:text-[#1C1C1C] mt-1 text-center transition-colors">
        Explore
      </p>
    </Link>
  );
}
