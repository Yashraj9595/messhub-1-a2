"use client"

import { useEffect } from 'react'
import { WorkboxClient } from '@/utils/workbox-client'
import { useToast } from '@/components/ui/use-toast'

export function ServiceWorkerInit() {
  const { toast } = useToast()

  useEffect(() => {
    // Initialize Workbox
    const wb = WorkboxClient.init()
    
    if (!wb) return
    
    // Listen for new updates
    const cleanup = WorkboxClient.createUpdateHandler(
      // onUpdateFound
      () => {
        console.log('Update found')
      },
      // onUpdateReady
      () => {
        toast({
          title: "Update Available",
          description: "A new version of MessHub is available.",
          action: (
            <button 
              className="bg-primary text-white px-3 py-1.5 rounded-md text-sm font-medium"
              onClick={() => WorkboxClient.forceUpdate()}
            >
              Refresh
            </button>
          ),
          duration: 0, // Don't auto-dismiss
        })
      },
      // onNoUpdate
      () => {
        console.log('No update available')
      }
    )
    
    return () => {
      cleanup()
    }
  }, [toast])
  
  return null
} 