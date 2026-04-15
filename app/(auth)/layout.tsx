import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-warm-50 flex flex-col">
      <div className="flex justify-center py-8">
        <Link href="/" className="text-2xl font-serif font-bold text-warm-800">
          Home Interior
        </Link>
      </div>
      <div className="flex-1 flex items-center justify-center px-4 pb-16">
        {children}
      </div>
    </div>
  );
}
