import { Skeleton } from "@/components/ui/skeleton";

function BlogCardSkeleton() {
  return (
    <div>
      <Skeleton className="aspect-video w-full rounded-xl bg-[#E8ECEF]" />
      <Skeleton className="h-3 w-24 mt-4 bg-[#E8ECEF]" />
      <Skeleton className="h-3 w-16 mt-1 bg-[#E8ECEF]" />
      <Skeleton className="h-5 w-4/5 mt-2 bg-[#E8ECEF]" />
      <Skeleton className="h-4 w-full mt-2 bg-[#E8ECEF]" />
      <Skeleton className="h-4 w-3/4 bg-[#E8ECEF]" />
      <Skeleton className="h-4 w-16 mt-3 bg-[#E8ECEF]" />
    </div>
  );
}

export default function BlogLoading() {
  return (
    <div className="px-8 lg:px-20 py-12">
      <Skeleton className="h-4 w-32 mb-8 bg-[#E8ECEF]" />

      {/* Featured post */}
      <div className="lg:flex gap-10 items-center mb-16">
        <Skeleton className="lg:w-1/2 aspect-video rounded-2xl shrink-0 bg-[#E8ECEF]" />
        <div className="mt-6 lg:mt-0 flex-1 space-y-4">
          <Skeleton className="h-5 w-24 bg-[#E8ECEF]" />
          <Skeleton className="h-8 w-full bg-[#E8ECEF]" />
          <Skeleton className="h-8 w-3/4 bg-[#E8ECEF]" />
          <Skeleton className="h-4 w-full bg-[#E8ECEF]" />
          <Skeleton className="h-4 w-5/6 bg-[#E8ECEF]" />
          <Skeleton className="h-4 w-32 bg-[#E8ECEF]" />
        </div>
      </div>

      <Skeleton className="h-7 w-40 mb-8 bg-[#E8ECEF]" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[0, 1, 2].map((i) => (
          <BlogCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
