import { strapiGet, strapiPost } from "./strapi";
import type { StrapiResponse } from "@/lib/types/strapi";
import type { OrderItem, OrderAttributes } from "@/lib/types/order";

function authHeaders(token: string): RequestInit {
  return {
    cache: "no-store" as RequestCache,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
}

export async function getOrders(
  token: string,
): Promise<StrapiResponse<OrderItem[]>> {
  return strapiGet<StrapiResponse<OrderItem[]>>(
    "/api/orders",
    {
      "populate[items]": "*",
      "populate[user]": "*",
      sort: "createdAt:desc",
    },
    authHeaders(token),
  );
}

export async function getOrderById(
  id: string,
  token: string,
): Promise<{ data: OrderItem }> {
  return strapiGet<{ data: OrderItem }>(
    `/api/orders/${id}`,
    { populate: "*" },
    authHeaders(token),
  );
}

export async function createOrder(
  data: Omit<OrderAttributes, "createdAt" | "updatedAt">,
  token: string,
): Promise<{ data: OrderItem }> {
  return strapiPost<{ data: OrderItem }>("/api/orders", { data }, token);
}
