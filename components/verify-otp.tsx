"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Info, Shield } from "lucide-react"

interface VerifyOTPProps {
  email: string
  onBack: () => void
  onVerified: (otp: string) => void
}

export function VerifyOTP({ email, onBack, onVerified }: VerifyOTPProps) {
  const [otp, setOtp] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleVerifyOTP = async () => {
    if (otp.length !== 6) return

    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      onVerified(otp)
    }, 1000)
  }

  const handleResendOTP = () => {
    // Simulate resend
    alert("New OTP sent to your email!")
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
          <h1 className="text-white text-3xl font-bold">Verify OTP</h1>
        </div>
      </div>

      {/* Form Container */}
      <div className="px-6 -mt-16 relative z-10">
        <Card className="bg-[#1E293B] rounded-3xl p-8 shadow-xl">
          <div className="space-y-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-[#48A6A7] rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="text-white" size={24} />
              </div>
              <p className="text-gray-300 text-sm">Enter the 6-digit code sent to {email}</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="otp" className="text-white text-sm">
                OTP Code
              </Label>
              <Input
                id="otp"
                type="text"
                placeholder="Enter 6-digit code"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                className="bg-[#2D3748] border-[#4A5568] text-white placeholder:text-gray-400 rounded-lg text-center text-2xl tracking-widest"
                maxLength={6}
              />
            </div>

            <Button
              onClick={handleVerifyOTP}
              disabled={otp.length !== 6 || isLoading}
              className="w-full bg-[#48A6A7] hover:bg-[#3d8a8b] text-white rounded-full py-3 mt-8"
            >
              {isLoading ? "Verifying..." : "Verify OTP"}
            </Button>

            <div className="text-center">
              <Button
                variant="ghost"
                onClick={handleResendOTP}
                className="text-[#48A6A7] hover:text-[#3d8a8b] hover:bg-transparent"
              >
                {"Didn't receive the code? Resend"}
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
