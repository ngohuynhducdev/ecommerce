export default function ProductDetailLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 animate-pulse">
      {/* Breadcrumb */}
      <div className="flex gap-2 mb-8">
        <div className="h-4 w-12 bg-warm-200 rounded" />
        <div className="h-4 w-3 bg-warm-200 rounded" />
        <div className="h-4 w-24 bg-warm-200 rounded" />
        <div className="h-4 w-3 bg-warm-200 rounded" />
        <div className="h-4 w-32 bg-warm-200 rounded" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Gallery skeleton */}
        <div className="space-y-3">
          <div className="aspect-square w-full rounded-2xl bg-warm-100" />
          <div className="flex gap-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="w-16 h-16 rounded-xl bg-warm-100 flex-shrink-0"
              />
            ))}
          </div>
        </div>

        {/* Details skeleton */}
        <div className="space-y-5">
          <div className="h-8 w-2/3 bg-warm-200 rounded-lg" />
          <div className="h-6 w-1/3 bg-warm-200 rounded-lg" />
          <div className="h-4 w-full bg-warm-100 rounded" />
          <div className="h-4 w-5/6 bg-warm-100 rounded" />
          <div className="h-4 w-4/6 bg-warm-100 rounded" />
          <div className="flex gap-3 pt-4">
            <div className="h-8 w-8 rounded-full bg-warm-100" />
            <div className="h-8 w-8 rounded-full bg-warm-100" />
            <div className="h-8 w-8 rounded-full bg-warm-100" />
          </div>
          <div className="flex gap-3 pt-2">
            <div className="h-12 w-36 bg-warm-200 rounded-xl" />
            <div className="h-12 flex-1 bg-warm-800/20 rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
