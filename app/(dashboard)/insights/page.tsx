import type { Metadata } from "next"
import { AiInsightsForm } from "@/components/insights/ai-insights-form"
import { InsightsHistory } from "@/components/insights/insights-history"

export const metadata: Metadata = {
  title: "AI Insights | TradeWithAgent",
  description: "Get AI-powered trading insights and recommendations",
}

export default function InsightsPage() {
  return (
    <div className="flex flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">AI Insights</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="md:col-span-2">
          <AiInsightsForm />
        </div>
        <div className="md:col-span-2 lg:col-span-1">
          <InsightsHistory />
        </div>
      </div>
    </div>
  )
}
