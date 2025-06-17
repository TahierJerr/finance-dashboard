import { Transaction } from "@prisma/client"

export type MonthlySummary = { month: string; income: number; expenses: number }

export function calculateMonthlySummary(transactions: Transaction[]): MonthlySummary[] {
  const summary: Record<string, MonthlySummary> = {}

  for (const t of transactions) {
    const month = new Date(t.date).toISOString().slice(0, 7)
    if (!summary[month]) {
      summary[month] = { month, income: 0, expenses: 0 }
    }
    if (t.type === "INCOME") {
      summary[month].income += t.amount
    } else {
      summary[month].expenses += t.amount
    }
  }

  return Object.values(summary).sort((a, b) => a.month.localeCompare(b.month))
}
