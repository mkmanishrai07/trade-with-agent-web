import type { Metadata } from "next"
import { TradingHistory } from "@/components/history/trading-history"

export const metadata: Metadata = {
  title: "History | TradeWithAgent",
  description: "View your trading history and past insights",
}

export default function HistoryPage() {
  return (
    <div className="flex flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Trading History</h1>
      </div>

      <TradingHistory />
    </div>
  )
}
