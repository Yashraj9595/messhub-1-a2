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
  
  // Track visits to help trigger Chrome's install prompt
  useEffect(() => {
    if (typeof window !== 'undefined' && !isStandalone) {
      const visits = parseInt(localStorage.getItem('site-visits') || '0')
      const lastVisit = localStorage.getItem('last-visit')
      const now = new Date().toISOString()
      
      // If it's been more than 5 minutes since last visit
      if (!lastVisit || new Date(lastVisit).getTime() + 5 * 60 * 1000 < Date.now()) {
        localStorage.setItem('site-visits', (visits + 1).toString())
        localStorage.setItem('last-visit', now)
      }
    }
  }, [isStandalone])
  
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
        // Clear visit tracking after successful installation
        localStorage.removeItem('site-visits')
        localStorage.removeItem('last-visit')
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
  
  // Get visit count
  const visits = typeof window !== 'undefined' ? 
    parseInt(localStorage.getItem('site-visits') || '0') : 0
  
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
                {visits < 2 ? 
                  `Visit ${2 - visits} more time(s) to enable installation` :
                  'Install MessHub for a better experience'}
              </p>
            )}
          </div>
        </div>
        
        {!showIOSPrompt && (
          <Button 
            className="w-full mt-4 bg-primary-blue hover:bg-dark-blue text-white"
            onClick={handleInstall}
            disabled={visits < 2}
          >
            Install Now
          </Button>
        )}
      </Card>
    </div>
  )
} 