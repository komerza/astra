"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CreditCard, X, Mail } from "lucide-react";
import { useNotifications } from "./notification-system";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  couponCode?: string;
}

export function CheckoutModal({
  isOpen,
  onClose,
  couponCode = undefined,
}: CheckoutModalProps) {
  const { addNotification } = useNotifications();
  const [email, setEmail] = useState("");
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  if (!isOpen) return null;

  const waitForKomerza = async (maxAttempts = 50) => {
    for (let i = 0; i < maxAttempts; i++) {
      if (
        globalThis.komerza &&
        typeof globalThis.komerza.checkout === "function"
      ) {
        return true;
      }
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    return false;
  };

  const processCheckout = async () => {
    if (!email.trim()) {
      addNotification({
        type: "error",
        title: "Email Required",
        message: "Please enter your email address to continue.",
        duration: 3000,
      });
      return;
    }

    console.log("Starting checkout process...");
    setIsCheckingOut(true);

    try {
      // Wait for komerza API to be available
      console.log("Waiting for Komerza API...");
      const isReady = await waitForKomerza();

      if (!isReady) {
        throw new Error(
          "Komerza API failed to load. Please refresh the page and try again."
        );
      }

      console.log("globalThis.komerza:", globalThis.komerza);
      console.log("Available methods:", Object.keys(globalThis.komerza));

      console.log("Calling komerza.checkout with:", {
        emailAddress: email.trim(),
        couponCode: couponCode?.trim(),
      });

      if (!couponCode) {
        couponCode = undefined;
      }

      const result = await globalThis.komerza.checkout(
        email.trim(),
        couponCode?.trim()
      );

      console.log("Checkout result:", result);

      addNotification({
        type: "success",
        title: "Checkout Started!",
        message: "Redirecting to payment...",
        duration: 3000,
      });
      onClose();
      setEmail("");
    } catch (error) {
      console.error("Checkout error:", error);
      addNotification({
        type: "error",
        title: "Checkout Failed",
        message: `Unable to start checkout: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
        duration: 5000,
      });
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Modal Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-theme-primary border border-theme rounded-2xl shadow-2xl w-full max-w-md p-6 animate-in fade-in-0 zoom-in-95 duration-200">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-theme-primary text-lg font-semibold">Checkout</h3>
          <Button
            onClick={onClose}
            className="bg-transparent hover:bg-theme-secondary text-theme-primary h-8 w-8 p-0 rounded-md transition-all duration-300"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-theme-primary text-sm font-medium mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-theme-secondary w-4 h-4" />
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="pl-10 bg-theme-secondary border-theme text-theme-primary placeholder:text-theme-secondary h-12 rounded-md focus:ring-2 focus:ring-[#3B82F6]/20 focus:border-[#3B82F6]/50"
                onKeyDown={(e) => e.key === "Enter" && processCheckout()}
                autoFocus
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              onClick={onClose}
              className="flex-1 bg-transparent border border-theme text-theme-primary hover:bg-theme-secondary h-12 rounded-md transition-all duration-300"
            >
              Cancel
            </Button>
            <Button
              onClick={processCheckout}
              disabled={isCheckingOut || !email.trim()}
              className="flex-1 bg-[#3B82F6] text-white hover:bg-[#2563EB] h-12 px-4 rounded-md flex items-center justify-center gap-2 text-sm transition-all duration-300 disabled:opacity-50"
            >
              <CreditCard className="w-4 h-4" />
              {isCheckingOut ? "Processing..." : "Continue to Payment"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
