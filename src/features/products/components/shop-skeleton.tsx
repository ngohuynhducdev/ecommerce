import { Skeleton } from "@/components/ui/skeleton";
import { ProductCardSkeleton } from "./product-card-skeleton";

export function ShopSkeleton() {
  return (
    <div className="px-8 lg:px-20 py-12">
      <Skeleton className="h-4 w-32 mb-8 bg-[#E8ECEF]" />
      <Skeleton className="h-9 w-20 mb-6 bg-[#E8ECEF]" />

      <div className="lg:grid lg:grid-cols-[280px_1fr] lg:gap-10">
        {/* Sidebar */}
        <div className="hidden lg:block space-y-8">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="h-5 w-28 bg-[#E8ECEF]" />
              <Skeleton className="h-4 w-full bg-[#E8ECEF]" />
              <Skeleton className="h-4 w-4/5 bg-[#E8ECEF]" />
              <Skeleton className="h-4 w-3/5 bg-[#E8ECEF]" />
            </div>
          ))}
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
