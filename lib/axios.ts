import axios from "axios"
import { useAuthStore } from "@/store/auth-store"

// Create axios instance with base URL from environment variable
export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "https://api.example.com",
  headers: {
    "Content-Type": "application/json",
  },
})

// Add request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

// Add response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    // If there's no response (e.g., network error), return a rejected promise
    if (!error.response) {
      return Promise.reject(new Error("Network error. Please check your connection."))
    }

    const originalRequest = error.config

    // If error is 401 and not already retrying
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      // Logout user
      await useAuthStore.getState().logout()

      // Redirect to login page (handled by auth provider)
      return Promise.reject(error)
    }

    return Promise.reject(error)
  },
)
