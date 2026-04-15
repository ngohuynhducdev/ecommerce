export default function ProductsLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 animate-pulse">
      {/* Header row */}
      <div className="flex items-center justify-between mb-6">
        <div className="h-8 w-40 bg-warm-200 rounded-lg" />
        <div className="h-9 w-36 bg-warm-200 rounded-xl" />
      </div>

      <div className="flex gap-6">
        {/* Filters sidebar skeleton */}
        <aside className="hidden lg:block w-64 flex-shrink-0 space-y-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="space-y-3">
              <div className="h-5 w-24 bg-warm-200 rounded" />
              <div className="h-8 w-full bg-warm-100 rounded-lg" />
              <div className="h-8 w-full bg-warm-100 rounded-lg" />
            </div>
          ))}
        </aside>

        {/* Grid */}
        <div className="flex-1 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="space-y-3">
              <div className="aspect-[4/5] rounded-2xl bg-warm-100" />
              <div className="h-4 w-3/4 bg-warm-200 rounded" />
              <div className="h-4 w-1/3 bg-warm-200 rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
