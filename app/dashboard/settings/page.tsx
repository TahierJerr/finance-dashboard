import { AnalyticsTracker } from "@/components/analytics-tracker";

export default function SettingsPage() {
  return (
    <div className="p-6 w-full">
      <AnalyticsTracker page="/dashboard/settings" />
      <h1 className="text-2xl font-bold mb-4">Settings</h1>
      <p>Configure your dashboard preferences here.</p>
    </div>
  );
}
