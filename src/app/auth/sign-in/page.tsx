"use client";

import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

import { SignInForm } from "@/features/auth/components/sign-in-form";

const PANEL_IMAGE =
  "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=800&fit=crop&auto=format&q=80";

function SignInContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/";

  return (
    <div className="min-h-screen flex flex-col lg:grid lg:grid-cols-2">
      {/* Left / Top — Gray image panel */}
      <div className="bg-mist flex flex-col min-h-72 lg:min-h-screen">
        <div className="px-8 pt-8 lg:px-10 flex justify-center">
          <Link
            href="/"
            className="font-semibold text-xl tracking-tight text-ink select-none"
          >
            3legant<span className="text-gold">.</span>
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
          <SignInForm
            onSwitch={() => router.push("/auth/sign-up")}
            onSuccess={() => {
              router.push(callbackUrl);
              router.refresh();
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-mist" />}>
      <SignInContent />
    </Suspense>
  );
}
