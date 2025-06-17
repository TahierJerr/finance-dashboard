import { AnalyticsTracker } from "@/components/analytics-tracker";

export default function ReportsPage() {
  return (
    <div className="p-6 w-full">
      <AnalyticsTracker page="/dashboard/reports" />
      <h1 className="text-2xl font-bold mb-4">Reports</h1>
      <p>Generate and view financial reports here.</p>
    </div>
  );
}
