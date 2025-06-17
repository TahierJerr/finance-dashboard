import type { Metadata } from "next"
import { headers } from "next/headers"
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"

export const metadata: Metadata = {
    title: "Finance Dashboard",
    description: "Track your income, expenses, and recurring transactions with a clean, modern interface",
    keywords: ["finance", "dashboard", "income", "expenses", "budget", "money management"],
    authors: [{ name: "Finance Dashboard" }],
}

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const session = await auth.api.getSession({headers: await headers()})
    
    if (!session) {
        redirect("/sign-in")
    }
    
    return (
    <SidebarProvider>
        <div className="h-screen w-full flex">
            <DashboardSidebar user={session.user} />
            {children}
        </div>
    </SidebarProvider>
    )
}