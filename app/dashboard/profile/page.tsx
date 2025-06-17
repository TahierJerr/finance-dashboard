import { AnalyticsTracker } from "@/components/analytics-tracker";

export default function ProfilePage() {
  return (
    <div className="p-6 w-full">
      <AnalyticsTracker page="/dashboard/profile" />
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <p>Update your profile information here.</p>
    </div>
  );
}
