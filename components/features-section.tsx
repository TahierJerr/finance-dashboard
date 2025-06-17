import { BarChart3, PieChart, TrendingUp } from "lucide-react"

const features = [
{
    icon: <BarChart3 className="h-8 w-8 text-blue-600 dark:text-blue-400" />,
    title: "Expense Tracking",
    description: "Track all your expenses in one place with detailed categorization and analysis.",
},
{
    icon: <TrendingUp className="h-8 w-8 text-green-600 dark:text-green-400" />,
    title: "Income Management",
    description: "Monitor your income sources and analyze your earning patterns over time.",
},
{
    icon: <PieChart className="h-8 w-8 text-purple-600 dark:text-purple-400" />,
    title: "Recurring Transactions",
    description: "Never miss a payment with automatic tracking of your recurring transactions.",
},
]

export function FeaturesSection() {
    return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-6">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-black dark:text-white mb-4">Powerful Financial Tools</h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                    Everything you need to manage your finances in one place
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {features.map((feature, index) => (
                    <div
                    key={index}
                    className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm"
                    >
                    <div className="mb-4">{feature.icon}</div>
                    <h3 className="text-xl font-semibold text-black dark:text-white mb-2">{feature.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
                </div>
                ))}
            </div>
        </div>
    </section>
    )
} 