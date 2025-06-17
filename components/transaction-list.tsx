"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowUp, ArrowDown, RotateCcw, MoreVertical } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { Transaction } from "@prisma/client"
import axios from "axios"
import { toast } from "sonner"

interface TransactionListProps {
  title: string
  description: string
  transactions: Transaction[]
  showRecurringOnly?: boolean
}

export function TransactionList({ title, description, transactions, showRecurringOnly = false }: TransactionListProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "EUR",
    }).format(amount)
  }

  const formatDate = (date: Date | string) => {
    const dateObj = typeof date === 'string' ? new Date(date) : date
    return dateObj.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    })
  }

  const getRecurringLabel = (interval: string) => {
    switch (interval) {
      case "WEEKLY":
        return "Weekly"
      case "MONTHLY":
        return "Monthly"
      case "QUARTERLY":
        return "Quarterly"
      case "YEARLY":
        return "Yearly"
      case "CUSTOM":
        return "Custom"
      default:
        return interval
    }
  }

  const router = useRouter()

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this transaction?")) return
    try {
      await axios.delete(`/api/transaction/${id}`)
      toast.success("Transaction deleted")
      router.refresh()
    } catch (error) {
      console.error("Delete error", error)
      toast.error("Failed to delete transaction")
    }
  }

  const filteredTransactions = showRecurringOnly ? transactions.filter((t) => t.isRecurring) : transactions

  return (
    <Card className="border border-gray-200 dark:border-gray-700 shadow-sm bg-white dark:bg-gray-800">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-black dark:text-white">{title}</CardTitle>
        <CardDescription className="dark:text-gray-400">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {filteredTransactions.length > 0 ? (
          <div className="space-y-3">
            {filteredTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className={`flex items-center justify-between p-3 rounded-lg border ${
                  transaction.type === "INCOME"
                    ? "bg-green-50 dark:bg-green-900/20 border-green-100 dark:border-green-800"
                    : "bg-red-50 dark:bg-red-900/20 border-red-100 dark:border-red-800"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`p-1 rounded-full ${
                      transaction.type === "INCOME" ? "bg-green-100 dark:bg-green-800" : "bg-red-100 dark:bg-red-800"
                    }`}
                  >
                    {transaction.type === "INCOME" ? (
                      <ArrowUp className="h-3 w-3 text-green-600 dark:text-green-400" />
                    ) : (
                      <ArrowDown className="h-3 w-3 text-red-600 dark:text-red-400" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-black dark:text-white">{transaction.name}</p>
                      {transaction.isRecurring && (
                        <Badge
                          variant="outline"
                          className="text-xs bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800"
                        >
                          <RotateCcw className="h-3 w-3 mr-1" />
                          {getRecurringLabel(transaction.recurringInterval!)}
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{formatDate(transaction.date)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className={`font-semibold ${
                      transaction.type === "INCOME"
                        ? "text-green-600 dark:text-green-400"
                        : "text-red-600 dark:text-red-400"
                    }`}
                  >
                    {transaction.type === "INCOME" ? "+" : "-"}
                    {formatCurrency(transaction.amount)}
                  </div>
                  {showRecurringOnly && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/dashboard/transactions/${transaction.id}`}>View</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/dashboard/transactions/${transaction.id}/edit`}>Edit</Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => handleDelete(transaction.id)}
                          variant="destructive"
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 dark:text-gray-400 text-center py-4">
            No {showRecurringOnly ? "recurring " : ""}transactions found
          </p>
        )}
      </CardContent>
    </Card>
  )
}
