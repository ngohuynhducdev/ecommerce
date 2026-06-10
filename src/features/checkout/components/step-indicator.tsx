"use client";

import { cn } from "@/lib/utils";

interface Props {
  step: 1 | 2 | 3;
}

const STEPS = [
  { num: 1, label: "Shopping cart" },
  { num: 2, label: "Checkout details" },
  { num: 3, label: "Order complete" },
] as const;

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export function StepIndicator({ step }: Props) {
  return (
    <div className="mb-10">
      <div className="flex items-start">
        {STEPS.map((s, index) => {
          const isDone = s.num < step;
          const isActive = s.num === step;

          return (
            <div key={s.num} className="flex items-center">
              <div className="flex flex-col">
                <div className="flex items-center gap-2 pb-2">
                  <div className={cn(
                    "w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold shrink-0",
                    isDone ? "bg-sale-hover text-white" :
                    isActive ? "bg-primary text-white" :
                    "bg-[#D9D9D9] text-white"
                  )}>
                    {isDone ? <CheckIcon /> : s.num}
                  </div>
                  <span className={cn(
                    "text-sm hidden sm:block",
                    isDone ? "text-sale-hover font-medium" :
                    isActive ? "text-primary font-semibold" :
                    "text-muted"
                  )}>
                    {s.label}
                  </span>
                </div>
                <div className={cn(
                  "h-0.5 rounded-full",
                  isDone ? "bg-sale-hover" :
                  isActive ? "bg-primary" :
                  "bg-transparent"
                )} />
              </div>

              {index < STEPS.length - 1 && (
                <div className="w-6 sm:w-12 lg:w-20 h-px bg-[#D9D9D9] mx-1 mb-2 shrink-0" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
