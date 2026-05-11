"use client";

import { useState } from "react";
import { ProductCard } from "@/features/products/components/product-card";
import type { Product } from "@/features/products/types";

const INITIAL_COUNT = 9;
const INCREMENT = 6;

interface ShopProductGridProps {
  products: Product[];
  gridCols?: 1 | 2 | 3 | 4;
}

export function ShopProductGrid({ products, gridCols = 3 }: ShopProductGridProps) {
  const [visible, setVisible] = useState(INITIAL_COUNT);
  const [prevProducts, setPrevProducts] = useState<Product[]>(products);

  if (prevProducts !== products) {
    setPrevProducts(products);
    setVisible(INITIAL_COUNT);
  }

  if (products.length === 0) {
    return (
      <div className="py-16 text-center border border-dashed border-[#E8ECEF] rounded-lg">
        <p className="text-[#1C1C1C] font-medium">No products found</p>
        <p className="text-sm text-[#807D7E] mt-1">
          Try adjusting your filters to see more results.
        </p>
      </div>
    );
  }

  const shown = products.slice(0, visible);
  const hasMore = visible < products.length;

  const gridClass = {
    1: "grid grid-cols-1 gap-6",
    2: "grid grid-cols-2 gap-6",
    3: "grid grid-cols-2 lg:grid-cols-3 gap-6",
    4: "grid grid-cols-2 lg:grid-cols-4 gap-4",
  }[gridCols];

  return (
    <div>
      <div className={gridClass}>
        {shown.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {hasMore && (
        <div className="flex justify-center mt-12">
          <button
            onClick={() => setVisible((v) => v + INCREMENT)}
            className="border border-[#1C1C1C] text-[#1C1C1C] px-12 py-3 rounded-full text-sm hover:bg-[#1C1C1C] hover:text-white transition-colors cursor-pointer"
          >
            Show more
          </button>
        </div>
      )}
    </div>
  );
}
