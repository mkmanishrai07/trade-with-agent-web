import { create } from "zustand"
import { persist } from "zustand/middleware"
import { api } from "@/lib/axios"

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
}

interface AuthState {
  token: string | null
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  login: (email: string, password: string, userData?: User) => Promise<void>
  logout: () => Promise<void>
  checkAuth: () => Promise<void>
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (email: string, password: string, userData?: User) => {
        set({ isLoading: true, error: null })
        try {
          // If userData is provided, use it directly (for static login)
          if (userData) {
            set({
              token: "mock-jwt-token",
              user: userData,
              isAuthenticated: true,
              isLoading: false,
            })
            return
          }

          // Otherwise, try to make an API call (this won't be used with our static login)
          const response = await api.post("/auth/login", { email, password })
          const { token, user } = response.data

          set({
            token,
            user,
            isAuthenticated: true,
            isLoading: false,
          })
        } catch (error: any) {
          set({
            error: error.message || "Failed to login",
            isLoading: false,
          })
          throw error
        }
      },

      logout: async () => {
        set({ isLoading: true })
        try {
          // In a real app, this would be an actual API call
          // await api.post("/auth/logout")

          set({
            token: null,
            user: null,
            isAuthenticated: false,
            isLoading: false,
          })
        } catch (error) {
          set({ isLoading: false })
          // Still logout even if the API call fails
          set({
            token: null,
            user: null,
            isAuthenticated: false,
          })
        }
      },

      checkAuth: async () => {
        const token = get().token
        if (!token) return

        set({ isLoading: true })
        try {
          // For our static login, we'll just check if we have a user
          const user = get().user
          if (user) {
            set({
              isAuthenticated: true,
              isLoading: false,
            })
            return
          }

          // In a real app, this would validate the token with the server
          const response = await api.get("/auth/me")
          set({
            user: response.data,
            isAuthenticated: true,
            isLoading: false,
          })
        } catch (error) {
          // If token is invalid, logout
          set({
            token: null,
            user: null,
            isAuthenticated: false,
            isLoading: false,
          })
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({ token: state.token, user: state.user }),
    },
  ),
)
