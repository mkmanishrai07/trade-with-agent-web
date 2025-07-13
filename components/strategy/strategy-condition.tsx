"use client"

import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"

interface ConditionType {
  id: string
  type: string
  operator: string
  value: string
}

interface StrategyConditionProps {
  condition: ConditionType
  marketType: string
  onUpdate: (field: string, value: string) => void
  onRemove: () => void
}

export function StrategyCondition({ condition, marketType, onUpdate, onRemove }: StrategyConditionProps) {
  // Different condition types based on market type
  const getConditionTypes = () => {
    const commonTypes = [
      { value: "price", label: "Price" },
      { value: "volume", label: "Volume" },
    ]

    const marketSpecificTypes = {
      stock: [
        { value: "pe_ratio", label: "P/E Ratio" },
        { value: "market_cap", label: "Market Cap" },
        { value: "dividend_yield", label: "Dividend Yield" },
      ],
      crypto: [
        { value: "market_dominance", label: "Market Dominance" },
        { value: "24h_change", label: "24h Change" },
      ],
      forex: [
        { value: "interest_rate_diff", label: "Interest Rate Diff" },
        { value: "volatility", label: "Volatility" },
      ],
      sports: [
        { value: "odds", label: "Odds" },
        { value: "line", label: "Line" },
        { value: "over_under", label: "Over/Under" },
      ],
    }

    return [...commonTypes, ...(marketSpecificTypes[marketType as keyof typeof marketSpecificTypes] || [])]
  }

  // Different operators
  const operators = [
    { value: "above", label: "Above" },
    { value: "below", label: "Below" },
    { value: "equal", label: "Equal to" },
    { value: "between", label: "Between" },
    { value: "increasing", label: "Increasing" },
    { value: "decreasing", label: "Decreasing" },
  ]

  return (
    <div className="flex items-center gap-2">
      <Select value={condition.type} onValueChange={(value) => onUpdate("type", value)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select type" />
        </SelectTrigger>
        <SelectContent>
          {getConditionTypes().map((type) => (
            <SelectItem key={type.value} value={type.value}>
              {type.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={condition.operator} onValueChange={(value) => onUpdate("operator", value)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select operator" />
        </SelectTrigger>
        <SelectContent>
          {operators.map((op) => (
            <SelectItem key={op.value} value={op.value}>
              {op.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Input
        type="text"
        placeholder="Value"
        value={condition.value}
        onChange={(e) => onUpdate("value", e.target.value)}
        className="flex-1"
      />

      <Button type="button" variant="ghost" size="icon" onClick={onRemove}>
        <Trash2 className="h-4 w-4" />
        <span className="sr-only">Remove condition</span>
      </Button>
    </div>
  )
}
