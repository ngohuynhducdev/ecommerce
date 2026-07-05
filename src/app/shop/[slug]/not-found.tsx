import Link from "next/link";

export default function ProductNotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-8">
      <p className="text-8xl font-bold text-line leading-none select-none">404</p>
      <h1 className="text-2xl font-semibold mt-4">Product Not Found</h1>
      <p className="text-subtle mt-2 max-w-sm">
        This product doesn&apos;t exist or may have been removed.
      </p>
      <Link
        href="/shop"
        className="mt-8 h-11 px-6 bg-ink text-white text-sm font-medium rounded-sm flex items-center hover:bg-ink-hover transition-colors"
      >
        Browse Shop
      </Link>
    </div>
  );
}
