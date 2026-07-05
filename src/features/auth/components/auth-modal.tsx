"use client";

import Image from "next/image";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { authModalOpenAtom, authModalViewAtom } from "../atoms";
import { SignInForm } from "./sign-in-form";
import { SignUpForm } from "./sign-up-form";

const PANEL_IMAGE =
  "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=800&fit=crop&auto=format&q=80";

export function AuthModal() {
  const [open, setOpen] = useAtom(authModalOpenAtom);
  const [view, setView] = useAtom(authModalViewAtom);
  const router = useRouter();

  const handleSuccess = () => {
    setOpen(false);
    router.refresh();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-4xl w-[calc(100%-2rem)] p-0 overflow-hidden gap-0 border-0 sm:rounded-2xl">
        <DialogTitle className="sr-only">
          {view === "sign-in" ? "Sign In" : "Sign Up"}
        </DialogTitle>

        <div className="grid lg:grid-cols-2 max-h-[90vh] overflow-y-auto">
          {/* Gray image panel — desktop only */}
          <div className="hidden lg:flex bg-mist flex-col">
            <div className="pt-8 flex justify-center">
              <span className="font-semibold text-xl tracking-tight text-ink select-none">
                3legant<span className="text-gold">.</span>
              </span>
            </div>
            <div className="flex-1 flex items-center justify-center p-10">
              <div className="relative w-full aspect-square">
                <Image
                  src={PANEL_IMAGE}
                  alt="Elegant furniture"
                  fill
                  sizes="50vw"
                  className="object-contain"
                />
              </div>
            </div>
          </div>

          {/* Form panel */}
          <div className="bg-white flex items-center justify-center px-8 py-12 sm:px-12">
            <div className="w-full max-w-sm">
              {view === "sign-in" ? (
                <SignInForm
                  onSwitch={() => setView("sign-up")}
                  onSuccess={handleSuccess}
                />
              ) : (
                <SignUpForm
                  onSwitch={() => setView("sign-in")}
                  onSuccess={handleSuccess}
                />
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
