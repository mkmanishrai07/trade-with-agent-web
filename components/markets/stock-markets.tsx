"use client"

import { useState } from "react"
import { useMarkets } from "@/lib/hooks"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { TrendingUp, TrendingDown, Search, Star } from "lucide-react"
import { StockChart } from "@/components/charts/stock-chart"

export function StockMarkets() {
  const [selectedStock, setSelectedStock] = useState<string | null>(null)
  const { data: markets, isLoading } = useMarkets()
  const [searchQuery, setSearchQuery] = useState("")

  // Filter for stocks only and by search query
  const stocks =
    markets?.filter(
      (market) => market.type === "stock" && market.name.toLowerCase().includes(searchQuery.toLowerCase()),
    ) || []

  // Fallback data if API call fails
  const fallbackStocks = [
    {
      id: "1",
      name: "AAPL",
      fullName: "Apple Inc.",
      price: 175.34,
      change: 2.45,
      changePercent: 1.42,
      volume: 32456789,
      marketCap: 2850000000000,
      type: "stock",
    },
    {
      id: "2",
      name: "MSFT",
      fullName: "Microsoft Corporation",
      price: 325.76,
      change: 1.23,
      changePercent: 0.38,
      volume: 21345678,
      marketCap: 2420000000000,
      type: "stock",
    },
    {
      id: "3",
      name: "GOOGL",
      fullName: "Alphabet Inc.",
      price: 142.56,
      change: -0.87,
      changePercent: -0.61,
      volume: 18765432,
      marketCap: 1850000000000,
      type: "stock",
    },
    {
      id: "4",
      name: "AMZN",
      fullName: "Amazon.com, Inc.",
      price: 132.89,
      change: 3.45,
      changePercent: 2.67,
      volume: 25678901,
      marketCap: 1370000000000,
      type: "stock",
    },
    {
      id: "5",
      name: "TSLA",
      fullName: "Tesla, Inc.",
      price: 245.67,
      change: -5.43,
      changePercent: -2.16,
      volume: 30987654,
      marketCap: 780000000000,
      type: "stock",
    },
  ].filter(
    (stock) =>
      stock.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      stock.fullName.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const displayStocks = stocks.length > 0 ? stocks : fallbackStocks

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search stocks..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline">Filter</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {selectedStock && (
          <Card className="md:col-span-2 lg:col-span-3">
            <CardHeader>
              <CardTitle>
                {displayStocks.find((s) => s.id === selectedStock)?.name} -{" "}
                {displayStocks.find((s) => s.id === selectedStock)?.fullName}
              </CardTitle>
              <CardDescription>Stock price chart</CardDescription>
            </CardHeader>
            <CardContent>
              <StockChart stockId={selectedStock} />
            </CardContent>
          </Card>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Stock Markets</CardTitle>
          <CardDescription>Live stock market data</CardDescription>
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
                {displayStocks.map((stock) => (
                  <TableRow key={stock.id} className="cursor-pointer" onClick={() => setSelectedStock(stock.id)}>
                    <TableCell className="font-medium">{stock.name}</TableCell>
                    <TableCell>{stock.fullName}</TableCell>
                    <TableCell className="text-right">${stock.price.toFixed(2)}</TableCell>
                    <TableCell className="text-right">
                      <div
                        className={`flex items-center justify-end ${stock.change >= 0 ? "text-green-500" : "text-red-500"}`}
                      >
                        {stock.change >= 0 ? (
                          <TrendingUp className="mr-1 h-4 w-4" />
                        ) : (
                          <TrendingDown className="mr-1 h-4 w-4" />
                        )}
                        <span>
                          {stock.change >= 0 ? "+" : ""}
                          {stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">{stock.volume.toLocaleString()}</TableCell>
                    <TableCell className="text-right">${(stock.marketCap / 1000000000).toFixed(2)}B</TableCell>
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
