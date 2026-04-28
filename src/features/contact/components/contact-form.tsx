"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormData = z.infer<typeof schema>;

function InputField({
  label,
  error,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string; error?: string }) {
  return (
    <div>
      <label className="block text-xs font-medium text-[#1C1C1C] mb-1.5">
        {label} <span className="text-red-500">*</span>
      </label>
      <input
        {...props}
        className="w-full h-11 border border-[#E8ECEF] rounded-lg px-4 text-sm outline-none focus:border-[#1C1C1C] transition-colors placeholder:text-[#807D7E]"
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}

export function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (_data: FormData) => {
    await new Promise((r) => setTimeout(r, 600));
    toast.success("Message sent! We'll get back to you soon.");
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <InputField
          label="Name"
          placeholder="John Doe"
          {...register("name")}
          error={errors.name?.message}
        />
        <InputField
          label="Email"
          type="email"
          placeholder="john@example.com"
          {...register("email")}
          error={errors.email?.message}
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-[#1C1C1C] mb-1.5">
          Subject <span className="text-red-500">*</span>
        </label>
        <input
          {...register("subject")}
          placeholder="How can we help you?"
          className="w-full h-11 border border-[#E8ECEF] rounded-lg px-4 text-sm outline-none focus:border-[#1C1C1C] transition-colors placeholder:text-[#807D7E]"
        />
        {errors.subject && (
          <p className="text-red-500 text-xs mt-1">{errors.subject.message}</p>
        )}
      </div>

      <div>
        <label className="block text-xs font-medium text-[#1C1C1C] mb-1.5">
          Message <span className="text-red-500">*</span>
        </label>
        <textarea
          {...register("message")}
          rows={6}
          placeholder="Tell us more about your inquiry..."
          className="w-full border border-[#E8ECEF] rounded-lg px-4 py-3 text-sm outline-none focus:border-[#1C1C1C] transition-colors placeholder:text-[#807D7E] resize-none"
        />
        {errors.message && (
          <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full h-12 bg-[#1C1C1C] text-white text-sm font-medium rounded-sm hover:bg-[#2d2d2d] transition-colors disabled:opacity-60 disabled:cursor-not-allowed mt-4"
      >
        {isSubmitting ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}
