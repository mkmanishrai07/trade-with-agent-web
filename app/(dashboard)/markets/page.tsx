import type { Metadata } from "next"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StockMarkets } from "@/components/markets/stock-markets"
import { SportsMarkets } from "@/components/markets/sports-markets"
import { CryptoMarkets } from "@/components/markets/crypto-markets"
import { ForexMarkets } from "@/components/markets/forex-markets"

export const metadata: Metadata = {
  title: "Markets | TradeWithAgent",
  description: "View live market data for stocks, sports, crypto, and forex",
}

export default function MarketsPage() {
  return (
    <div className="flex flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Markets</h1>
      </div>

      <Tabs defaultValue="stocks" className="space-y-4">
        <TabsList>
          <TabsTrigger value="stocks">Stocks</TabsTrigger>
          <TabsTrigger value="sports">Sports</TabsTrigger>
          <TabsTrigger value="crypto">Crypto</TabsTrigger>
          <TabsTrigger value="forex">Forex</TabsTrigger>
        </TabsList>
        <TabsContent value="stocks" className="space-y-4">
          <StockMarkets />
        </TabsContent>
        <TabsContent value="sports" className="space-y-4">
          <SportsMarkets />
        </TabsContent>
        <TabsContent value="crypto" className="space-y-4">
          <CryptoMarkets />
        </TabsContent>
        <TabsContent value="forex" className="space-y-4">
          <ForexMarkets />
        </TabsContent>
      </Tabs>
    </div>
  )
}
