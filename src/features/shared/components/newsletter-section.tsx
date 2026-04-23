"use client";

import { useState } from "react";

export function NewsletterSection() {
  const [email, setEmail] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setEmail("");
  }

  return (
    <section className="mx-8 lg:mx-20 my-8 bg-[#FFF3E3] rounded-2xl p-12 lg:p-16">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-[#1C1C1C]">
          Join Our Newsletter
        </h2>
        <p className="text-[#807D7E] mt-2">
          Sign up for deals, new products and promotions.
        </p>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex gap-3 justify-center mt-8 max-w-md mx-auto"
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email address"
          required
          className="flex-1 h-12 border border-[#E8ECEF] rounded-sm px-4 text-sm bg-white outline-none focus:border-[#1C1C1C] transition-colors"
        />
        <button
          type="submit"
          className="bg-[#1C1C1C] text-white px-6 h-12 rounded-sm text-sm hover:bg-[#333] transition-colors cursor-pointer"
        >
          Subscribe
        </button>
      </form>
    </section>
  );
}
