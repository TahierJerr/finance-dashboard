"use client"

import { SidebarGroup, SidebarContent as SidebarContentComponent, SidebarGroupLabel, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '../ui/sidebar'
import Link from 'next/link'
import { BarChart3, PieChart, CreditCard, User, Settings, EuroIcon, Home } from 'lucide-react'
import { usePathname } from 'next/navigation'


const SidebarContent = () => {

    const pathname = usePathname()
    
    const mainRoutes = [
    {
        label: "Dashboard",
        icon: Home,
        href: "/dashboard",
        active: pathname === "/dashboard",
    },
    {
        label: "Finance",
        icon: EuroIcon,
        href: "/dashboard/finance",
        active: pathname === "/dashboard/finance",
    },
    {
        label: "Transactions",
        icon: CreditCard,
        href: "/dashboard/transactions",
        active: pathname === "/dashboard/transactions",
    },
    {
        label: "Analytics",
        icon: BarChart3,
        href: "/dashboard/analytics",
        active: pathname === "/dashboard/analytics",
    },
    {
        label: "Reports",
        icon: PieChart,
        href: "/dashboard/reports",
        active: pathname === "/dashboard/reports",
    }]

    return (
    <SidebarContentComponent>
        <SidebarGroup>
            <SidebarGroupLabel>Main</SidebarGroupLabel>
            <SidebarGroupContent>
                <SidebarMenu>
                    {mainRoutes.map((route) => (
                        <SidebarMenuItem key={route.href}>
                            <SidebarMenuButton asChild  isActive={route.active} tooltip={route.label}>
                            <Link href={route.href}>
                                <route.icon className="h-4 w-4" />
                                <span>{route.label}</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    </SidebarContentComponent>
    )
}

export default SidebarContent