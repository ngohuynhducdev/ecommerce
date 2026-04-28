"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signIn } from "next-auth/react";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

const schema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
    terms: z.boolean().refine((v) => v, "You must accept the terms"),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof schema>;

function getStrength(password: string): number {
  if (!password) return 0;
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return score;
}

const strengthColors = ["bg-[#E8ECEF]", "bg-red-400", "bg-orange-400", "bg-yellow-400", "bg-green-500"];
const strengthLabels = ["", "Weak", "Fair", "Good", "Strong"];

export default function SignUpPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const password = watch("password") ?? "";
  const strength = getStrength(password);

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
          <h1 className="text-2xl font-semibold">Create Account</h1>
          <p className="text-[#807D7E] text-sm mt-1 mb-8">
            Join 3legant and discover furniture that fits your life.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Name row */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <input
                  {...register("firstName")}
                  placeholder="First name"
                  autoComplete="given-name"
                  className="w-full h-12 border border-[#E8ECEF] rounded-lg px-4 text-sm outline-none focus:border-[#1C1C1C] transition-colors placeholder:text-[#807D7E]"
                />
                {errors.firstName && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.firstName.message}
                  </p>
                )}
              </div>
              <div>
                <input
                  {...register("lastName")}
                  placeholder="Last name"
                  autoComplete="family-name"
                  className="w-full h-12 border border-[#E8ECEF] rounded-lg px-4 text-sm outline-none focus:border-[#1C1C1C] transition-colors placeholder:text-[#807D7E]"
                />
                {errors.lastName && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>

            {/* Email */}
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

            {/* Password row */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <div className="relative">
                  <input
                    {...register("password")}
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    autoComplete="new-password"
                    className="w-full h-12 border border-[#E8ECEF] rounded-lg px-4 pr-10 text-sm outline-none focus:border-[#1C1C1C] transition-colors placeholder:text-[#807D7E]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#807D7E] hover:text-[#1C1C1C] transition-colors"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <div>
                <div className="relative">
                  <input
                    {...register("confirmPassword")}
                    type={showConfirm ? "text" : "password"}
                    placeholder="Confirm"
                    autoComplete="new-password"
                    className="w-full h-12 border border-[#E8ECEF] rounded-lg px-4 pr-10 text-sm outline-none focus:border-[#1C1C1C] transition-colors placeholder:text-[#807D7E]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#807D7E] hover:text-[#1C1C1C] transition-colors"
                    aria-label={showConfirm ? "Hide password" : "Show password"}
                  >
                    {showConfirm ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>

            {/* Password strength */}
            {password.length > 0 && (
              <div>
                <div className="flex gap-1">
                  {[1, 2, 3, 4].map((bar) => (
                    <div
                      key={bar}
                      className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                        bar <= strength ? strengthColors[strength] : "bg-[#E8ECEF]"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-xs text-[#807D7E] mt-1">
                  {strengthLabels[strength]}
                </p>
              </div>
            )}

            {/* Terms */}
            <div>
              <label className="flex items-start gap-2 cursor-pointer">
                <input
                  {...register("terms")}
                  type="checkbox"
                  className="mt-0.5 accent-[#1C1C1C]"
                />
                <span className="text-xs text-[#807D7E] leading-relaxed">
                  I agree to the{" "}
                  <a href="#" className="text-[#1C1C1C] underline underline-offset-2">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-[#1C1C1C] underline underline-offset-2">
                    Privacy Policy
                  </a>
                </span>
              </label>
              {errors.terms && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.terms.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-[#1C1C1C] text-white rounded-sm text-sm font-medium hover:bg-[#2d2d2d] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Creating account…" : "Create Account"}
            </button>
          </form>

          <p className="text-center text-sm mt-4 text-[#807D7E]">
            Already have an account?{" "}
            <Link
              href="/auth/sign-in"
              className="text-[#1C1C1C] font-medium hover:underline"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>

      {/* Right: Image */}
      <div className="hidden lg:block relative">
        <Image
          src="https://picsum.photos/seed/interior-signup/800/1200"
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
