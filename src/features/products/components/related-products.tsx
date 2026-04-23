import { ProductCard } from "@/features/products/components/product-card";
import type { Product } from "@/features/products/types";

interface RelatedProductsProps {
  products: Product[];
}

export function RelatedProducts({ products }: RelatedProductsProps) {
  if (products.length === 0) return null;

  return (
    <section className="mt-20">
      <h2 className="text-2xl font-semibold text-[#1C1C1C] mb-8">
        You Might Also Like
      </h2>
      <div className="flex gap-6 overflow-x-auto pb-4 -mx-8 lg:-mx-20 px-8 lg:px-20 snap-x snap-mandatory">
        {products.map((product) => (
          <div
            key={product.id}
            className="snap-start shrink-0 w-[260px] sm:w-[300px]"
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
}
