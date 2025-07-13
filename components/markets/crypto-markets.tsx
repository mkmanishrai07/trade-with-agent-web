"use client"

import { useState } from "react"
import { useMarkets } from "@/lib/hooks"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { TrendingUp, TrendingDown, Search, Star } from "lucide-react"

export function CryptoMarkets() {
  const { data: markets, isLoading } = useMarkets()
  const [searchQuery, setSearchQuery] = useState("")

  // Filter for crypto only and by search query
  const cryptoMarkets =
    markets?.filter(
      (market) =>
        market.type === "crypto" &&
        (market.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          market.fullName?.toLowerCase().includes(searchQuery.toLowerCase())),
    ) || []

  // Fallback data if API call fails or returns empty
  const fallbackCryptoMarkets = [
    {
      id: "1",
      name: "BTC/USD",
      fullName: "Bitcoin",
      price: 42356.78,
      change: -1.56,
      changePercent: -0.35,
      volume: 28765432,
      marketCap: 820000000000,
      type: "crypto",
    },
    {
      id: "2",
      name: "ETH/USD",
      fullName: "Ethereum",
      price: 2356.42,
      change: 12.34,
      changePercent: 0.53,
      volume: 18765432,
      marketCap: 280000000000,
      type: "crypto",
    },
    {
      id: "3",
      name: "SOL/USD",
      fullName: "Solana",
      price: 87.65,
      change: 3.21,
      changePercent: 3.8,
      volume: 8765432,
      marketCap: 38000000000,
      type: "crypto",
    },
    {
      id: "4",
      name: "ADA/USD",
      fullName: "Cardano",
      price: 0.45,
      change: -0.02,
      changePercent: -4.26,
      volume: 7654321,
      marketCap: 15000000000,
      type: "crypto",
    },
    {
      id: "5",
      name: "DOT/USD",
      fullName: "Polkadot",
      price: 6.78,
      change: 0.12,
      changePercent: 1.8,
      volume: 6543210,
      marketCap: 8500000000,
      type: "crypto",
    },
  ].filter(
    (market) =>
      market.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      market.fullName.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const displayMarkets = cryptoMarkets.length > 0 ? cryptoMarkets : fallbackCryptoMarkets

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search cryptocurrencies..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline">Filter</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Crypto Markets</CardTitle>
          <CardDescription>Live cryptocurrency market data</CardDescription>
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
                  <TableHead>Symbol</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                  <TableHead className="text-right">Change</TableHead>
                  <TableHead className="text-right">Volume</TableHead>
                  <TableHead className="text-right">Market Cap</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {displayMarkets.map((market) => (
                  <TableRow key={market.id}>
                    <TableCell className="font-medium">{market.name}</TableCell>
                    <TableCell>{market.fullName}</TableCell>
                    <TableCell className="text-right">${market.price.toFixed(2)}</TableCell>
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
                          {market.change.toFixed(2)} ({market.changePercent.toFixed(2)}%)
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">{market.volume.toLocaleString()}</TableCell>
                    <TableCell className="text-right">${(market.marketCap / 1000000000).toFixed(2)}B</TableCell>
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
