"use client"

import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts"

export interface MonthlyData {
  month: string
  income: number
  expenses: number
}

export function IncomeExpenseChart({ data }: { data: MonthlyData[] }) {
  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="income" stroke="#16a34a" />
          <Line type="monotone" dataKey="expenses" stroke="#dc2626" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
