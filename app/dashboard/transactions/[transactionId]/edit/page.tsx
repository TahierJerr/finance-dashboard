import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import prismadb from "@/lib/prismadb";
import { redirect } from "next/navigation";
import { EditTransactionForm } from "@/components/transaction-edit-form";

export default async function EditTransactionPage({ params }: { params: { transactionId: string } }) {
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

  return (
    <div className="p-6 w-full">
      <EditTransactionForm transaction={transaction} />
    </div>
  )
}
