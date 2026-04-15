"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AccountPage() {
  const { user, logout, isAuthenticated } = useAuth();
  const router = useRouter();

  const [form, setForm] = useState({
    firstName: user?.firstName ?? "",
    lastName: user?.lastName ?? "",
    phone: user?.phone ?? "",
  });

  if (!isAuthenticated) {
    router.push("/login?redirect=/account");
    return null;
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="text-2xl sm:text-3xl font-serif font-bold text-warm-800 mb-8">
        Tài khoản của tôi
      </h1>

      <div className="bg-white rounded-2xl border border-warm-100 p-6 space-y-6">
        {/* User info */}
        <div>
          <h2 className="font-semibold text-warm-800 mb-4">
            Thông tin cá nhân
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="firstName">Họ</Label>
              <Input
                id="firstName"
                value={form.firstName}
                onChange={(e) =>
                  setForm((p) => ({ ...p, firstName: e.target.value }))
                }
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="lastName">Tên</Label>
              <Input
                id="lastName"
                value={form.lastName}
                onChange={(e) =>
                  setForm((p) => ({ ...p, lastName: e.target.value }))
                }
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                value={user?.email ?? ""}
                disabled
                className="bg-warm-50"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="phone">Số điện thoại</Label>
              <Input
                id="phone"
                value={form.phone}
                onChange={(e) =>
                  setForm((p) => ({ ...p, phone: e.target.value }))
                }
                placeholder="0901 234 567"
              />
            </div>
          </div>
          <Button className="mt-4 bg-warm-800 hover:bg-warm-900 text-white">
            Lưu thay đổi
          </Button>
        </div>

        {/* Quick links */}
        <div className="border-t border-warm-100 pt-5">
          <h2 className="font-semibold text-warm-800 mb-3">Liên kết nhanh</h2>
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" onClick={() => router.push("/orders")}>
              Lịch sử đơn hàng
            </Button>
            <Button variant="outline">Đổi mật khẩu</Button>
          </div>
        </div>

        {/* Logout */}
        <div className="border-t border-warm-100 pt-5">
          <Button
            variant="ghost"
            onClick={logout}
            className="text-destructive hover:text-destructive hover:bg-destructive/10"
          >
            Đăng xuất
          </Button>
        </div>
      </div>
    </div>
  );
}
