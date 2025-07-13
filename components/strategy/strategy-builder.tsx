"use client"

import type React from "react"

import { useState } from "react"
import { useCreateStrategy } from "@/lib/hooks"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Loader2, Plus, Save } from "lucide-react"
import { StrategyCondition } from "@/components/strategy/strategy-condition"
import { StrategyPreview } from "@/components/strategy/strategy-preview"

export function StrategyBuilder() {
  const [strategyName, setStrategyName] = useState("")
  const [marketType, setMarketType] = useState("stock")
  const [isActive, setIsActive] = useState(false)
  const [conditions, setConditions] = useState([{ id: "1", type: "price", operator: "above", value: "" }])

  const { mutate: createStrategy, isPending } = useCreateStrategy()

  const addCondition = () => {
    setConditions([...conditions, { id: Date.now().toString(), type: "price", operator: "above", value: "" }])
  }

  const removeCondition = (id: string) => {
    setConditions(conditions.filter((condition) => condition.id !== id))
  }

  const updateCondition = (id: string, field: string, value: string) => {
    setConditions(conditions.map((condition) => (condition.id === id ? { ...condition, [field]: value } : condition)))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const strategy = {
      name: strategyName,
      marketType,
      isActive,
      conditions,
    }

    createStrategy(strategy)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Trading Strategy</CardTitle>
        <CardDescription>Build a custom trading strategy with conditions and actions</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="builder" className="space-y-4">
          <TabsList>
            <TabsTrigger value="builder">Builder</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="backtest">Backtest</TabsTrigger>
          </TabsList>

          <TabsContent value="builder">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="strategy-name">Strategy Name</Label>
                  <Input
                    id="strategy-name"
                    placeholder="My Trading Strategy"
                    value={strategyName}
                    onChange={(e) => setStrategyName(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="market-type">Market Type</Label>
                  <Select value={marketType} onValueChange={setMarketType}>
                    <SelectTrigger id="market-type">
                      <SelectValue placeholder="Select market type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="stock">Stocks</SelectItem>
                      <SelectItem value="crypto">Crypto</SelectItem>
                      <SelectItem value="forex">Forex</SelectItem>
                      <SelectItem value="sports">Sports</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="conditions">Conditions</Label>
                  <Button type="button" variant="outline" size="sm" onClick={addCondition}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Condition
                  </Button>
                </div>

                <div className="space-y-4">
                  {conditions.map((condition) => (
                    <StrategyCondition
                      key={condition.id}
                      condition={condition}
                      marketType={marketType}
                      onUpdate={(field, value) => updateCondition(condition.id, field, value)}
                      onRemove={() => removeCondition(condition.id)}
                    />
                  ))}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="active" checked={isActive} onCheckedChange={setIsActive} />
                <Label htmlFor="active">Activate strategy immediately</Label>
              </div>
            </form>
          </TabsContent>

          <TabsContent value="preview">
            <StrategyPreview name={strategyName} marketType={marketType} conditions={conditions} isActive={isActive} />
          </TabsContent>

          <TabsContent value="backtest">
            <div className="flex h-[400px] items-center justify-center border rounded-lg">
              <p className="text-muted-foreground">Backtesting functionality coming soon</p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSubmit} disabled={isPending || !strategyName || conditions.length === 0}>
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Save Strategy
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
