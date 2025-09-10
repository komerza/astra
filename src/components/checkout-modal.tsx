"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CreditCard, X, Mail } from "lucide-react";
import { toast } from "sonner";

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
  const [email, setEmail] = useState("");
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);

  if (!isOpen) return null;

  const waitForKomerza = async (maxAttempts = 50) => {
    for (let i = 0; i < maxAttempts; i++) {
      if (
        (globalThis as any).komerza &&
        typeof (globalThis as any).komerza.checkout === "function"
      ) {
        return true;
      }
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    return false;
  };

  const processCheckout = async () => {
    if (!email.trim()) {
      toast.error("Email Required", {
        description: "Please enter your email address to continue.",
      });
      return;
    }

    setIsCheckingOut(true);

    try {
      // Wait for komerza API to be available
      const isReady = await waitForKomerza();

      if (!isReady) {
        throw new Error(
          "Komerza API failed to load. Please refresh the page and try again."
        );
      }

      if (!couponCode) {
        couponCode = undefined;
      }

      const result = await (globalThis as any).komerza.checkout(
        email.trim(),
        couponCode?.trim()
      );

      if (result.success) {
        console.log("Checkout result:", result);

        setIsCheckingOut(false);
        setIsRedirecting(true);
        setCheckoutUrl(result.url || null);

        // Auto-redirect after 2 seconds if URL is available
        if (result.url) {
          setTimeout(() => {
            window.location.href = result.url;
          }, 2000);
        }
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error("Checkout Failed", {
        description: `Unable to start checkout: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      });
      setIsCheckingOut(false);
    }
  };

  const handleManualRedirect = () => {
    if (checkoutUrl) {
      window.location.href = checkoutUrl;
    }
  };

  const handleClose = () => {
    if (!isCheckingOut && !isRedirecting) {
      onClose();
      setEmail("");
      setCheckoutUrl(null);
      setIsRedirecting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      />

      <div className="relative bg-theme-primary border border-theme rounded-2xl shadow-2xl w-full max-w-md p-6 animate-in fade-in-0 zoom-in-95 duration-200">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-theme-primary text-lg font-semibold">
            {isRedirecting ? "Redirecting to Checkout" : "Checkout"}
          </h3>
          <Button
            onClick={handleClose}
            disabled={isCheckingOut || isRedirecting}
            className="bg-transparent hover:bg-theme-secondary text-theme-primary h-8 w-8 p-0 rounded-md transition-all duration-300 outline-none focus:outline-none focus:ring-2 focus:ring-theme-secondary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        <div className="space-y-4">
          {isRedirecting ? (
            // Redirecting State
            <div className="text-center py-8">
              <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <h4 className="text-theme-primary text-lg font-medium mb-2">
                Redirecting to Payment
              </h4>
              <p className="text-theme-secondary text-sm mb-6">
                You will be redirected automatically in a few seconds...
              </p>
              {checkoutUrl && (
                <Button
                  onClick={handleManualRedirect}
                  className="bg-primary text-white hover:bg-primary-600 h-12 px-6 rounded-md transition-all duration-300 outline-none focus:outline-none focus:ring-2 focus:ring-primary-200"
                >
                  Continue Manually
                </Button>
              )}
            </div>
          ) : (
            // Email Input State
            <>
              <div>
                <label className="block text-theme-primary text-sm font-medium mb-3">
                  Email Address
                </label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-theme-secondary w-5 h-5 transition-colors duration-200 group-focus-within:text-primary" />
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="pl-12 pr-4 bg-theme-secondary border-2 border-gray-700 text-theme-primary placeholder:text-gray-400 h-14 rounded-xl focus:border-primary transition-all duration-200 outline-none focus:outline-none text-base font-medium shadow-sm hover:border-gray-600 focus:ring-0 ring-0"
                    onKeyDown={(e) => e.key === "Enter" && processCheckout()}
                    autoFocus
                    disabled={isCheckingOut}
                  />
                  <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-700/50 pointer-events-none group-focus-within:ring-primary/30 transition-all duration-200"></div>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  onClick={handleClose}
                  disabled={isCheckingOut}
                  className="flex-1 bg-transparent border border-theme text-theme-primary hover:bg-theme-secondary h-12 rounded-md transition-all duration-300 outline-none focus:outline-none focus:ring-2 focus:ring-theme-secondary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </Button>
                <Button
                  onClick={processCheckout}
                  disabled={isCheckingOut || !email.trim()}
                  className="flex-1 bg-primary text-white hover:bg-primary-600 h-12 px-4 rounded-md flex items-center justify-center gap-2 text-sm transition-all duration-300 outline-none focus:outline-none focus:ring-2 focus:ring-primary-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isCheckingOut ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-4 h-4" />
                      Continue to Payment
                    </>
                  )}
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
