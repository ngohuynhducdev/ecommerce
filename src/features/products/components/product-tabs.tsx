"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import type { Product } from "@/features/products/types";
import { cn } from "@/lib/utils";

interface ProductTabsProps {
  product: Product;
}

function StarIcon({ filled, size = 14 }: { filled: boolean; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? "#FFC700" : "#E8ECEF"}
      stroke={filled ? "#FFC700" : "#E8ECEF"}
      strokeWidth={1}
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

const MOCK_REVIEWS = [
  {
    id: "rev-1",
    author: "Sarah M.",
    rating: 5,
    date: "March 12, 2024",
    comment:
      "Beautifully made and even better in person. The finish is flawless and the build quality feels premium. Arrived ahead of schedule.",
  },
  {
    id: "rev-2",
    author: "James L.",
    rating: 4,
    date: "February 28, 2024",
    comment:
      "Great value for the price. Assembly was simple and the design fits perfectly in our living room. Would buy again.",
  },
  {
    id: "rev-3",
    author: "Priya K.",
    rating: 5,
    date: "February 14, 2024",
    comment:
      "Elegant and incredibly comfortable. The colour matches the photos exactly. Very happy with this purchase.",
  },
];

const STAR_DISTRIBUTION = [
  { stars: 5, percent: 72 },
  { stars: 4, percent: 18 },
  { stars: 3, percent: 6 },
  { stars: 2, percent: 3 },
  { stars: 1, percent: 1 },
];

export function ProductTabs({ product }: ProductTabsProps) {
  const specRow = (label: string, value: string) => (
    <tr className="border-b border-[#E8ECEF]">
      <td className="py-3 pr-6 text-sm text-[#807D7E] w-40">{label}</td>
      <td className="py-3 text-sm text-[#1C1C1C]">{value}</td>
    </tr>
  );

  return (
    <section id="reviews" className="mt-20">
      <Tabs defaultValue="description">
        <TabsList className="bg-transparent p-0 gap-6 h-auto border-b border-[#E8ECEF] rounded-none w-full justify-start">
          <TabsTrigger
            value="description"
            className="rounded-none px-0 pb-3 text-sm data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-[#1C1C1C] data-[state=active]:text-[#1C1C1C] data-[state=inactive]:text-[#807D7E] shadow-none"
          >
            Description
          </TabsTrigger>
          <TabsTrigger
            value="additional"
            className="rounded-none px-0 pb-3 text-sm data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-[#1C1C1C] data-[state=active]:text-[#1C1C1C] data-[state=inactive]:text-[#807D7E] shadow-none"
          >
            Additional Info
          </TabsTrigger>
          <TabsTrigger
            value="reviews"
            className="rounded-none px-0 pb-3 text-sm data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-[#1C1C1C] data-[state=active]:text-[#1C1C1C] data-[state=inactive]:text-[#807D7E] shadow-none"
          >
            Reviews ({product.reviewCount})
          </TabsTrigger>
        </TabsList>

        {/* Description */}
        <TabsContent value="description" className="pt-8">
          <div className="max-w-3xl space-y-4">
            <p className="text-[#807D7E] leading-relaxed">{product.description}</p>
            <p className="text-[#807D7E] leading-relaxed">
              Crafted with care, this piece is designed to bring both comfort
              and character to any room. Thoughtful details and lasting
              materials mean it ages beautifully over time.
            </p>
            <ul className="list-disc pl-6 space-y-2 text-[#807D7E] text-sm mt-6">
              <li>Premium materials tested for everyday use</li>
              <li>Responsibly sourced from certified suppliers</li>
              <li>Easy assembly — tools and instructions included</li>
              <li>Backed by our 90-day return promise</li>
            </ul>
          </div>
        </TabsContent>

        {/* Additional Info */}
        <TabsContent value="additional" className="pt-8">
          <div className="max-w-2xl">
            <table className="w-full">
              <tbody>
                {specRow("Width", "82 in")}
                {specRow("Height", "34 in")}
                {specRow("Depth", "36 in")}
                {specRow("Weight", "94 lbs")}
                {specRow("Material", product.tags.join(", "))}
                {specRow("Care", "Spot clean with mild detergent")}
              </tbody>
            </table>
          </div>
        </TabsContent>

        {/* Reviews */}
        <TabsContent value="reviews" className="pt-8">
          <div className="grid lg:grid-cols-[280px_1fr] gap-12">
            {/* Summary */}
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-semibold text-[#1C1C1C]">
                  {product.rating.toFixed(1)}
                </span>
                <span className="text-sm text-[#807D7E]">/ 5</span>
              </div>
              <div className="flex gap-1 mt-2">
                {[1, 2, 3, 4, 5].map((s) => (
                  <StarIcon key={s} filled={s <= Math.round(product.rating)} size={16} />
                ))}
              </div>
              <p className="text-sm text-[#807D7E] mt-1">
                Based on {product.reviewCount} reviews
              </p>

              <div className="mt-6 space-y-2">
                {STAR_DISTRIBUTION.map((row) => (
                  <div key={row.stars} className="flex items-center gap-2">
                    <span className="text-xs text-[#807D7E] w-4">
                      {row.stars}
                    </span>
                    <StarIcon filled size={12} />
                    <div className="flex-1 h-1.5 bg-[#E8ECEF] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#FFC700]"
                        style={{ width: `${row.percent}%` }}
                      />
                    </div>
                    <span className="text-xs text-[#807D7E] w-8 text-right">
                      {row.percent}%
                    </span>
                  </div>
                ))}
              </div>

              <button className="w-full mt-6 h-11 bg-[#1C1C1C] text-white text-sm rounded-sm hover:bg-[#333] transition-colors cursor-pointer">
                Write Review
              </button>
            </div>

            {/* Reviews list */}
            <div className="space-y-6">
              {MOCK_REVIEWS.map((review, index) => (
                <div
                  key={review.id}
                  className={cn(
                    "pb-6",
                    index < MOCK_REVIEWS.length - 1 &&
                      "border-b border-[#E8ECEF]"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-[#1C1C1C]">{review.author}</p>
                    <span className="text-xs text-[#807D7E]">{review.date}</span>
                  </div>
                  <div className="flex gap-0.5 mt-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <StarIcon key={s} filled={s <= review.rating} size={12} />
                    ))}
                  </div>
                  <p className="text-sm text-[#807D7E] leading-relaxed mt-3">
                    {review.comment}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </section>
  );
}
