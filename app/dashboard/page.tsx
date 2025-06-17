import { TrendingUp, TrendingDown, DollarSign } from "lucide-react"
import { SummaryCard } from "@/components/summary-card"
import { TransactionForm } from "@/components/transaction-form"
import { TransactionList } from "@/components/transaction-list"
import { headers } from "next/headers"
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import prismadb from "@/lib/prismadb"

export default async function FinanceDashboard() {
    const headersList = await headers()
    const session = await auth.api.getSession({headers: headersList})
    
    if (!session) {
        redirect("/sign-in")
    }

    const transactions = await prismadb.transaction.findMany({
        where: {
            userId: session.user.id
        }
    })


    
    const currentDate = new Date("2025-06-15")
    const currentMonth = currentDate.toISOString().slice(0, 7)
    
    // Calculate monthly summaries for current month
    const currentMonthTransactions = transactions.filter((transaction) => 
        new Date(transaction.date).toISOString().slice(0, 7) === currentMonth
    )
    
    const totalIncome = currentMonthTransactions
        .filter((t) => t.type === "INCOME")
        .reduce((sum, t) => sum + t.amount, 0)
    
    const totalExpenses = currentMonthTransactions
        .filter((t) => t.type === "EXPENSE")
        .reduce((sum, t) => sum + t.amount, 0)
    
    const netResult = totalIncome - totalExpenses
    
    // Get recent transactions (sorted by date, most recent first)
    const recentTransactions = [...transactions]
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 10) // Show last 10 transactions
    
    // Get recurring transactions
    const recurringTransactions = transactions.filter((t) => t.isRecurring)
    
    return (
            <div className="min-h-screen bg-white dark:bg-black transition-colors w-full">
                <div className=" mx-auto p-6 space-y-8">
                    {/* Header */}
                    <div className="border-b border-gray-100 dark:border-gray-800 pb-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-3xl font-bold text-black dark:text-white">Finance Dashboard</h1>
                                <p className="text-gray-600 dark:text-gray-400 mt-2">
                                    Track your income, expenses, and recurring transactions
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    {/* Monthly Summary Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <SummaryCard title="Total Income" amount={totalIncome} icon={TrendingUp} trend="positive" />
                        <SummaryCard
                            title="Total Expenses"
                            amount={totalExpenses}
                            icon={TrendingDown}
                            trend="negative"
                        />
                        <SummaryCard
                            title="Net Result"
                            amount={netResult}
                            icon={DollarSign}
                            trend={netResult >= 0 ? "positive" : "negative"}
                        />
                    </div>
                    
                    {/* Transaction Form */}
                    <div className="w-full">
                        <TransactionForm />
                    </div>
                    
                    {/* Transaction Lists */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <TransactionList
                            title="Recent Transactions"
                            description="Your latest financial transactions"
                            transactions={recentTransactions}
                        />
                        <TransactionList
                            title="Recurring Transactions"
                            description="Your scheduled recurring income and expenses"
                            transactions={recurringTransactions}
                            showRecurringOnly={true}
                        />
                    </div>
                </div>
            </div>
    )
}