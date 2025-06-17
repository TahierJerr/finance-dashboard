import { AnalyticsTracker } from "@/components/analytics-tracker";

export default function AnalyticsPage() {
  return (
    <div className="p-6 w-full">
      <AnalyticsTracker page="/dashboard/analytics" />
      <h1 className="text-2xl font-bold mb-4">Analytics</h1>
      <p>Explore analytics and charts about your finances.</p>
    </div>
  );
}
