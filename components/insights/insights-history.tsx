"use client"

import { useInsights } from "@/lib/hooks"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { MessageSquare, TrendingUp, TrendingDown } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"

export function InsightsHistory() {
  const { data: insights, isLoading } = useInsights()

  // Fallback data if API call fails
  const fallbackInsights = [
    {
      id: "1",
      question: "What stocks are showing bullish patterns today?",
      message:
        "AAPL, MSFT, and GOOGL are showing strong bullish patterns based on technical indicators. Consider watching these for potential entry points.",
      timestamp: "2023-04-28T14:30:00Z",
      sentiment: "bullish",
    },
    {
      id: "2",
      question: "Analyze the upcoming NFL game between Chiefs and Raiders",
      message:
        "Chiefs are favored by 7 points. Historical data shows they cover the spread 65% of the time as home favorites. Weather conditions look favorable for passing game.",
      timestamp: "2023-04-28T10:15:00Z",
      sentiment: "neutral",
    },
    {
      id: "3",
      question: "Should I buy or sell Tesla stock this week?",
      message:
        "TSLA earnings missed expectations. Technical indicators suggest a potential downtrend. Consider waiting for stabilization before entering a position.",
      timestamp: "2023-04-27T21:45:00Z",
      sentiment: "bearish",
    },
    {
      id: "4",
      question: "What's the outlook for EUR/USD?",
      message:
        "EUR/USD is approaching a key resistance level. Watch for ECB announcements this week which could cause volatility. Current trend is slightly bullish.",
      timestamp: "2023-04-27T18:20:00Z",
      sentiment: "bullish",
    },
    {
      id: "5",
      question: "Compare tech stocks vs energy stocks",
      message:
        "Tech stocks have outperformed energy by 12% YTD. However, energy stocks show lower volatility and higher dividend yields, making them attractive for defensive positions.",
      timestamp: "2023-04-26T15:10:00Z",
      sentiment: "neutral",
    },
  ]

  // Ensure we're working with an array
  const displayInsights = Array.isArray(insights)
    ? insights
    : Array.isArray(insights?.data)
      ? insights.data
      : fallbackInsights

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Recent Insights</CardTitle>
        <CardDescription>Your AI-generated trading insights history</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[600px] pr-4">
          {isLoading ? (
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-4 w-[200px]" />
                  <Skeleton className="h-20 w-full" />
                  <Skeleton className="h-4 w-[100px]" />
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {Array.isArray(displayInsights) ? (
                displayInsights.map((insight) => (
                  <div key={insight.id} className="space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                        <MessageSquare className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{insight.question}</p>
                        <p className="text-sm text-muted-foreground">{new Date(insight.timestamp).toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="ml-10 rounded-lg border bg-card p-3">
                      <p className="text-sm">{insight.message}</p>
                    </div>
                    <div className="ml-10">
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
                  </div>
                ))
              ) : (
                <div className="text-center py-4">
                  <p className="text-muted-foreground">No insights available</p>
                </div>
              )}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
