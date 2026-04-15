import type { StrapiItem } from "./strapi";

export type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export interface OrderLineItem {
  productId: number;
  name: string;
  slug: string;
  price: number;
  quantity: number;
  image: string;
}

export interface ShippingAddress {
  fullName: string;
  phone: string;
  address: string;
  district: string;
  city: string;
}

export interface OrderAttributes {
  status: OrderStatus;
  total: number;
  items: OrderLineItem[];
  shippingAddress: ShippingAddress;
  paymentMethod?: string;
  createdAt: string;
  updatedAt: string;
}

export type OrderItem = StrapiItem<OrderAttributes>;
