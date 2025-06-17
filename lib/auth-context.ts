"use client"

import { User } from "better-auth"
import { createContext, useContext } from "react"

export const AuthContext = createContext<User | null>(null)

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) throw new Error ("useAuth must be used within AuthProvider")
    return context
}