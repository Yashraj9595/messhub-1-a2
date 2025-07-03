"use client"

import { useState, useEffect } from 'react'
import { usePWA } from './pwa-provider'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Download, Bell, BellOff, RefreshCw, Smartphone } from 'lucide-react'
import { NotificationService } from '@/utils/notification-service'
import { WorkboxClient } from '@/utils/workbox-client'

interface PWAStatusProps {
  className?: string
  showInstallStatus?: boolean
  showNotificationStatus?: boolean
  showUpdateStatus?: boolean
  showControls?: boolean
}

export function PWAStatus({
  className = '',
  showInstallStatus = true,
  showNotificationStatus = true,
  showUpdateStatus = true,
  showControls = true,
}: PWAStatusProps) {
  const { isInstallable, isStandalone, showInstallPrompt } = usePWA()
  const [notificationStatus, setNotificationStatus] = useState<NotificationPermission | null>(null)
  const [updateAvailable, setUpdateAvailable] = useState(false)
  const [isControlled, setIsControlled] = useState(false)
  
  useEffect(() => {
    if (typeof window === 'undefined') return
    
    // Get notification permission status
    const permStatus = NotificationService.getPermissionStatus()
    setNotificationStatus(permStatus)
    
    // Check for service worker updates
    const wb = WorkboxClient.init()
    if (wb) {
      setUpdateAvailable(WorkboxClient.hasUpdate())
      setIsControlled(WorkboxClient.isControlled())
      
      const cleanup = WorkboxClient.createUpdateHandler(
        // onUpdateFound
        () => {},
        // onUpdateReady
        () => {
          setUpdateAvailable(true)
        },
        // onNoUpdate
        () => {}
      )
      
      return cleanup
    }
  }, [])
  
  const handleRequestNotifications = async () => {
    try {
      const permission = await NotificationService.requestPermission()
      setNotificationStatus(permission)
      
      if (permission === 'granted') {
        await NotificationService.subscribe()
      }
    } catch (error) {
      console.error('Error requesting notification permission:', error)
    }
  }
  
  const handleUpdate = () => {
    WorkboxClient.forceUpdate()
  }
  
  return (
    <Card className={`p-4 ${className}`}>
      <h3 className="font-semibold text-lg mb-3">PWA Status</h3>
      
      <div className="space-y-3">
        {showInstallStatus && (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Smartphone className="h-4 w-4" />
              <span>Installation</span>
            </div>
            <div className="flex items-center gap-2">
              {isStandalone ? (
                <Badge variant="default" className="bg-green-500">Installed</Badge>
              ) : (
                <>
                  <Badge variant="outline">{isInstallable ? 'Available' : 'Not Available'}</Badge>
                  {showControls && isInstallable && !isStandalone && (
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="h-7 px-2"
                      onClick={() => showInstallPrompt()}
                    >
                      <Download className="h-3.5 w-3.5 mr-1" />
                      Install
                    </Button>
                  )}
                </>
              )}
            </div>
          </div>
        )}
        
        {showNotificationStatus && (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {notificationStatus === 'granted' ? (
                <Bell className="h-4 w-4" />
              ) : (
                <BellOff className="h-4 w-4" />
              )}
              <span>Notifications</span>
            </div>
            <div className="flex items-center gap-2">
              {notificationStatus === 'granted' ? (
                <Badge variant="default" className="bg-green-500">Enabled</Badge>
              ) : notificationStatus === 'denied' ? (
                <Badge variant="destructive">Blocked</Badge>
              ) : (
                <>
                  <Badge variant="outline">Not Enabled</Badge>
                  {showControls && (
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="h-7 px-2"
                      onClick={handleRequestNotifications}
                    >
                      <Bell className="h-3.5 w-3.5 mr-1" />
                      Enable
                    </Button>
                  )}
                </>
              )}
            </div>
          </div>
        )}
        
        {showUpdateStatus && (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <RefreshCw className="h-4 w-4" />
              <span>Updates</span>
            </div>
            <div className="flex items-center gap-2">
              {!isControlled ? (
                <Badge variant="outline">Not Controlled</Badge>
              ) : updateAvailable ? (
                <>
                  <Badge variant="default" className="bg-amber-500">Available</Badge>
                  {showControls && (
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="h-7 px-2"
                      onClick={handleUpdate}
                    >
                      <RefreshCw className="h-3.5 w-3.5 mr-1" />
                      Update
                    </Button>
                  )}
                </>
              ) : (
                <Badge variant="default" className="bg-green-500">Up to date</Badge>
              )}
            </div>
          </div>
        )}
      </div>
    </Card>
  )
} 