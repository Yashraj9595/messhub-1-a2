"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Download, Share } from "lucide-react"
import { usePWA } from "./pwa-provider"
import { isIOS } from "@/utils/notification-service"

interface InstallButtonProps {
  className?: string
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
  showIcon?: boolean
  text?: string
  iosText?: string
}

export function InstallButton({
  className = "",
  variant = "default",
  size = "default",
  showIcon = true,
  text = "Install App",
  iosText = "Add to Home Screen",
}: InstallButtonProps) {
  const { isInstallable, isStandalone, showInstallPrompt } = usePWA()
  const [isInstalling, setIsInstalling] = useState(false)
  const [isIOSDevice, setIsIOSDevice] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsIOSDevice(isIOS())
    }
  }, [])

  // Don't render the button if the app is already installed
  if (isStandalone) {
    return null
  }

  // For iOS devices, we need to show different instructions
  if (isIOSDevice) {
    return (
      <Button
        className={className}
        variant={variant}
        size={size}
        onClick={() => {
          alert('To install this app on iOS: tap the share icon in your browser and then "Add to Home Screen"')
        }}
      >
        {showIcon && <Share className="mr-2 h-4 w-4" />}
        {iosText}
      </Button>
    )
  }

  // For non-iOS devices, only show if installable
  if (!isInstallable) {
    return null
  }

  const handleInstall = async () => {
    setIsInstalling(true)
    try {
      await showInstallPrompt()
    } catch (error) {
      console.error("Installation failed", error)
    } finally {
      setIsInstalling(false)
    }
  }

  return (
    <Button
      className={className}
      variant={variant}
      size={size}
      onClick={handleInstall}
      disabled={isInstalling}
    >
      {showIcon && <Download className="mr-2 h-4 w-4" />}
      {isInstalling ? "Installing..." : text}
    </Button>
  )
} 