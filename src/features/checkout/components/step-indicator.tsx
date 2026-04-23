"use client";

import { useAtomValue } from "jotai";
import { CheckCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { checkoutStepAtom } from "@/features/checkout/atoms";

const STEPS = [
  { num: 1, label: "Shipping" },
  { num: 2, label: "Payment" },
  { num: 3, label: "Review" },
] as const;

export function StepIndicator() {
  const current = useAtomValue(checkoutStepAtom);

  return (
    <div className="flex items-center justify-center gap-4 mb-12">
      {STEPS.map((step, index) => {
        const isActive = step.num === current;
        const isDone = step.num < current;
        const isReached = isActive || isDone;

        return (
          <div key={step.num} className="flex items-center gap-4">
            <div className="flex flex-col items-center gap-2">
              <div
                className={cn(
                  "w-9 h-9 rounded-full flex items-center justify-center text-sm font-medium transition-colors",
                  isReached
                    ? "bg-[#1C1C1C] text-white"
                    : "border-2 border-[#E8ECEF] text-[#807D7E]"
                )}
              >
                {isDone ? <CheckCheck className="w-4 h-4" /> : step.num}
              </div>
              <span
                className={cn(
                  "text-xs",
                  isReached ? "text-[#1C1C1C] font-medium" : "text-[#807D7E]"
                )}
              >
                {step.label}
              </span>
            </div>
            {index < STEPS.length - 1 && (
              <div className="h-px bg-[#E8ECEF] w-16 mb-6" />
            )}
          </div>
        );
      })}
    </div>
  );
}
