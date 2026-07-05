"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

const schema = z
  .object({
    firstName: z.string().min(1, "Required"),
    lastName: z.string().min(1, "Required"),
    displayName: z.string().min(1, "Required"),
    email: z.string().email("Invalid email"),
    oldPassword: z.string().optional(),
    newPassword: z.string().optional(),
    repeatPassword: z.string().optional(),
  })
  .refine((d) => !d.newPassword || d.newPassword.length >= 6, {
    message: "At least 6 characters",
    path: ["newPassword"],
  })
  .refine((d) => d.newPassword === d.repeatPassword, {
    message: "Passwords do not match",
    path: ["repeatPassword"],
  });

type FormData = z.infer<typeof schema>;

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label className="block text-xs font-medium text-[#1C1C1C] uppercase tracking-wide mb-2">
      {children}
    </label>
  );
}

const inputClass =
  "w-full h-12 border border-[#E8ECEF] rounded-lg px-4 text-sm outline-none focus:border-[#1C1C1C] transition-colors placeholder:text-[#807D7E]";

export default function AccountPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = () => {
    toast.success("Changes saved");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl">
      <h2 className="text-xl font-semibold text-[#1C1C1C] mb-6">Account Details</h2>

      <div className="space-y-5">
        <div>
          <Label>First Name *</Label>
          <input {...register("firstName")} placeholder="First name" className={inputClass} />
          {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>}
        </div>
        <div>
          <Label>Last Name *</Label>
          <input {...register("lastName")} placeholder="Last name" className={inputClass} />
          {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>}
        </div>
        <div>
          <Label>Display Name *</Label>
          <input {...register("displayName")} placeholder="Display name" className={inputClass} />
          <p className="text-xs text-[#807D7E] mt-1.5">
            This will be how your name will be displayed in the account section and in reviews
          </p>
          {errors.displayName && <p className="text-red-500 text-xs mt-1">{errors.displayName.message}</p>}
        </div>
        <div>
          <Label>Email *</Label>
          <input {...register("email")} type="email" placeholder="Email" className={inputClass} />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
        </div>
      </div>

      <h2 className="text-xl font-semibold text-[#1C1C1C] mt-10 mb-6">Password</h2>

      <div className="space-y-5">
        <div>
          <Label>Old Password</Label>
          <input {...register("oldPassword")} type="password" placeholder="Old password" className={inputClass} />
        </div>
        <div>
          <Label>New Password</Label>
          <input {...register("newPassword")} type="password" placeholder="New password" className={inputClass} />
          {errors.newPassword && <p className="text-red-500 text-xs mt-1">{errors.newPassword.message}</p>}
        </div>
        <div>
          <Label>Repeat New Password</Label>
          <input {...register("repeatPassword")} type="password" placeholder="Repeat new password" className={inputClass} />
          {errors.repeatPassword && <p className="text-red-500 text-xs mt-1">{errors.repeatPassword.message}</p>}
        </div>
      </div>

      <button
        type="submit"
        className="mt-8 h-12 px-8 bg-[#1C1C1C] text-white text-sm font-medium rounded-lg hover:bg-[#B88E2F] transition-colors cursor-pointer"
      >
        Save changes
      </button>
    </form>
  );
}
