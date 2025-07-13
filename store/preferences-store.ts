import { create } from "zustand"
import { persist } from "zustand/middleware"

interface PreferencesState {
  theme: "light" | "dark" | "system"
  sidebarCollapsed: boolean
  favoriteMarkets: string[]
  setTheme: (theme: "light" | "dark" | "system") => void
  toggleSidebar: () => void
  addFavoriteMarket: (marketId: string) => void
  removeFavoriteMarket: (marketId: string) => void
}

export const usePreferencesStore = create<PreferencesState>()(
  persist(
    (set) => ({
      theme: "system",
      sidebarCollapsed: false,
      favoriteMarkets: [],

      setTheme: (theme) => set({ theme }),

      toggleSidebar: () =>
        set((state) => ({
          sidebarCollapsed: !state.sidebarCollapsed,
        })),

      addFavoriteMarket: (marketId) =>
        set((state) => ({
          favoriteMarkets: [...state.favoriteMarkets, marketId],
        })),

      removeFavoriteMarket: (marketId) =>
        set((state) => ({
          favoriteMarkets: state.favoriteMarkets.filter((id) => id !== marketId),
        })),
    }),
    {
      name: "preferences-storage",
    },
  ),
)
