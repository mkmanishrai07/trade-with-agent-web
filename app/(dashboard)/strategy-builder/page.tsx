import type { Metadata } from "next"
import { StrategyBuilder } from "@/components/strategy/strategy-builder"

export const metadata: Metadata = {
  title: "Strategy Builder | TradeWithAgent",
  description: "Build and test custom trading strategies",
}

export default function StrategyBuilderPage() {
  return (
    <div className="flex flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Strategy Builder</h1>
      </div>

      <StrategyBuilder />
    </div>
  )
}
