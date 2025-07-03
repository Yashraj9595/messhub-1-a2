import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { PWAProvider } from '@/components/pwa/pwa-provider'
import { ServiceWorkerInit } from './sw-init'
import { Toaster } from '@/components/ui/toaster'

export const metadata: Metadata = {
  title: 'MessHub - Mess Management System',
  description: 'Comprehensive mess management system for mess owners and users',
  generator: 'v0.dev',
  manifest: '/manifest.json',
  themeColor: '#145374',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'MessHub',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
  icons: {
    icon: [
      { url: '/icons/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/icons/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icons/favicon.ico', sizes: 'any' },
    ],
    apple: [
      { url: '/icons/apple-icon-180.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        url: '/icons/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        rel: 'apple-touch-icon',
      },
      {
        url: '/icons/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        rel: 'apple-touch-icon',
      },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <PWAProvider showInstallPromptUI showNotificationPrompt>
            <ServiceWorkerInit />
            {children}
            <Toaster />
          </PWAProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
