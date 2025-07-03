"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { InstallPrompt } from "./install-prompt"
import { NotificationPermission } from "./notification-permission"
import { PWAMeta } from "./pwa-meta"

interface PWAContextType {
  isPWA: boolean
  isInstallable: boolean
  isStandalone: boolean
  installPrompt: any | null
  showInstallPrompt: () => Promise<boolean>
}

const PWAContext = createContext<PWAContextType | null>(null)

export function usePWA() {
  const context = useContext(PWAContext)
  if (!context) {
    throw new Error("usePWA must be used within a PWAProvider")
  }
  return context
}

interface PWAProviderProps {
  children: ReactNode
  showInstallPromptUI?: boolean
  showNotificationPrompt?: boolean
  promptPosition?: 'top' | 'bottom'
}

export function PWAProvider({ 
  children,
  showInstallPromptUI = true,
  showNotificationPrompt = true,
  promptPosition = 'bottom'
}: PWAProviderProps) {
  const [installPrompt, setInstallPrompt] = useState<any | null>(null)
  const [isStandalone, setIsStandalone] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Check if the app is running in standalone mode (installed)
    const isInStandaloneMode = () => 
      window.matchMedia('(display-mode: standalone)').matches || 
      (window.navigator as any).standalone || 
      document.referrer.includes('android-app://')
    
    setIsStandalone(isInStandaloneMode())

    // Listen for beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault()
      // Store the event for later use
      setInstallPrompt(e)
    }

    // Listen for display mode changes
    const mediaQuery = window.matchMedia('(display-mode: standalone)')
    const handleDisplayModeChange = (e: MediaQueryListEvent) => {
      setIsStandalone(e.matches)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    mediaQuery.addEventListener('change', handleDisplayModeChange)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      mediaQuery.removeEventListener('change', handleDisplayModeChange)
    }
  }, [])

  const showInstallPrompt = async (): Promise<boolean> => {
    if (!installPrompt) return false

    // Show the install prompt
    const result = await installPrompt.prompt()
    
    // Reset the installPrompt variable
    setInstallPrompt(null)
    
    // Return whether the user accepted the prompt
    return result.outcome === 'accepted'
  }

  const value = {
    isPWA: typeof window !== 'undefined',
    isInstallable: !!installPrompt,
    isStandalone,
    installPrompt,
    showInstallPrompt,
  }

  return (
    <PWAContext.Provider value={value}>
      <PWAMeta />
      {children}
      {showInstallPromptUI && <InstallPrompt position={promptPosition} />}
      {showNotificationPrompt && <NotificationPermission position={promptPosition === 'top' ? 'bottom' : 'top'} />}
    </PWAContext.Provider>
  )
} 