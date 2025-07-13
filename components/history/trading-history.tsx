"use client"

import { useState } from "react"
import { useHistory } from "@/lib/hooks"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { CalendarIcon, Download, Search, TrendingUp, TrendingDown } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"

export function TradingHistory() {
  const [searchQuery, setSearchQuery] = useState("")
  const [marketType, setMarketType] = useState("all")
  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date }>({})

  // Create filters object for API call
  const filters = {
    search: searchQuery,
    marketType: marketType !== "all" ? marketType : undefined,
    dateFrom: dateRange.from ? format(dateRange.from, "yyyy-MM-dd") : undefined,
    dateTo: dateRange.to ? format(dateRange.to, "yyyy-MM-dd") : undefined,
  }

  const { data: history, isLoading } = useHistory(filters)

  // Fallback data if API call fails
  const fallbackHistory = {
    trades: [
      {
        id: "1",
        symbol: "AAPL",
        type: "stock",
        action: "buy",
        price: 175.34,
        quantity: 10,
        total: 1753.4,
        date: "2023-04-28T14:30:00Z",
        status: "completed",
        profit: 120.5,
      },
      {
        id: "2",
        symbol: "BTC/USD",
        type: "crypto",
        action: "sell",
        price: 42356.78,
        quantity: 0.5,
        total: 21178.39,
        date: "2023-04-27T10:15:00Z",
        status: "completed",
        profit: 1500.25,
      },
      {
        id: "3",
        symbol: "NFL: Chiefs",
        type: "sports",
        action: "bet",
        price: 1.75,
        quantity: 1,
        total: 100.0,
        date: "2023-04-26T18:45:00Z",
        status: "pending",
        profit: 0,
      },
      {
        id: "4",
        symbol: "EUR/USD",
        type: "forex",
        action: "buy",
        price: 1.0923,
        quantity: 10000,
        total: 10923.0,
        date: "2023-04-25T09:30:00Z",
        status: "completed",
        profit: -45.75,
      },
      {
        id: "5",
        symbol: "TSLA",
        type: "stock",
        action: "sell",
        price: 245.67,
        quantity: 5,
        total: 1228.35,
        date: "2023-04-24T15:20:00Z",
        status: "completed",
        profit: 350.0,
      },
    ],
    insights: [
      {
        id: "1",
        question: "What stocks are showing bullish patterns today?",
        response: "AAPL, MSFT, and GOOGL are showing strong bullish patterns based on technical indicators.",
        date: "2023-04-28T14:30:00Z",
      },
      {
        id: "2",
        question: "Analyze the upcoming NFL game between Chiefs and Raiders",
        response:
          "Chiefs are favored by 7 points. Historical data shows they cover the spread 65% of the time as home favorites.",
        date: "2023-04-27T10:15:00Z",
      },
      {
        id: "3",
        question: "Should I buy or sell Tesla stock this week?",
        response: "TSLA earnings missed expectations. Technical indicators suggest a potential downtrend.",
        date: "2023-04-26T18:45:00Z",
      },
    ],
  }

  const displayHistory = history || fallbackHistory

  return (
    <Card>
      <CardHeader>
        <CardTitle>Trading History</CardTitle>
        <CardDescription>View your past trades, insights, and performance</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="trades" className="space-y-4">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <TabsList>
              <TabsTrigger value="trades">Trades</TabsTrigger>
              <TabsTrigger value="insights">AI Insights</TabsTrigger>
            </TabsList>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon">
                <Download className="h-4 w-4" />
                <span className="sr-only">Download history</span>
              </Button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <Select value={marketType} onValueChange={setMarketType}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Market type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Markets</SelectItem>
                <SelectItem value="stock">Stocks</SelectItem>
                <SelectItem value="crypto">Crypto</SelectItem>
                <SelectItem value="forex">Forex</SelectItem>
                <SelectItem value="sports">Sports</SelectItem>
              </SelectContent>
            </Select>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-[240px] justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateRange.from ? (
                    dateRange.to ? (
                      <>
                        {format(dateRange.from, "LLL dd, y")} - {format(dateRange.to, "LLL dd, y")}
                      </>
                    ) : (
                      format(dateRange.from, "LLL dd, y")
                    )
                  ) : (
                    <span>Pick a date range</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar initialFocus mode="range" selected={dateRange} onSelect={setDateRange} numberOfMonths={2} />
              </PopoverContent>
            </Popover>
          </div>

          <TabsContent value="trades">
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
                    <TableHead>Type</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                    <TableHead className="text-right">Quantity</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Profit/Loss</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {displayHistory.trades.map((trade) => (
                    <TableRow key={trade.id}>
                      <TableCell className="font-medium">{trade.symbol}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{trade.type}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            trade.action === "buy" ? "default" : trade.action === "sell" ? "secondary" : "outline"
                          }
                        >
                          {trade.action}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        {trade.type === "forex" || trade.type === "crypto"
                          ? trade.price.toLocaleString(undefined, {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 4,
                            })
                          : trade.price.toLocaleString(undefined, {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                      </TableCell>
                      <TableCell className="text-right">{trade.quantity}</TableCell>
                      <TableCell className="text-right">${trade.total.toFixed(2)}</TableCell>
                      <TableCell>{new Date(trade.date).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            trade.status === "completed"
                              ? "default"
                              : trade.status === "pending"
                                ? "outline"
                                : "secondary"
                          }
                        >
                          {trade.status}
                        </Badge>
                      </TableCell>
                      <TableCell className={`text-right ${trade.profit >= 0 ? "text-green-500" : "text-red-500"}`}>
                        <div className="flex items-center justify-end">
                          {trade.profit >= 0 ? (
                            <TrendingUp className="mr-1 h-4 w-4" />
                          ) : (
                            <TrendingDown className="mr-1 h-4 w-4" />
                          )}
                          <span>
                            {trade.profit >= 0 ? "+" : ""}${Math.abs(trade.profit).toFixed(2)}
                          </span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </TabsContent>

          <TabsContent value="insights">
            {isLoading ? (
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} className="h-32 w-full" />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {displayHistory.insights.map((insight) => (
                  <Card key={insight.id}>
                    <CardContent className="p-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium">{insight.question}</h3>
                          <span className="text-sm text-muted-foreground">
                            {new Date(insight.date).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-sm">{insight.response}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
