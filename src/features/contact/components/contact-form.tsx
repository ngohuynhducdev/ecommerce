"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormData = z.infer<typeof schema>;

export function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async () => {
    await new Promise((r) => setTimeout(r, 600));
    toast.success("Message sent! We'll get back to you soon.");
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="block text-xs font-semibold uppercase tracking-widest text-primary mb-2">
          Full Name
        </label>
        <input
          {...register("name")}
          placeholder="Your Name"
          className="w-full h-12 border border-border rounded-lg px-4 text-sm outline-none focus:border-primary transition-colors placeholder:text-muted"
        />
        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-widest text-primary mb-2">
          Email Address
        </label>
        <input
          {...register("email")}
          type="email"
          placeholder="Your Email"
          className="w-full h-12 border border-border rounded-lg px-4 text-sm outline-none focus:border-primary transition-colors placeholder:text-muted"
        />
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-widest text-primary mb-2">
          Message
        </label>
        <textarea
          {...register("message")}
          rows={6}
          placeholder="Your message"
          className="w-full border border-border rounded-lg px-4 py-3 text-sm outline-none focus:border-primary transition-colors placeholder:text-muted resize-none"
        />
        {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-primary text-white text-sm font-medium px-10 py-3.5 rounded-sm hover:bg-accent transition-colors disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
      >
        {isSubmitting ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}
