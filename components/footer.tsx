import { DollarSign } from "lucide-react"

export function Footer() {
    return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 py-12">
        <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="flex items-center gap-2 mb-4 md:mb-0">
                    <DollarSign className="h-6 w-6 text-black dark:text-white" />
                    <span className="text-xl font-bold text-black dark:text-white">FinTrack</span>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                    © {new Date().getFullYear()} FinTrack. All rights reserved.
                </div>
            </div>
        </div>
    </footer>
    )
} 