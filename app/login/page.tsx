import { LoginForm } from "@/components/auth/login-form"
import { LineChart } from "lucide-react"

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/40 p-4">
      <div className="mb-8 flex items-center gap-2">
        <LineChart className="h-8 w-8" />
        <h1 className="text-3xl font-bold">TradeWithAgent</h1>
      </div>
      <LoginForm />
    </div>
  )
}
