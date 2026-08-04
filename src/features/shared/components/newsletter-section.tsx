"use client";

import { useState } from "react";
import Image from "next/image";

// Decorative only. Deliberately not one of the photos the home page already
// shows above this section, so the band reads as a new scene.
const BACKDROP =
  "https://images.unsplash.com/photo-1560184897-502a475f7a0d?w=1920&h=800&fit=crop&auto=format&q=80";

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
    <section className="relative overflow-hidden bg-ink">
      {/* Full-bleed backdrop */}
      <Image
        src={BACKDROP}
        alt=""
        aria-hidden="true"
        fill
        sizes="100vw"
        className="object-cover"
      />
      {/* Scrim — carries the white text over whatever part of the photo shows */}
      <div className="absolute inset-0 bg-ink/65" aria-hidden="true" />

      <div className="relative py-20 lg:py-32 px-8 flex flex-col items-center text-center">
        <h2 className="text-3xl lg:text-4xl font-bold text-white">
          Join Our Newsletter
        </h2>
        <p className="text-white/80 mt-3 max-w-sm">
          Sign up for deals, new products and promotions
        </p>
        <form onSubmit={handleSubmit} className="mt-10 w-full max-w-sm">
          <div className="flex items-center gap-3 border-b border-white/70 pb-3 focus-within:border-white transition-colors">
            <span className="text-white/70 shrink-0">
              <MailIcon />
            </span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              required
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-white/70 text-white"
            />
            <button
              type="submit"
              className="text-sm font-medium text-white hover:text-gold transition-colors shrink-0 cursor-pointer"
            >
              Signup
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
