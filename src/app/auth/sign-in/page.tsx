"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signIn } from "next-auth/react";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormData = z.infer<typeof schema>;

function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/";
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });
    setLoading(false);

    if (result?.error) {
      toast.error("Invalid email or password");
    } else {
      router.push(callbackUrl);
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen lg:grid lg:grid-cols-2">
      {/* Left: Form */}
      <div className="relative flex items-center justify-center px-8 py-20 bg-white min-h-screen lg:min-h-0">
        <Link
          href="/"
          className="absolute top-8 left-8 font-semibold text-xl tracking-tight text-[#1C1C1C] select-none"
        >
          3legant<span style={{ color: "#B88E2F" }}>°</span>
        </Link>

        <div className="w-full max-w-sm">
          <h1 className="text-2xl font-semibold">Sign In</h1>
          <p className="text-[#807D7E] text-sm mt-1 mb-8">
            Welcome back! Enter your details to continue.
          </p>

          {/* Google placeholder */}
          <button
            type="button"
            className="border border-[#E8ECEF] rounded-lg w-full h-12 flex items-center gap-3 justify-center text-sm text-[#1C1C1C] hover:bg-[#F3F5F7] transition-colors mb-4"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
              <path
                d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908C16.658 14.215 17.64 11.907 17.64 9.2z"
                fill="#4285F4"
              />
              <path
                d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.26c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z"
                fill="#34A853"
              />
              <path
                d="M3.964 10.709c-.18-.54-.282-1.117-.282-1.71 0-.595.102-1.17.282-1.71V4.957H.957A9.003 9.003 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.333z"
                fill="#FBBC05"
              />
              <path
                d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.957L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"
                fill="#EA4335"
              />
            </svg>
            Continue with Google
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 h-px bg-[#E8ECEF]" />
            <span className="text-xs text-[#807D7E]">or continue with email</span>
            <div className="flex-1 h-px bg-[#E8ECEF]" />
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <input
                {...register("email")}
                type="email"
                placeholder="Email address"
                autoComplete="email"
                className="w-full h-12 border border-[#E8ECEF] rounded-lg px-4 text-sm outline-none focus:border-[#1C1C1C] transition-colors placeholder:text-[#807D7E]"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <div className="relative">
                <input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  autoComplete="current-password"
                  className="w-full h-12 border border-[#E8ECEF] rounded-lg px-4 pr-12 text-sm outline-none focus:border-[#1C1C1C] transition-colors placeholder:text-[#807D7E]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#807D7E] hover:text-[#1C1C1C] transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="text-right">
              <a
                href="#"
                className="text-sm text-[#807D7E] hover:text-[#1C1C1C] transition-colors"
              >
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-[#1C1C1C] text-white rounded-sm text-sm font-medium hover:bg-[#2d2d2d] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Signing in…" : "Sign In"}
            </button>
          </form>

          <p className="text-center text-sm mt-4 text-[#807D7E]">
            Don&apos;t have an account?{" "}
            <Link
              href="/auth/sign-up"
              className="text-[#1C1C1C] font-medium hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>

      {/* Right: Image */}
      <div className="hidden lg:block relative">
        <Image
          src="https://picsum.photos/seed/interior-signin/800/1200"
          alt="Elegant interior"
          fill
          className="object-cover"
          sizes="50vw"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 p-12 text-white">
          <p className="text-2xl font-semibold leading-snug">
            &ldquo;Experience the art of furnishing your space&rdquo;
          </p>
          <p className="text-sm mt-2 text-white/70">3legant — Modern Furniture</p>
        </div>
      </div>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <SignInForm />
    </Suspense>
  );
}
