"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { SignUpForm } from "@/features/auth/components/sign-up-form";

const PANEL_IMAGE =
  "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=800&fit=crop&auto=format&q=80";

export default function SignUpPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col lg:grid lg:grid-cols-2">
      {/* Left / Top — Gray image panel */}
      <div className="bg-[#F3F5F7] flex flex-col min-h-72 lg:min-h-screen">
        <div className="px-8 pt-8 lg:px-10 flex justify-center">
          <Link
            href="/"
            className="font-semibold text-xl tracking-tight text-[#1C1C1C] select-none"
          >
            3legant<span className="text-[#B88E2F]">.</span>
          </Link>
        </div>
        <div className="flex-1 flex items-center justify-center px-8 py-8 lg:py-16">
          <div className="relative w-full max-w-sm lg:max-w-lg aspect-square">
            <Image
              src={PANEL_IMAGE}
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
          <SignUpForm
            onSwitch={() => router.push("/auth/sign-in")}
            onSuccess={() => {
              router.push("/");
              router.refresh();
            }}
          />
        </div>
      </div>
    </div>
  );
}
