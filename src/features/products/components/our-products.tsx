"use client";

import Link from "next/link";
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ProductCard } from "@/features/products/components/product-card";
import type { Product } from "@/features/products/types";

const TABS = [
  { value: "all", label: "All" },
  { value: "living-room", label: "Living Room" },
  { value: "bedroom", label: "Bedroom" },
  { value: "dining", label: "Dining" },
  { value: "office", label: "Office" },
] as const;

interface OurProductsProps {
  products: Product[];
}

export function OurProducts({ products }: OurProductsProps) {
  const [tab, setTab] = useState("all");

  const visible = (
    tab === "all"
      ? products
      : products.filter((p) => p.category.slug === tab)
  ).slice(0, 8);

  return (
    <section className="py-20 px-8 lg:px-20">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-semibold text-[#1C1C1C]">Our Products</h2>
        <Link
          href="/shop"
          className="text-sm text-[#1C1C1C] hover:underline"
        >
          View More
        </Link>
      </div>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="bg-transparent p-0 gap-2 mb-8 flex-wrap h-auto">
          {TABS.map((t) => (
            <TabsTrigger
              key={t.value}
              value={t.value}
              className="rounded-sm px-4 py-2 text-sm data-[state=active]:bg-[#1C1C1C] data-[state=active]:text-white data-[state=inactive]:text-[#807D7E] data-[state=inactive]:bg-transparent border border-[#E8ECEF] data-[state=active]:border-[#1C1C1C]"
            >
              {t.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {TABS.map((t) => (
          <TabsContent key={t.value} value={t.value} className="mt-0">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {visible.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
}
