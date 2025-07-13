"use client"

import { useMarket } from "@/lib/hooks"
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"

interface StockChartProps {
  stockId: string
}

// Generate mock stock data
const generateMockStockData = () => {
  const data = []
  const now = new Date()

  for (let i = 30; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)

    // Generate a random price with a trend
    const basePrice = 150 + Math.sin(i / 5) * 20
    const randomFactor = Math.random() * 10 - 5
    const price = basePrice + randomFactor

    data.push({
      date: date.toISOString().split("T")[0],
      price: Number.parseFloat(price.toFixed(2)),
      volume: Math.floor(Math.random() * 10000000) + 5000000,
    })
  }

  return data
}

export function StockChart({ stockId }: StockChartProps) {
  const { data: stock, isLoading } = useMarket(stockId)

  // Use mock data if API call fails
  const chartData = stock?.priceHistory || generateMockStockData()

  if (isLoading) {
    return <Skeleton className="h-[400px] w-full" />
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Button variant="outline" size="sm">
          1D
        </Button>
        <Button variant="outline" size="sm">
          1W
        </Button>
        <Button variant="outline" size="sm">
          1M
        </Button>
        <Button variant="outline" size="sm">
          3M
        </Button>
        <Button variant="outline" size="sm">
          1Y
        </Button>
        <Button variant="outline" size="sm">
          5Y
        </Button>
      </div>

      <ChartContainer
        config={{
          price: {
            label: "Price",
            color: "hsl(var(--chart-1))",
          },
        }}
        className="h-[400px]"
      >
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-price)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-price)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={10} />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              tickFormatter={(value) => `$${value}`}
              domain={["auto", "auto"]}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Area type="monotone" dataKey="price" stroke="var(--color-price)" fillOpacity={1} fill="url(#colorPrice)" />
          </AreaChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  )
}
