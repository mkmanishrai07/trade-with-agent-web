"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "./axios";
import { useToast } from "@/components/ui/use-toast";

// Mock data for fallback
const mockMarkets = [
  {
    id: "1",
    name: "AAPL",
    fullName: "Apple Inc.",
    price: 175.34,
    change: 2.45,
    changePercent: 1.42,
    volume: 32456789,
    marketCap: 2850000000000,
    type: "stock",
  },
  {
    id: "2",
    name: "MSFT",
    fullName: "Microsoft Corporation",
    price: 325.76,
    change: 1.23,
    changePercent: 0.38,
    volume: 21345678,
    marketCap: 2420000000000,
    type: "stock",
  },
  {
    id: "3",
    name: "GOOGL",
    fullName: "Alphabet Inc.",
    price: 142.56,
    change: -0.87,
    changePercent: -0.61,
    volume: 18765432,
    marketCap: 1850000000000,
    type: "stock",
  },
  {
    id: "4",
    name: "BTC/USD",
    fullName: "Bitcoin",
    price: 42356.78,
    change: -1.56,
    changePercent: -0.35,
    volume: 28765432,
    marketCap: 820000000000,
    type: "crypto",
  },
  {
    id: "5",
    name: "EUR/USD",
    fullName: "Euro / US Dollar",
    price: 1.0923,
    change: -0.0045,
    changePercent: -0.41,
    volume: 98765432,
    marketCap: 0,
    type: "forex",
  },
  {
    id: "6",
    name: "NFL: Chiefs",
    fullName: "Kansas City Chiefs",
    price: 1.75,
    change: 0.05,
    changePercent: 2.94,
    volume: 5678901,
    marketCap: 0,
    type: "sports",
  },
];

// Hook for fetching market data
export function useMarkets() {
  return useQuery({
    queryKey: ["markets"],
    queryFn: async () => {
      try {
        const response = await api.get("/markets");
        return response.data;
      } catch (error) {
        console.error("Error fetching markets:", error);
        return mockMarkets;
      }
    },
  });
}

// Hook for fetching a specific market
export function useMarket(marketId: string) {
  return useQuery({
    queryKey: ["markets", marketId],
    queryFn: async () => {
      try {
        const response = await api.get(`/markets/${marketId}`);
        return response.data;
      } catch (error) {
        console.error(`Error fetching market ${marketId}:`, error);
        // Return a mock market with price history
        const mockMarket =
          mockMarkets.find((m) => m.id === marketId) || mockMarkets[0];
        return {
          ...mockMarket,
          priceHistory: generateMockStockData(),
        };
      }
    },
    enabled: !!marketId,
  });
}

// Generate mock stock data for charts
function generateMockStockData() {
  const data = [];
  const now = new Date();

  for (let i = 30; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);

    // Generate a random price with a trend
    const basePrice = 150 + Math.sin(i / 5) * 20;
    const randomFactor = Math.random() * 10 - 5;
    const price = basePrice + randomFactor;

    data.push({
      date: date.toISOString().split("T")[0],
      price: Number.parseFloat(price.toFixed(2)),
      volume: Math.floor(Math.random() * 10000000) + 5000000,
    });
  }

  return data;
}

// Hook for fetching user's trading history
export function useHistory(filters = {}) {
  return useQuery({
    queryKey: ["history", filters],
    queryFn: async () => {
      try {
        const response = await api.get("/history", { params: filters });
        return response.data;
      } catch (error) {
        console.error("Error fetching history:", error);
        // Return mock history data
        return {
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
              response:
                "AAPL, MSFT, and GOOGL are showing strong bullish patterns based on technical indicators.",
              date: "2023-04-28T14:30:00Z",
            },
            {
              id: "2",
              question:
                "Analyze the upcoming NFL game between Chiefs and Raiders",
              response:
                "Chiefs are favored by 7 points. Historical data shows they cover the spread 65% of the time as home favorites.",
              date: "2023-04-27T10:15:00Z",
            },
            {
              id: "3",
              question: "Should I buy or sell Tesla stock this week?",
              response:
                "TSLA earnings missed expectations. Technical indicators suggest a potential downtrend.",
              date: "2023-04-26T18:45:00Z",
            },
          ],
        };
      }
    },
  });
}

// Hook for asking AI for insights
export function useAskAI() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (question: string) => {
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Generate a mock response based on the question
        let response = "I'm analyzing the market data...";

        if (question.toLowerCase().includes("stock")) {
          response =
            "Based on current market trends, tech stocks are showing strong momentum. Consider watching AAPL, MSFT, and GOOGL for potential opportunities. Always diversify your portfolio and manage risk appropriately.";
        } else if (
          question.toLowerCase().includes("crypto") ||
          question.toLowerCase().includes("bitcoin")
        ) {
          response =
            "Cryptocurrency markets are showing increased volatility. Bitcoin is testing key resistance levels. Consider waiting for confirmation of trend direction before making significant moves.";
        } else if (
          question.toLowerCase().includes("sport") ||
          question.toLowerCase().includes("nfl") ||
          question.toLowerCase().includes("nba")
        ) {
          response =
            "Sports betting markets indicate home teams are favored this weekend. Historical data shows a 62% win rate for home favorites in similar conditions. Weather conditions may impact outdoor games.";
        } else if (
          question.toLowerCase().includes("forex") ||
          question.toLowerCase().includes("eur") ||
          question.toLowerCase().includes("usd")
        ) {
          response =
            "EUR/USD is approaching a key resistance level. Watch for central bank announcements this week which could cause volatility. Current trend is slightly bullish but exercise caution.";
        } else {
          response =
            "Based on my analysis, market conditions are mixed. Focus on your investment strategy and risk management. Consider diversifying across different asset classes to reduce overall portfolio risk.";
        }

        return {
          response,
          id: Date.now().toString(),
          timestamp: new Date().toISOString(),
          sentiment: question.toLowerCase().includes("bearish")
            ? "bearish"
            : question.toLowerCase().includes("bullish")
            ? "bullish"
            : "neutral",
        };
      } catch (error: any) {
        console.error("Error asking AI:", error);
        toast({
          title: "Error",
          description: error.message || "Failed to get AI insights",
          variant: "destructive",
        });
        throw error;
      }
    },
    onSuccess: () => {
      // Invalidate insights history to refresh the list
      queryClient.invalidateQueries({ queryKey: ["insights"] });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to get AI insights",
        variant: "destructive",
      });
    },
  });
}

// Hook for fetching insights history
export function useInsights() {
  return useQuery({
    queryKey: ["insights"],
    queryFn: async () => {
      try {
        const response = await api.get("/insights");
        // Ensure we return an array
        return Array.isArray(response.data) ? response.data : [];
      } catch (error) {
        console.error("Error fetching insights:", error);
        // Return mock insights
        return [
          {
            id: "1",
            message: "AAPL showing strong bullish pattern, consider buying",
            timestamp: "2023-04-28T14:30:00Z",
            sentiment: "bullish",
          },
          {
            id: "2",
            message: "NFL: Chiefs vs Raiders - home team favored by 7 points",
            timestamp: "2023-04-28T10:15:00Z",
            sentiment: "neutral",
          },
          {
            id: "3",
            message: "TSLA earnings missed expectations, potential downtrend",
            timestamp: "2023-04-27T21:45:00Z",
            sentiment: "bearish",
          },
          {
            id: "4",
            message:
              "NBA: Lakers showing value in spread markets for next game",
            timestamp: "2023-04-27T18:20:00Z",
            sentiment: "bullish",
          },
        ];
      }
    },
  });
}

// Hook for creating a trading strategy
export function useCreateStrategy() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (strategy: any) => {
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Return a success response
        return {
          id: Date.now().toString(),
          ...strategy,
          createdAt: new Date().toISOString(),
        };
      } catch (error: any) {
        console.error("Error creating strategy:", error);
        toast({
          title: "Error",
          description: error.message || "Failed to create strategy",
          variant: "destructive",
        });
        throw error;
      }
    },
    onSuccess: (data) => {
      toast({
        title: "Success",
        description: "Strategy created successfully",
      });
      queryClient.invalidateQueries({ queryKey: ["strategies"] });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create strategy",
        variant: "destructive",
      });
    },
  });
}

// Hook for fetching user's strategies
export function useStrategies() {
  return useQuery({
    queryKey: ["strategies"],
    queryFn: async () => {
      try {
        const response = await api.get("/strategies");
        return response.data;
      } catch (error) {
        console.error("Error fetching strategies:", error);
        // Return mock strategies
        return [
          {
            id: "1",
            name: "Tech Momentum Strategy",
            status: "active",
            progress: 75,
            profit: 320.5,
          },
          {
            id: "2",
            name: "NFL Underdog Spread",
            status: "pending",
            progress: 0,
            profit: 0,
          },
          {
            id: "3",
            name: "Forex Trend Following",
            status: "active",
            progress: 45,
            profit: -120.75,
          },
        ];
      }
    },
  });
}
