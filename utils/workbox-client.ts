"use client"

/**
 * Workbox Client Integration
 * 
 * This utility provides functions to interact with Workbox from the client side.
 */

import { Workbox, messageSW } from 'workbox-window';

// Check if we're in a browser environment with service worker support
const isBrowser = typeof window !== 'undefined';
const hasServiceWorkerSupport = isBrowser && 'serviceWorker' in navigator;

// Workbox instance
let wb: Workbox | null = null;

// Define custom properties for our Workbox instance
interface ExtendedWorkbox extends Workbox {
  waiting?: ServiceWorker;
}

/**
 * Initialize Workbox
 */
export function initWorkbox(): ExtendedWorkbox | null {
  if (!hasServiceWorkerSupport) {
    console.warn('Service workers are not supported in this browser');
    return null;
  }

  if (wb) return wb as ExtendedWorkbox;

  try {
    wb = new Workbox('/sw.js') as ExtendedWorkbox;
    
    // Add event listeners
    wb.addEventListener('installed', event => {
      if (event.isUpdate) {
        console.log('New update available');
        // Optionally show a UI notification about the update
        if (confirm('New version available! Reload to update?')) {
          window.location.reload();
        }
      } else {
        console.log('Service worker installed for the first time');
      }
    });

    wb.addEventListener('activated', event => {
      if (event.isUpdate) {
        console.log('Service worker updated');
      }
    });

    wb.addEventListener('controlling', () => {
      console.log('Service worker is controlling the page');
    });

    wb.addEventListener('waiting', (event) => {
      console.log('Service worker is waiting to activate');
      // Store the waiting service worker
      (wb as ExtendedWorkbox).waiting = event.sw;
    });

    wb.addEventListener('redundant', () => {
      console.log('Service worker has become redundant');
    });

    // Register the service worker
    wb.register();
    
    return wb as ExtendedWorkbox;
  } catch (error) {
    console.error('Error initializing Workbox:', error);
    return null;
  }
}

/**
 * Send a message to the service worker
 */
export async function sendMessageToSW(message: any): Promise<any> {
  if (!wb || !wb.active) {
    console.warn('No active service worker found');
    return null;
  }

  try {
    // Make sure we have the active service worker before messaging
    const activeWorker = await wb.active;
    return await messageSW(activeWorker, message);
  } catch (error) {
    console.error('Error sending message to service worker:', error);
    return null;
  }
}

/**
 * Check if the app has an update waiting
 */
export function hasUpdateWaiting(): boolean {
  const extendedWb = wb as ExtendedWorkbox;
  return !!(extendedWb && extendedWb.waiting);
}

/**
 * Force update the service worker
 */
export function forceUpdate(): void {
  if (!wb) return;

  // Send a skip waiting message
  wb.messageSkipWaiting();
  
  // Reload the page to activate the new service worker
  window.location.reload();
}

/**
 * Check if the app is controlled by a service worker
 */
export function isAppControlled(): boolean {
  return !!(wb && wb.controlling);
}

/**
 * Create a hook to handle service worker updates
 */
export function createUpdateHandler(
  onUpdateFound: () => void,
  onUpdateReady: () => void,
  onNoUpdate: () => void
): () => void {
  if (!wb) {
    initWorkbox();
  }
  
  if (!wb) {
    return () => onNoUpdate();
  }

  const handleUpdate = () => {
    onUpdateFound();
    
    const extendedWb = wb as ExtendedWorkbox;
    if (extendedWb && extendedWb.waiting) {
      onUpdateReady();
    } else {
      onNoUpdate();
    }
  };

  wb.addEventListener('waiting', handleUpdate);
  
  // Return cleanup function
  return () => {
    if (wb) {
      // @ts-ignore - TypeScript doesn't know about removeEventListener on Workbox
      wb.removeEventListener('waiting', handleUpdate);
    }
  };
}

export const WorkboxClient = {
  init: initWorkbox,
  sendMessage: sendMessageToSW,
  hasUpdate: hasUpdateWaiting,
  forceUpdate,
  isControlled: isAppControlled,
  createUpdateHandler,
}; 