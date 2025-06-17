"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { authClient } from "@/lib/auth-client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { toast } from "sonner"

const formSchema = z.object({
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
})

type FormValues = z.infer<typeof formSchema>
    
interface SignInFormProps {
    onSuccess?: () => void
}
    
export function SignInForm({ onSuccess }: SignInFormProps) {
    const [isLoading, setIsLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [authError, setAuthError] = useState<string | null>(null)
    const router = useRouter()
    
    // Initialize form with react-hook-form and zod resolver
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })
    
    // Define the onSubmit handler
    const onSubmit = async (formData: FormValues) => {
        setIsLoading(true)
        setAuthError(null)
        
        try {
          const { error } = await authClient.signIn.email({
            email: formData.email,
            password: formData.password,
            callbackURL: "/",
          })
          
          if (error?.message) {
            setAuthError(error.message)
          } else {
            if (onSuccess) {
              onSuccess()
            } else {
              router.push('/')
              router.refresh()
            }
          }
        } catch (error) {
          console.error("Sign-in error:", error)
          setAuthError("An unexpected error occurred. Please try again.")
          toast("Woops an error has occurred", {
            description: "An unexpected error occurred. Please try again. If the issue persists, contact support."
          })
        } finally {
          setIsLoading(false)
        }
      }

    return (
        <>
            {authError && (
                <div className="mb-4 p-3 text-sm bg-red-50 border border-red-200 text-red-600 rounded">
                    {authError}
                </div>
            )}
            
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="name@example.com" type="email" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <div className="flex items-center justify-between">
                                    <FormLabel>Password</FormLabel>
                                    <Link href="/forgot-password" className="text-sm font-medium text-primary hover:underline">
                                        Forgot password?
                                    </Link>
                                </div>
                                <FormControl>
                                    <div className="relative">
                                        <Input type={showPassword ? "text" : "password"} placeholder="••••••••" {...field} />
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? (
                                                <EyeOff className="h-4 w-4 text-muted-foreground" />
                                            ) : (
                                                <Eye className="h-4 w-4 text-muted-foreground" />
                                            )}
                                            <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                                        </Button>
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="w-full cursor-pointer" disabled={isLoading}>
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Signing in...
                            </>
                        ) : (
                            "Sign in"
                        )}
                    </Button>
                </form>
            </Form>
        </>
    )
}