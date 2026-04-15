import { strapiPost, strapiGet } from "./strapi";
import type { AuthResponse, User } from "@/lib/types/user";

export async function loginUser(
  email: string,
  password: string,
): Promise<AuthResponse> {
  return strapiPost<AuthResponse>("/api/auth/local", {
    identifier: email,
    password,
  });
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

export async function registerUser(data: RegisterData): Promise<AuthResponse> {
  return strapiPost<AuthResponse>("/api/auth/local/register", data);
}

export async function getMe(token: string): Promise<User> {
  return strapiGet<User>(
    "/api/users/me",
    {},
    {
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    },
  );
}
