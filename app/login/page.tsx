"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [code, setCode] = useState("")
  const [step, setStep] = useState<"email" | "code">("email")
  const [message, setMessage] = useState("")

  useEffect(() => {
    if (globalThis.komerza.isSignedIn()) {
      window.location.href = "/dashboard"
    }
  }, [])

  const sendCode = async () => {
    const res = await globalThis.komerza.login({ emailAddress: email })
    if (res.success) {
      setStep("code")
      setMessage("Verification code sent. Check your email.")
    } else {
      setMessage(res.message || "Failed to send code")
    }
  }

  const verify = async () => {
    const res = await globalThis.komerza.verifyLogin({ emailAddress: email, code })
    if (res.success) {
      window.location.href = "/dashboard"
    } else {
      setMessage(res.message || "Invalid code")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-theme-primary relative overflow-hidden p-4">
      <div className="absolute inset-0 opacity-20">
        <Image src="/hero-new.webp" alt="Background" fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-theme-primary/50 to-theme-primary" />
      </div>
      <Card className="w-full max-w-md bg-theme-secondary border-theme relative z-10 shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-theme-primary text-2xl">Sign In</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {step === "email" ? (
            <>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="bg-theme-primary border-theme text-theme-primary"
              />
              <Button onClick={sendCode} className="w-full bg-[#3B82F6] text-white hover:bg-[#2563EB]">
                Send Code
              </Button>
            </>
          ) : (
            <>
              <Input
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Enter verification code"
                className="bg-theme-primary border-theme text-theme-primary"
              />
              <Button onClick={verify} className="w-full bg-[#3B82F6] text-white hover:bg-[#2563EB]">
                Verify
              </Button>
            </>
          )}
          {message && <p className="text-theme-secondary text-sm text-center">{message}</p>}
        </CardContent>
      </Card>
    </div>
  )
}

