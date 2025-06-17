import { z } from "zod"

export const transactionSchema = z.object({
    name: z.string().trim().min(1, "Name is required"),
    amount: z.number({ invalid_type_error: "Amount must be a number" }).positive("Amount must be greater than 0"),
    type: z.enum(["INCOME", "EXPENSE"]),
    date: z.coerce.date(),
    isRecurring: z.boolean(),
    recurringInterval: z.enum(["WEEKLY", "MONTHLY", "QUARTERLY", "YEARLY", "CUSTOM"]).optional().nullable(),
}).refine(
    (data) => !data.isRecurring || !!data.recurringInterval, {
        message: "Recurring interval is required for recurring transactions",
        path: ["recurringInterval"],
    }
)