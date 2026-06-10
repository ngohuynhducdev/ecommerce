"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signIn } from "next-auth/react";
import { toast } from "sonner";

const schema = z.object({
  name: z.string().min(1, "Please enter your name"),
  username: z.string().min(1, "Please enter a username"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  terms: z.boolean().refine((v) => v, "You must accept the terms"),
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

export default function SignUpPage() {
  const router = useRouter();
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
      toast.error("Something went wrong. Please try again.");
    } else {
      toast.success("Account created! Welcome to 3legant.");
      router.push("/");
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:grid lg:grid-cols-2">
      {/* Left / Top — Gray image panel */}
      <div className="bg-subtle flex flex-col min-h-72 lg:min-h-screen">
        {/* Logo */}
        <div className="px-8 pt-8 lg:px-10 flex lg:justify-start justify-center">
          <Link
            href="/"
            className="font-semibold text-xl tracking-tight text-primary select-none"
          >
            3legant<span className="text-accent">.</span>
          </Link>
        </div>

        {/* Chair image */}
        <div className="flex-1 flex items-center justify-center px-8 py-8 lg:py-16">
          <div className="relative w-full max-w-sm lg:max-w-lg aspect-square">
            <Image
              src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=800&fit=crop&auto=format&q=80"
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
          <h1 className="text-4xl font-bold text-primary">Sign up</h1>
          <p className="text-sm text-muted mt-3 mb-10">
            Already have an account?{" "}
            <Link
              href="/auth/sign-in"
              className="text-sale font-medium hover:underline"
            >
              Sign in
            </Link>
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Your name */}
            <div>
              <input
                {...register("name")}
                placeholder="Your name"
                autoComplete="name"
                className="w-full border-0 border-b border-border bg-transparent pb-3 text-sm outline-none focus:border-primary transition-colors placeholder:text-muted"
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
              )}
            </div>

            {/* Username */}
            <div>
              <input
                {...register("username")}
                placeholder="Username"
                autoComplete="username"
                className="w-full border-0 border-b border-border bg-transparent pb-3 text-sm outline-none focus:border-primary transition-colors placeholder:text-muted"
              />
              {errors.username && (
                <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>
              )}
            </div>

            {/* Email address */}
            <div>
              <input
                {...register("email")}
                type="email"
                placeholder="Email address"
                autoComplete="email"
                className="w-full border-0 border-b border-border bg-transparent pb-3 text-sm outline-none focus:border-primary transition-colors placeholder:text-muted"
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
                  autoComplete="new-password"
                  className="w-full border-0 border-b border-border bg-transparent pb-3 pr-8 text-sm outline-none focus:border-primary transition-colors placeholder:text-muted"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-0 top-0 text-muted hover:text-primary transition-colors cursor-pointer"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
              )}
            </div>

            {/* Terms */}
            <div>
              <label className="flex items-start gap-3 cursor-pointer select-none">
                <input
                  {...register("terms")}
                  type="checkbox"
                  className="mt-0.5 w-4 h-4 border border-border rounded-sm accent-primary cursor-pointer shrink-0"
                />
                <span className="text-sm text-muted leading-relaxed">
                  I agree with{" "}
                  <a href="#" className="font-bold text-primary hover:underline">
                    Privacy Policy
                  </a>{" "}
                  and{" "}
                  <a href="#" className="font-bold text-primary hover:underline">
                    Terms of Use
                  </a>
                </span>
              </label>
              {errors.terms && (
                <p className="text-red-500 text-xs mt-1">{errors.terms.message}</p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-14 bg-primary text-white rounded-lg text-sm font-medium hover:bg-accent transition-colors disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
            >
              {loading ? "Creating account…" : "Sign Up"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
