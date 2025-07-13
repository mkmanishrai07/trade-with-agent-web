"use client"

import type React from "react"

import { useAuthStore } from "@/store/auth-store"
import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"

// Define public routes that don't require authentication
const publicRoutes = ["/login", "/register", "/forgot-password"]

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, checkAuth } = useAuthStore()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Check authentication status on mount
    checkAuth()
  }, [checkAuth])

  useEffect(() => {
    // Handle route protection
    const isPublicRoute = publicRoutes.some((route) => pathname === route || pathname.startsWith(route))

    if (!isAuthenticated && !isPublicRoute && pathname !== "/") {
      router.push("/login")
    }

    // Redirect to dashboard if already logged in and trying to access login page
    if (isAuthenticated && isPublicRoute) {
      router.push("/dashboard")
    }
  }, [isAuthenticated, pathname, router])

  return <>{children}</>
}
