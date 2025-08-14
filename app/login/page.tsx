"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Mail,
  Shield,
  Home,
  Package,
  Activity,
  Loader2,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
} from "lucide-react";
import { CartButton } from "@/app/components/cart-button";
import { MobileNav } from "@/app/components/mobile-nav";
import { SearchButton } from "@/app/components/search-button";
import { ThemeToggle } from "@/app/components/theme-toggle";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState<"email" | "code">("email");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (globalThis.komerza.isSignedIn()) {
      window.location.href = "/dashboard";
    }
  }, []);

  const setSuccessMessage = (msg: string) => {
    setMessage(msg);
    setMessageType("success");
  };

  const setErrorMessage = (msg: string) => {
    setMessage(msg);
    setMessageType("error");
  };

  const sendCode = async () => {
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setErrorMessage("Please enter a valid email address");
      return;
    }
    setLoading(true);
    setMessage("");
    const res = await globalThis.komerza.login(email);
    setLoading(false);
    if (res.success) {
      setStep("code");
      setSuccessMessage("Verification code sent! Check your email.");
    } else {
      const invalid = res.invalidFields?.map((f: any) => f.reason).join(", ");
      setErrorMessage(
        res.message || invalid || "Failed to send verification code"
      );
    }
  };

  const verify = async () => {
    if (!code.trim()) {
      setErrorMessage("Please enter the verification code");
      return;
    }
    setLoading(true);
    setMessage("");
    const res = await globalThis.komerza.verifyLogin(email, code);
    setLoading(false);
    if (res.success) {
      setSuccessMessage("Welcome back! Redirecting...");
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 1000);
    } else {
      const invalid = res.invalidFields?.map((f: any) => f.reason).join(", ");
      setErrorMessage(res.message || invalid || "Invalid verification code");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      if (step === "email") {
        sendCode();
      } else {
        verify();
      }
    }
  };

  return (
    <div className="min-h-screen bg-theme-primary relative overflow-hidden">
      {/* Navigation Header - consistent with other pages */}
      <header className="h-16 flex items-center justify-between container mx-auto top-0 absolute inset-x-0 z-50 px-4 sm:px-6">
        <div className="flex items-center space-x-8">
          <Link href="/">
            <Image
              src="/kimera-logo.svg"
              alt="Komerza"
              width={138}
              height={55}
              className="h-8 sm:h-9 w-auto"
            />
          </Link>
          <div className="items-center gap-4 hidden md:flex">
            <Link
              href="/"
              className="text-theme-secondary hover:text-[#3B82F6] hover:bg-[#3B82F6]/10 flex items-center gap-2 rounded-md bg-transparent px-2.5 py-1.5 transition-colors duration-300"
            >
              <Home className="w-[18px] h-[18px]" />
              <span className="text-sm font-normal tracking-20-smaller">
                Home
              </span>
            </Link>
            <Link
              href="/products"
              className="text-theme-secondary hover:text-[#3B82F6] hover:bg-[#3B82F6]/10 flex items-center gap-2 rounded-md bg-transparent px-2.5 py-1.5 transition-colors duration-300"
            >
              <Package className="w-[18px] h-[18px]" />
              <span className="text-sm font-normal tracking-20-smaller">
                Products
              </span>
            </Link>
            <Link
              href="/status"
              className="text-theme-secondary hover:text-[#3B82F6] hover:bg-[#3B82F6]/10 flex items-center gap-2 rounded-md bg-transparent px-2.5 py-1.5 transition-colors duration-300"
            >
              <Activity className="w-[18px] h-[18px]" />
              <span className="text-sm font-normal tracking-20-smaller">
                Status
              </span>
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <SearchButton />
          <div className="hidden md:flex items-center gap-4">
            <CartButton />
            <ThemeToggle />
          </div>
          <MobileNav />
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto pt-24 px-4 sm:px-6">
        <div className="flex items-center justify-center min-h-[calc(100vh-6rem)]">
          <div className="w-full max-w-md">
            {/* Welcome Header */}
            <div className="text-center mb-8">
              <h1 className="text-theme-primary text-3xl sm:text-4xl font-semibold mb-2 heading-semibold">
                {step === "email" ? "Welcome Back" : "Verify Your Email"}
              </h1>
              <p className="text-theme-secondary text-sm">
                {step === "email"
                  ? "Enter your email to get started"
                  : "Check your email for the verification code"}
              </p>
            </div>

            {/* Login Card */}
            <Card className="bg-theme-secondary border-theme shadow-xl">
              <CardHeader className="text-center pb-6">
                <div className="mx-auto mb-4 p-3 rounded-full bg-[#3B82F6]/10">
                  {step === "email" ? (
                    <Mail className="w-6 h-6 text-[#3B82F6]" />
                  ) : (
                    <Shield className="w-6 h-6 text-[#3B82F6]" />
                  )}
                </div>
                <CardTitle className="text-theme-primary text-xl">
                  {step === "email" ? "Sign In" : "Enter Code"}
                </CardTitle>
                {step === "code" && (
                  <p className="text-xs text-theme-secondary mt-2">
                    Code sent to: <span className="font-medium">{email}</span>
                  </p>
                )}
              </CardHeader>

              <CardContent className="space-y-6">
                {step === "email" ? (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label
                        htmlFor="email"
                        className="text-xs font-medium text-theme-primary tracking-20-smaller"
                      >
                        Email Address
                      </label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="you@example.com"
                        className="bg-theme-primary border-theme text-theme-primary placeholder:text-theme-secondary/60 focus:border-[#3B82F6] h-10 transition-all"
                        disabled={loading}
                      />
                    </div>
                    <Button
                      onClick={sendCode}
                      disabled={loading || !email}
                      className="w-full bg-[#3B82F6] text-white hover:bg-[#2563EB] h-10 text-sm font-normal tracking-20-smaller transition-all duration-300 disabled:opacity-50"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Mail className="w-4 h-4 mr-2" />
                          Send Code
                        </>
                      )}
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label
                        htmlFor="code"
                        className="text-xs font-medium text-theme-primary tracking-20-smaller"
                      >
                        Verification Code
                      </label>
                      <Input
                        id="code"
                        type="text"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Enter 6-digit code"
                        className="bg-theme-primary border-theme text-theme-primary placeholder:text-theme-secondary/60 focus:border-[#3B82F6] h-10 text-center tracking-widest transition-all"
                        maxLength={6}
                        disabled={loading}
                      />
                    </div>
                    <Button
                      onClick={verify}
                      disabled={loading || !code}
                      className="w-full bg-[#3B82F6] text-white hover:bg-[#2563EB] h-10 text-sm font-normal tracking-20-smaller transition-all duration-300 disabled:opacity-50"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Verifying...
                        </>
                      ) : (
                        <>
                          <Shield className="w-4 h-4 mr-2" />
                          Verify & Sign In
                        </>
                      )}
                    </Button>

                    <Button
                      variant="ghost"
                      onClick={() => {
                        setStep("email");
                        setCode("");
                        setMessage("");
                      }}
                      className="w-full text-theme-secondary hover:text-[#3B82F6] hover:bg-[#3B82F6]/10 h-8 text-xs tracking-20-smaller transition-colors font-normal"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back to Email
                    </Button>
                  </div>
                )}

                {/* Message Display */}
                {message && (
                  <div
                    className={`flex items-center gap-2 p-3 rounded-md text-xs transition-all duration-300 ${
                      messageType === "success"
                        ? "bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400"
                        : "bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400"
                    }`}
                  >
                    {messageType === "success" ? (
                      <CheckCircle className="w-4 h-4 shrink-0" />
                    ) : (
                      <AlertCircle className="w-4 h-4 shrink-0" />
                    )}
                    <p className="font-medium">{message}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Footer Info */}
            <div className="text-center mt-6">
              <p className="text-xs text-theme-secondary tracking-20-smaller">
                Secure authentication powered by Komerza
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

