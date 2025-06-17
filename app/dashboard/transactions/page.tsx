import { AnalyticsTracker } from "@/components/analytics-tracker";

export default function TransactionsPage() {
  return (
    <div className="p-6 w-full">
      <AnalyticsTracker page="/dashboard/transactions" />
      <h1 className="text-2xl font-bold mb-4">Transactions</h1>
      <p>View and record your transactions here.</p>
    </div>
  );
}
