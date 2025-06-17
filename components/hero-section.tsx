import Link from "next/link"
import { ArrowRight, BarChart3, DollarSign, PieChart, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
    return (
    <section className="py-20 md:py-32">
        <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="space-y-8">
                    <h1 className="text-4xl md:text-6xl font-bold text-black dark:text-white leading-tight">
                        Take control of your <span className="text-blue-600 dark:text-blue-400">financial</span> future
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400 max-w-lg">
                        Track your income, expenses, and recurring transactions with our intuitive dashboard. Make smarter
                        financial decisions with real-time insights.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Link href="/dashboard" passHref>
                            <Button
                            size="lg"
                            className="bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200"
                            >
                            Get Started
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </Link>
                    <Button size="lg" variant="outline" className="border-gray-200 dark:border-gray-700">
                        Learn More
                    </Button>
                </div>
            </div>
            <div className="relative">
                <div className="absolute -z-10 inset-0 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-3xl transform rotate-3"></div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold text-black dark:text-white">Monthly Overview</h3>
                        <span className="text-sm text-gray-500 dark:text-gray-400">June 2025</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                            <div className="flex items-center gap-2 mb-2">
                                <TrendingUp className="h-4 w-4 text-green-500" />
                                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Income</span>
                            </div>
                            <p className="text-2xl font-bold text-black dark:text-white">$3,000</p>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                            <div className="flex items-center gap-2 mb-2">
                                <BarChart3 className="h-4 w-4 text-red-500" />
                                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Expenses</span>
                            </div>
                            <p className="text-2xl font-bold text-black dark:text-white">$1,250</p>
                        </div>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg mb-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <PieChart className="h-4 w-4 text-blue-500" />
                                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Spending by Category</span>
                            </div>
                        </div>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600 dark:text-gray-400">Housing</span>
                                <div className="flex items-center gap-2">
                                    <div className="w-24 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                        <div className="bg-blue-500 h-full rounded-full" style={{ width: "40%" }}></div>
                                    </div>
                                    <span className="text-sm font-medium text-black dark:text-white">40%</span>
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600 dark:text-gray-400">Food</span>
                                <div className="flex items-center gap-2">
                                    <div className="w-24 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                        <div className="bg-green-500 h-full rounded-full" style={{ width: "25%" }}></div>
                                    </div>
                                    <span className="text-sm font-medium text-black dark:text-white">25%</span>
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600 dark:text-gray-400">Transport</span>
                                <div className="flex items-center gap-2">
                                    <div className="w-24 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                        <div className="bg-yellow-500 h-full rounded-full" style={{ width: "15%" }}></div>
                                    </div>
                                    <span className="text-sm font-medium text-black dark:text-white">15%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <Button
                        variant="ghost"
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                        >
                        View Full Report
                    </Button>
                </div>
            </div>
        </div>
    </div>
</div>
</section>
)
} 