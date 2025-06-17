import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { LucideIcon } from "lucide-react"

interface SummaryCardProps {
    title: string
    amount: number
    icon: LucideIcon
    trend?: "positive" | "negative" | "neutral"
}

export function SummaryCard({ title, amount, icon: Icon, trend = "neutral" }: SummaryCardProps) {
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "EUR",
        }).format(amount)
    }
    
    const getTrendColor = () => {
        switch (trend) {
            case "positive":
            return "text-green-600 dark:text-green-400"
            case "negative":
            return "text-red-600 dark:text-red-400"
            default:
            return "text-black dark:text-white"
        }
    }
    
    const getIconColor = () => {
        switch (trend) {
            case "positive":
            return "text-green-600 dark:text-green-400"
            case "negative":
            return "text-red-600 dark:text-red-400"
            default:
            return "text-gray-600 dark:text-gray-400"
        }
    }
    
    return (
    <Card className="border border-gray-200 dark:border-gray-700 shadow-sm bg-white dark:bg-gray-800">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</CardTitle>
            <Icon className={`h-4 w-4 ${getIconColor()}`} />
        </CardHeader>
        <CardContent>
            <div className={`text-2xl font-bold ${getTrendColor()}`}>{formatCurrency(amount)}</div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Current month</p>
        </CardContent>
    </Card>
    )
}
