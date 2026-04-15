import type { StrapiResponse } from "@/lib/types/strapi";

function strapiUrl(path: string): string {
  const base = process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337";
  return `${base}${path}`;
}

function getDefaultHeaders(): HeadersInit {
  const token = process.env.NEXT_PUBLIC_STRAPI_TOKEN;
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };
  if (token) {
    (headers as Record<string, string>)["Authorization"] = `Bearer ${token}`;
  }
  return headers;
}

export async function strapiGet<T>(
  endpoint: string,
  params?: Record<string, string>,
  options?: RequestInit,
): Promise<T> {
  const url = new URL(strapiUrl(endpoint));
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.set(key, value);
    });
  }

  const res = await fetch(url.toString(), {
    headers: getDefaultHeaders(),
    ...options,
  });

  if (!res.ok) {
    throw new Error(
      `Strapi GET ${endpoint} failed: ${res.status} ${res.statusText}`,
    );
  }

  return res.json() as Promise<T>;
}

export async function strapiPost<T>(
  endpoint: string,
  body: unknown,
  token?: string,
): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  const authToken = token ?? process.env.NEXT_PUBLIC_STRAPI_TOKEN;
  if (authToken) {
    headers["Authorization"] = `Bearer ${authToken}`;
  }

  const res = await fetch(strapiUrl(endpoint), {
    method: "POST",
    headers,
    body: JSON.stringify(body),
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(
      `Strapi POST ${endpoint} failed: ${res.status} ${res.statusText}`,
    );
  }

  return res.json() as Promise<T>;
}

export async function strapiPut<T>(
  endpoint: string,
  body: unknown,
  token?: string,
): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  const authToken = token ?? process.env.NEXT_PUBLIC_STRAPI_TOKEN;
  if (authToken) {
    headers["Authorization"] = `Bearer ${authToken}`;
  }

  const res = await fetch(strapiUrl(endpoint), {
    method: "PUT",
    headers,
    body: JSON.stringify(body),
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(
      `Strapi PUT ${endpoint} failed: ${res.status} ${res.statusText}`,
    );
  }

  return res.json() as Promise<T>;
}

export { strapiUrl, getDefaultHeaders };
export type { StrapiResponse };
