"use client"

import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { date: "Jan", profit: 2400 },
  { date: "Feb", profit: 1398 },
  { date: "Mar", profit: 9800 },
  { date: "Apr", profit: 3908 },
  { date: "May", profit: 4800 },
  { date: "Jun", profit: 3800 },
  { date: "Jul", profit: 4300 },
]

export function PerformanceChart() {
  return (
    <ChartContainer
      config={{
        profit: {
          label: "Profit",
          color: "hsl(var(--chart-1))",
        },
      }}
      className="h-[300px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
          <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={10} />
          <YAxis tickLine={false} axisLine={false} tickMargin={10} tickFormatter={(value) => `$${value}`} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Line type="monotone" dataKey="profit" strokeWidth={2} activeDot={{ r: 6 }} stroke="var(--color-profit)" />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
