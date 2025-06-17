"use client"

import { useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Loader2, Save } from "lucide-react"
import { transactionSchema } from "@/lib/schemas/transaction"
import { z } from "zod"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import axios from "axios"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { DateInput } from "./date-picker-input"
import type { Transaction } from "@prisma/client"

 type TransactionFormData = z.infer<typeof transactionSchema>

 interface EditTransactionFormProps {
   transaction: Transaction
 }

 export function EditTransactionForm({ transaction }: EditTransactionFormProps) {
   const router = useRouter()
   const [isLoading, setIsLoading] = useState(false)

   const form = useForm<TransactionFormData>({
     resolver: zodResolver(transactionSchema),
     defaultValues: {
       name: transaction.name,
       amount: transaction.amount,
       type: transaction.type,
       date: new Date(transaction.date),
       isRecurring: transaction.isRecurring,
       recurringInterval: transaction.recurringInterval,
     },
   })

   const { watch, control, handleSubmit, formState: { errors } } = form
   const isRecurring = watch("isRecurring")

   const onSubmit = async (data: TransactionFormData) => {
     setIsLoading(true)
     try {
       await axios.patch(`/api/transaction/${transaction.id}`, data)
       toast.success("Transaction updated successfully!")
       router.refresh()
     } catch (error) {
       console.error("Error updating transaction:", error)
       toast.error(error instanceof Error ? error.message : "Failed to update transaction")
     } finally {
       setIsLoading(false)
     }
   }

   return (
     <div className="w-full max-w-2xl space-y-6">
       <div>
         <h1 className="text-2xl font-bold">Edit Transaction</h1>
       </div>
       <Form {...form}>
         <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <FormField
               control={control}
               name="name"
               render={({ field }) => (
                 <FormItem>
                   <FormLabel>Name</FormLabel>
                   <FormControl>
                     <Input placeholder="Transaction name" {...field} />
                   </FormControl>
                   <FormMessage />
                 </FormItem>
               )}
             />
             <FormField
               control={control}
               name="amount"
               render={({ field }) => (
                 <FormItem>
                   <FormLabel>Amount ()</FormLabel>
                   <FormControl>
                     <Input
                       type="number"
                       step="0.01"
                       placeholder="0.00"
                       {...field}
                       onChange={(e) => field.onChange(parseFloat(e.target.value))}
                       value={field.value}
                     />
                   </FormControl>
                   <FormMessage />
                 </FormItem>
               )}
             />
             <FormField
               control={control}
               name="type"
               render={({ field }) => (
                 <FormItem>
                   <FormLabel>Transaction Type</FormLabel>
                   <FormControl>
                     <Select value={field.value} onValueChange={field.onChange}>
                       <SelectTrigger>
                         <SelectValue placeholder="Select type" />
                       </SelectTrigger>
                       <SelectContent>
                         <SelectItem value="INCOME">Income</SelectItem>
                         <SelectItem value="EXPENSE">Expense</SelectItem>
                       </SelectContent>
                     </Select>
                   </FormControl>
                   <FormMessage />
                 </FormItem>
               )}
             />
             <Controller
               control={control}
               name="date"
               render={({ field }) => (
                 <DateInput
                   value={field.value ? new Date(field.value) : undefined}
                   onChange={date => field.onChange(date)}
                   error={errors.date?.message}
                 />
               )}
             />
           </div>
           <FormField
             control={control}
             name="isRecurring"
             render={({ field }) => (
               <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                 <FormControl>
                   <Checkbox checked={field.value} onCheckedChange={field.onChange} id="isRecurring" />
                 </FormControl>
                 <FormLabel htmlFor="isRecurring">This is a recurring transaction</FormLabel>
                 <FormMessage />
               </FormItem>
             )}
           />
           {isRecurring && (
             <FormField
               control={control}
               name="recurringInterval"
               render={({ field }) => (
                 <FormItem>
                   <FormLabel>Recurring Interval</FormLabel>
                   <FormControl>
                     <Select value={field.value || undefined} onValueChange={field.onChange}>
                       <SelectTrigger>
                         <SelectValue placeholder="Select interval" />
                       </SelectTrigger>
                       <SelectContent>
                         <SelectItem value="WEEKLY">Weekly</SelectItem>
                         <SelectItem value="MONTHLY">Monthly</SelectItem>
                         <SelectItem value="QUARTERLY">Quarterly</SelectItem>
                         <SelectItem value="YEARLY">Yearly</SelectItem>
                         <SelectItem value="CUSTOM">Custom</SelectItem>
                       </SelectContent>
                     </Select>
                   </FormControl>
                   <FormMessage />
                 </FormItem>
               )}
             />
           )}
           <Button type="submit" disabled={isLoading} className="w-full">
             {isLoading ? (
               <>
                 <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                 Saving...
               </>
             ) : (
               <>
                 <Save className="h-4 w-4 mr-2" />
                 Save Changes
               </>
             )}
           </Button>
         </form>
       </Form>
     </div>
   )
 }
