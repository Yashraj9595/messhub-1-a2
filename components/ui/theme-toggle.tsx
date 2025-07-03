"use client"

import { Moon, Sun, Monitor } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/contexts/theme-context"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  const cycleTheme = () => {
    if (theme === "light") {
      setTheme("dark")
    } else if (theme === "dark") {
      setTheme("system")
    } else {
      setTheme("light")
    }
  }

  const getIcon = () => {
    switch (theme) {
      case "light":
        return <Sun size={16} className="lg:w-5 lg:h-5" />
      case "dark":
        return <Moon size={16} className="lg:w-5 lg:h-5" />
      case "system":
        return <Monitor size={16} className="lg:w-5 lg:h-5" />
    }
  }

  const getLabel = () => {
    switch (theme) {
      case "light":
        return "Light"
      case "dark":
        return "Dark"
      case "system":
        return "System"
    }
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={cycleTheme}
      className="w-9 h-9 lg:w-auto lg:h-10 lg:px-4 p-0 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
      title={`Current theme: ${theme}`}
    >
      <span className="lg:flex lg:items-center lg:gap-2">
        {getIcon()}
        <span className="hidden lg:inline text-sm font-medium">{getLabel()}</span>
      </span>
    </Button>
  )
}
