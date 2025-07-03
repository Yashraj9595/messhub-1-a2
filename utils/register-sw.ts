/**
 * Service Worker Registration Utility
 * 
 * This utility provides functions to register and manage service workers.
 */

// Check if we're in a browser environment with service worker support
const isBrowser = typeof window !== 'undefined';
const hasServiceWorkerSupport = isBrowser && 'serviceWorker' in navigator;

/**
 * Register the service worker
 */
export async function registerServiceWorker(): Promise<ServiceWorkerRegistration | null> {
  if (!hasServiceWorkerSupport) {
    console.warn('Service workers are not supported in this browser');
    return null;
  }

  try {
    const registration = await navigator.serviceWorker.register('/sw.js');
    console.log('Service worker registered successfully', registration);
    return registration;
  } catch (error) {
    console.error('Service worker registration failed:', error);
    return null;
  }
}

/**
 * Unregister all service workers
 */
export async function unregisterServiceWorkers(): Promise<boolean> {
  if (!hasServiceWorkerSupport) return false;

  try {
    const registrations = await navigator.serviceWorker.getRegistrations();
    
    await Promise.all(
      registrations.map(registration => registration.unregister())
    );
    
    return true;
  } catch (error) {
    console.error('Error unregistering service workers:', error);
    return false;
  }
}

/**
 * Check if service workers are registered
 */
export async function checkServiceWorkerRegistration(): Promise<boolean> {
  if (!hasServiceWorkerSupport) return false;

  try {
    const registrations = await navigator.serviceWorker.getRegistrations();
    return registrations.length > 0;
  } catch (error) {
    console.error('Error checking service worker registration:', error);
    return false;
  }
}

/**
 * Update all service workers
 */
export async function updateServiceWorkers(): Promise<boolean> {
  if (!hasServiceWorkerSupport) return false;

  try {
    const registrations = await navigator.serviceWorker.getRegistrations();
    
    await Promise.all(
      registrations.map(registration => registration.update())
    );
    
    return true;
  } catch (error) {
    console.error('Error updating service workers:', error);
    return false;
  }
}

/**
 * Send a message to all service workers
 */
export async function sendMessageToServiceWorker(message: any): Promise<boolean> {
  if (!hasServiceWorkerSupport) return false;

  try {
    const registrations = await navigator.serviceWorker.getRegistrations();
    
    registrations.forEach(registration => {
      if (registration.active) {
        registration.active.postMessage(message);
      }
    });
    
    return true;
  } catch (error) {
    console.error('Error sending message to service worker:', error);
    return false;
  }
}

/**
 * Initialize service worker with automatic registration
 */
export function initServiceWorker(): void {
  if (!hasServiceWorkerSupport) return;

  // Register when the window loads
  window.addEventListener('load', () => {
    registerServiceWorker().catch(error => {
      console.error('Service worker registration failed:', error);
    });
  });
}

export const ServiceWorkerUtils = {
  register: registerServiceWorker,
  unregister: unregisterServiceWorkers,
  update: updateServiceWorkers,
  check: checkServiceWorkerRegistration,
  sendMessage: sendMessageToServiceWorker,
  init: initServiceWorker,
}; 