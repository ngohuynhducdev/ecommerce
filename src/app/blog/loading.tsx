import { Skeleton } from "@/components/ui/skeleton";

function BlogCardSkeleton() {
  return (
    <div>
      <Skeleton className="aspect-video w-full rounded-xl bg-line" />
      <Skeleton className="h-3 w-24 mt-4 bg-line" />
      <Skeleton className="h-3 w-16 mt-1 bg-line" />
      <Skeleton className="h-5 w-4/5 mt-2 bg-line" />
      <Skeleton className="h-4 w-full mt-2 bg-line" />
      <Skeleton className="h-4 w-3/4 bg-line" />
      <Skeleton className="h-4 w-16 mt-3 bg-line" />
    </div>
  );
}

export default function BlogLoading() {
  return (
    <div className="px-8 lg:px-20 py-12">
      <Skeleton className="h-4 w-32 mb-8 bg-line" />

      {/* Featured post */}
      <div className="lg:flex gap-10 items-center mb-16">
        <Skeleton className="lg:w-1/2 aspect-video rounded-2xl shrink-0 bg-line" />
        <div className="mt-6 lg:mt-0 flex-1 space-y-4">
          <Skeleton className="h-5 w-24 bg-line" />
          <Skeleton className="h-8 w-full bg-line" />
          <Skeleton className="h-8 w-3/4 bg-line" />
          <Skeleton className="h-4 w-full bg-line" />
          <Skeleton className="h-4 w-5/6 bg-line" />
          <Skeleton className="h-4 w-32 bg-line" />
        </div>
      </div>

      <Skeleton className="h-7 w-40 mb-8 bg-line" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[0, 1, 2].map((i) => (
          <BlogCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
