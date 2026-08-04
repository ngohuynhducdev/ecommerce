"use client";

import { useState, useEffect, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { toast } from "sonner";

import { SafeImage } from "@/components/ui/safe-image";
import { cartItemsAtom, cartSubtotalAtom } from "@/features/cart/atoms";
import {
  couponAtom,
  shippingMethodAtom,
  ordersAtom,
  SHIPPING_COSTS,
} from "@/features/checkout/atoms";
import { calculateDiscount, calculateTotal } from "@/features/checkout/totals";
import { StepIndicator } from "@/features/checkout/components/step-indicator";
import { formatPrice, generateOrderId, cn } from "@/lib/utils";
import type { CartItem, Order } from "@/features/products/types";

const COUNTRIES = [
  "United States", "Canada", "United Kingdom", "Germany", "France",
  "Italy", "Spain", "Australia", "Japan", "Vietnam",
];

const COUPONS: Record<string, { discount: number; type: "percent" }> = {
  SAVE10: { discount: 10, type: "percent" },
  FURNITURE20: { discount: 20, type: "percent" },
};

const schema = z.object({
  firstName: z.string().min(1, "Required"),
  lastName: z.string().min(1, "Required"),
  phone: z.string().min(1, "Required"),
  email: z.string().email("Invalid email"),
  address: z.string().min(1, "Required"),
  country: z.string().min(1, "Required"),
  city: z.string().min(1, "Required"),
  state: z.string().optional(),
  zipCode: z.string().optional(),
  differentBilling: z.boolean().optional(),
});

type FormData = z.infer<typeof schema>;

function cartItemKey(item: CartItem) {
  return `${item.product.id}-${item.variant?.id ?? "default"}`;
}

function formatCardNumber(v: string) {
  const d = v.replace(/\D/g, "").slice(0, 16);
  const groups = d.match(/.{1,4}/g);
  return groups ? groups.join(" ") : "";
}

function formatExpiry(v: string) {
  const d = v.replace(/\D/g, "").slice(0, 4);
  if (d.length < 3) return d;
  return `${d.slice(0, 2)}/${d.slice(2)}`;
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-semibold text-ink uppercase tracking-wider mb-1.5">
      {children}
    </p>
  );
}

function FieldInput({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "w-full h-11 border border-line rounded-sm px-3 text-sm outline-none focus:border-ink transition-colors placeholder:text-subtle",
        className
      )}
      {...props}
    />
  );
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="text-xs text-red-500 mt-1">{message}</p>;
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border border-line rounded-xl p-5 mb-4">
      <h2 className="text-base font-semibold text-ink mb-4">{title}</h2>
      {children}
    </div>
  );
}

function CreditCardIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="4" width="22" height="16" rx="2" />
      <line x1="1" y1="10" x2="23" y2="10" />
    </svg>
  );
}

function CouponIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 5H3a2 2 0 0 0-2 2v3a2 2 0 0 1 0 4v3a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2v-3a2 2 0 0 1 0-4V7a2 2 0 0 0-2-2z" />
    </svg>
  );
}

export default function CheckoutPage() {
  const router = useRouter();
  const [items, setItems] = useAtom(cartItemsAtom);
  const subtotal = useAtomValue(cartSubtotalAtom);
  const [coupon, setCoupon] = useAtom(couponAtom);
  const shippingMethod = useAtomValue(shippingMethodAtom);
  const setOrders = useSetAtom(ordersAtom);

  const [paymentType, setPaymentType] = useState<"card" | "paypal">("card");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [couponInput, setCouponInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  useEffect(() => {
    // isProcessing guards the moment the order is placed: the cart empties
    // right before we push /order-success, which must not bounce to /cart.
    if (mounted && !isProcessing && items.length === 0) router.replace("/cart");
  }, [mounted, isProcessing, items.length, router]);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { country: "United States" },
  });

  if (!mounted || (items.length === 0 && !isProcessing)) return null;

  const shippingCost = SHIPPING_COSTS[shippingMethod];
  const discountAmount = calculateDiscount(subtotal, coupon);
  const total = calculateTotal(subtotal, shippingCost, coupon);

  function updateQuantity(item: CartItem, qty: number) {
    if (qty < 1) return;
    setItems((prev) =>
      prev.map((i) => (cartItemKey(i) === cartItemKey(item) ? { ...i, quantity: qty } : i))
    );
  }

  function removeItem(item: CartItem) {
    setItems((prev) => prev.filter((i) => cartItemKey(i) !== cartItemKey(item)));
  }

  function applyCoupon() {
    const code = couponInput.trim().toUpperCase();
    if (!code) return;
    const match = COUPONS[code];
    if (match) {
      setCoupon({ code, discount: match.discount, type: match.type });
      setCouponInput("");
      toast.success(`${code} applied — ${match.discount}% off`);
    } else {
      toast.error("Invalid coupon code");
    }
  }

  function onSubmit(data: FormData) {
    if (paymentType === "card") {
      const digits = cardNumber.replace(/\D/g, "");
      if (digits.length !== 16) {
        toast.error("Please enter a valid 16-digit card number");
        return;
      }
      if (!/^\d{2}\/\d{2}$/.test(expiry)) {
        toast.error("Please enter expiry as MM/YY");
        return;
      }
      if (cvc.length < 3) {
        toast.error("Please enter a valid CVC");
        return;
      }
    }

    setIsProcessing(true);

    setTimeout(() => {
      const orderId = generateOrderId();
      const order: Order = {
        id: orderId,
        orderNumber: orderId,
        status: "pending",
        items,
        total,
        createdAt: new Date().toISOString(),
        shippingAddress: {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone,
          address: data.address,
          city: data.city,
          state: data.state ?? "",
          zipCode: data.zipCode ?? "",
          country: data.country,
        },
        paymentMethod: paymentType === "card" ? "Credit Card" : "PayPal",
      };

      setOrders((prev) => [order, ...prev]);
      setItems([]);
      setCoupon(null);
      toast.success("Order placed successfully!");
      router.push(`/order-success?id=${orderId}`);
    }, 1500);
  }

  return (
    <div className="px-5 lg:px-20 py-8 lg:py-12">
      {/* Mobile back link */}
      <button
        type="button"
        onClick={() => router.back()}
        className="lg:hidden flex items-center gap-1 text-sm text-subtle hover:text-ink transition-colors mb-4 cursor-pointer"
      >
        ‹ back
      </button>

      <h1 className="text-4xl font-bold text-ink text-center mb-8">Check Out</h1>
      <StepIndicator step={2} />

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="grid gap-8 lg:grid-cols-[1fr_380px] lg:gap-x-12 lg:gap-y-8">
          {/* LEFT: Forms */}
          <div className="order-1 lg:col-start-1 lg:row-start-1">
            {/* Contact Information */}
            <Section title="Contact Information">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <FieldLabel>First Name</FieldLabel>
                  <FieldInput {...register("firstName")} placeholder="First name" autoComplete="given-name" />
                  <FieldError message={errors.firstName?.message} />
                </div>
                <div>
                  <FieldLabel>Last Name</FieldLabel>
                  <FieldInput {...register("lastName")} placeholder="Last name" autoComplete="family-name" />
                  <FieldError message={errors.lastName?.message} />
                </div>
              </div>
              <div className="mt-4">
                <FieldLabel>Phone Number</FieldLabel>
                <FieldInput {...register("phone")} type="tel" placeholder="Phone number" autoComplete="tel" />
                <FieldError message={errors.phone?.message} />
              </div>
              <div className="mt-4">
                <FieldLabel>Email Address</FieldLabel>
                <FieldInput {...register("email")} type="email" placeholder="Your Email" autoComplete="email" />
                <FieldError message={errors.email?.message} />
              </div>
            </Section>

            {/* Shipping Address */}
            <Section title="Shipping Address">
              <div>
                <FieldLabel>Street Address *</FieldLabel>
                <FieldInput {...register("address")} placeholder="Street Address" autoComplete="street-address" />
                <FieldError message={errors.address?.message} />
              </div>
              <div className="mt-4">
                <FieldLabel>Country *</FieldLabel>
                <Controller
                  name="country"
                  control={control}
                  render={({ field }) => (
                    <select
                      value={field.value}
                      onChange={field.onChange}
                      className="w-full h-11 border border-line rounded-sm px-3 text-sm outline-none focus:border-ink transition-colors bg-white"
                    >
                      {COUNTRIES.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  )}
                />
              </div>
              <div className="mt-4">
                <FieldLabel>Town / City *</FieldLabel>
                <FieldInput {...register("city")} placeholder="Town / City" autoComplete="address-level2" />
                <FieldError message={errors.city?.message} />
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <FieldLabel>State</FieldLabel>
                  <FieldInput {...register("state")} placeholder="State" autoComplete="address-level1" />
                </div>
                <div>
                  <FieldLabel>Zip Code</FieldLabel>
                  <FieldInput {...register("zipCode")} placeholder="Zip Code" autoComplete="postal-code" />
                </div>
              </div>
              <label className="flex items-center gap-2 mt-4 cursor-pointer select-none">
                <input
                  {...register("differentBilling")}
                  type="checkbox"
                  className="w-4 h-4 accent-ink"
                />
                <span className="text-sm text-subtle">Use a different billing address (optional)</span>
              </label>
            </Section>

            {/* Payment Method */}
            <Section title="Payment method">
              <label className={cn(
                "flex items-center gap-3 p-4 border rounded-xl cursor-pointer mb-3 transition-colors",
                paymentType === "card" ? "border-ink bg-mist" : "border-line hover:border-subtle"
              )}>
                <input
                  type="radio"
                  checked={paymentType === "card"}
                  onChange={() => setPaymentType("card")}
                  className="w-4 h-4 accent-ink"
                />
                <span className="flex-1 text-sm font-medium text-ink">Pay by Card Credit</span>
                <CreditCardIcon />
              </label>

              <label className={cn(
                "flex items-center gap-3 p-4 border rounded-xl cursor-pointer transition-colors",
                paymentType === "paypal" ? "border-ink bg-mist" : "border-line hover:border-subtle"
              )}>
                <input
                  type="radio"
                  checked={paymentType === "paypal"}
                  onChange={() => setPaymentType("paypal")}
                  className="w-4 h-4 accent-ink"
                />
                <span className="flex-1 text-sm font-medium text-ink">Paypal</span>
              </label>

              {paymentType === "card" && (
                <div className="mt-5 space-y-4">
                  <div>
                    <FieldLabel>Card Number</FieldLabel>
                    <FieldInput
                      inputMode="numeric"
                      placeholder="1234 1234 1234"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                      autoComplete="cc-number"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <FieldLabel>Expiration Date</FieldLabel>
                      <FieldInput
                        inputMode="numeric"
                        placeholder="MM/YY"
                        value={expiry}
                        onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                        maxLength={5}
                        autoComplete="cc-exp"
                      />
                    </div>
                    <div>
                      <FieldLabel>CVC</FieldLabel>
                      <FieldInput
                        type="password"
                        inputMode="numeric"
                        placeholder="CVC code"
                        maxLength={3}
                        value={cvc}
                        onChange={(e) => setCvc(e.target.value.replace(/\D/g, ""))}
                        autoComplete="cc-csc"
                      />
                    </div>
                  </div>
                </div>
              )}
            </Section>

          </div>

          {/* RIGHT: Order Summary */}
          <aside className="order-2 lg:col-start-2 lg:row-start-1 lg:row-span-2">
            <div className="border border-line rounded-xl p-5 lg:sticky lg:top-8">
              <h2 className="text-base font-semibold text-ink mb-5">Order summary</h2>

              {/* Items */}
              <div className="space-y-4 mb-5">
                {items.map((item) => (
                  <div key={cartItemKey(item)}>
                    <div className="flex gap-3 items-start">
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-mist shrink-0">
                        <SafeImage
                          src={item.product.images[0]}
                          alt={item.product.name}
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="text-sm font-medium text-ink leading-snug">
                              {item.product.name}
                            </p>
                            {item.variant && (
                              <p className="text-xs text-subtle mt-0.5">
                                Color: {item.variant.value}
                              </p>
                            )}
                          </div>
                          <div className="flex items-center gap-1.5 shrink-0">
                            <span className="text-sm font-medium text-ink">
                              {formatPrice(item.product.price * item.quantity)}
                            </span>
                            <button
                              type="button"
                              onClick={() => removeItem(item)}
                              className="text-subtle hover:text-ink transition-colors cursor-pointer text-lg leading-none"
                              aria-label="Remove"
                            >
                              ×
                            </button>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 mt-2">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            className="w-6 h-6 flex items-center justify-center border border-line rounded text-sm hover:bg-mist disabled:opacity-40 cursor-pointer"
                          >
                            −
                          </button>
                          <span className="w-6 text-center text-sm text-ink">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item, item.quantity + 1)}
                            className="w-6 h-6 flex items-center justify-center border border-line rounded text-sm hover:bg-mist cursor-pointer"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Coupon */}
              <div className="mb-4">
                {coupon ? (
                  <div className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-2 text-sm">
                      <CouponIcon />
                      <span className="text-ink font-medium">{coupon.code}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-success">-{formatPrice(discountAmount)}</span>
                      <button
                        type="button"
                        onClick={() => setCoupon(null)}
                        className="text-xs text-subtle hover:text-ink cursor-pointer underline"
                      >
                        [Remove]
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex border border-line rounded-sm overflow-hidden">
                    <div className="px-3 flex items-center text-subtle shrink-0">
                      <CouponIcon />
                    </div>
                    <input
                      type="text"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); applyCoupon(); } }}
                      placeholder="Coupon code"
                      className="flex-1 py-2.5 text-sm outline-none bg-transparent placeholder:text-subtle"
                    />
                    <button
                      type="button"
                      onClick={applyCoupon}
                      className="px-4 bg-ink text-white text-sm font-medium hover:bg-ink-hover transition-colors cursor-pointer shrink-0"
                    >
                      Apply
                    </button>
                  </div>
                )}
              </div>

              {/* Totals */}
              <div className="border-t border-line pt-4 space-y-2.5">
                <div className="flex justify-between text-sm">
                  <span className="text-subtle">Shipping</span>
                  <span className="text-ink">
                    {shippingCost === 0 ? "Free" : formatPrice(shippingCost)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-subtle">Subtotal</span>
                  <span className="text-ink">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between pt-3 border-t border-line">
                  <span className="font-bold text-ink">Total</span>
                  <span className="font-bold text-ink">{formatPrice(total)}</span>
                </div>
              </div>
            </div>
          </aside>

          {/* Place Order — under the form on desktop, last on mobile */}
          <div className="order-3 lg:col-start-1 lg:row-start-2">
            <button
              type="submit"
              disabled={isProcessing}
              className="w-full h-14 bg-ink text-white text-sm font-medium rounded-lg hover:bg-gold transition-colors disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
            >
              {isProcessing ? "Processing…" : "Place Order"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
