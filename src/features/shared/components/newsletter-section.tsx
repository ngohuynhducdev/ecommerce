"use client";

import { useState } from "react";
import Image from "next/image";

function MailIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-10 7L2 7" />
    </svg>
  );
}

export function NewsletterSection() {
  const [email, setEmail] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setEmail("");
  }

  return (
    <section className="relative overflow-hidden bg-mist">
      {/* Flanking furniture images — desktop only */}
      <div className="hidden lg:block absolute inset-y-0 left-0 w-[20%]" aria-hidden="true">
        <Image
          src="https://images.unsplash.com/photo-1540518614846-7eded433c457?w=600&h=900&fit=crop&auto=format&q=80"
          alt=""
          fill
          sizes="20vw"
          className="object-cover"
        />
      </div>
      <div className="hidden lg:block absolute inset-y-0 right-0 w-[24%]" aria-hidden="true">
        <Image
          src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=900&fit=crop&auto=format&q=80"
          alt=""
          fill
          sizes="24vw"
          className="object-cover"
        />
      </div>

      <div className="relative py-16 lg:py-28 px-8 flex flex-col items-center text-center">
        <h2 className="text-3xl lg:text-4xl font-bold text-ink">
          Join Our Newsletter
        </h2>
        <p className="text-subtle mt-3 max-w-sm">
          Sign up for deals, new products and promotions
        </p>
        <form onSubmit={handleSubmit} className="mt-10 w-full max-w-sm">
          <div className="flex items-center gap-3 border-b border-ink pb-3">
            <span className="text-subtle shrink-0">
              <MailIcon />
            </span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              required
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-subtle text-ink"
            />
            <button
              type="submit"
              className="text-sm font-medium text-subtle hover:text-ink transition-colors shrink-0 cursor-pointer"
            >
              Signup
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
