"use client"

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Trash2, RefreshCw } from 'lucide-react'
import { ServiceWorkerUtils } from '@/utils/register-sw'
import { NotificationService } from '@/utils/notification-service'

interface PWASettingsProps {
  className?: string
}

export function PWASettings({ className = '' }: PWASettingsProps) {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false)
  const [offlineEnabled, setOfflineEnabled] = useState(true)
  const [dataSync, setDataSync] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    if (typeof window === 'undefined') return
    
    const loadSettings = async () => {
      // Check notification permission
      const permStatus = NotificationService.getPermissionStatus()
      setNotificationsEnabled(permStatus === 'granted')
      
      // Load saved settings from localStorage
      try {
        const savedSettings = localStorage.getItem('pwa-settings')
        if (savedSettings) {
          const settings = JSON.parse(savedSettings)
          setOfflineEnabled(settings.offlineEnabled ?? true)
          setDataSync(settings.dataSync ?? true)
        }
      } catch (error) {
        console.error('Error loading PWA settings:', error)
      }
      
      setIsLoading(false)
    }
    
    loadSettings()
  }, [])
  
  const saveSettings = () => {
    try {
      localStorage.setItem('pwa-settings', JSON.stringify({
        offlineEnabled,
        dataSync,
      }))
    } catch (error) {
      console.error('Error saving PWA settings:', error)
    }
  }
  
  useEffect(() => {
    if (!isLoading) {
      saveSettings()
    }
  }, [offlineEnabled, dataSync, isLoading])
  
  const handleNotificationToggle = async (checked: boolean) => {
    if (checked) {
      try {
        const permission = await NotificationService.requestPermission()
        setNotificationsEnabled(permission === 'granted')
        
        if (permission === 'granted') {
          await NotificationService.subscribe()
        }
      } catch (error) {
        console.error('Error requesting notification permission:', error)
      }
    } else {
      // We can't actually revoke notification permission from JS
      // Just show a message to the user
      alert('To disable notifications, please use your browser settings.')
    }
  }
  
  const handleOfflineToggle = (checked: boolean) => {
    setOfflineEnabled(checked)
    
    // Send message to service worker to update caching strategy
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      ServiceWorkerUtils.sendMessage({
        type: 'UPDATE_CACHE_SETTINGS',
        payload: { offlineEnabled: checked }
      })
    }
  }
  
  const handleDataSyncToggle = (checked: boolean) => {
    setDataSync(checked)
    
    // Send message to service worker to update sync settings
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      ServiceWorkerUtils.sendMessage({
        type: 'UPDATE_SYNC_SETTINGS',
        payload: { dataSync: checked }
      })
    }
  }
  
  const handleClearCache = async () => {
    if (typeof window === 'undefined') return
    
    if (window.confirm('Are you sure you want to clear all cached data? This may affect offline functionality.')) {
      try {
        // Clear cache using the Cache API
        const cacheNames = await window.caches.keys()
        await Promise.all(
          cacheNames.map(name => window.caches.delete(name))
        )
        
        // Also clear localStorage and IndexedDB if needed
        // localStorage.clear()
        
        alert('Cache cleared successfully')
      } catch (error) {
        console.error('Error clearing cache:', error)
        alert('Failed to clear cache')
      }
    }
  }
  
  const handleUpdateServiceWorker = async () => {
    try {
      const updated = await ServiceWorkerUtils.update()
      if (updated) {
        alert('Service worker updated. Please refresh the page to apply changes.')
      } else {
        alert('No updates available or service worker not registered.')
      }
    } catch (error) {
      console.error('Error updating service worker:', error)
      alert('Failed to update service worker')
    }
  }
  
  if (isLoading) {
    return (
      <Card className={`p-4 ${className}`}>
        <p className="text-center py-4">Loading settings...</p>
      </Card>
    )
  }
  
  return (
    <Card className={`p-4 ${className}`}>
      <h3 className="font-semibold text-lg mb-4">PWA Settings</h3>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="notifications" className="text-base font-medium">Push Notifications</Label>
            <p className="text-sm text-muted-foreground">Receive updates and alerts</p>
          </div>
          <Switch 
            id="notifications" 
            checked={notificationsEnabled} 
            onCheckedChange={handleNotificationToggle}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="offline" className="text-base font-medium">Offline Mode</Label>
            <p className="text-sm text-muted-foreground">Access app content without internet</p>
          </div>
          <Switch 
            id="offline" 
            checked={offlineEnabled} 
            onCheckedChange={handleOfflineToggle}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="sync" className="text-base font-medium">Background Sync</Label>
            <p className="text-sm text-muted-foreground">Sync data when connection is restored</p>
          </div>
          <Switch 
            id="sync" 
            checked={dataSync} 
            onCheckedChange={handleDataSyncToggle}
          />
        </div>
        
        <div className="pt-2 border-t mt-4">
          <p className="text-sm font-medium mb-3">Advanced Options</p>
          
          <div className="flex flex-col space-y-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="justify-start"
              onClick={handleClearCache}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Clear Cached Data
            </Button>
            
            <Button 
              variant="outline" 
              size="sm" 
              className="justify-start"
              onClick={handleUpdateServiceWorker}
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Check for Updates
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
} 