"use client";

import { useState } from "react";
import { SafeImage } from "@/components/ui/safe-image";
import Link from "next/link";
import { useAtomValue } from "jotai";
import { ordersAtom } from "@/features/checkout/atoms";
import type { Order } from "@/features/products/types";
import { formatPrice } from "@/lib/utils";

// ── Types & constants ─────────────────────────────────────────────────────────

type Tab = "All" | "Pending" | "Processing" | "Delivered" | "Cancelled";
const TABS: Tab[] = ["All", "Pending", "Processing", "Delivered", "Cancelled"];

const STATUS_STYLES: Record<Order["status"], string> = {
  pending: "bg-amber-100 text-amber-700",
  processing: "bg-blue-100 text-blue-700",
  shipped: "bg-purple-100 text-purple-700",
  delivered: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

const STATUS_LABELS: Record<Order["status"], string> = {
  pending: "Pending",
  processing: "Processing",
  shipped: "Shipped",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function tabMatchesStatus(tab: Tab, status: Order["status"]): boolean {
  if (tab === "All") return true;
  if (tab === "Delivered") return status === "delivered" || status === "shipped";
  return status === tab.toLowerCase();
}

// ── Order card ────────────────────────────────────────────────────────────────

function OrderCard({ order }: { order: Order }) {
  const visibleItems = order.items.slice(0, 3);
  const extraCount = order.items.length - visibleItems.length;

  return (
    <div className="bg-white border border-border rounded-2xl p-5 mb-4">
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="font-medium text-sm">#{order.orderNumber}</p>
          <p className="text-xs text-muted mt-0.5">
            {formatDate(order.createdAt)}
          </p>
        </div>
        <span
          className={`text-xs font-medium px-2.5 py-1 rounded-full shrink-0 ${
            STATUS_STYLES[order.status]
          }`}
        >
          {STATUS_LABELS[order.status]}
        </span>
      </div>

      {/* Product thumbnails */}
      <div className="flex items-center gap-2 mt-3">
        {visibleItems.map((item) => (
          <div
            key={item.product.id}
            className="w-11 h-11 rounded-lg overflow-hidden relative shrink-0 bg-subtle"
          >
            <SafeImage
              src={item.product.images[0]}
              alt={item.product.name}
              fill
              sizes="44px"
              className="object-cover"
            />
          </div>
        ))}
        {extraCount > 0 && (
          <span className="text-xs text-muted font-medium">
            +{extraCount} more
          </span>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-4">
        <p className="font-semibold text-sm">{formatPrice(order.total)}</p>
        <div className="flex gap-2">
          <button className="h-8 px-3 border border-border rounded-lg text-xs font-medium text-primary hover:bg-subtle transition-colors">
            View Details
          </button>
          <button className="h-8 px-3 border border-border rounded-lg text-xs font-medium text-primary hover:bg-subtle transition-colors">
            Track Order
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function OrdersPage() {
  const orders = useAtomValue(ordersAtom);
  const [activeTab, setActiveTab] = useState<Tab>("All");

  const filtered = orders.filter((o) => tabMatchesStatus(activeTab, o.status));

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">My Orders</h1>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`shrink-0 h-9 px-4 rounded-lg text-sm font-medium transition-colors ${
              activeTab === tab
                ? "bg-primary text-white"
                : "bg-subtle text-muted hover:text-primary"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1} strokeLinecap="round" strokeLinejoin="round" className="text-border mb-4"><path d="M16.5 9.4 7.55 4.24" /><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><polyline points="3.29 7 12 12 20.71 7" /><line x1="12" y1="22" x2="12" y2="12" /></svg>
          <p className="text-lg font-medium mb-2">No orders yet</p>
          <p className="text-sm text-muted mb-6">
            Your order history will appear here
          </p>
          <Link
            href="/shop"
            className="h-11 px-6 bg-primary text-white text-sm font-medium rounded-lg flex items-center hover:bg-accent transition-colors"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div>
          {filtered.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
}
