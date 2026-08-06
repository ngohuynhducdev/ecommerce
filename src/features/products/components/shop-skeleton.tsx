import { Skeleton } from "@/components/ui/skeleton";
import { ProductCardSkeleton } from "./product-card-skeleton";

// Mirrors ShopContent's layout exactly — same gutters, same
// [240px_1fr] gap-14 grid, same toolbar heights — so the swap from skeleton to
// real content shifts nothing.
export function ShopContentSkeleton() {
  return (
    <div>
      {/* Mobile toolbar */}
      <div className="lg:hidden mb-6">
        <div className="flex items-center justify-between border-b border-line py-3">
          <Skeleton className="h-5 w-20 bg-line" />
          <Skeleton className="h-5 w-14 bg-line" />
        </div>
        <div className="flex items-center justify-between py-3">
          <Skeleton className="h-6 w-32 bg-line" />
          <Skeleton className="h-5 w-28 bg-line" />
        </div>
      </div>

      <div className="lg:grid lg:grid-cols-[240px_1fr] lg:gap-14">
        {/* Sidebar (desktop) — Filter heading + Categories + Price */}
        <div className="hidden lg:block">
          <div className="flex items-center gap-2 mb-8">
            <Skeleton className="h-4 w-4 bg-line" />
            <Skeleton className="h-5 w-14 bg-line" />
          </div>
          <div className="space-y-8">
            <div>
              <Skeleton className="h-4 w-24 mb-4 bg-line" />
              <div className="space-y-3">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Skeleton key={i} className="h-4 w-28 bg-line" />
                ))}
              </div>
            </div>
            <div>
              <Skeleton className="h-4 w-14 mb-4 bg-line" />
              <div className="space-y-3">
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <Skeleton key={i} className="h-4 w-32 bg-line" />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Product area */}
        <div>
          {/* Desktop toolbar */}
          <div className="hidden lg:flex items-center justify-between mb-8">
            <Skeleton className="h-6 w-32 bg-line" />
            <div className="flex items-center gap-6">
              <Skeleton className="h-5 w-28 bg-line" />
              <Skeleton className="h-5 w-24 bg-line" />
            </div>
          </div>

          {/* Grid — ShopProductGrid's default 3-col shape, 9 initial cards */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
            {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Route-level fallback for app/shop/loading.tsx — the hero block plus the same
// content skeleton the streaming boundary uses.
export function ShopSkeleton() {
  return (
    <div>
      <div className="px-5 lg:px-20 pt-6">
        <Skeleton className="h-64 lg:h-80 w-full rounded-none bg-line" />
      </div>
      <div className="px-5 lg:px-20 py-10">
        <ShopContentSkeleton />
      </div>
    </div>
  );
}
