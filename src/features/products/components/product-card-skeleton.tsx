import { Skeleton } from "@/components/ui/skeleton";

// Matches ProductCard's shape — rounded-xl square image, then an unpadded
// pt-4 info block of stars / name / price — so no layout shift on swap.
export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col">
      <Skeleton className="aspect-square w-full rounded-xl bg-line" />
      <div className="pt-4">
        <Skeleton className="h-3 w-16 mb-1 bg-line" />
        <Skeleton className="h-5 w-4/5 bg-line" />
        <Skeleton className="h-6 w-20 mt-1.5 bg-line" />
      </div>
    </div>
  );
}
