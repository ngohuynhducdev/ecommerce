"use client";

import { useAtomValue } from "jotai";

import { ordersAtom } from "@/features/checkout/atoms";
import { formatPrice } from "@/lib/utils";

interface OrderRow {
  number: string;
  date: string;
  status: string;
  price: string;
}

// Sample history shown until the visitor places real orders (demo parity with design).
const SAMPLE_ROWS: OrderRow[] = [
  { number: "#3456_768", date: "October 17, 2023", status: "Delivered", price: "$1234.00" },
  { number: "#3456_980", date: "October 11, 2022", status: "Delivered", price: "$345.00" },
  { number: "#3456_120", date: "August 24, 2023", status: "Delivered", price: "$2345.00" },
  { number: "#3456_030", date: "August 12, 2023", status: "Delivered", price: "$845.00" },
];

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function OrdersPage() {
  const orders = useAtomValue(ordersAtom);

  const rows: OrderRow[] =
    orders.length > 0
      ? orders.map((o) => ({
          number: `#${o.orderNumber}`,
          date: formatDate(o.createdAt),
          status: o.status.charAt(0).toUpperCase() + o.status.slice(1),
          price: formatPrice(o.total),
        }))
      : SAMPLE_ROWS;

  return (
    <div>
      <h2 className="text-xl font-semibold text-ink mb-6">Orders History</h2>

      {/* Desktop table */}
      <table className="hidden md:table w-full">
        <thead>
          <tr className="border-b border-line text-left">
            <th className="pb-3 text-sm font-medium text-ink">Number ID</th>
            <th className="pb-3 text-sm font-medium text-ink">Dates</th>
            <th className="pb-3 text-sm font-medium text-ink">Status</th>
            <th className="pb-3 text-sm font-medium text-ink">Price</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.number} className="border-b border-line">
              <td className="py-5 text-sm text-ink">{row.number}</td>
              <td className="py-5 text-sm text-subtle">{row.date}</td>
              <td className="py-5 text-sm text-subtle">{row.status}</td>
              <td className="py-5 text-sm text-ink">{row.price}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Mobile stacked list */}
      <div className="md:hidden divide-y divide-line">
        {rows.map((row) => (
          <div key={row.number} className="py-5 space-y-2">
            <Row label="Number ID" value={row.number} />
            <Row label="Dates" value={row.date} />
            <Row label="Status" value={row.status} />
            <Row label="Price" value={row.price} />
          </div>
        ))}
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-subtle">{label}</p>
      <p className="text-sm font-medium text-ink mt-0.5">{value}</p>
    </div>
  );
}
