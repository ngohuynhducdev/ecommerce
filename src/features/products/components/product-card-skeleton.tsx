import { Skeleton } from "@/components/ui/skeleton";

export function ProductCardSkeleton() {
  return (
    <div className="rounded-xl overflow-hidden bg-[#FAFAFA]">
      <Skeleton className="aspect-square w-full rounded-none bg-[#E8ECEF]" />
      <div className="p-4 space-y-2">
        <Skeleton className="h-3 w-1/3 bg-[#E8ECEF]" />
        <Skeleton className="h-4 w-2/3 bg-[#E8ECEF]" />
        <Skeleton className="h-4 w-1/2 bg-[#E8ECEF]" />
      </div>
    </div>
  );
}
