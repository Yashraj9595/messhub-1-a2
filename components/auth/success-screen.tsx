"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import {
  CheckCircle,
  Sparkles,
  ArrowRight,
  Home,
  ChefHat,
  Users,
  Star,
  Trophy,
  Zap,
  Heart,
  Award,
  TrendingUp,
} from "lucide-react"
import type { AuthScreen, AuthState } from "@/app/page"

interface SuccessScreenProps {
  onNavigate: (screen: AuthScreen) => void
  authState: AuthState
}

export function SuccessScreen({ onNavigate, authState }: SuccessScreenProps) {
  const [showConfetti, setShowConfetti] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 3000)
    return () => clearTimeout(timer)
  }, [])

  const getSuccessMessage = () => {
    if (authState.message) return authState.message
    if (authState.resetFlow) return "Password reset successfully!"
    return "Account created successfully!"
  }

  const getSuccessDescription = () => {
    if (authState.resetFlow) {
      return "Your password has been updated. You can now sign in with your new password."
    }
    return "Welcome to MessMaster! Your account has been created and you're ready to start your culinary journey."
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            >
              <div
                className={`w-2 h-2 lg:w-3 lg:h-3 rounded-full ${
                  ["bg-primary-blue", "bg-secondary-blue", "bg-yellow-400", "bg-green-500", "bg-purple-500"][
                    Math.floor(Math.random() * 5)
                  ]
                }`}
              />
            </div>
          ))}
        </div>
      )}

      {/* Mobile Layout */}
      <div className="lg:hidden min-h-screen bg-gradient-to-br from-background via-green-500/5 to-background">
        <div className="relative bg-gradient-to-br from-green-500 to-green-600 h-80 rounded-b-[60px] shadow-2xl">
          <div className="absolute inset-0 bg-black/10 rounded-b-[60px]"></div>

          <div className="relative z-10 flex items-center justify-end p-6 pt-16">
            <ThemeToggle />
          </div>

          <div className="relative z-10 px-6 pb-8 text-center">
            <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse-glow">
              <CheckCircle size={48} className="text-white" />
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                <Sparkles size={16} className="text-white" />
              </div>
            </div>
            <h1 className="text-white text-4xl font-bold mb-2 drop-shadow-lg">Success!</h1>
            <p className="text-white/90 text-lg font-medium">{getSuccessMessage()}</p>
          </div>

          <div className="absolute top-20 right-8 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-10 left-8 w-20 h-20 bg-white/10 rounded-full blur-lg animate-pulse animation-delay-1000"></div>
        </div>

        <div className="px-6 -mt-8 relative z-20 pb-6">
          <Card className="bg-card/95 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border-0 max-w-md mx-auto animate-slide-up">
            <div className="space-y-8">
              <div className="text-center space-y-4">
                <h2 className="text-2xl font-bold text-foreground">Welcome to MessMaster!</h2>
                <p className="text-muted-foreground text-base leading-relaxed">{getSuccessDescription()}</p>
              </div>

              {/* Mobile Achievement Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-gradient-to-br from-primary-blue/10 to-primary-blue/5 rounded-xl border border-primary-blue/20">
                  <Users size={24} className="text-primary-blue mx-auto mb-2" />
                  <div className="text-lg font-bold text-foreground">25K+</div>
                  <div className="text-xs text-muted-foreground">Users</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-secondary-blue/10 to-secondary-blue/5 rounded-xl border border-secondary-blue/20">
                  <ChefHat size={24} className="text-secondary-blue mx-auto mb-2" />
                  <div className="text-lg font-bold text-foreground">500+</div>
                  <div className="text-xs text-muted-foreground">Kitchens</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-yellow-500/10 to-yellow-500/5 rounded-xl border border-yellow-500/20">
                  <Star size={24} className="text-yellow-500 mx-auto mb-2" />
                  <div className="text-lg font-bold text-foreground">4.9</div>
                  <div className="text-xs text-muted-foreground">Rating</div>
                </div>
              </div>

              {/* Mobile Features Preview */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground text-center">What's Next?</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-primary-blue/10 to-primary-blue/5 rounded-xl border border-primary-blue/20">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary-blue to-dark-blue rounded-lg flex items-center justify-center">
                      <ChefHat size={16} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground text-sm">Explore Menus</h4>
                      <p className="text-xs text-muted-foreground">Browse 500+ restaurant menus</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-green-500/10 to-green-500/5 rounded-xl border border-green-500/20">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                      <Trophy size={16} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground text-sm">Earn Rewards</h4>
                      <p className="text-xs text-muted-foreground">Get points with every order</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-purple-500/10 to-purple-500/5 rounded-xl border border-purple-500/20">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <Heart size={16} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground text-sm">Personalized Experience</h4>
                      <p className="text-xs text-muted-foreground">AI-powered recommendations</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <Button
                  onClick={() => onNavigate("login")}
                  className="w-full gradient-primary hover:shadow-xl text-white rounded-xl py-4 text-lg font-semibold shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  <Home size={20} className="mr-2" />
                  {authState.resetFlow ? "Sign In Now" : "Get Started"}
                </Button>

                {!authState.resetFlow && (
                  <Button
                    onClick={() => onNavigate("welcome")}
                    variant="outline"
                    className="w-full border-2 border-border text-muted-foreground hover:bg-muted rounded-xl py-4 text-lg font-semibold transition-all duration-300"
                  >
                    Back to Home
                  </Button>
                )}
              </div>

              <div className="text-center p-4 bg-green-500/10 rounded-xl border border-green-500/20">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <CheckCircle size={16} className="text-green-500" />
                  <span className="text-sm font-medium text-green-700 dark:text-green-400">Account Secured</span>
                </div>
                <p className="text-xs text-muted-foreground">Your account is protected with bank-level security</p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:flex min-h-screen bg-gradient-to-br from-background via-green-500/3 to-background">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-60 -right-60 w-[600px] h-[600px] bg-green-500/8 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-60 -left-60 w-[600px] h-[600px] bg-primary-blue/8 rounded-full blur-3xl animate-pulse animation-delay-1000"></div>
        </div>

        {/* Desktop Left Panel */}
        <div className="flex-1 flex items-center justify-center p-16 relative z-10">
          <div className="max-w-3xl space-y-12 animate-fade-in">
            <div className="space-y-8">
              <div className="flex items-center gap-6">
                <div className="relative w-32 h-32 bg-gradient-to-br from-green-500 to-green-600 rounded-4xl flex items-center justify-center shadow-2xl animate-pulse-glow">
                  <CheckCircle size={64} className="text-white" />
                  <div className="absolute -top-3 -right-3 w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                    <Sparkles size={24} className="text-white" />
                  </div>
                  <div className="absolute inset-0 border-4 border-green-500/30 rounded-4xl animate-ping"></div>
                </div>
                <div>
                  <h1 className="text-7xl font-black bg-gradient-to-r from-green-500 via-primary-blue to-secondary-blue bg-clip-text text-transparent">
                    Success!
                  </h1>
                  <p className="text-3xl text-muted-foreground font-medium mt-2">{getSuccessMessage()}</p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-500/10 to-green-500/5 rounded-3xl p-8 border border-green-500/20">
                <p className="text-2xl text-muted-foreground leading-relaxed">{getSuccessDescription()}</p>
              </div>

              <div className="grid grid-cols-3 gap-8">
                <div className="text-center p-8 bg-gradient-to-br from-primary-blue/10 to-primary-blue/5 rounded-3xl border border-primary-blue/20">
                  <Users size={48} className="text-primary-blue mx-auto mb-6" />
                  <div className="text-3xl font-bold text-foreground">25K+</div>
                  <div className="text-lg text-muted-foreground">Happy Users</div>
                </div>
                <div className="text-center p-8 bg-gradient-to-br from-secondary-blue/10 to-secondary-blue/5 rounded-3xl border border-secondary-blue/20">
                  <Award size={48} className="text-secondary-blue mx-auto mb-6" />
                  <div className="text-3xl font-bold text-foreground">500+</div>
                  <div className="text-lg text-muted-foreground">Partner Kitchens</div>
                </div>
                <div className="text-center p-8 bg-gradient-to-br from-yellow-500/10 to-yellow-500/5 rounded-3xl border border-yellow-500/20">
                  <TrendingUp size={48} className="text-yellow-500 mx-auto mb-6" />
                  <div className="text-3xl font-bold text-foreground">98%</div>
                  <div className="text-lg text-muted-foreground">Satisfaction</div>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <h2 className="text-4xl font-bold text-foreground">What's Next?</h2>
              <div className="grid grid-cols-1 gap-6">
                <div className="flex items-center gap-6 p-8 bg-gradient-to-r from-primary-blue/10 to-primary-blue/5 rounded-3xl border border-primary-blue/20 hover:scale-105 transition-all duration-300">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-blue to-dark-blue rounded-2xl flex items-center justify-center">
                    <ChefHat size={28} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-2">Explore Menus</h3>
                    <p className="text-lg text-muted-foreground">
                      Browse through 500+ restaurant menus and discover new favorites
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-6 p-8 bg-gradient-to-r from-green-500/10 to-green-500/5 rounded-3xl border border-green-500/20 hover:scale-105 transition-all duration-300">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center">
                    <Trophy size={28} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-2">Earn Rewards</h3>
                    <p className="text-lg text-muted-foreground">
                      Get points with every order and unlock exclusive benefits
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-6 p-8 bg-gradient-to-r from-purple-500/10 to-purple-500/5 rounded-3xl border border-purple-500/20 hover:scale-105 transition-all duration-300">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center">
                    <Heart size={28} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-2">Personalized Experience</h3>
                    <p className="text-lg text-muted-foreground">AI-powered recommendations tailored just for you</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Right Panel */}
        <div className="w-[600px] flex items-center justify-center p-16 relative z-10">
          <div className="absolute top-8 right-8">
            <ThemeToggle />
          </div>

          <Card className="w-full max-w-lg bg-card/95 backdrop-blur-lg rounded-4xl p-12 shadow-2xl border-0 animate-slide-up">
            <div className="space-y-10">
              <div className="text-center space-y-6">
                <div className="w-32 h-32 bg-gradient-to-br from-green-500 to-green-600 rounded-4xl flex items-center justify-center mx-auto shadow-lg animate-pulse-glow">
                  <CheckCircle className="text-white" size={64} />
                </div>
                <h2 className="text-4xl font-bold text-foreground">Welcome to MessMaster!</h2>
                <p className="text-xl text-muted-foreground leading-relaxed">{getSuccessDescription()}</p>
              </div>

              <div className="space-y-6">
                <Button
                  onClick={() => onNavigate("login")}
                  className="w-full gradient-primary hover:shadow-2xl text-white rounded-2xl py-6 text-xl font-semibold shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  <div className="flex items-center gap-3">
                    {authState.resetFlow ? <Home size={24} /> : <Zap size={24} />}
                    {authState.resetFlow ? "Sign In Now" : "Get Started"}
                    <ArrowRight size={24} />
                  </div>
                </Button>

                {!authState.resetFlow && (
                  <Button
                    onClick={() => onNavigate("welcome")}
                    variant="outline"
                    className="w-full border-2 border-border text-muted-foreground hover:bg-muted rounded-2xl py-6 text-xl font-semibold transition-all duration-300"
                  >
                    Back to Home
                  </Button>
                )}
              </div>

              <div className="text-center p-6 bg-green-500/10 rounded-2xl border border-green-500/20">
                <div className="flex items-center justify-center gap-3 mb-3">
                  <CheckCircle size={24} className="text-green-500" />
                  <span className="text-lg font-medium text-green-700 dark:text-green-400">Account Secured</span>
                </div>
                <p className="text-base text-muted-foreground">
                  Your account is protected with bank-level security protocols
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
