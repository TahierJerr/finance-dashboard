import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import type { User } from "better-auth"

export function ProfileCard({ user }: { user: User }) {
  return (
    <Card className="max-w-sm">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar>
          <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle>{user.name}</CardTitle>
          <p className="text-sm text-muted-foreground">{user.email}</p>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-500 dark:text-gray-400">Member since {new Date(user.createdAt).toLocaleDateString()}</p>
      </CardContent>
    </Card>
  )
}
