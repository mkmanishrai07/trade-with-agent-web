"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface ConditionType {
  id: string
  type: string
  operator: string
  value: string
}

interface StrategyPreviewProps {
  name: string
  marketType: string
  conditions: ConditionType[]
  isActive: boolean
}

export function StrategyPreview({ name, marketType, conditions, isActive }: StrategyPreviewProps) {
  // Format condition for display
  const formatCondition = (condition: ConditionType) => {
    const typeMap: Record<string, string> = {
      price: "Price",
      volume: "Volume",
      pe_ratio: "P/E Ratio",
      market_cap: "Market Cap",
      dividend_yield: "Dividend Yield",
      market_dominance: "Market Dominance",
      "24h_change": "24h Change",
      interest_rate_diff: "Interest Rate Diff",
      volatility: "Volatility",
      odds: "Odds",
      line: "Line",
      over_under: "Over/Under",
    }

    const operatorMap: Record<string, string> = {
      above: "is above",
      below: "is below",
      equal: "equals",
      between: "is between",
      increasing: "is increasing",
      decreasing: "is decreasing",
    }

    return `${typeMap[condition.type] || condition.type} ${operatorMap[condition.operator] || condition.operator} ${condition.value}`
  }

  // Format market type for display
  const formatMarketType = (type: string) => {
    const typeMap: Record<string, string> = {
      stock: "Stocks",
      crypto: "Cryptocurrency",
      forex: "Forex",
      sports: "Sports Betting",
    }

    return typeMap[type] || type
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold">{name || "Unnamed Strategy"}</h3>
            <Badge variant={isActive ? "default" : "outline"}>{isActive ? "Active" : "Inactive"}</Badge>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Market Type</p>
            <p>{formatMarketType(marketType)}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Conditions</p>
            {conditions.length > 0 ? (
              <ul className="space-y-2 mt-2">
                {conditions.map((condition) => (
                  <li key={condition.id} className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                    <span>{formatCondition(condition)}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="italic">No conditions defined</p>
            )}
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Actions</p>
            <p>When all conditions are met: Send notification and create trade opportunity</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
