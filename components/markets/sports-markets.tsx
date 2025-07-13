"use client"

import { useState } from "react"
import { useMarkets } from "@/lib/hooks"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Search, Star } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function SportsMarkets() {
  const { data: markets, isLoading } = useMarkets()
  const [searchQuery, setSearchQuery] = useState("")

  // Filter for sports only and by search query
  const sportsMarkets =
    markets?.filter(
      (market) =>
        market.type === "sports" &&
        (market.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          market.fullName?.toLowerCase().includes(searchQuery.toLowerCase())),
    ) || []

  // Fallback data if API call fails or returns empty
  const fallbackSportsMarkets = [
    {
      id: "1",
      name: "NFL: Chiefs",
      fullName: "Kansas City Chiefs",
      price: 1.75,
      change: 0.05,
      changePercent: 2.94,
      volume: 5678901,
      type: "sports",
      league: "NFL",
      event: "Chiefs vs Raiders",
      eventTime: "2023-05-01T20:00:00Z",
    },
    {
      id: "2",
      name: "NBA: Lakers",
      fullName: "Los Angeles Lakers",
      price: 2.15,
      change: 0.25,
      changePercent: 13.16,
      volume: 4567890,
      type: "sports",
      league: "NBA",
      event: "Lakers vs Warriors",
      eventTime: "2023-05-02T19:30:00Z",
    },
    {
      id: "3",
      name: "MLB: Yankees",
      fullName: "New York Yankees",
      price: 1.95,
      change: -0.1,
      changePercent: -4.88,
      volume: 3456789,
      type: "sports",
      league: "MLB",
      event: "Yankees vs Red Sox",
      eventTime: "2023-05-03T18:00:00Z",
    },
    {
      id: "4",
      name: "NHL: Maple Leafs",
      fullName: "Toronto Maple Leafs",
      price: 2.25,
      change: 0.15,
      changePercent: 7.14,
      volume: 2345678,
      type: "sports",
      league: "NHL",
      event: "Maple Leafs vs Canadiens",
      eventTime: "2023-05-04T19:00:00Z",
    },
    {
      id: "5",
      name: "EPL: Man City",
      fullName: "Manchester City",
      price: 1.65,
      change: -0.05,
      changePercent: -2.94,
      volume: 6789012,
      type: "sports",
      league: "EPL",
      event: "Man City vs Liverpool",
      eventTime: "2023-05-05T15:00:00Z",
    },
  ].filter(
    (market) =>
      market.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      market.fullName.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const displayMarkets = sportsMarkets.length > 0 ? sportsMarkets : fallbackSportsMarkets

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search sports markets..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline">Filter</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Sports Markets</CardTitle>
          <CardDescription>Live sports betting markets</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-10 w-full" />
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-16 w-full" />
              ))}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Team</TableHead>
                  <TableHead>League</TableHead>
                  <TableHead>Event</TableHead>
                  <TableHead className="text-right">Odds</TableHead>
                  <TableHead className="text-right">Change</TableHead>
                  <TableHead>Event Time</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {displayMarkets.map((market) => (
                  <TableRow key={market.id}>
                    <TableCell className="font-medium">{market.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{market.league}</Badge>
                    </TableCell>
                    <TableCell>{market.event}</TableCell>
                    <TableCell className="text-right">{market.price.toFixed(2)}</TableCell>
                    <TableCell className={`text-right ${market.change >= 0 ? "text-green-500" : "text-red-500"}`}>
                      {market.change >= 0 ? "+" : ""}
                      {market.change.toFixed(2)} ({market.changePercent.toFixed(2)}%)
                    </TableCell>
                    <TableCell>{new Date(market.eventTime).toLocaleString()}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon">
                        <Star className="h-4 w-4" />
                        <span className="sr-only">Add to favorites</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
