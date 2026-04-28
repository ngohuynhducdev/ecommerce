import { Skeleton } from "@/components/ui/skeleton";

export function ProductDetailSkeleton() {
  return (
    <div className="px-8 lg:px-20 py-12">
      <Skeleton className="h-4 w-56 mb-8 bg-[#E8ECEF]" />

      <div className="lg:grid lg:grid-cols-2 gap-16 items-start mt-8">
        {/* Gallery */}
        <div>
          <Skeleton className="aspect-square w-full rounded-2xl bg-[#E8ECEF]" />
          <div className="flex gap-3 mt-4">
            {[0, 1, 2, 3].map((i) => (
              <Skeleton key={i} className="w-16 h-16 rounded-lg shrink-0 bg-[#E8ECEF]" />
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="mt-10 lg:mt-0 space-y-4">
          <Skeleton className="h-4 w-28 bg-[#E8ECEF]" />
          <Skeleton className="h-9 w-3/4 bg-[#E8ECEF]" />
          <Skeleton className="h-7 w-1/3 bg-[#E8ECEF]" />
          <div className="space-y-2 pt-2">
            <Skeleton className="h-4 w-full bg-[#E8ECEF]" />
            <Skeleton className="h-4 w-full bg-[#E8ECEF]" />
            <Skeleton className="h-4 w-5/6 bg-[#E8ECEF]" />
          </div>
          <Skeleton className="h-12 w-full mt-2 bg-[#E8ECEF]" />
          <Skeleton className="h-11 w-full bg-[#E8ECEF]" />
        </div>
      </div>
    </div>
  );
}
