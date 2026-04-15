"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAtomValue } from "jotai";
import { tokenAtom } from "@/store/auth";
import { useCart } from "@/hooks/useCart";
import { createOrder } from "@/lib/api/orders";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { formatVND } from "@/lib/utils/formatPrice";
import type { ShippingAddress } from "@/lib/types/order";

type Step = "address" | "shipping" | "payment";

const CITIES = [
  "TP. Hồ Chí Minh",
  "Hà Nội",
  "Đà Nẵng",
  "Cần Thơ",
  "Hải Phòng",
  "Nha Trang",
  "Huế",
  "Biên Hòa",
  "Vũng Tàu",
  "Đà Lạt",
];

const SHIPPING_OPTIONS = [
  {
    id: "standard",
    label: "Giao hàng tiêu chuẩn",
    sublabel: "5-7 ngày làm việc",
    price: 0,
  },
  {
    id: "express",
    label: "Giao hàng nhanh",
    sublabel: "1-2 ngày làm việc",
    price: 30000,
  },
];

export default function CheckoutPage() {
  const router = useRouter();
  const token = useAtomValue(tokenAtom);
  const { items, total, clearCart } = useCart();

  const [step, setStep] = useState<Step>("address");
  const [shippingMethod, setShippingMethod] = useState("standard");
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [submitting, setSubmitting] = useState(false);

  const [address, setAddress] = useState<ShippingAddress>({
    fullName: "",
    phone: "",
    address: "",
    district: "",
    city: "",
  });
  const [addressError, setAddressError] = useState("");

  if (items.length === 0) {
    router.replace("/cart");
    return null;
  }

  const shippingFee =
    SHIPPING_OPTIONS.find((o) => o.id === shippingMethod)?.price ?? 0;
  const orderTotal = total + shippingFee;

  function validateAddress() {
    const { fullName, phone, address: addr, district, city } = address;
    if (!fullName || !phone || !addr || !district || !city) {
      setAddressError("Vui lòng điền đầy đủ thông tin giao hàng");
      return false;
    }
    if (!/^[0-9]{9,11}$/.test(phone.replace(/\s/g, ""))) {
      setAddressError("Số điện thoại không hợp lệ");
      return false;
    }
    setAddressError("");
    return true;
  }

  function nextStep() {
    if (step === "address" && validateAddress()) setStep("shipping");
    else if (step === "shipping") setStep("payment");
  }

  function prevStep() {
    if (step === "shipping") setStep("address");
    else if (step === "payment") setStep("shipping");
  }

  async function handlePlaceOrder() {
    if (!token) {
      router.push("/login?redirect=/checkout");
      return;
    }

    setSubmitting(true);
    try {
      const res = await createOrder(
        {
          status: "pending",
          total: orderTotal,
          items: items.map((i) => ({
            productId: i.productId,
            name: i.name,
            slug: i.slug,
            price: i.price,
            quantity: i.quantity,
            image: i.image,
          })),
          shippingAddress: address,
          paymentMethod,
        },
        token,
      );
      clearCart();
      router.push(`/orders/${res.data.id}`);
    } catch {
      alert("Đặt hàng thất bại. Vui lòng thử lại.");
    } finally {
      setSubmitting(false);
    }
  }

  // Step labels
  const steps: { id: Step; label: string }[] = [
    { id: "address", label: "Địa chỉ" },
    { id: "shipping", label: "Vận chuyển" },
    { id: "payment", label: "Thanh toán" },
  ];
  const stepIndex = steps.findIndex((s) => s.id === step);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-2xl sm:text-3xl font-serif font-bold text-warm-800 mb-8">
        Thanh toán
      </h1>

      {/* Step indicators */}
      <div className="flex items-center gap-2 mb-8">
        {steps.map((s, i) => (
          <div key={s.id} className="flex items-center gap-2">
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                i <= stepIndex
                  ? "bg-warm-800 text-white"
                  : "bg-warm-200 text-warm-500"
              }`}
            >
              {i + 1}
            </div>
            <span
              className={`text-sm font-medium ${
                i === stepIndex ? "text-warm-800" : "text-muted-foreground"
              }`}
            >
              {s.label}
            </span>
            {i < steps.length - 1 && (
              <div
                className={`h-px w-8 ${i < stepIndex ? "bg-warm-800" : "bg-warm-200"}`}
              />
            )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Step: Address */}
          {step === "address" && (
            <div className="bg-white rounded-2xl border border-warm-100 p-6 space-y-4">
              <h2 className="font-semibold text-warm-800">Địa chỉ giao hàng</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label>Họ và tên</Label>
                  <Input
                    value={address.fullName}
                    onChange={(e) =>
                      setAddress((p) => ({ ...p, fullName: e.target.value }))
                    }
                    placeholder="Nguyễn Văn A"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>Số điện thoại</Label>
                  <Input
                    value={address.phone}
                    onChange={(e) =>
                      setAddress((p) => ({ ...p, phone: e.target.value }))
                    }
                    placeholder="0901 234 567"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label>Địa chỉ cụ thể</Label>
                <Input
                  value={address.address}
                  onChange={(e) =>
                    setAddress((p) => ({ ...p, address: e.target.value }))
                  }
                  placeholder="Số nhà, tên đường..."
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label>Quận / Huyện</Label>
                  <Input
                    value={address.district}
                    onChange={(e) =>
                      setAddress((p) => ({ ...p, district: e.target.value }))
                    }
                    placeholder="Quận 1"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>Tỉnh / Thành phố</Label>
                  <select
                    value={address.city}
                    onChange={(e) =>
                      setAddress((p) => ({ ...p, city: e.target.value }))
                    }
                    className="w-full h-9 px-3 py-1 text-sm rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="">Chọn tỉnh/thành phố</option>
                    {CITIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              {addressError && (
                <p className="text-sm text-destructive">{addressError}</p>
              )}
            </div>
          )}

          {/* Step: Shipping */}
          {step === "shipping" && (
            <div className="bg-white rounded-2xl border border-warm-100 p-6">
              <h2 className="font-semibold text-warm-800 mb-4">
                Phương thức vận chuyển
              </h2>
              <RadioGroup
                value={shippingMethod}
                onValueChange={setShippingMethod}
                className="space-y-3"
              >
                {SHIPPING_OPTIONS.map((opt) => (
                  <label
                    key={opt.id}
                    htmlFor={opt.id}
                    className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-colors ${
                      shippingMethod === opt.id
                        ? "border-warm-800 bg-warm-50"
                        : "border-warm-200 hover:border-warm-400"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value={opt.id} id={opt.id} />
                      <div>
                        <p className="font-medium text-sm text-warm-800">
                          {opt.label}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {opt.sublabel}
                        </p>
                      </div>
                    </div>
                    <span className="text-sm font-semibold text-warm-800">
                      {opt.price === 0 ? "Miễn phí" : formatVND(opt.price)}
                    </span>
                  </label>
                ))}
              </RadioGroup>
            </div>
          )}

          {/* Step: Payment */}
          {step === "payment" && (
            <div className="bg-white rounded-2xl border border-warm-100 p-6">
              <h2 className="font-semibold text-warm-800 mb-4">
                Phương thức thanh toán
              </h2>
              <RadioGroup
                value={paymentMethod}
                onValueChange={setPaymentMethod}
                className="space-y-3"
              >
                {[
                  {
                    id: "cod",
                    label: "Thanh toán khi nhận hàng (COD)",
                    sublabel: "Tiền mặt hoặc thẻ khi giao đến",
                  },
                  {
                    id: "bank",
                    label: "Chuyển khoản ngân hàng",
                    sublabel: "Chúng tôi sẽ gửi thông tin tài khoản qua email",
                  },
                ].map((opt) => (
                  <label
                    key={opt.id}
                    htmlFor={opt.id}
                    className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-colors ${
                      paymentMethod === opt.id
                        ? "border-warm-800 bg-warm-50"
                        : "border-warm-200 hover:border-warm-400"
                    }`}
                  >
                    <RadioGroupItem value={opt.id} id={opt.id} />
                    <div>
                      <p className="font-medium text-sm text-warm-800">
                        {opt.label}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {opt.sublabel}
                      </p>
                    </div>
                  </label>
                ))}
              </RadioGroup>
            </div>
          )}

          {/* Navigation buttons */}
          <div className="flex justify-between gap-3">
            {stepIndex > 0 ? (
              <Button variant="outline" onClick={prevStep}>
                ← Quay lại
              </Button>
            ) : (
              <Button variant="outline" asChild>
                <Link href="/cart">← Giỏ hàng</Link>
              </Button>
            )}
            {step !== "payment" ? (
              <Button
                onClick={nextStep}
                className="bg-warm-800 hover:bg-warm-900 text-white"
              >
                Tiếp tục →
              </Button>
            ) : (
              <Button
                onClick={handlePlaceOrder}
                disabled={submitting}
                className="bg-earth-500 hover:bg-earth-600 text-white px-8"
              >
                {submitting ? "Đang đặt hàng..." : "Đặt hàng"}
              </Button>
            )}
          </div>
        </div>

        {/* Right: Order summary */}
        <div className="lg:sticky lg:top-24 self-start">
          <div className="bg-white rounded-2xl border border-warm-100 p-6">
            <h2 className="font-semibold text-warm-800 mb-4">
              Đơn hàng ({items.length} sản phẩm)
            </h2>
            <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
              {items.map((item) => (
                <div
                  key={`${item.productId}-${item.variant}`}
                  className="flex gap-3"
                >
                  <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-warm-100 flex-shrink-0">
                    {item.image && (
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="56px"
                        className="object-cover"
                      />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-warm-800 line-clamp-2">
                      {item.name}
                    </p>
                    {item.variant && (
                      <p className="text-xs text-muted-foreground">
                        {item.variant}
                      </p>
                    )}
                    <p className="text-xs text-warm-700 mt-0.5">
                      {formatVND(item.price)} × {item.quantity}
                    </p>
                  </div>
                  <p className="text-xs font-semibold text-warm-900 flex-shrink-0">
                    {formatVND(item.price * item.quantity)}
                  </p>
                </div>
              ))}
            </div>
            <Separator className="my-4" />
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Tạm tính</span>
                <span>{formatVND(total)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Phí vận chuyển</span>
                <span>
                  {shippingFee === 0 ? "Miễn phí" : formatVND(shippingFee)}
                </span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold text-warm-900">
                <span>Tổng cộng</span>
                <span>{formatVND(orderTotal)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
