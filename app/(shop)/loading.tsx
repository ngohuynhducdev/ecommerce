export default function ShopLoading() {
  return (
    <div className="animate-pulse">
      {/* Hero banner skeleton */}
      <div className="w-full h-[70vh] bg-warm-100" />

      {/* Categories skeleton */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="h-8 w-48 bg-warm-200 rounded-lg mb-8" />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="aspect-[4/3] rounded-2xl bg-warm-100" />
          ))}
        </div>
      </section>

      {/* Products skeleton */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
        <div className="h-8 w-48 bg-warm-200 rounded-lg mb-8" />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="space-y-3">
              <div className="aspect-[4/5] rounded-2xl bg-warm-100" />
              <div className="h-4 w-3/4 bg-warm-200 rounded" />
              <div className="h-4 w-1/3 bg-warm-200 rounded" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
