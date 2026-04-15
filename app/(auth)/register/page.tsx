import type { Metadata } from "next";
import { RegisterForm } from "@/components/auth/RegisterForm";

export const metadata: Metadata = {
  title: "Tạo tài khoản | Home Interior",
};

export default function RegisterPage() {
  return (
    <div className="w-full max-w-sm">
      <div className="bg-white rounded-2xl shadow-sm border border-warm-100 p-8">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-serif font-bold text-warm-800">
            Tạo tài khoản
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Tham gia cùng hàng nghìn khách hàng của chúng tôi
          </p>
        </div>
        <RegisterForm />
      </div>
    </div>
  );
}
