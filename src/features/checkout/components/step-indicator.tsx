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
      <div className="flex items-start justify-center gap-6 sm:gap-10 lg:gap-16">
        {STEPS.map((s) => {
          const isDone = s.num < step;
          const isActive = s.num === step;

          return (
            <div key={s.num} className="flex flex-col">
              <div className="flex items-center gap-2 pb-2">
                <div className={cn(
                  "w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold shrink-0",
                  isDone ? "bg-success text-white" :
                  isActive ? "bg-ink text-white" :
                  "bg-smoke text-white"
                )}>
                  {isDone ? <CheckIcon /> : s.num}
                </div>
                <span className={cn(
                  "text-sm",
                  isActive ? "block" : "hidden sm:block",
                  isDone ? "text-success font-medium" :
                  isActive ? "text-ink font-semibold" :
                  "text-subtle"
                )}>
                  {s.label}
                </span>
              </div>
              <div className={cn(
                "h-0.5 rounded-full",
                isDone ? "bg-success" :
                isActive ? "bg-ink" :
                "bg-transparent"
              )} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
