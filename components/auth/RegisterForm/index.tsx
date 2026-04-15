"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function RegisterForm() {
  const router = useRouter();
  const { register } = useAuth();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const { firstName, lastName, email, password, confirmPassword } = form;

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      setError("Vui lòng điền đầy đủ thông tin");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Email không hợp lệ");
      return;
    }
    if (password.length < 8) {
      setError("Mật khẩu phải có ít nhất 8 ký tự");
      return;
    }
    if (password !== confirmPassword) {
      setError("Mật khẩu xác nhận không khớp");
      return;
    }

    setLoading(true);
    const result = await register({
      username: email.split("@")[0] + Date.now().toString().slice(-4),
      email,
      password,
      firstName,
      lastName,
    });
    setLoading(false);

    if (result.success) {
      router.push("/account");
    } else {
      setError("Email này đã được sử dụng hoặc có lỗi xảy ra");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label htmlFor="firstName">Họ</Label>
          <Input
            id="firstName"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            placeholder="Nguyễn"
            disabled={loading}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="lastName">Tên</Label>
          <Input
            id="lastName"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            placeholder="Văn A"
            disabled={loading}
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="your@email.com"
          autoComplete="email"
          disabled={loading}
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="password">Mật khẩu</Label>
        <Input
          id="password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Ít nhất 8 ký tự"
          autoComplete="new-password"
          disabled={loading}
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="confirmPassword">Xác nhận mật khẩu</Label>
        <Input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          value={form.confirmPassword}
          onChange={handleChange}
          placeholder="Nhập lại mật khẩu"
          autoComplete="new-password"
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
        {loading ? "Đang tạo tài khoản..." : "Tạo tài khoản"}
      </Button>

      <p className="text-sm text-center text-muted-foreground">
        Đã có tài khoản?{" "}
        <Link
          href="/login"
          className="text-earth-600 hover:text-earth-700 font-medium"
        >
          Đăng nhập
        </Link>
      </p>
    </form>
  );
}
