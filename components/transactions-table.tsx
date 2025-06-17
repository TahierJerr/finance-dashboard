import { Transaction } from "@prisma/client"
import { TransactionList } from "@/components/transaction-list"

export function TransactionsTable({ transactions }: { transactions: Transaction[] }) {
  return (
    <TransactionList
      title="All Transactions"
      description="Complete history of your transactions"
      transactions={transactions}
    />
  )
}
