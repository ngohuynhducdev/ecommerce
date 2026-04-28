import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-8">
      <p className="text-9xl font-bold text-[#E8ECEF] leading-none select-none">404</p>
      <h1 className="text-2xl font-semibold mt-4">Page Not Found</h1>
      <p className="text-[#807D7E] mt-2 max-w-sm">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-8 h-11 px-6 bg-[#1C1C1C] text-white text-sm font-medium rounded-sm flex items-center hover:bg-[#2d2d2d] transition-colors"
      >
        ← Back to Home
      </Link>
    </div>
  );
}
