"use client"

import type React from "react"

import { useState } from "react"
import { useAskAI } from "@/lib/hooks"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, Send, Sparkles } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function AiInsightsForm() {
  const [question, setQuestion] = useState("")
  const [response, setResponse] = useState<string | null>(null)
  const { mutate: askAI, isPending } = useAskAI()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!question.trim()) return

    // Clear previous response
    setResponse(null)

    // Call the API
    askAI(question, {
      onSuccess: (data) => {
        setResponse(data.response)
      },
    })
  }

  // Example questions
  const exampleQuestions = [
    "What stocks are showing bullish patterns today?",
    "Analyze the upcoming NFL game between Chiefs and Raiders",
    "Should I buy or sell Tesla stock this week?",
    "What's the outlook for EUR/USD in the next 24 hours?",
    "Compare the performance of tech stocks vs energy stocks",
  ]

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Ask AI Assistant</CardTitle>
        <CardDescription>Get personalized trading insights and recommendations</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="chat">
          <TabsList className="mb-4">
            <TabsTrigger value="chat">Chat</TabsTrigger>
            <TabsTrigger value="examples">Examples</TabsTrigger>
          </TabsList>
          <TabsContent value="chat">
            <form onSubmit={handleSubmit} className="space-y-4">
              <Textarea
                placeholder="Ask about market trends, specific stocks, sports events, or trading strategies..."
                className="min-h-[100px]"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />

              {response && (
                <div className="rounded-lg border bg-card p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="h-4 w-4 text-primary" />
                    <span className="font-medium">AI Response</span>
                  </div>
                  <div className="prose prose-sm dark:prose-invert max-w-none">
                    {response.split("\n").map((line, i) => (
                      <p key={i}>{line}</p>
                    ))}
                  </div>
                </div>
              )}

              <Button type="submit" className="w-full" disabled={isPending || !question.trim()}>
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating insights...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Get Insights
                  </>
                )}
              </Button>
            </form>
          </TabsContent>
          <TabsContent value="examples">
            <div className="space-y-2">
              {exampleQuestions.map((q, i) => (
                <Button
                  key={i}
                  variant="outline"
                  className="w-full justify-start h-auto py-2 px-4"
                  onClick={() => setQuestion(q)}
                >
                  {q}
                </Button>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-2">
        <div className="flex flex-wrap gap-2">
          <Badge
            variant="outline"
            className="cursor-pointer"
            onClick={() => setQuestion("What stocks are trending today?")}
          >
            Trending Stocks
          </Badge>
          <Badge
            variant="outline"
            className="cursor-pointer"
            onClick={() => setQuestion("Analyze NFL betting odds for this weekend")}
          >
            Sports Betting
          </Badge>
          <Badge variant="outline" className="cursor-pointer" onClick={() => setQuestion("Should I buy Bitcoin now?")}>
            Crypto Analysis
          </Badge>
        </div>
        <p className="text-xs text-muted-foreground">
          AI insights are based on market data and should not be considered financial advice.
        </p>
      </CardFooter>
    </Card>
  )
}
