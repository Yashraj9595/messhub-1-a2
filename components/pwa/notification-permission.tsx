"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Bell, X } from 'lucide-react'
import { NotificationService } from '@/utils/notification-service'

interface NotificationPermissionProps {
  className?: string
  position?: 'top' | 'bottom'
}

export function NotificationPermission({ 
  className = '', 
  position = 'bottom' 
}: NotificationPermissionProps) {
  const [shouldShow, setShouldShow] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  
  useEffect(() => {
    // Check if we should show the notification permission prompt
    const checkNotificationPermission = async () => {
      // Only show on client-side
      if (typeof window === 'undefined') return
      
      // Check if notifications are supported
      const support = NotificationService.checkSupport()
      if (!support.supported) return
      
      // Check current permission status
      const permission = NotificationService.getPermissionStatus()
      
      // If permission is already granted or denied, don't show
      if (permission === 'granted' || permission === 'denied') return
      
      // Check if we've asked recently (within 7 days)
      const lastAsked = localStorage.getItem('notification-permission-asked')
      if (lastAsked) {
        const lastAskedDate = new Date(lastAsked)
        const now = new Date()
        const daysSinceLastAsked = (now.getTime() - lastAskedDate.getTime()) / (1000 * 60 * 60 * 24)
        
        // If we asked less than 7 days ago, don't show
        if (daysSinceLastAsked < 7) return
      }
      
      // If we get here, we should show the prompt
      setShouldShow(true)
    }
    
    // Wait a bit before checking, to not overwhelm the user immediately
    const timer = setTimeout(() => {
      checkNotificationPermission()
    }, 5000) // 5 seconds delay
    
    return () => clearTimeout(timer)
  }, [])
  
  const handleRequestPermission = async () => {
    try {
      const permission = await NotificationService.requestPermission()
      
      // Record that we asked
      localStorage.setItem('notification-permission-asked', new Date().toISOString())
      
      // Hide the prompt
      setShouldShow(false)
      
      // If permission granted, subscribe to push notifications
      if (permission === 'granted') {
        await NotificationService.subscribe()
        
        // Show a welcome notification
        NotificationService.showNotification('Notifications Enabled', {
          body: 'You will now receive important updates from MessHub',
          icon: '/icons/icon-192x192.png',
        })
      }
    } catch (error) {
      console.error('Error requesting notification permission:', error)
      setShouldShow(false)
    }
  }
  
  const handleDismiss = () => {
    setDismissed(true)
    
    // Remember that we asked
    localStorage.setItem('notification-permission-asked', new Date().toISOString())
  }
  
  if (!shouldShow || dismissed) {
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
            <Bell className="h-6 w-6 text-primary-blue" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-lg">Enable Notifications</h3>
            <p className="text-sm text-muted-foreground">
              Get updates about your mess activities, payments, and important announcements
            </p>
          </div>
        </div>
        
        <div className="flex gap-2 mt-4">
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={handleDismiss}
          >
            Not Now
          </Button>
          <Button 
            className="flex-1 bg-primary-blue hover:bg-dark-blue text-white"
            onClick={handleRequestPermission}
          >
            Enable
          </Button>
        </div>
      </Card>
    </div>
  )
} 