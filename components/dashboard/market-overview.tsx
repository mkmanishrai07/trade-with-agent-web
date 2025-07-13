"use client"

import { useMarkets } from "@/lib/hooks"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { TrendingUp, TrendingDown } from "lucide-react"

export function MarketOverview() {
  const { data: markets, isLoading } = useMarkets()

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-4 w-[100px]" />
              <Skeleton className="h-4 w-[80px]" />
              <Skeleton className="h-4 w-[60px]" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Fallback data if API call fails
  const fallbackMarkets = [
    {
      id: "1",
      name: "AAPL",
      price: 175.34,
      change: 2.45,
      type: "stock",
    },
    {
      id: "2",
      name: "MSFT",
      price: 325.76,
      change: 1.23,
      type: "stock",
    },
    {
      id: "3",
      name: "BTC/USD",
      price: 42356.78,
      change: -1.56,
      type: "crypto",
    },
    {
      id: "4",
      name: "NFL: Chiefs",
      price: 1.75,
      change: 0.05,
      type: "sports",
    },
    {
      id: "5",
      name: "EUR/USD",
      price: 1.0923,
      change: -0.0045,
      type: "forex",
    },
    {
      id: "6",
      name: "NBA: Lakers",
      price: 2.15,
      change: 0.25,
      type: "sports",
    },
  ]

  const displayMarkets = markets || fallbackMarkets

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {displayMarkets.map((market) => (
          <div key={market.id} className="space-y-1">
            <div className="flex items-center gap-2">
              <h3 className="font-medium">{market.name}</h3>
              <Badge variant="outline" className="text-xs">
                {market.type}
              </Badge>
            </div>
            <p className="text-lg font-bold">
              {market.type === "forex" || market.type === "crypto"
                ? market.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 })
                : market.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
            <div className={`flex items-center text-sm ${market.change >= 0 ? "text-green-500" : "text-red-500"}`}>
              {market.change >= 0 ? <TrendingUp className="mr-1 h-3 w-3" /> : <TrendingDown className="mr-1 h-3 w-3" />}
              <span>
                {market.change >= 0 ? "+" : ""}
                {market.change.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 })}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
