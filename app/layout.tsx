import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
    title: "Finance Dashboard",
    description: "Track your income, expenses, and recurring transactions with a clean, modern interface",
    keywords: ["finance", "dashboard", "income", "expenses", "budget", "money management"],
    authors: [{ name: "Finance Dashboard" }],
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
    <html lang="en" suppressHydrationWarning>
    <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
    </head>
    <body className={`${inter.className} antialiased`}>
        <div className="min-h-screen bg-background">{children}</div>
    </body>
    </html>
    )
}