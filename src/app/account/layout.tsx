import Link from "next/link";

import { auth } from "@/auth";
import { AccountSidebar } from "@/features/account/components/account-sidebar";

export default async function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <div className="px-5 lg:px-20 py-8 lg:py-12">
      {/* Mobile back link */}
      <Link
        href="/"
        className="lg:hidden flex items-center gap-1 text-sm text-subtle hover:text-ink transition-colors mb-4"
      >
        ‹ back
      </Link>

      <h1 className="text-4xl font-bold text-ink text-center mb-10">
        My Account
      </h1>

      <div className="lg:grid lg:grid-cols-[280px_1fr] lg:gap-14">
        <AccountSidebar name={session?.user?.name} />
        <div>{children}</div>
      </div>
    </div>
  );
}
