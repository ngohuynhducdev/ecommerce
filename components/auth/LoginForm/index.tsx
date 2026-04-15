"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Vui lòng điền đầy đủ thông tin");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Email không hợp lệ");
      return;
    }

    setLoading(true);
    const result = await login(email, password);
    setLoading(false);

    if (result.success) {
      const redirect = searchParams.get("redirect") ?? "/account";
      router.push(redirect);
    } else {
      setError("Email hoặc mật khẩu không đúng");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-1.5">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          autoComplete="email"
          disabled={loading}
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="password">Mật khẩu</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          autoComplete="current-password"
          disabled={loading}
        />
      </div>

      {error && (
        <p className="text-sm text-destructive bg-destructive/10 px-3 py-2 rounded-lg">
          {error}
        </p>
      )}

      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-warm-800 hover:bg-warm-900 text-white py-5"
      >
        {loading ? "Đang đăng nhập..." : "Đăng nhập"}
      </Button>

      <p className="text-sm text-center text-muted-foreground">
        Chưa có tài khoản?{" "}
        <Link
          href="/register"
          className="text-earth-600 hover:text-earth-700 font-medium"
        >
          Tạo tài khoản ngay
        </Link>
      </p>
    </form>
  );
}
