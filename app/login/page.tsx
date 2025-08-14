"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [code, setCode] = useState("")
  const [step, setStep] = useState<"email" | "code">("email")
  const [message, setMessage] = useState("")

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
      setMessage("Logged in!")
    } else {
      setMessage(res.message || "Invalid code")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-theme-primary p-4">
      <Card className="w-full max-w-sm bg-theme-secondary border-theme">
        <CardHeader>
          <CardTitle className="text-theme-primary">Login</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
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
                placeholder="Enter code"
                className="bg-theme-primary border-theme text-theme-primary"
              />
              <Button onClick={verify} className="w-full bg-[#3B82F6] text-white hover:bg-[#2563EB]">
                Verify
              </Button>
            </>
          )}
          {message && <p className="text-theme-secondary text-sm">{message}</p>}
        </CardContent>
      </Card>
    </div>
  )
}

