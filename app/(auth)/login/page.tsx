import { Suspense } from "react";
import type { Metadata } from "next";
import { LoginForm } from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Đăng nhập | Home Interior",
};

export default function LoginPage() {
  return (
    <div className="w-full max-w-sm">
      <div className="bg-white rounded-2xl shadow-sm border border-warm-100 p-8">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-serif font-bold text-warm-800">
            Đăng nhập
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Chào mừng bạn trở lại!
          </p>
        </div>
        <Suspense fallback={null}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
