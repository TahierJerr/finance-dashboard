import { AnalyticsTracker } from "@/components/analytics-tracker";

export default function FinancePage() {
  return (
    <div className="p-6 w-full">
      <AnalyticsTracker page="/dashboard/finance" />
      <h1 className="text-2xl font-bold mb-4">Finance</h1>
      <p>Manage your accounts and financial data here.</p>
    </div>
  );
}
