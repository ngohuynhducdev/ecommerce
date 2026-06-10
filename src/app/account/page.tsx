"use client";

import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

function EyeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function XSmallIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

// ── Schemas ──────────────────────────────────────────────────────────────────

const profileSchema = z.object({
  firstName: z.string().min(1, "Required"),
  lastName: z.string().min(1, "Required"),
  email: z.string().email("Invalid email"),
  phone: z.string(),
  dateOfBirth: z.string(),
});

const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, "Required"),
    newPassword: z.string().min(6, "At least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((d) => d.newPassword === d.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type ProfileData = z.infer<typeof profileSchema>;
type PasswordData = z.infer<typeof passwordSchema>;

// ── Helpers ───────────────────────────────────────────────────────────────────

function getInitials(first: string, last: string): string {
  const f = first.trim()[0] ?? "";
  const l = last.trim()[0] ?? "";
  return (f + l).toUpperCase() || "U";
}

function InputField({
  label,
  error,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-primary mb-1.5">
        {label}
      </label>
      <input
        {...props}
        className="w-full h-11 border border-border rounded-lg px-4 text-sm outline-none focus:border-primary transition-colors placeholder:text-muted"
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}

// ── Personal Information Card ─────────────────────────────────────────────────

function PersonalInfoCard() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ProfileData>({ resolver: zodResolver(profileSchema) });

  const firstName = useWatch({ control, name: "firstName" }) ?? "";
  const lastName = useWatch({ control, name: "lastName" }) ?? "";

  const onSubmit = () => {
    toast.success("Profile updated successfully!");
  };

  return (
    <div className="bg-white border border-border rounded-2xl p-6">
      <h2 className="text-base font-semibold mb-5">Personal Information</h2>

      {/* Avatar */}
      <div className="flex flex-col items-center mb-6">
        <div className="w-20 h-20 rounded-full bg-subtle flex items-center justify-center font-semibold text-2xl text-primary select-none">
          {getInitials(firstName, lastName)}
        </div>
        <button
          type="button"
          className="text-sm text-muted mt-2 hover:text-primary transition-colors"
        >
          Change Photo
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <InputField
            label="First Name"
            placeholder="John"
            {...register("firstName")}
            error={errors.firstName?.message}
          />
          <InputField
            label="Last Name"
            placeholder="Doe"
            {...register("lastName")}
            error={errors.lastName?.message}
          />
        </div>
        <InputField
          label="Email Address"
          type="email"
          placeholder="john@example.com"
          {...register("email")}
          error={errors.email?.message}
        />
        <InputField
          label="Phone Number"
          type="tel"
          placeholder="+1 (555) 000-0000"
          {...register("phone")}
        />
        <InputField
          label="Date of Birth"
          type="date"
          {...register("dateOfBirth")}
        />
        <button
          type="submit"
          className="mt-4 h-11 px-6 bg-primary text-white text-sm font-medium rounded-lg hover:bg-accent transition-colors"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}

// ── Change Password Card ──────────────────────────────────────────────────────

function ChangePasswordCard() {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<PasswordData>({ resolver: zodResolver(passwordSchema) });

  const newPwd = useWatch({ control, name: "newPassword" }) ?? "";

  const requirements = [
    { label: "8+ characters", met: newPwd.length >= 8 },
    { label: "Uppercase letter", met: /[A-Z]/.test(newPwd) },
    { label: "Number", met: /[0-9]/.test(newPwd) },
    { label: "Symbol", met: /[^A-Za-z0-9]/.test(newPwd) },
  ];

  const onSubmit = () => {
    toast.success("Password updated successfully!");
    reset();
  };

  return (
    <div className="bg-white border border-border rounded-2xl p-6">
      <h2 className="text-base font-semibold mb-5">Change Password</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Current password */}
        <div>
          <label className="block text-xs font-medium text-primary mb-1.5">
            Current Password
          </label>
          <div className="relative">
            <input
              {...register("currentPassword")}
              type={showCurrent ? "text" : "password"}
              placeholder="••••••••"
              className="w-full h-11 border border-border rounded-lg px-4 pr-12 text-sm outline-none focus:border-primary transition-colors placeholder:text-muted"
            />
            <button
              type="button"
              onClick={() => setShowCurrent((v) => !v)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted hover:text-primary transition-colors"
            >
              {showCurrent ? <EyeOffIcon /> : <EyeIcon />}
            </button>
          </div>
          {errors.currentPassword && (
            <p className="text-red-500 text-xs mt-1">
              {errors.currentPassword.message}
            </p>
          )}
        </div>

        {/* New password */}
        <div>
          <label className="block text-xs font-medium text-primary mb-1.5">
            New Password
          </label>
          <div className="relative">
            <input
              {...register("newPassword")}
              type={showNew ? "text" : "password"}
              placeholder="••••••••"
              className="w-full h-11 border border-border rounded-lg px-4 pr-12 text-sm outline-none focus:border-primary transition-colors placeholder:text-muted"
            />
            <button
              type="button"
              onClick={() => setShowNew((v) => !v)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted hover:text-primary transition-colors"
            >
              {showNew ? <EyeOffIcon /> : <EyeIcon />}
            </button>
          </div>
          {errors.newPassword && (
            <p className="text-red-500 text-xs mt-1">
              {errors.newPassword.message}
            </p>
          )}
        </div>

        {/* Confirm password */}
        <div>
          <label className="block text-xs font-medium text-primary mb-1.5">
            Confirm Password
          </label>
          <div className="relative">
            <input
              {...register("confirmPassword")}
              type={showConfirm ? "text" : "password"}
              placeholder="••••••••"
              className="w-full h-11 border border-border rounded-lg px-4 pr-12 text-sm outline-none focus:border-primary transition-colors placeholder:text-muted"
            />
            <button
              type="button"
              onClick={() => setShowConfirm((v) => !v)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted hover:text-primary transition-colors"
            >
              {showConfirm ? <EyeOffIcon /> : <EyeIcon />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-red-500 text-xs mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Requirements */}
        {newPwd.length > 0 && (
          <ul className="space-y-1.5 pt-1">
            {requirements.map(({ label, met }) => (
              <li
                key={label}
                className={`flex items-center gap-2 text-xs ${
                  met ? "text-green-600" : "text-muted"
                }`}
              >
                {met ? (
                  <span className="text-green-600 shrink-0"><CheckIcon /></span>
                ) : (
                  <span className="text-muted shrink-0"><XSmallIcon /></span>
                )}
                {label}
              </li>
            ))}
          </ul>
        )}

        <button
          type="submit"
          className="mt-4 h-11 px-6 bg-primary text-white text-sm font-medium rounded-lg hover:bg-accent transition-colors"
        >
          Update Password
        </button>
      </form>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function ProfilePage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">My Profile</h1>
      <div className="lg:grid lg:grid-cols-2 gap-6 space-y-6 lg:space-y-0">
        <PersonalInfoCard />
        <ChangePasswordCard />
      </div>
    </div>
  );
}
