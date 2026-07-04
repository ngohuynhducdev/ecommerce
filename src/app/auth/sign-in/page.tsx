"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signIn } from "next-auth/react";
import { toast } from "sonner";

const schema = z.object({
  email: z.string().min(1, "Please enter your username or email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  rememberMe: z.boolean().optional(),
});

type FormData = z.infer<typeof schema>;

function EyeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}

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
    <div className="min-h-screen flex flex-col lg:grid lg:grid-cols-2">
      {/* Left / Top — Gray image panel */}
      <div className="bg-[#F3F5F7] flex flex-col min-h-72 lg:min-h-screen">
        {/* Logo */}
        <div className="px-8 pt-8 lg:px-10 flex justify-center">
          <Link
            href="/"
            className="font-semibold text-xl tracking-tight text-[#1C1C1C] select-none"
          >
            3legant<span className="text-[#B88E2F]">.</span>
          </Link>
        </div>

        {/* Chair image */}
        <div className="flex-1 flex items-center justify-center px-8 py-8 lg:py-16">
          <div className="relative w-full max-w-sm lg:max-w-lg aspect-square">
            <Image
              src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=800&fit=crop&auto=format&q=80"
              alt="Elegant furniture"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-contain"
              fetchPriority="high"
            />
          </div>
        </div>
      </div>

      {/* Right / Bottom — White form panel */}
      <div className="bg-white flex items-center justify-center px-8 py-16 lg:min-h-screen">
        <div className="w-full max-w-sm">
          <h1 className="text-4xl font-bold text-[#1C1C1C]">Sign In</h1>
          <p className="text-sm text-[#807D7E] mt-3 mb-10">
            Don&apos;t have an account yet?{" "}
            <Link
              href="/auth/sign-up"
              className="text-[#2EC1AC] font-medium hover:underline"
            >
              Sign Up
            </Link>
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Email / username */}
            <div>
              <input
                {...register("email")}
                placeholder="Your username or email address"
                autoComplete="email"
                className="w-full border-0 border-b border-[#E8ECEF] bg-transparent pb-3 text-sm outline-none focus:border-[#1C1C1C] transition-colors placeholder:text-[#807D7E]"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <div className="relative">
                <input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  autoComplete="current-password"
                  className="w-full border-0 border-b border-[#E8ECEF] bg-transparent pb-3 pr-8 text-sm outline-none focus:border-[#1C1C1C] transition-colors placeholder:text-[#807D7E]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-0 top-0 text-[#807D7E] hover:text-[#1C1C1C] transition-colors cursor-pointer"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
              )}
            </div>

            {/* Remember me + Forgot password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  {...register("rememberMe")}
                  type="checkbox"
                  className="w-4 h-4 border border-[#E8ECEF] rounded-sm accent-[#1C1C1C] cursor-pointer"
                />
                <span className="text-sm text-[#807D7E]">Remember me</span>
              </label>
              <a
                href="#"
                className="text-sm font-bold text-[#1C1C1C] hover:text-[#B88E2F] transition-colors"
              >
                Forgot password?
              </a>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-14 bg-[#1C1C1C] text-white rounded-lg text-sm font-medium hover:bg-[#B88E2F] transition-colors disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
            >
              {loading ? "Signing in…" : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F3F5F7]" />}>
      <SignInForm />
    </Suspense>
  );
}
