"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useSetAtom } from "jotai";
import { toast } from "sonner";

import { reviewsAtom } from "../atoms";
import type { Review } from "../types";

const schema = z.object({
  author: z.string().min(1, "Please enter your name"),
  rating: z.number().min(1, "Please pick a rating").max(5),
  comment: z.string().min(10, "Review must be at least 10 characters"),
});

type FormData = z.infer<typeof schema>;

function StarIcon({ filled, size = 24 }: { filled: boolean; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? "var(--color-star)" : "var(--color-border)"}
      stroke={filled ? "var(--color-star)" : "var(--color-border)"}
      strokeWidth={1}
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

interface ReviewFormProps {
  productId: string;
}

export function ReviewForm({ productId }: ReviewFormProps) {
  const setReviews = useSetAtom(reviewsAtom);
  const [hovered, setHovered] = useState(0);
  const [rating, setRating] = useState(0);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { author: "", rating: 0, comment: "" },
  });

  function pickRating(value: number) {
    setRating(value);
    setValue("rating", value, { shouldValidate: true });
  }

  function onSubmit(data: FormData) {
    const review: Review = {
      id: crypto.randomUUID(),
      productId,
      author: data.author.trim(),
      rating: data.rating,
      comment: data.comment.trim(),
      createdAt: new Date().toISOString(),
    };

    setReviews((prev) => ({
      ...prev,
      [productId]: [review, ...(prev[productId] ?? [])],
    }));

    toast.success("Thanks! Your review has been posted.");
    reset();
    setRating(0);
    setHovered(0);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mb-8 space-y-4">
      {/* Star picker */}
      <div>
        <div className="flex items-center gap-1" role="radiogroup" aria-label="Rating">
          {[1, 2, 3, 4, 5].map((s) => (
            <button
              key={s}
              type="button"
              aria-label={`${s} star${s === 1 ? "" : "s"}`}
              aria-checked={rating === s}
              role="radio"
              onClick={() => pickRating(s)}
              onMouseEnter={() => setHovered(s)}
              onMouseLeave={() => setHovered(0)}
              className="cursor-pointer p-0.5"
            >
              <StarIcon filled={s <= (hovered || rating)} />
            </button>
          ))}
        </div>
        {errors.rating && (
          <p className="text-sm text-red-500 mt-1">{errors.rating.message}</p>
        )}
      </div>

      {/* Name */}
      <div>
        <input
          {...register("author")}
          type="text"
          placeholder="Your name"
          className="w-full border border-border rounded-lg px-4 h-11 text-sm outline-none focus:border-primary transition-colors placeholder:text-muted"
        />
        {errors.author && (
          <p className="text-sm text-red-500 mt-1">{errors.author.message}</p>
        )}
      </div>

      {/* Comment */}
      <div>
        <textarea
          {...register("comment")}
          rows={4}
          placeholder="Share your thoughts about this product"
          className="w-full border border-border rounded-lg px-4 py-3 text-sm outline-none focus:border-primary transition-colors placeholder:text-muted resize-none"
        />
        {errors.comment && (
          <p className="text-sm text-red-500 mt-1">{errors.comment.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="h-11 px-6 bg-primary text-white text-sm rounded-lg hover:bg-accent transition-colors cursor-pointer disabled:opacity-60"
      >
        Write Review
      </button>
    </form>
  );
}
