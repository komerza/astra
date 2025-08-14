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
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (globalThis.komerza.isSignedIn()) {
      window.location.href = "/dashboard"
    }
  }, [])

  const sendCode = async () => {
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setMessage("Enter a valid email address")
      return
    }
    setLoading(true)
    const res = await globalThis.komerza.login({ emailAddress: email })
    setLoading(false)
    if (res.success) {
      setStep("code")
      setMessage("Verification code sent. Check your email.")
    } else {
      const invalid = res.invalidFields?.map((f: any) => f.reason).join(", ")
      setMessage(res.message || invalid || "Failed to send code")
    }
  }

  const verify = async () => {
    setLoading(true)
    const res = await globalThis.komerza.verifyLogin({ emailAddress: email, code })
    setLoading(false)
    if (res.success) {
      window.location.href = "/dashboard"
    } else {
      const invalid = res.invalidFields?.map((f: any) => f.reason).join(", ")
      setMessage(res.message || invalid || "Invalid code")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-theme-primary to-theme-secondary p-4">
      <Card className="w-full max-w-md bg-theme-secondary border-theme shadow-xl">
        <CardHeader className="text-center space-y-2">
          <Image src="/kimera-logo.svg" alt="Komerza" width={120} height={48} className="mx-auto" />
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
              <Button onClick={sendCode} disabled={loading} className="w-full bg-[#3B82F6] text-white hover:bg-[#2563EB]">
                {loading ? "Sending..." : "Send Code"}
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
              <Button onClick={verify} disabled={loading} className="w-full bg-[#3B82F6] text-white hover:bg-[#2563EB]">
                {loading ? "Verifying..." : "Verify"}
              </Button>
            </>
          )}
          {message && <p className="text-red-500 text-sm text-center">{message}</p>}
        </CardContent>
      </Card>
    </div>
  )
}

