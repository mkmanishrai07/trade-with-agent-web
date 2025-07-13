"use client"

import { useStrategies } from "@/lib/hooks"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Progress } from "@/components/ui/progress"
import { CheckCircle2, Clock } from "lucide-react"

export function ActiveStrategies() {
  const { data: strategies, isLoading } = useStrategies()

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-4 w-[100px]" />
            <Skeleton className="h-2 w-full" />
          </div>
        ))}
      </div>
    )
  }

  // Fallback data if API call fails
  const fallbackStrategies = [
    {
      id: "1",
      name: "Tech Momentum Strategy",
      status: "active",
      progress: 75,
      profit: 320.5,
    },
    {
      id: "2",
      name: "NFL Underdog Spread",
      status: "pending",
      progress: 0,
      profit: 0,
    },
    {
      id: "3",
      name: "Forex Trend Following",
      status: "active",
      progress: 45,
      profit: -120.75,
    },
  ]

  const displayStrategies = strategies || fallbackStrategies

  return (
    <div className="space-y-4">
      {displayStrategies.map((strategy) => (
        <div key={strategy.id} className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">{strategy.name}</h3>
            <Badge
              variant={
                strategy.status === "active" ? "default" : strategy.status === "pending" ? "outline" : "secondary"
              }
            >
              {strategy.status === "active" && <CheckCircle2 className="mr-1 h-3 w-3" />}
              {strategy.status === "pending" && <Clock className="mr-1 h-3 w-3" />}
              {strategy.status}
            </Badge>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className={strategy.profit >= 0 ? "text-green-500" : "text-red-500"}>
              {strategy.profit >= 0 ? "+" : ""}
              {strategy.profit.toFixed(2)} USD
            </span>
            <span className="text-muted-foreground">{strategy.progress}% complete</span>
          </div>
          <Progress value={strategy.progress} className="h-2" />
        </div>
      ))}
    </div>
  )
}
