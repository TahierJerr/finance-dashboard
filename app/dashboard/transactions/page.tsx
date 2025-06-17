import { AnalyticsTracker } from "@/components/analytics-tracker"
import { TransactionsTable } from "@/components/transactions-table"
import { headers } from "next/headers"
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import prismadb from "@/lib/prismadb"

export default async function TransactionsPage() {
  const headersList = await headers()
  const session = await auth.api.getSession({ headers: headersList })

  if (!session) {
    redirect("/sign-in")
  }

  const transactions = await prismadb.transaction.findMany({
    where: { userId: session.user.id },
    orderBy: { date: "desc" },
  })

  return (
    <div className="p-6 w-full space-y-6">
      <AnalyticsTracker page="/dashboard/transactions" />
      <h1 className="text-2xl font-bold">Transactions</h1>
      <TransactionsTable transactions={transactions} />
    </div>
  )
}
