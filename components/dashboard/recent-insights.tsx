"use client"

import { useInsights } from "@/lib/hooks"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { MessageSquare, TrendingUp, TrendingDown } from "lucide-react"

export function RecentInsights() {
  const { data: insights, isLoading } = useInsights()

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex items-start gap-4">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-4 w-[160px]" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  // Fallback data if API call fails
  const fallbackInsights = [
    {
      id: "1",
      message: "AAPL showing strong bullish pattern, consider buying",
      timestamp: "2023-04-28T14:30:00Z",
      sentiment: "bullish",
    },
    {
      id: "2",
      message: "NFL: Chiefs vs Raiders - home team favored by 7 points",
      timestamp: "2023-04-28T10:15:00Z",
      sentiment: "neutral",
    },
    {
      id: "3",
      message: "TSLA earnings missed expectations, potential downtrend",
      timestamp: "2023-04-27T21:45:00Z",
      sentiment: "bearish",
    },
    {
      id: "4",
      message: "NBA: Lakers showing value in spread markets for next game",
      timestamp: "2023-04-27T18:20:00Z",
      sentiment: "bullish",
    },
  ]

  // Ensure we're working with an array
  const displayInsights = Array.isArray(insights)
    ? insights
    : Array.isArray(insights?.data)
      ? insights.data
      : fallbackInsights

  return (
    <div className="space-y-4">
      {Array.isArray(displayInsights) ? (
        displayInsights.map((insight) => (
          <div key={insight.id} className="flex items-start gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <MessageSquare className="h-5 w-5 text-primary" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium">{insight.message}</p>
                <Badge
                  variant={
                    insight.sentiment === "bullish"
                      ? "default"
                      : insight.sentiment === "bearish"
                        ? "destructive"
                        : "outline"
                  }
                >
                  {insight.sentiment === "bullish" && <TrendingUp className="mr-1 h-3 w-3" />}
                  {insight.sentiment === "bearish" && <TrendingDown className="mr-1 h-3 w-3" />}
                  {insight.sentiment}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">{new Date(insight.timestamp).toLocaleString()}</p>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-4">
          <p className="text-muted-foreground">No insights available</p>
        </div>
      )}
    </div>
  )
}
