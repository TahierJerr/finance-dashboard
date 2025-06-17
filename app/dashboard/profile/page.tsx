import { AnalyticsTracker } from "@/components/analytics-tracker"
import { ProfileCard } from "@/components/profile-card"
import { headers } from "next/headers"
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function ProfilePage() {
  const headersList = await headers()
  const session = await auth.api.getSession({ headers: headersList })

  if (!session) {
    redirect("/sign-in")
  }

  return (
    <div className="p-6 w-full space-y-6">
      <AnalyticsTracker page="/dashboard/profile" />
      <h1 className="text-2xl font-bold">Profile</h1>
      <ProfileCard user={session.user} />
    </div>
  )
}
