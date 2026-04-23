"use client";

import { useState } from "react";
import { useSetAtom } from "jotai";
import { ArrowLeft, CreditCard, Building2 } from "lucide-react";
import { toast } from "sonner";

import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  checkoutStepAtom,
  paymentDataAtom,
  type PaymentType,
} from "@/features/checkout/atoms";

function formatCardNumber(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 16);
  const groups = digits.match(/.{1,4}/g);
  return groups ? groups.join(" ") : "";
}

function formatExpiry(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  if (digits.length < 3) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
}

export function PaymentStep() {
  const setStep = useSetAtom(checkoutStepAtom);
  const setPaymentData = useSetAtom(paymentDataAtom);

  const [tab, setTab] = useState<PaymentType>("card");
  const [cardNumber, setCardNumber] = useState("");
  const [cardholder, setCardholder] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [saveCard, setSaveCard] = useState(false);

  function handleReview() {
    if (tab === "card") {
      const digits = cardNumber.replace(/\D/g, "");
      if (digits.length !== 16) {
        toast.error("Please enter a valid 16-digit card number");
        return;
      }
      if (!cardholder.trim()) {
        toast.error("Please enter the cardholder name");
        return;
      }
      if (!/^\d{2}\/\d{2}$/.test(expiry)) {
        toast.error("Please enter expiry as MM/YY");
        return;
      }
      if (cvv.length < 3) {
        toast.error("Please enter a valid CVV");
        return;
      }
      setPaymentData({
        type: "card",
        lastFour: digits.slice(-4),
        cardholderName: cardholder.trim(),
      });
    } else {
      setPaymentData({ type: tab });
    }
    setStep(3);
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold text-[#1C1C1C] mb-6">
        Payment Method
      </h2>

      <Tabs value={tab} onValueChange={(v) => setTab(v as PaymentType)}>
        <TabsList className="bg-transparent p-0 gap-2 h-auto mb-6 flex-wrap">
          <TabsTrigger
            value="card"
            className="rounded-sm px-4 py-2 text-sm border border-[#E8ECEF] data-[state=active]:bg-[#1C1C1C] data-[state=active]:text-white data-[state=active]:border-[#1C1C1C]"
          >
            <CreditCard className="w-4 h-4 mr-2" />
            Credit Card
          </TabsTrigger>
          <TabsTrigger
            value="paypal"
            className="rounded-sm px-4 py-2 text-sm border border-[#E8ECEF] data-[state=active]:bg-[#1C1C1C] data-[state=active]:text-white data-[state=active]:border-[#1C1C1C]"
          >
            PayPal
          </TabsTrigger>
          <TabsTrigger
            value="bank"
            className="rounded-sm px-4 py-2 text-sm border border-[#E8ECEF] data-[state=active]:bg-[#1C1C1C] data-[state=active]:text-white data-[state=active]:border-[#1C1C1C]"
          >
            <Building2 className="w-4 h-4 mr-2" />
            Bank Transfer
          </TabsTrigger>
        </TabsList>

        <TabsContent value="card" className="space-y-4">
          <div>
            <Label htmlFor="cardNumber">Card Number</Label>
            <Input
              id="cardNumber"
              inputMode="numeric"
              placeholder="XXXX XXXX XXXX XXXX"
              value={cardNumber}
              onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
              className="mt-1.5"
            />
          </div>
          <div>
            <Label htmlFor="cardholder">Cardholder Name</Label>
            <Input
              id="cardholder"
              value={cardholder}
              onChange={(e) => setCardholder(e.target.value)}
              className="mt-1.5"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="expiry">Expiry (MM/YY)</Label>
              <Input
                id="expiry"
                inputMode="numeric"
                placeholder="MM/YY"
                value={expiry}
                onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                maxLength={5}
                className="mt-1.5"
              />
            </div>
            <div>
              <Label htmlFor="cvv">CVV</Label>
              <Input
                id="cvv"
                type="password"
                inputMode="numeric"
                maxLength={3}
                value={cvv}
                onChange={(e) => setCvv(e.target.value.replace(/\D/g, ""))}
                className="mt-1.5"
              />
            </div>
          </div>
          <label className="flex items-center gap-2 cursor-pointer text-sm text-[#1C1C1C]">
            <input
              type="checkbox"
              checked={saveCard}
              onChange={(e) => setSaveCard(e.target.checked)}
              className="w-4 h-4 accent-[#1C1C1C]"
            />
            Save card for future orders
          </label>
        </TabsContent>

        <TabsContent value="paypal">
          <div className="bg-[#F3F5F7] rounded-xl p-6 flex items-start gap-4">
            <div className="w-12 h-12 rounded-lg bg-white border border-[#E8ECEF] flex items-center justify-center font-bold text-sm text-[#003087]">
              Pay<span className="text-[#009CDE]">Pal</span>
            </div>
            <div>
              <p className="font-medium text-[#1C1C1C]">
                Pay securely with PayPal
              </p>
              <p className="text-sm text-[#807D7E] mt-1">
                You&apos;ll be redirected to PayPal after reviewing your order
                to complete payment securely.
              </p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="bank">
          <div className="bg-[#F3F5F7] rounded-xl p-6">
            <p className="font-medium text-[#1C1C1C] mb-4">
              Bank Transfer Details
            </p>
            <table className="w-full text-sm">
              <tbody>
                <tr className="border-b border-[#E8ECEF]">
                  <td className="py-2 text-[#807D7E] w-40">Bank Name</td>
                  <td className="py-2 text-[#1C1C1C]">3legant Trust Bank</td>
                </tr>
                <tr className="border-b border-[#E8ECEF]">
                  <td className="py-2 text-[#807D7E]">Account Name</td>
                  <td className="py-2 text-[#1C1C1C]">3legant Furniture Co.</td>
                </tr>
                <tr className="border-b border-[#E8ECEF]">
                  <td className="py-2 text-[#807D7E]">Account Number</td>
                  <td className="py-2 text-[#1C1C1C]">1234 5678 9012 3456</td>
                </tr>
                <tr className="border-b border-[#E8ECEF]">
                  <td className="py-2 text-[#807D7E]">Routing / SWIFT</td>
                  <td className="py-2 text-[#1C1C1C]">3LEGANTXXX</td>
                </tr>
                <tr>
                  <td className="py-2 text-[#807D7E]">Reference</td>
                  <td className="py-2 text-[#1C1C1C]">
                    Your order number (emailed after placement)
                  </td>
                </tr>
              </tbody>
            </table>
            <p className="text-xs text-[#807D7E] mt-4">
              Your order will ship once the transfer is confirmed (usually 1-2
              business days).
            </p>
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex items-center gap-3 mt-8">
        <button
          type="button"
          onClick={() => setStep(1)}
          className="flex items-center gap-2 px-6 h-12 border border-[#E8ECEF] rounded-sm text-sm text-[#1C1C1C] hover:border-[#1C1C1C] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
        <button
          type="button"
          onClick={handleReview}
          className="flex-1 h-14 bg-[#1C1C1C] text-white text-sm font-medium rounded-sm hover:bg-[#333] transition-colors cursor-pointer"
        >
          Review Order
        </button>
      </div>
    </div>
  );
}
