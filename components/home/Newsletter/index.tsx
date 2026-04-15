"use client";

import { useState } from "react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Vui lòng nhập email hợp lệ");
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) throw new Error("Subscription failed");
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
      setError("Đã có lỗi xảy ra. Vui lòng thử lại.");
    }
  }

  return (
    <section className="py-16 bg-warm-100">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-warm-800">
          Đăng ký nhận tin
        </h2>
        <p className="mt-3 text-muted-foreground">
          Nhận ngay ưu đãi độc quyền, cập nhật sản phẩm mới và cảm hứng trang
          trí nhà mỗi tuần.
        </p>

        {status === "success" ? (
          <div className="mt-8 p-4 bg-sage-100 text-sage-700 rounded-xl font-medium">
            ✓ Cảm ơn bạn đã đăng ký! Hãy kiểm tra email để xác nhận.
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Nhập địa chỉ email của bạn"
              className="flex-1 px-4 py-3 rounded-xl border border-warm-300 bg-white text-warm-800 placeholder:text-warm-400 focus:outline-none focus:ring-2 focus:ring-earth-400 text-sm"
              disabled={status === "loading"}
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="px-6 py-3 bg-warm-800 hover:bg-warm-900 text-white font-semibold rounded-xl transition-colors text-sm disabled:opacity-60 whitespace-nowrap"
            >
              {status === "loading" ? "Đang gửi..." : "Đăng ký"}
            </button>
          </form>
        )}

        {error && <p className="mt-2 text-sm text-destructive">{error}</p>}
      </div>
    </section>
  );
}
