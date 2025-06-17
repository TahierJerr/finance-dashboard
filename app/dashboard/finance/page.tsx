import { AnalyticsTracker } from "@/components/analytics-tracker"
import { SummaryCard } from "@/components/summary-card"
import { IncomeExpenseChart } from "@/components/charts/income-expense-chart"
import { calculateMonthlySummary } from "@/lib/finance"
import { headers } from "next/headers"
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import prismadb from "@/lib/prismadb"
import { TrendingDown, TrendingUp, DollarSign } from "lucide-react"

export default async function FinancePage() {
  const headersList = await headers()
  const session = await auth.api.getSession({ headers: headersList })

  if (!session) {
    redirect("/sign-in")
  }

  const transactions = await prismadb.transaction.findMany({
    where: {
      userId: session.user.id,
    },
  })

  const totalIncome = transactions
    .filter((t) => t.type === "INCOME")
    .reduce((sum, t) => sum + t.amount, 0)

  const totalExpenses = transactions
    .filter((t) => t.type === "EXPENSE")
    .reduce((sum, t) => sum + t.amount, 0)

  const netResult = totalIncome - totalExpenses

  const chartData = calculateMonthlySummary(transactions)

  return (
    <div className="p-6 w-full space-y-6">
      <AnalyticsTracker page="/dashboard/finance" />
      <h1 className="text-2xl font-bold">Finance Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SummaryCard title="Total Income" amount={totalIncome} icon={TrendingUp} trend="positive" />
        <SummaryCard title="Total Expenses" amount={totalExpenses} icon={TrendingDown} trend="negative" />
        <SummaryCard title="Net Result" amount={netResult} icon={DollarSign} trend={netResult >= 0 ? "positive" : "negative"} />
      </div>
      <IncomeExpenseChart data={chartData} />
    </div>
  )
}
