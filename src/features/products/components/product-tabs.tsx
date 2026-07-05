"use client";

import Image from "next/image";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import type { Product } from "@/features/products/types";

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
  { id: "r1", author: "Sofia Harvetz", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=50&h=50&fit=crop&auto=format&q=80", rating: 5, comment: 'I bought it 3 weeks ago and now come back just to say "Awesome Product". I really enjoy it. At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupt et quas molestias excepturi sint non provident.' },
  { id: "r2", author: "Nicolas Jensen", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&auto=format&q=80", rating: 5, comment: 'I bought it 3 weeks ago and now come back just to say "Awesome Product". I really enjoy it. At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupt et quas molestias excepturi sint non provident.' },
  { id: "r3", author: "Emma Carter", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop&auto=format&q=80", rating: 5, comment: 'I bought it 3 weeks ago and now come back just to say "Awesome Product". I really enjoy it. At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupt et quas molestias excepturi sint non provident.' },
  { id: "r4", author: "Daniel Park", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop&auto=format&q=80", rating: 5, comment: 'I bought it 3 weeks ago and now come back just to say "Awesome Product". I really enjoy it. At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupt et quas molestias excepturi sint non provident.' },
  { id: "r5", author: "Olivia Chen", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&auto=format&q=80", rating: 5, comment: 'I bought it 3 weeks ago and now come back just to say "Awesome Product". I really enjoy it. At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupt et quas molestias excepturi sint non provident.' },
];

const triggerClass =
  "rounded-none px-0 pb-3 text-sm data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-ink data-[state=active]:text-ink data-[state=inactive]:text-subtle shadow-none";

export function ProductTabs({ product }: ProductTabsProps) {
  const specRow = (label: string, value: string) => (
    <tr className="border-b border-line">
      <td className="py-3 pr-6 text-sm text-subtle w-40">{label}</td>
      <td className="py-3 text-sm text-ink">{value}</td>
    </tr>
  );

  return (
    <section id="reviews" className="mt-20">
      <Tabs defaultValue="reviews">
        <TabsList className="bg-transparent p-0 gap-6 h-auto border-b border-line rounded-none w-full justify-start">
          <TabsTrigger value="additional" className={triggerClass}>
            Additional Info
          </TabsTrigger>
          <TabsTrigger value="questions" className={triggerClass}>
            Questions
          </TabsTrigger>
          <TabsTrigger value="reviews" className={triggerClass}>
            Reviews ({product.reviewCount})
          </TabsTrigger>
        </TabsList>

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

        {/* Questions */}
        <TabsContent value="questions">
          <p className="text-subtle text-sm pt-8">No questions yet. Be the first to ask!</p>
        </TabsContent>

        {/* Reviews */}
        <TabsContent value="reviews">
          <div className="pt-8">
            {/* Heading */}
            <h2 className="text-2xl font-semibold text-ink mb-2">Customer Reviews</h2>

            {/* Overall rating row */}
            <div className="flex items-center gap-3 mb-1">
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <StarIcon key={s} filled={s <= Math.round(product.rating)} size={16} />
                ))}
              </div>
              <span className="text-sm text-subtle">{product.reviewCount} Reviews</span>
            </div>
            <p className="text-sm text-subtle mb-6">{product.name}</p>

            {/* Input + emoji + Write Review */}
            <div className="flex items-center gap-3 mb-4">
              <div className="flex-1 border border-line rounded-lg px-4 h-11 flex items-center">
                <input
                  type="text"
                  placeholder="Share your thoughts"
                  className="flex-1 text-sm outline-none bg-transparent placeholder:text-subtle"
                />
              </div>
              {/* Emoji row */}
              <div className="hidden sm:flex items-center gap-1.5 bg-white border border-line rounded-full px-3 py-1.5">
                {["❤️", "😍", "😊", "😮", "😤", "😱"].map((e) => (
                  <button key={e} className="text-lg leading-none cursor-pointer">
                    {e}
                  </button>
                ))}
              </div>
              <button className="h-11 px-5 bg-ink text-white text-sm rounded-lg hover:bg-gold transition-colors cursor-pointer whitespace-nowrap">
                Write Review
              </button>
            </div>

            {/* Review count + sort */}
            <div className="flex items-center justify-between py-4 border-y border-line mb-6">
              <span className="text-sm font-semibold text-ink">{product.reviewCount} Reviews</span>
              <select className="text-sm text-ink bg-transparent border-none outline-none cursor-pointer">
                <option>Newest</option>
                <option>Oldest</option>
                <option>Highest Rating</option>
                <option>Lowest Rating</option>
              </select>
            </div>

            {/* Review list */}
            <div className="space-y-8">
              {MOCK_REVIEWS.map((review) => (
                <div key={review.id} className="flex gap-4">
                  <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 relative bg-mist">
                    <Image
                      src={review.avatar}
                      alt={review.author}
                      fill
                      sizes="40px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-ink text-sm">{review.author}</p>
                    <div className="flex gap-0.5 mt-1">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <StarIcon key={s} filled={s <= review.rating} size={12} />
                      ))}
                    </div>
                    <p className="text-sm text-subtle leading-relaxed mt-2">{review.comment}</p>
                    <div className="flex items-center gap-4 mt-3">
                      <button className="text-xs text-subtle hover:text-ink cursor-pointer">
                        Like
                      </button>
                      <button className="text-xs text-subtle hover:text-ink cursor-pointer">
                        Reply
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Load more */}
            <div className="flex justify-center mt-10">
              <button className="border border-ink text-ink px-12 py-3 rounded-full text-sm hover:bg-ink hover:text-white transition-colors cursor-pointer">
                Load more
              </button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </section>
  );
}
