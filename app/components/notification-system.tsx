"use client"

import { useState, useEffect } from "react"
import { X, Check, ShoppingCart, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export interface Notification {
  id: string
  type: "success" | "error" | "info" | "warning"
  title: string
  message: string
  duration?: number
}

interface NotificationSystemProps {
  notifications?: Notification[]
  onRemove: (id: string) => void
}

export function NotificationSystem({ notifications = [], onRemove }: NotificationSystemProps) {
  useEffect(() => {
    if (!notifications || !Array.isArray(notifications)) return

    notifications.forEach((notification) => {
      if (notification.duration) {
        const timer = setTimeout(() => {
          onRemove(notification.id)
        }, notification.duration)

        return () => clearTimeout(timer)
      }
    })
  }, [notifications, onRemove])

  const getIcon = (type: string) => {
    switch (type) {
      case "success":
        return <Check className="w-4 h-4 text-green-500" />
      case "error":
        return <X className="w-4 h-4 text-red-500" />
      case "info":
        return <ShoppingCart className="w-4 h-4 text-[#3B82F6]" />
      case "warning":
        return <Trash2 className="w-4 h-4 text-yellow-500" />
      default:
        return <Check className="w-4 h-4 text-green-500" />
    }
  }

  const getBorderColor = (type: string) => {
    switch (type) {
      case "success":
        return "border-green-500/30"
      case "error":
        return "border-red-500/30"
      case "info":
        return "border-[#3B82F6]/30"
      case "warning":
        return "border-yellow-500/30"
      default:
        return "border-green-500/30"
    }
  }

  const getBackgroundColor = (type: string) => {
    switch (type) {
      case "success":
        return "bg-green-500/10"
      case "error":
        return "bg-red-500/10"
      case "info":
        return "bg-[#3B82F6]/10"
      case "warning":
        return "bg-yellow-500/10"
      default:
        return "bg-green-500/10"
    }
  }

  if (!notifications || !Array.isArray(notifications) || notifications.length === 0) {
    return null
  }

  return (
    <div className="fixed top-20 right-6 z-[60] space-y-2 max-w-sm">
      {notifications.map((notification, index) => (
        <div
          key={notification.id}
          className={`rounded-lg border ${getBorderColor(notification.type)} ${getBackgroundColor(
            notification.type,
          )} p-3 shadow-lg backdrop-blur-md transition-all duration-300 ease-out transform ${
            index === 0 ? "translate-x-0 opacity-100" : "translate-x-2 opacity-90"
          }`}
          style={{
            animation: "slideInFromRight 0.3s ease-out",
          }}
        >
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0">{getIcon(notification.type)}</div>
            <div className="flex-1 min-w-0">
              <h4 className="text-theme-primary text-sm heading-semibold">{notification.title}</h4>
              <p className="text-theme-secondary text-xs tracking-20-smaller leading-relaxed">{notification.message}</p>
            </div>
            <Button
              onClick={() => onRemove(notification.id)}
              className="bg-transparent hover:bg-theme-secondary text-theme-primary h-5 w-5 p-0 rounded-md transition-all duration-300 flex-shrink-0"
            >
              <X className="w-3 h-3" />
            </Button>
          </div>
        </div>
      ))}

      <style jsx>{`
        @keyframes slideInFromRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  )
}

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([])

  const addNotification = (notification: Omit<Notification, "id">) => {
    const id = Math.random().toString(36).substr(2, 9)
    const newNotification = {
      ...notification,
      id,
      duration: notification.duration || 4000,
    }
    setNotifications((prev) => [newNotification, ...prev])
  }

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id))
  }

  return {
    notifications,
    addNotification,
    removeNotification,
  }
}
