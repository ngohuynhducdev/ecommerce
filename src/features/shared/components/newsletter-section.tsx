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
    <section className="relative overflow-hidden bg-subtle">
      <Image
        src="https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=1600&h=600&fit=crop&auto=format&q=80"
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-20"
        aria-hidden="true"
      />
      <div className="relative py-16 lg:py-24 px-8 flex flex-col items-center text-center">
        <h2 className="text-3xl lg:text-4xl font-bold text-primary">
          Join Our Newsletter
        </h2>
        <p className="text-muted mt-3 max-w-sm">
          Sign up for deals, new products and promotions
        </p>
        <form onSubmit={handleSubmit} className="mt-10 w-full max-w-sm">
          <div className="flex items-center gap-3 border-b border-primary pb-3">
            <span className="text-muted shrink-0">
              <MailIcon />
            </span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              required
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted text-primary"
            />
            <button
              type="submit"
              className="text-sm font-medium text-muted hover:text-primary transition-colors shrink-0 cursor-pointer"
            >
              Signup
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
