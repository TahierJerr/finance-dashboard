import { AnalyticsTracker } from "@/components/analytics-tracker"
import { ThemeToggle } from "@/components/theme-toggle"

export default function SettingsPage() {
  return (
    <div className="p-6 w-full space-y-6">
      <AnalyticsTracker page="/dashboard/settings" />
      <h1 className="text-2xl font-bold">Settings</h1>
      <div>
        <p className="mb-2">Toggle theme</p>
        <ThemeToggle />
      </div>
    </div>
  )
}
