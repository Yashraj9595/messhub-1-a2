"use client"

import { useState } from "react"
import { AuthProvider, useAuth } from "@/contexts/auth-context"
import { ThemeProvider } from "@/contexts/theme-context"
import { ProtectedRoute } from "@/components/protected-route"
import { WelcomeScreen } from "@/components/auth/welcome-screen"
import { LoginScreen } from "@/components/auth/login-screen"
import { RegisterScreen } from "@/components/auth/register-screen"
import { ForgotPasswordScreen } from "@/components/auth/forgot-password-screen"
import { OTPVerificationScreen } from "@/components/auth/otp-verification-screen"
import { ResetPasswordScreen } from "@/components/auth/reset-password-screen"
import { SuccessScreen } from "@/components/auth/success-screen"
import { UserDashboard } from "@/components/user/user-dashboard"
import { MessOwnerDashboard } from "@/components/mess-owner/mess-owner-dashboard"
import { AdminDashboard } from "@/components/admin/admin-dashboard"

export type AuthScreen =
  | "welcome"
  | "login"
  | "register"
  | "forgot-password"
  | "otp-verification"
  | "reset-password"
  | "success"

export type UserRole = "user" | "mess_owner" | "project_admin"

export interface AuthState {
  email?: string
  otp?: string
  role?: UserRole
  resetFlow?: boolean
  resetSuccess?: boolean
  message?: string
}

function AppContent() {
  const { user, isAuthenticated } = useAuth()
  const [currentScreen, setCurrentScreen] = useState<AuthScreen>("welcome")
  const [authState, setAuthState] = useState<AuthState>({})

  const navigateToScreen = (screen: AuthScreen, state?: Partial<AuthState>) => {
    setCurrentScreen(screen)
    if (state) {
      setAuthState((prev) => ({ ...prev, ...state }))
    }
  }

  // If user is authenticated, show role-based dashboard
  if (isAuthenticated && user) {
    switch (user.role) {
      case "user":
        return (
          <ProtectedRoute requiredRole="user">
            <UserDashboard />
          </ProtectedRoute>
        )
      case "mess_owner":
        return (
          <ProtectedRoute requiredRole="mess_owner">
            <MessOwnerDashboard />
          </ProtectedRoute>
        )
      case "project_admin":
        return (
          <ProtectedRoute requiredRole="project_admin">
            <AdminDashboard />
          </ProtectedRoute>
        )
      default:
        return <div>Unknown role</div>
    }
  }

  // Show authentication screens
  const renderScreen = () => {
    switch (currentScreen) {
      case "welcome":
        return <WelcomeScreen onNavigate={navigateToScreen} />
      case "login":
        return <LoginScreen onNavigate={navigateToScreen} />
      case "register":
        return <RegisterScreen onNavigate={navigateToScreen} />
      case "forgot-password":
        return <ForgotPasswordScreen onNavigate={navigateToScreen} />
      case "otp-verification":
        return <OTPVerificationScreen onNavigate={navigateToScreen} authState={authState} />
      case "reset-password":
        return <ResetPasswordScreen onNavigate={navigateToScreen} authState={authState} />
      case "success":
        return <SuccessScreen onNavigate={navigateToScreen} authState={authState} />
      default:
        return <WelcomeScreen onNavigate={navigateToScreen} />
    }
  }

  return <div className="min-h-screen">{renderScreen()}</div>
}

export default function AuthFlow() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  )
}
