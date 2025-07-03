"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Download, X } from 'lucide-react'
import { usePWA } from './pwa-provider'
import { isIOS } from '@/utils/notification-service'

interface InstallPromptProps {
  className?: string
  position?: 'top' | 'bottom'
}

export function InstallPrompt({ 
  className = '', 
  position = 'bottom' 
}: InstallPromptProps) {
  const { isInstallable, isStandalone, showInstallPrompt } = usePWA()
  const [showIOSPrompt, setShowIOSPrompt] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  
  // Check if we should show the iOS install prompt
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hasShownIOSPrompt = localStorage.getItem('ios-install-prompt-shown')
      const isIOSDevice = isIOS()
      
      // Show iOS prompt if it's an iOS device, not in standalone mode, and hasn't been shown in the last 14 days
      if (isIOSDevice && !isStandalone && !hasShownIOSPrompt) {
        setShowIOSPrompt(true)
      }
    }
  }, [isStandalone])
  
  const handleInstall = async () => {
    try {
      const installed = await showInstallPrompt()
      if (installed) {
        console.log('App was installed successfully')
      }
    } catch (error) {
      console.error('Error installing app:', error)
    }
  }
  
  const handleDismiss = () => {
    setDismissed(true)
    
    // For iOS, remember the dismissal for 14 days
    if (showIOSPrompt) {
      const twoWeeksFromNow = new Date()
      twoWeeksFromNow.setDate(twoWeeksFromNow.getDate() + 14)
      localStorage.setItem('ios-install-prompt-shown', twoWeeksFromNow.toISOString())
    }
  }
  
  // Don't show if already installed, not installable, or dismissed
  if (isStandalone || (!isInstallable && !showIOSPrompt) || dismissed) {
    return null
  }
  
  return (
    <div className={`fixed ${position === 'top' ? 'top-0' : 'bottom-0'} left-0 right-0 z-50 p-4 ${className}`}>
      <Card className="bg-card shadow-lg border-primary-blue/20 p-4 mx-auto max-w-md relative">
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute right-2 top-2" 
          onClick={handleDismiss}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Dismiss</span>
        </Button>
        
        <div className="flex items-center gap-4">
          <div className="bg-primary-blue/10 p-3 rounded-full">
            <Download className="h-6 w-6 text-primary-blue" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-lg">Install MessHub</h3>
            {showIOSPrompt ? (
              <p className="text-sm text-muted-foreground">
                To install, tap the share icon and select "Add to Home Screen"
              </p>
            ) : (
              <p className="text-sm text-muted-foreground">
                Install MessHub for a better experience
              </p>
            )}
          </div>
        </div>
        
        {!showIOSPrompt && (
          <Button 
            className="w-full mt-4 bg-primary-blue hover:bg-dark-blue text-white"
            onClick={handleInstall}
          >
            Install Now
          </Button>
        )}
      </Card>
    </div>
  )
} 