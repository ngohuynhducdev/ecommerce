"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAtom, useSetAtom } from "jotai";
import { Truck, Zap, Clock } from "lucide-react";

import {
  shippingDataAtom,
  shippingMethodAtom,
  checkoutStepAtom,
  SHIPPING_COSTS,
  type ShippingMethod,
} from "@/features/checkout/atoms";
import { cn, formatPrice } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const shippingSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .regex(/^[0-9+\-\s()]{7,}$/, "Invalid phone number"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zipCode: z.string().min(1, "ZIP code is required"),
  country: z.string().min(1, "Country is required"),
  notes: z.string().optional(),
});

type ShippingForm = z.infer<typeof shippingSchema>;

const COUNTRIES = [
  "United States",
  "Canada",
  "United Kingdom",
  "Germany",
  "France",
  "Italy",
  "Spain",
  "Australia",
  "Japan",
  "Vietnam",
];

const SHIPPING_OPTIONS: Array<{
  value: ShippingMethod;
  label: string;
  duration: string;
  Icon: typeof Truck;
}> = [
  {
    value: "standard",
    label: "Standard",
    duration: "5-7 business days",
    Icon: Truck,
  },
  {
    value: "express",
    label: "Express",
    duration: "2-3 business days",
    Icon: Zap,
  },
  {
    value: "nextday",
    label: "Next Day",
    duration: "Next business day",
    Icon: Clock,
  },
];

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="text-xs text-red-500 mt-1">{message}</p>;
}

export function ShippingStep() {
  const [shippingData, setShippingData] = useAtom(shippingDataAtom);
  const [shippingMethod, setShippingMethod] = useAtom(shippingMethodAtom);
  const setStep = useSetAtom(checkoutStepAtom);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ShippingForm>({
    resolver: zodResolver(shippingSchema),
    defaultValues: shippingData
      ? { ...shippingData, notes: "" }
      : { country: "United States" },
  });

  function onSubmit(data: ShippingForm) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { notes: _notes, ...address } = data;
    setShippingData(address);
    setStep(2);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <h2 className="text-2xl font-semibold text-[#1C1C1C] mb-6">
        Shipping Address
      </h2>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="firstName">First Name *</Label>
          <Input
            id="firstName"
            {...register("firstName")}
            className="mt-1.5"
          />
          <FieldError message={errors.firstName?.message} />
        </div>
        <div>
          <Label htmlFor="lastName">Last Name *</Label>
          <Input id="lastName" {...register("lastName")} className="mt-1.5" />
          <FieldError message={errors.lastName?.message} />
        </div>

        <div>
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            {...register("email")}
            className="mt-1.5"
          />
          <FieldError message={errors.email?.message} />
        </div>
        <div>
          <Label htmlFor="phone">Phone *</Label>
          <Input
            id="phone"
            type="tel"
            {...register("phone")}
            className="mt-1.5"
          />
          <FieldError message={errors.phone?.message} />
        </div>

        <div className="col-span-2">
          <Label htmlFor="address">Address *</Label>
          <Input id="address" {...register("address")} className="mt-1.5" />
          <FieldError message={errors.address?.message} />
        </div>

        <div>
          <Label htmlFor="city">City *</Label>
          <Input id="city" {...register("city")} className="mt-1.5" />
          <FieldError message={errors.city?.message} />
        </div>
        <div>
          <Label htmlFor="state">State *</Label>
          <Input id="state" {...register("state")} className="mt-1.5" />
          <FieldError message={errors.state?.message} />
        </div>

        <div>
          <Label htmlFor="zipCode">ZIP *</Label>
          <Input id="zipCode" {...register("zipCode")} className="mt-1.5" />
          <FieldError message={errors.zipCode?.message} />
        </div>
        <div>
          <Label>Country *</Label>
          <Controller
            name="country"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="mt-1.5">
                  <SelectValue placeholder="Select a country" />
                </SelectTrigger>
                <SelectContent>
                  {COUNTRIES.map((country) => (
                    <SelectItem key={country} value={country}>
                      {country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          <FieldError message={errors.country?.message} />
        </div>

        <div className="col-span-2">
          <Label htmlFor="notes">Order Notes (optional)</Label>
          <textarea
            id="notes"
            rows={3}
            {...register("notes")}
            className="mt-1.5 flex w-full rounded-md border border-[#E8ECEF] bg-white px-3 py-2 text-sm outline-none focus:border-[#1C1C1C] transition-colors resize-none"
          />
        </div>
      </div>

      <h2 className="text-xl font-semibold text-[#1C1C1C] mt-10 mb-4">
        Shipping Method
      </h2>
      <div className="space-y-3">
        {SHIPPING_OPTIONS.map((option) => {
          const selected = shippingMethod === option.value;
          const price = SHIPPING_COSTS[option.value];
          return (
            <label
              key={option.value}
              className={cn(
                "flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition-colors",
                selected
                  ? "border-[#1C1C1C] bg-[#F3F5F7]"
                  : "border-[#E8ECEF] hover:border-[#807D7E]"
              )}
            >
              <input
                type="radio"
                name="shippingMethod"
                value={option.value}
                checked={selected}
                onChange={() => setShippingMethod(option.value)}
                className="w-4 h-4 accent-[#1C1C1C]"
              />
              <option.Icon className="w-5 h-5 text-[#1C1C1C]" />
              <div className="flex-1">
                <p className="font-medium text-[#1C1C1C]">{option.label}</p>
                <p className="text-sm text-[#807D7E]">{option.duration}</p>
              </div>
              <p className="font-medium text-[#1C1C1C]">
                {price === 0 ? "Free" : formatPrice(price)}
              </p>
            </label>
          );
        })}
      </div>

      <button
        type="submit"
        className="w-full h-14 bg-[#1C1C1C] text-white text-sm font-medium mt-8 rounded-sm hover:bg-[#333] transition-colors cursor-pointer"
      >
        Continue to Payment
      </button>
    </form>
  );
}
