"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Info, Mail } from "lucide-react"

interface ForgotPasswordProps {
  onBack: () => void
  onVerifyOTP: (email: string) => void
}

export function ForgotPassword({ onBack, onVerifyOTP }: ForgotPasswordProps) {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSendOTP = async () => {
    if (!email) return

    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      onVerifyOTP(email)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Curved Header */}
      <div className="relative bg-[#48A6A7] h-48 rounded-b-[60px]">
        <div className="flex items-center justify-between p-6 pt-12">
          <Button variant="ghost" size="sm" onClick={onBack} className="text-white hover:bg-white/20 rounded-full p-2">
            <ArrowLeft size={20} />
            <span className="ml-2">Back</span>
          </Button>
          <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 rounded-full p-2">
            <Info size={20} />
          </Button>
        </div>
        <div className="px-6">
          <h1 className="text-white text-3xl font-bold">Reset Password</h1>
        </div>
      </div>

      {/* Form Container */}
      <div className="px-6 -mt-16 relative z-10">
        <Card className="bg-[#1E293B] rounded-3xl p-8 shadow-xl">
          <div className="space-y-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-[#48A6A7] rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="text-white" size={24} />
              </div>
              <p className="text-gray-300 text-sm">
                Enter your email address and we'll send you a code to reset your password.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="reset-email" className="text-white text-sm">
                Email address
              </Label>
              <Input
                id="reset-email"
                type="email"
                placeholder="Type here..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-[#2D3748] border-[#4A5568] text-white placeholder:text-gray-400 rounded-lg"
              />
            </div>

            <Button
              onClick={handleSendOTP}
              disabled={!email || isLoading}
              className="w-full bg-[#48A6A7] hover:bg-[#3d8a8b] text-white rounded-full py-3 mt-8"
            >
              {isLoading ? "Sending..." : "Send Reset Code"}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
