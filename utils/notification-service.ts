/**
 * Notification Service for MessHub PWA
 * 
 * This service provides methods for:
 * 1. Requesting notification permission
 * 2. Subscribing to push notifications
 * 3. Sending notifications
 * 4. Managing notification settings
 */

// Check if we're in a browser environment with notification support
const isBrowser = typeof window !== 'undefined';
const hasNotificationSupport = isBrowser && 'Notification' in window;
const hasServiceWorkerSupport = isBrowser && 'serviceWorker' in navigator;
const hasPushManagerSupport = isBrowser && 'PushManager' in window;

// Public key for VAPID authentication (would be provided by your backend)
const VAPID_PUBLIC_KEY = 'BF93TNDFO7jnVU_o2yi1WK1MgkQynLpCQ1YfYWcw7L84zO8wOQlds5s4S-Key_TocHNvMJDcibbvSddjMcl9s34';

// Extended NotificationOptions to include vibrate property
interface ExtendedNotificationOptions extends NotificationOptions {
  vibrate?: number[];
}

/**
 * Convert a base64 string to Uint8Array for push subscription
 */
function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

/**
 * Check if the browser supports notifications
 */
export function checkNotificationSupport(): { 
  supported: boolean; 
  reason?: string;
} {
  if (!hasNotificationSupport) {
    return { supported: false, reason: 'Notifications not supported in this browser' };
  }
  
  if (!hasServiceWorkerSupport) {
    return { supported: false, reason: 'Service Workers not supported in this browser' };
  }
  
  if (!hasPushManagerSupport) {
    return { supported: false, reason: 'Push notifications not supported in this browser' };
  }
  
  return { supported: true };
}

/**
 * Request permission for notifications
 */
export async function requestNotificationPermission(): Promise<NotificationPermission> {
  const support = checkNotificationSupport();
  if (!support.supported) {
    throw new Error(support.reason);
  }

  let permission: NotificationPermission;
  
  try {
    permission = await Notification.requestPermission();
    return permission;
  } catch (error) {
    console.error('Error requesting notification permission:', error);
    throw error;
  }
}

/**
 * Get the current notification permission status
 */
export function getNotificationPermissionStatus(): NotificationPermission | null {
  if (!hasNotificationSupport) return null;
  return Notification.permission;
}

/**
 * Register the service worker
 */
async function registerServiceWorker(): Promise<ServiceWorkerRegistration> {
  try {
    const registration = await navigator.serviceWorker.register('/sw.js');
    return registration;
  } catch (error) {
    console.error('Service Worker registration failed:', error);
    throw error;
  }
}

/**
 * Subscribe to push notifications
 */
export async function subscribeToPushNotifications(): Promise<PushSubscription | null> {
  try {
    // Check permission first
    const permission = await requestNotificationPermission();
    if (permission !== 'granted') {
      console.warn('Notification permission not granted');
      return null;
    }
    
    // Register service worker if not already registered
    const registration = await registerServiceWorker();
    
    // Get the push subscription
    let subscription = await registration.pushManager.getSubscription();
    
    // If no subscription exists, create one
    if (!subscription) {
      subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
      });
      
      // Send the subscription to your server
      await saveSubscriptionToServer(subscription);
    }
    
    return subscription;
  } catch (error) {
    console.error('Error subscribing to push notifications:', error);
    return null;
  }
}

/**
 * Save the subscription to the server
 */
async function saveSubscriptionToServer(subscription: PushSubscription): Promise<boolean> {
  try {
    // This would be an API call to your backend
    // const response = await fetch('/api/notifications/subscribe', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(subscription),
    // });
    
    // if (!response.ok) {
    //   throw new Error('Failed to save subscription');
    // }
    
    // return true;
    
    // For now, just log the subscription and return true
    console.log('Subscription saved:', subscription);
    return true;
  } catch (error) {
    console.error('Error saving subscription:', error);
    return false;
  }
}

/**
 * Unsubscribe from push notifications
 */
export async function unsubscribeFromPushNotifications(): Promise<boolean> {
  try {
    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.getSubscription();
    
    if (subscription) {
      // Remove from server
      await removeSubscriptionFromServer(subscription);
      
      // Unsubscribe locally
      const result = await subscription.unsubscribe();
      return result;
    }
    
    return true;
  } catch (error) {
    console.error('Error unsubscribing from push notifications:', error);
    return false;
  }
}

/**
 * Remove the subscription from the server
 */
async function removeSubscriptionFromServer(subscription: PushSubscription): Promise<boolean> {
  try {
    // This would be an API call to your backend
    // const response = await fetch('/api/notifications/unsubscribe', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ endpoint: subscription.endpoint }),
    // });
    
    // if (!response.ok) {
    //   throw new Error('Failed to remove subscription');
    // }
    
    // return true;
    
    // For now, just log and return true
    console.log('Subscription removed:', subscription.endpoint);
    return true;
  } catch (error) {
    console.error('Error removing subscription:', error);
    return false;
  }
}

/**
 * Show a local notification (client-side only)
 */
export function showLocalNotification(
  title: string, 
  options: ExtendedNotificationOptions = {}
): Notification | null {
  if (!hasNotificationSupport || Notification.permission !== 'granted') {
    return null;
  }
  
  // Set default options
  const defaultOptions: ExtendedNotificationOptions = {
    badge: '/icons/badge-72x72.png',
    icon: '/icons/icon-192x192.png',
    vibrate: [100, 50, 100],
    ...options,
  };
  
  return new Notification(title, defaultOptions);
}

/**
 * Check if the device is on iOS
 */
export function isIOS(): boolean {
  return isBrowser && 
    /iPad|iPhone|iPod/.test(navigator.userAgent) && 
    !(window as any).MSStream;
}

/**
 * Check if the app is installed (in standalone mode)
 */
export function isAppInstalled(): boolean {
  if (!isBrowser) return false;
  
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    (window.navigator as any).standalone === true
  );
}

export const NotificationService = {
  checkSupport: checkNotificationSupport,
  requestPermission: requestNotificationPermission,
  getPermissionStatus: getNotificationPermissionStatus,
  subscribe: subscribeToPushNotifications,
  unsubscribe: unsubscribeFromPushNotifications,
  showNotification: showLocalNotification,
  isIOS,
  isAppInstalled,
}; 