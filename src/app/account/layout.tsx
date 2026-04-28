import { auth } from "@/auth";
import { AccountSidebar } from "@/features/account/components/account-sidebar";

export default async function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <div className="lg:grid lg:grid-cols-[260px_1fr] gap-10 px-8 lg:px-20 py-12">
      <AccountSidebar
        name={session?.user?.name}
        email={session?.user?.email}
      />
      <div>{children}</div>
    </div>
  );
}
