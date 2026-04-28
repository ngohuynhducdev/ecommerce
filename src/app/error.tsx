"use client";

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ reset }: Props) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-8">
      <p className="text-9xl font-bold text-[#E8ECEF] leading-none select-none">!</p>
      <h1 className="text-2xl font-semibold mt-4">Something went wrong</h1>
      <p className="text-[#807D7E] mt-2 max-w-sm">
        An unexpected error occurred. Please try again.
      </p>
      <button
        onClick={reset}
        className="mt-8 h-11 px-6 bg-[#1C1C1C] text-white text-sm font-medium rounded-sm hover:bg-[#2d2d2d] transition-colors"
      >
        Try Again
      </button>
    </div>
  );
}
