import Link from "next/link"
import { DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Navbar() {
    return (
    <header className="border-b border-gray-100 dark:border-gray-800">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
                <DollarSign className="h-6 w-6 text-black dark:text-white" />
                <span className="text-xl font-bold text-black dark:text-white">FinTrack</span>
            </div>
            <div className="flex items-center gap-4">
                <Link href="/dashboard" passHref>
                    <Button variant="outline" className="border-gray-200 dark:border-gray-700">
                        Dashboard
                    </Button>
                </Link>
                <Link href="/sign-in" passHref>
                    <Button className="bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200">
                        Login
                    </Button>
                </Link>
            </div>
        </div>
    </header>
    )
} 