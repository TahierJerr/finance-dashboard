import Link from "next/link"
import { User as UserData } from "better-auth"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { 
    Sidebar, 
    SidebarFooter, 
    SidebarHeader, 
    SidebarRail, 
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { 
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuItem, 
    DropdownMenuSeparator, 
    DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { EuroIcon, LogOut, Settings, User } from "lucide-react"
import SidebarContent from "./sidebar-content"

interface DashboardSidebarProps {
    user: UserData
    className?: string
}

export function DashboardSidebar({ user }: DashboardSidebarProps) {
    
    return (
    <Sidebar collapsible="icon">
        <SidebarHeader>
            <div className="flex items-center gap-2 px-4 py-3">
                <EuroIcon className="h-6 w-6 text-primary" />
                <span className="text-lg font-bold">FinTrack</span>
            </div>
        </SidebarHeader>
        <SidebarContent/>
        <SidebarFooter>
            <div className="p-4">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="w-full justify-start gap-2 px-2">
                            <Avatar className="h-8 w-8">
                                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col items-start text-left">
                                <p className="text-sm font-medium">{user.name}</p>
                                <p className="text-xs text-muted-foreground truncate max-w-[120px]">{user.email}</p>
                            </div>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-56">
                        <DropdownMenuItem asChild>
                            <Link href="/dashboard/profile">
                                <User className="mr-2 h-4 w-4" />
                                <span>Profile</span>
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link href="/dashboard/settings">
                                <Settings className="mr-2 h-4 w-4" />
                                <span>Settings</span>
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <LogOut className="mr-2 h-4 w-4" />
                            <button>Log out</button>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </SidebarFooter>
        <SidebarRail />
    </Sidebar>
    )
}