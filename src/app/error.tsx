"use client";

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ reset }: Props) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-8">
      <p className="text-9xl font-bold text-line leading-none select-none">!</p>
      <h1 className="text-2xl font-semibold mt-4">Something went wrong</h1>
      <p className="text-subtle mt-2 max-w-sm">
        An unexpected error occurred. Please try again.
      </p>
      <button
        onClick={reset}
        className="mt-8 h-11 px-6 bg-ink text-white text-sm font-medium rounded-sm hover:bg-ink-hover transition-colors"
      >
        Try Again
      </button>
    </div>
  );
}
