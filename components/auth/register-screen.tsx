"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import {
  ArrowLeft,
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  AlertCircle,
  Users,
  ChefHat,
  Shield,
  CheckCircle,
  Star,
  Zap,
  Award,
  TrendingUp,
} from "lucide-react"
import type { AuthScreen, UserRole } from "@/app/page"

interface RegisterScreenProps {
  onNavigate: (screen: AuthScreen) => void
}

export function RegisterScreen({ onNavigate }: RegisterScreenProps) {
  const [step, setStep] = useState<1 | 2>(1)
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)

  const roles = [
    {
      id: "user" as UserRole,
      title: "Food Lover",
      description: "Browse menus and place orders",
      icon: Users,
      features: [
        "Browse 500+ restaurants",
        "Real-time order tracking",
        "Personalized recommendations",
        "Exclusive deals & offers",
      ],
      color: "from-blue-500 to-blue-600",
    },
    {
      id: "mess_owner" as UserRole,
      title: "Mess Owner",
      description: "Manage your kitchen and orders",
      icon: ChefHat,
      features: [
        "Complete kitchen dashboard",
        "Order management system",
        "Analytics & insights",
        "Customer engagement tools",
      ],
      color: "from-primary-blue to-dark-blue",
    },
  ]

  const validateStep1 = () => {
    return selectedRole !== null
  }

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required"
    }

    if (!formData.email) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password"
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep1()) {
      setStep(2)
    }
  }

  const handleRegister = async () => {
    if (!validateStep2()) return

    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      onNavigate("success")
    }, 2000)
  }

  const getPasswordStrength = (password: string) => {
    let strength = 0
    if (password.length >= 6) strength++
    if (/[A-Z]/.test(password)) strength++
    if (/[0-9]/.test(password)) strength++
    if (/[^A-Za-z0-9]/.test(password)) strength++
    return strength
  }

  const passwordStrength = getPasswordStrength(formData.password)
  const strengthLabels = ["Very Weak", "Weak", "Fair", "Good", "Strong"]
  const strengthColors = ["bg-red-500", "bg-orange-500", "bg-yellow-500", "bg-blue-500", "bg-green-500"]

  const RoleSelectionStep = () => (
    <div className="space-y-6 lg:space-y-8">
      <div className="text-center mb-8 lg:mb-12">
        <h2 className="text-2xl lg:text-4xl font-bold text-foreground mb-2 lg:mb-4">Choose Your Role</h2>
        <p className="text-muted-foreground text-base lg:text-xl">Select how you want to use our platform</p>
      </div>

      <div className="space-y-4 lg:space-y-6">
        {selectedRole ? (
          <Card
            className="p-6 lg:p-8 cursor-pointer transition-all duration-300 border-2 border-primary-blue bg-gradient-to-br from-primary-blue/10 to-primary-blue/5 shadow-lg hover:shadow-xl transform hover:scale-105"
            onClick={() => setSelectedRole(null)}
          >
            <div className="space-y-4 lg:space-y-6">
              <div className="flex items-center gap-4 lg:gap-6">
                <div
                  className={`p-4 lg:p-6 rounded-xl lg:rounded-2xl bg-gradient-to-br ${roles.find((r) => r.id === selectedRole)?.color} text-white shadow-lg`}
                >
                  {selectedRole === "user" ? (
                    <Users size={24} className="lg:w-8 lg:h-8" />
                  ) : (
                    <ChefHat size={24} className="lg:w-8 lg:h-8" />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg lg:text-2xl font-semibold mb-1 lg:mb-2 text-primary-blue">
                    {roles.find((r) => r.id === selectedRole)?.title}
                  </h3>
                  <p className="text-muted-foreground text-base lg:text-lg">
                    {roles.find((r) => r.id === selectedRole)?.description}
                  </p>
                </div>
                <CheckCircle size={24} className="lg:w-8 lg:h-8 text-green-500" />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-3 pl-16 lg:pl-24">
                {roles
                  .find((r) => r.id === selectedRole)
                  ?.features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 lg:gap-3 text-sm lg:text-base text-muted-foreground"
                    >
                      <Star size={12} className="lg:w-4 lg:h-4 text-primary-blue" />
                      <span>{feature}</span>
                    </div>
                  ))}
              </div>

              <div className="text-center pt-2 lg:pt-4">
                <p className="text-sm lg:text-base text-muted-foreground">Tap to change selection</p>
              </div>
            </div>
          </Card>
        ) : (
          roles.map((role) => {
            const Icon = role.icon

            return (
              <Card
                key={role.id}
                className="p-6 lg:p-8 cursor-pointer transition-all duration-300 border-2 border-border hover:border-primary-blue/50 hover:shadow-md hover:scale-105 bg-card"
                onClick={() => setSelectedRole(role.id)}
              >
                <div className="flex items-center gap-4 lg:gap-6">
                  <div
                    className={`p-4 lg:p-6 rounded-xl lg:rounded-2xl bg-gradient-to-br ${role.color} text-white shadow-lg`}
                  >
                    <Icon size={24} className="lg:w-8 lg:h-8" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg lg:text-2xl font-semibold mb-1 lg:mb-2 text-foreground">{role.title}</h3>
                    <p className="text-muted-foreground text-base lg:text-lg">{role.description}</p>
                  </div>
                </div>
              </Card>
            )
          })
        )}
      </div>

      <Button
        onClick={handleNext}
        disabled={!selectedRole}
        className="w-full gradient-primary hover:shadow-xl text-white rounded-xl lg:rounded-2xl py-4 lg:py-6 text-lg lg:text-xl font-semibold shadow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
      >
        <Zap size={20} className="lg:w-6 lg:h-6 mr-2" />
        Continue
      </Button>
    </div>
  )

  const DetailsFormStep = () => (
    <div className="space-y-6 lg:space-y-8">
      <div className="inline-flex items-center gap-2 lg:gap-3 bg-primary-blue/10 px-4 lg:px-6 py-2 lg:py-3 rounded-full mb-4 lg:mb-6">
        <User size={16} className="lg:w-5 lg:h-5 text-primary-blue" />
        <span className="text-sm lg:text-base font-medium text-primary-blue">Account Setup</span>
      </div>

      <div className="text-center mb-8 lg:mb-12">
        <h2 className="text-2xl lg:text-4xl font-bold text-foreground mb-2 lg:mb-4">Create Your Account</h2>
        <p className="text-muted-foreground text-base lg:text-xl">Fill in your details to get started</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        <div className="space-y-2 lg:space-y-3">
          <Label
            htmlFor="fullName"
            className="text-foreground font-semibold flex items-center gap-2 lg:gap-3 text-base lg:text-lg"
          >
            <User size={16} className="lg:w-5 lg:h-5 text-primary-blue" />
            Full Name
          </Label>
          <div className="relative">
            <Input
              id="fullName"
              type="text"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className={`bg-background border-2 rounded-xl lg:rounded-2xl py-3 lg:py-4 px-4 lg:px-6 text-foreground placeholder:text-muted-foreground transition-all duration-300 focus:shadow-lg text-base lg:text-lg ${
                errors.fullName ? "border-red-500 focus:border-red-500" : "border-border focus:border-primary-blue"
              }`}
            />
            {errors.fullName && (
              <div className="absolute right-3 lg:right-4 top-1/2 transform -translate-y-1/2">
                <AlertCircle size={16} className="lg:w-5 lg:h-5 text-red-500" />
              </div>
            )}
          </div>
          {errors.fullName && (
            <p className="text-red-500 text-sm lg:text-base flex items-center gap-1 lg:gap-2">
              <AlertCircle size={12} className="lg:w-4 lg:h-4" />
              {errors.fullName}
            </p>
          )}
        </div>

        <div className="space-y-2 lg:space-y-3">
          <Label
            htmlFor="email"
            className="text-foreground font-semibold flex items-center gap-2 lg:gap-3 text-base lg:text-lg"
          >
            <Mail size={16} className="lg:w-5 lg:h-5 text-primary-blue" />
            Email Address
          </Label>
          <div className="relative">
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={`bg-background border-2 rounded-xl lg:rounded-2xl py-3 lg:py-4 px-4 lg:px-6 text-foreground placeholder:text-muted-foreground transition-all duration-300 focus:shadow-lg text-base lg:text-lg ${
                errors.email ? "border-red-500 focus:border-red-500" : "border-border focus:border-primary-blue"
              }`}
            />
            {errors.email && (
              <div className="absolute right-3 lg:right-4 top-1/2 transform -translate-y-1/2">
                <AlertCircle size={16} className="lg:w-5 lg:h-5 text-red-500" />
              </div>
            )}
          </div>
          {errors.email && (
            <p className="text-red-500 text-sm lg:text-base flex items-center gap-1 lg:gap-2">
              <AlertCircle size={12} className="lg:w-4 lg:h-4" />
              {errors.email}
            </p>
          )}
        </div>

        <div className="space-y-2 lg:space-y-3">
          <Label
            htmlFor="password"
            className="text-foreground font-semibold flex items-center gap-2 lg:gap-3 text-base lg:text-lg"
          >
            <Lock size={16} className="lg:w-5 lg:h-5 text-primary-blue" />
            Password
          </Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Create a password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className={`bg-background border-2 rounded-xl lg:rounded-2xl py-3 lg:py-4 px-4 lg:px-6 pr-12 lg:pr-16 text-foreground placeholder:text-muted-foreground transition-all duration-300 focus:shadow-lg text-base lg:text-lg ${
                errors.password ? "border-red-500 focus:border-red-500" : "border-border focus:border-primary-blue"
              }`}
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-2 lg:right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-primary-blue transition-colors duration-300 p-2"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff size={16} className="lg:w-5 lg:h-5" />
              ) : (
                <Eye size={16} className="lg:w-5 lg:h-5" />
              )}
            </Button>
          </div>

          {formData.password && (
            <div className="space-y-2">
              <div className="flex gap-1">
                {[1, 2, 3, 4].map((level) => (
                  <div
                    key={level}
                    className={`h-2 flex-1 rounded-full transition-all duration-300 ${
                      passwordStrength >= level ? strengthColors[passwordStrength - 1] : "bg-neutral-gray"
                    }`}
                  />
                ))}
              </div>
              <p
                className={`text-sm lg:text-base font-medium ${
                  passwordStrength >= 3
                    ? "text-green-600 dark:text-green-400"
                    : passwordStrength >= 2
                      ? "text-yellow-600 dark:text-yellow-400"
                      : "text-red-600 dark:text-red-400"
                }`}
              >
                Password strength: {strengthLabels[passwordStrength] || "Very Weak"}
              </p>
            </div>
          )}

          {errors.password && (
            <p className="text-red-500 text-sm lg:text-base flex items-center gap-1 lg:gap-2">
              <AlertCircle size={12} className="lg:w-4 lg:h-4" />
              {errors.password}
            </p>
          )}
        </div>

        <div className="space-y-2 lg:space-y-3">
          <Label
            htmlFor="confirmPassword"
            className="text-foreground font-semibold flex items-center gap-2 lg:gap-3 text-base lg:text-lg"
          >
            <Lock size={16} className="lg:w-5 lg:h-5 text-primary-blue" />
            Confirm Password
          </Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              className={`bg-background border-2 rounded-xl lg:rounded-2xl py-3 lg:py-4 px-4 lg:px-6 pr-12 lg:pr-16 text-foreground placeholder:text-muted-foreground transition-all duration-300 focus:shadow-lg text-base lg:text-lg ${
                errors.confirmPassword
                  ? "border-red-500 focus:border-red-500"
                  : "border-border focus:border-primary-blue"
              }`}
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-2 lg:right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-primary-blue transition-colors duration-300 p-2"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <EyeOff size={16} className="lg:w-5 lg:h-5" />
              ) : (
                <Eye size={16} className="lg:w-5 lg:h-5" />
              )}
            </Button>
          </div>
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm lg:text-base flex items-center gap-1 lg:gap-2">
              <AlertCircle size={12} className="lg:w-4 lg:h-4" />
              {errors.confirmPassword}
            </p>
          )}
        </div>
      </div>

      <div className="bg-gradient-to-r from-primary-blue/5 to-primary-blue/10 rounded-xl lg:rounded-2xl p-4 lg:p-6 border border-primary-blue/20">
        <div className="flex items-start gap-3 lg:gap-4">
          <div className="w-5 h-5 lg:w-6 lg:h-6 bg-primary-blue rounded-full flex items-center justify-center mt-0.5">
            <Shield size={12} className="lg:w-4 lg:h-4 text-white" />
          </div>
          <div className="text-sm lg:text-base text-muted-foreground">
            By creating an account, you agree to our{" "}
            <button className="text-primary-blue font-semibold hover:underline">Terms of Service</button> and{" "}
            <button className="text-primary-blue font-semibold hover:underline">Privacy Policy</button>
          </div>
        </div>
      </div>

      <div className="flex gap-3 lg:gap-4">
        <Button
          onClick={() => setStep(1)}
          variant="outline"
          className="flex-1 border-2 border-border text-muted-foreground hover:bg-muted rounded-xl lg:rounded-2xl py-3 lg:py-4 font-semibold transition-all duration-300 text-base lg:text-lg"
        >
          Back
        </Button>
        <Button
          onClick={handleRegister}
          disabled={isLoading}
          className="flex-1 gradient-primary hover:shadow-xl text-white rounded-xl lg:rounded-2xl py-3 lg:py-4 font-semibold shadow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-base lg:text-lg"
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 lg:w-5 lg:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              Creating...
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Zap size={18} className="lg:w-5 lg:h-5" />
              Create Account
            </div>
          )}
        </Button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Mobile Layout */}
      <div className="lg:hidden min-h-screen bg-gradient-to-br from-background via-neutral-gray/10 to-background">
        <div className="relative gradient-primary h-72 rounded-b-[60px] shadow-2xl">
          <div className="absolute inset-0 bg-black/10 rounded-b-[60px]"></div>

          <div className="relative z-10 flex items-center justify-between p-6 pt-16">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => (step === 1 ? onNavigate("welcome") : setStep(1))}
              className="text-white hover:bg-white/20 rounded-full p-3 transition-all duration-300"
            >
              <ArrowLeft size={20} />
            </Button>

            <div className="flex items-center gap-3">
              <ThemeToggle />
              <div className="flex gap-2">
                <div
                  className={`w-8 h-2 rounded-full transition-all duration-300 ${step >= 1 ? "bg-white" : "bg-white/30"}`}
                ></div>
                <div
                  className={`w-8 h-2 rounded-full transition-all duration-300 ${step >= 2 ? "bg-white" : "bg-white/30"}`}
                ></div>
              </div>
            </div>
          </div>

          <div className="relative z-10 px-6 pb-8">
            <div className="inline-flex items-center gap-3 glass px-4 py-2 rounded-full mb-4 backdrop-blur-sm">
              <ChefHat size={18} className="text-white" />
              <span className="text-sm font-bold text-white tracking-wide">MESSMASTER PLATFORM</span>
              <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
            </div>
            <h1 className="text-white text-4xl font-black mb-2 drop-shadow-lg">Join MessMaster</h1>
            <p className="text-white/90 text-lg font-medium">
              {step === 1 ? "Choose your professional journey" : "Complete your profile setup"}
            </p>
          </div>

          <div className="absolute top-20 right-8 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-10 left-8 w-20 h-20 bg-white/10 rounded-full blur-lg animate-pulse animation-delay-1000"></div>
        </div>

        <div className="fixed bottom-0 left-0 right-0 top-72 px-6 z-20">
          <div className="h-full -mt-8">
            <Card className="bg-card/95 backdrop-blur-lg rounded-3xl shadow-2xl border-0 h-full flex flex-col animate-slide-up">
              <div className="flex-1 overflow-y-auto p-8">
                {step === 1 ? <RoleSelectionStep /> : <DetailsFormStep />}

                <div className="text-center pt-6 border-t border-border mt-6">
                  <p className="text-muted-foreground">
                    Already have an account?{" "}
                    <Button
                      variant="ghost"
                      onClick={() => onNavigate("login")}
                      className="text-primary-blue hover:text-dark-blue hover:bg-transparent p-0 h-auto font-semibold"
                    >
                      Sign In
                    </Button>
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:flex min-h-screen bg-gradient-to-br from-background via-neutral-gray/5 to-background">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-60 -right-60 w-[600px] h-[600px] bg-primary-blue/8 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-60 -left-60 w-[600px] h-[600px] bg-secondary-blue/8 rounded-full blur-3xl animate-pulse animation-delay-1000"></div>
        </div>

        {/* Desktop Left Panel */}
        <div className="flex-1 flex items-center justify-center p-16 relative z-10">
          <div className="max-w-3xl space-y-12 animate-fade-in">
            <div className="space-y-8">
              <div className="flex items-center gap-6">
                <div className="relative w-24 h-24 gradient-primary rounded-3xl flex items-center justify-center shadow-2xl animate-pulse-glow">
                  <ChefHat size={48} className="text-white" />
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                    <Star size={16} className="text-white" />
                  </div>
                </div>
                <div>
                  <h1 className="text-6xl font-black bg-gradient-to-r from-primary-blue to-dark-blue bg-clip-text text-transparent">
                    Join MessMaster
                  </h1>
                  <p className="text-2xl text-muted-foreground font-medium mt-2">
                    {step === 1 ? "Choose your professional journey" : "Complete your profile setup"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-8">
                <div className="flex items-center gap-3 bg-primary-blue/10 px-6 py-3 rounded-2xl border border-primary-blue/20">
                  <Users size={20} className="text-primary-blue" />
                  <div>
                    <div className="text-lg font-bold text-primary-blue">25K+</div>
                    <div className="text-sm text-muted-foreground">Happy Users</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-secondary-blue/10 px-6 py-3 rounded-2xl border border-secondary-blue/20">
                  <Award size={20} className="text-secondary-blue" />
                  <div>
                    <div className="text-lg font-bold text-secondary-blue">500+</div>
                    <div className="text-sm text-muted-foreground">Partner Kitchens</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-green-500/10 px-6 py-3 rounded-2xl border border-green-500/20">
                  <TrendingUp size={20} className="text-green-500" />
                  <div>
                    <div className="text-lg font-bold text-green-500">98%</div>
                    <div className="text-sm text-muted-foreground">Satisfaction</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-foreground">Why Choose Us?</h2>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-card/50 rounded-2xl border border-border/50">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                      <Shield size={20} className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Secure & Trusted</h3>
                      <p className="text-muted-foreground text-sm">Bank-level security protocols</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-card/50 rounded-2xl border border-border/50">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                      <Zap size={20} className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Lightning Fast</h3>
                      <p className="text-muted-foreground text-sm">Optimized for performance</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-foreground">Join Today</h2>
                <div className="space-y-4">
                  <div className="p-6 bg-gradient-to-br from-primary-blue/10 to-primary-blue/5 rounded-2xl border border-primary-blue/20">
                    <h3 className="text-xl font-bold text-foreground mb-2">Free to Start</h3>
                    <p className="text-muted-foreground">No setup fees or hidden charges</p>
                  </div>
                  <div className="p-6 bg-gradient-to-br from-green-500/10 to-green-500/5 rounded-2xl border border-green-500/20">
                    <h3 className="text-xl font-bold text-foreground mb-2">24/7 Support</h3>
                    <p className="text-muted-foreground">Always here to help you succeed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Right Panel */}
        <div className="w-[700px] flex items-center justify-center p-16 relative z-10">
          <div className="absolute top-8 right-8 flex items-center gap-4">
            <ThemeToggle />
            <div className="flex gap-2">
              <div
                className={`w-12 h-3 rounded-full transition-all duration-300 ${step >= 1 ? "bg-primary-blue" : "bg-border"}`}
              ></div>
              <div
                className={`w-12 h-3 rounded-full transition-all duration-300 ${step >= 2 ? "bg-primary-blue" : "bg-border"}`}
              ></div>
            </div>
          </div>

          <Card className="w-full max-w-2xl bg-card/95 backdrop-blur-lg rounded-4xl p-12 shadow-2xl border-0 animate-slide-up">
            <div className="space-y-8">
              {step === 1 ? <RoleSelectionStep /> : <DetailsFormStep />}

              <div className="text-center pt-8 border-t border-border">
                <p className="text-lg text-muted-foreground">
                  Already have an account?{" "}
                  <Button
                    variant="ghost"
                    onClick={() => onNavigate("login")}
                    className="text-primary-blue hover:text-dark-blue hover:bg-transparent p-0 h-auto font-semibold text-lg"
                  >
                    Sign In
                  </Button>
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
