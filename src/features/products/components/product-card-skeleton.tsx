import { Skeleton } from "@/components/ui/skeleton";

export function ProductCardSkeleton() {
  return (
    <div className="rounded-xl overflow-hidden bg-cloud">
      <Skeleton className="aspect-square w-full rounded-none bg-line" />
      <div className="p-4 space-y-2">
        <Skeleton className="h-3 w-1/3 bg-line" />
        <Skeleton className="h-4 w-2/3 bg-line" />
        <Skeleton className="h-4 w-1/2 bg-line" />
      </div>
    </div>
  );
}
