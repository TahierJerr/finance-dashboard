import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import prismadb from "@/lib/prismadb";
import { redirect } from "next/navigation";

export default async function TransactionDetails({ params }: { params: { transactionId: string } }) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) {
    redirect("/sign-in")
  }

  const transaction = await prismadb.transaction.findFirst({
    where: {
      id: params.transactionId,
      userId: session.user.id,
    },
  })

  if (!transaction) {
    return <div className="p-6">Transaction not found</div>
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "EUR",
    }).format(amount)
  }

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    })
  }

  return (
    <div className="p-6 w-full space-y-4">
      <h1 className="text-2xl font-bold">Transaction Details</h1>
      <div className="space-y-2">
        <p><span className="font-medium">Name:</span> {transaction.name}</p>
        <p><span className="font-medium">Amount:</span> {formatCurrency(transaction.amount)}</p>
        <p><span className="font-medium">Type:</span> {transaction.type}</p>
        <p><span className="font-medium">Date:</span> {formatDate(transaction.date)}</p>
        {transaction.isRecurring && (
          <p><span className="font-medium">Recurring:</span> {transaction.recurringInterval}</p>
        )}
      </div>
    </div>
  )
}
