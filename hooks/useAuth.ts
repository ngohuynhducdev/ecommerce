"use client";

import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { tokenAtom, userAtom } from "@/store/auth";
import { loginUser, registerUser, type RegisterData } from "@/lib/api/auth";

export function useAuth() {
  const [token, setToken] = useAtom(tokenAtom);
  const [user, setUser] = useAtom(userAtom);
  const router = useRouter();

  const isAuthenticated = Boolean(token && user);

  async function login(
    email: string,
    password: string,
  ): Promise<{ success: boolean; error?: string }> {
    try {
      const res = await loginUser(email, password);
      setToken(res.jwt);
      setUser(res.user);
      return { success: true };
    } catch (err) {
      const message = err instanceof Error ? err.message : "Đăng nhập thất bại";
      return { success: false, error: message };
    }
  }

  async function register(
    data: RegisterData,
  ): Promise<{ success: boolean; error?: string }> {
    try {
      const res = await registerUser(data);
      setToken(res.jwt);
      setUser(res.user);
      return { success: true };
    } catch (err) {
      const message = err instanceof Error ? err.message : "Đăng ký thất bại";
      return { success: false, error: message };
    }
  }

  function logout() {
    setToken(null);
    setUser(null);
    router.push("/login");
  }

  return { user, token, isAuthenticated, login, register, logout };
}
