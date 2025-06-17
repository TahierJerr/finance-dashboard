import { AnalyticsTracker } from "@/components/analytics-tracker"
import { IncomeExpenseChart } from "@/components/charts/income-expense-chart"
import { calculateMonthlySummary } from "@/lib/finance"
import { headers } from "next/headers"
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import prismadb from "@/lib/prismadb"

export default async function AnalyticsPage() {
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

  const data = calculateMonthlySummary(transactions).map((m) => ({
    month: m.month,
    income: m.income,
    expenses: m.expenses,
  }))

  return (
    <div className="p-6 w-full space-y-6">
      <AnalyticsTracker page="/dashboard/analytics" />
      <h1 className="text-2xl font-bold">Analytics</h1>
      <IncomeExpenseChart data={data} />
    </div>
  )
}
