"use client"

import type React from "react"

import { useState } from "react"
import { ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function VerificationForm() {
  const [code, setCode] = useState<string[]>(["7", "", "", "", "", ""])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (index: number, value: string) => {
    if (value.length > 1) return

    const newCode = [...code]
    newCode[index] = value
    setCode(newCode)

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`)
      nextInput?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Handle backspace
    if (e.key === "Backspace" && !code[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`)
      prevInput?.focus()
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate verification process
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsSubmitting(false)
    // Handle verification logic here
  }

  const handleResend = () => {
    // Handle resend logic here
    console.log("Resending code")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <ChevronLeft className="h-5 w-5 text-gray-500 mr-2" />
        <h1 className="text-2xl font-semibold">Verify</h1>
      </div>

      <p className="text-gray-600">
        We&apos;ll send a verification code to your email. Check your inbox and enter the code here.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex justify-between gap-2">
          {code.map((digit, index) => (
            <input
              key={index}
              id={`code-${index}`}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={1}
              value={digit}
              onChange={(e) => handleInputChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-full h-12 text-center border-b-2 border-gray-300 focus:border-purple-600 focus:outline-none text-xl"
              autoFocus={index === 1} // Focus the second input since the first one has "7"
            />
          ))}
        </div>

        <Button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-md"
          disabled={isSubmitting || code.some((digit) => !digit)}
        >
          {isSubmitting ? "Verifying..." : "Verify"}
        </Button>
      </form>

      <div className="flex justify-between items-center text-sm">
        <span className="text-gray-600">Didn&apos;t receive code?</span>
        <button onClick={handleResend} className="text-gray-800 font-medium hover:text-purple-600">
          Resend
        </button>
      </div>
    </div>
  )
}
