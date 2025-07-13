"use client"

import { useState } from "react"
import { useMarkets } from "@/lib/hooks"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { TrendingUp, TrendingDown, Search, Star } from "lucide-react"

export function ForexMarkets() {
  const { data: markets, isLoading } = useMarkets()
  const [searchQuery, setSearchQuery] = useState("")

  // Filter for forex only and by search query
  const forexMarkets =
    markets?.filter(
      (market) =>
        market.type === "forex" &&
        (market.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          market.fullName?.toLowerCase().includes(searchQuery.toLowerCase())),
    ) || []

  // Fallback data if API call fails or returns empty
  const fallbackForexMarkets = [
    {
      id: "1",
      name: "EUR/USD",
      fullName: "Euro / US Dollar",
      price: 1.0923,
      change: -0.0045,
      changePercent: -0.41,
      volume: 98765432,
      type: "forex",
      baseCurrency: "EUR",
      quoteCurrency: "USD",
    },
    {
      id: "2",
      name: "GBP/USD",
      fullName: "British Pound / US Dollar",
      price: 1.2567,
      change: 0.0023,
      changePercent: 0.18,
      volume: 87654321,
      type: "forex",
      baseCurrency: "GBP",
      quoteCurrency: "USD",
    },
    {
      id: "3",
      name: "USD/JPY",
      fullName: "US Dollar / Japanese Yen",
      price: 134.56,
      change: 0.78,
      changePercent: 0.58,
      volume: 76543210,
      type: "forex",
      baseCurrency: "USD",
      quoteCurrency: "JPY",
    },
    {
      id: "4",
      name: "AUD/USD",
      fullName: "Australian Dollar / US Dollar",
      price: 0.6789,
      change: -0.0034,
      changePercent: -0.5,
      volume: 65432109,
      type: "forex",
      baseCurrency: "AUD",
      quoteCurrency: "USD",
    },
    {
      id: "5",
      name: "USD/CAD",
      fullName: "US Dollar / Canadian Dollar",
      price: 1.3456,
      change: 0.0067,
      changePercent: 0.5,
      volume: 54321098,
      type: "forex",
      baseCurrency: "USD",
      quoteCurrency: "CAD",
    },
  ].filter(
    (market) =>
      market.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      market.fullName.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const displayMarkets = forexMarkets.length > 0 ? forexMarkets : fallbackForexMarkets

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search forex pairs..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline">Filter</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Forex Markets</CardTitle>
          <CardDescription>Live foreign exchange market data</CardDescription>
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
                  <TableHead>Pair</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead className="text-right">Rate</TableHead>
                  <TableHead className="text-right">Change</TableHead>
                  <TableHead className="text-right">Volume</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {displayMarkets.map((market) => (
                  <TableRow key={market.id}>
                    <TableCell className="font-medium">{market.name}</TableCell>
                    <TableCell>{market.fullName}</TableCell>
                    <TableCell className="text-right">{market.price.toFixed(4)}</TableCell>
                    <TableCell className="text-right">
                      <div
                        className={`flex items-center justify-end ${market.change >= 0 ? "text-green-500" : "text-red-500"}`}
                      >
                        {market.change >= 0 ? (
                          <TrendingUp className="mr-1 h-4 w-4" />
                        ) : (
                          <TrendingDown className="mr-1 h-4 w-4" />
                        )}
                        <span>
                          {market.change >= 0 ? "+" : ""}
                          {market.change.toFixed(4)} ({market.changePercent.toFixed(2)}%)
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">{market.volume.toLocaleString()}</TableCell>
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
