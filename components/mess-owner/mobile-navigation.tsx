"use client"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { MessOwnerSection } from "./mess-owner-dashboard"
import {
  Menu,
  LayoutDashboard,
  UtensilsCrossed,
  Users,
  Receipt,
  CalendarDays,
  MessageSquare,
  BarChart3,
  Settings,
  LogOut,
} from "lucide-react"

interface MobileNavigationProps {
  activeSection: MessOwnerSection
  onSectionChange: (section: MessOwnerSection) => void
}

export function MobileNavigation({
  activeSection,
  onSectionChange,
}: MobileNavigationProps) {
  const { logout } = useAuth()

  const navItems = [
    {
      id: "dashboard" as MessOwnerSection,
      label: "Dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      id: "meals" as MessOwnerSection,
      label: "Meals",
      icon: <UtensilsCrossed className="h-5 w-5" />,
    },
    {
      id: "users" as MessOwnerSection,
      label: "Users",
      icon: <Users className="h-5 w-5" />,
    },
    {
      id: "billing" as MessOwnerSection,
      label: "Billing",
      icon: <Receipt className="h-5 w-5" />,
    },
    {
      id: "leave" as MessOwnerSection,
      label: "Leave",
      icon: <CalendarDays className="h-5 w-5" />,
    },
    {
      id: "feedback" as MessOwnerSection,
      label: "Feedback",
      icon: <MessageSquare className="h-5 w-5" />,
    },
    {
      id: "reports" as MessOwnerSection,
      label: "Reports",
      icon: <BarChart3 className="h-5 w-5" />,
    },
    {
      id: "settings" as MessOwnerSection,
      label: "Settings",
      icon: <Settings className="h-5 w-5" />,
    },
  ]

  return (
    <div className="grid grid-cols-4 gap-1 p-2">
      {navItems.slice(0, 4).map((item) => (
        <Button
          key={item.id}
          variant="ghost"
          onClick={() => onSectionChange(item.id)}
          className={`flex flex-col items-center gap-1 p-3 rounded-xl transition-all duration-300 ${
            activeSection === item.id
              ? "bg-primary-blue/10 text-primary-blue"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {item.icon}
          <span className="text-xs font-medium">{item.label}</span>
        </Button>
      ))}
    </div>
  )
}
