import { AnalyticsTracker } from "@/components/analytics-tracker"
import { SummaryCard } from "@/components/summary-card"
import { calculateMonthlySummary } from "@/lib/finance"
import { headers } from "next/headers"
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import prismadb from "@/lib/prismadb"
import { TrendingUp, TrendingDown } from "lucide-react"

export default async function ReportsPage() {
  const headersList = await headers()
  const session = await auth.api.getSession({ headers: headersList })

  if (!session) {
    redirect("/sign-in")
  }

  const transactions = await prismadb.transaction.findMany({
    where: { userId: session.user.id },
  })

  const monthly = calculateMonthlySummary(transactions)
  const totalIncome = monthly.reduce((s, m) => s + m.income, 0)
  const totalExpenses = monthly.reduce((s, m) => s + m.expenses, 0)

  return (
    <div className="p-6 w-full space-y-6">
      <AnalyticsTracker page="/dashboard/reports" />
      <h1 className="text-2xl font-bold">Reports</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SummaryCard title="Total Income" amount={totalIncome} icon={TrendingUp} trend="positive" />
        <SummaryCard title="Total Expenses" amount={totalExpenses} icon={TrendingDown} trend="negative" />
      </div>
    </div>
  )
}
