import Link from "next/link";
import { Package } from "lucide-react";

interface Props {
  searchParams: Promise<{ id?: string }>;
}

export default async function OrderSuccessPage({ searchParams }: Props) {
  const { id } = await searchParams;
  const orderNumber = id ?? "N/A";

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[#FAFAFA]">
      <div className="flex flex-col items-center text-center max-w-md w-full">
        {/* Animated SVG checkmark */}
        <svg
          width="96"
          height="96"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ animation: "bounceOnce 0.7s cubic-bezier(0.36,0.07,0.19,0.97) both" }}
        >
          <circle
            cx="50"
            cy="50"
            r="46"
            stroke="#2EC1AC"
            strokeWidth="4"
            strokeDasharray="289"
            strokeDashoffset="289"
            strokeLinecap="round"
            style={{ animation: "drawCircle 0.6s ease-out 0.1s forwards" }}
          />
          <path
            d="M 27 51 L 42 66 L 73 34"
            stroke="#2EC1AC"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="80"
            strokeDashoffset="80"
            style={{ animation: "drawCheck 0.4s ease-out 0.6s forwards" }}
          />
        </svg>

        <h1 className="text-3xl font-semibold mt-8 text-center">
          Order Placed Successfully!
        </h1>
        <p className="text-[#807D7E] mt-2">
          Thank you! Your order is confirmed.
        </p>

        <div className="font-mono bg-[#F3F5F7] px-4 py-2 rounded-lg mt-4 text-sm">
          Order #{orderNumber}
        </div>

        <div className="flex items-center gap-2 mt-6">
          <Package size={16} className="text-[#807D7E]" />
          <span className="text-sm text-[#807D7E]">
            Estimated delivery: 3-5 business days
          </span>
        </div>

        <div className="flex gap-4 mt-8 w-full">
          <button className="flex-1 h-12 rounded-sm border border-[#1C1C1C] text-sm font-medium text-[#1C1C1C] hover:bg-[#F3F5F7] transition-colors">
            Track Order
          </button>
          <Link
            href="/shop"
            className="flex-1 h-12 rounded-sm bg-[#1C1C1C] text-sm font-medium text-white hover:bg-[#2d2d2d] transition-colors flex items-center justify-center"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
