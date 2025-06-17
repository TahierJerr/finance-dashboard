import { auth } from "@/lib/auth";
import prismadb from "@/lib/prismadb";
import { transactionSchema } from "@/lib/schemas/transaction";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const headersList = await headers()
        const session = await auth.api.getSession({
            headers: headersList
        })

        if (!session) {
            return NextResponse.json({ error: "Not Authenticated" }, { status: 401 })
        }
        
        const transactions = await prismadb.transaction.findMany({
            where: {
                userId: session.user.id
            },
            select: {
                id: true,
                amount: true,
                date: true,
                name: true,
                isRecurring: true,
                recurringInterval: true,
                type: true,
                createdAt: true
            },
            orderBy: {
                date: 'desc'
            }
        });
        
        return NextResponse.json(transactions);
    } catch (error) {
        console.log("[TRANSACTIONS_GET]: ", error)
        return new NextResponse("Internal error", { status: 500})
    }
}

export async function POST(req: Request) {
    try {
        const headersList = await headers()
        const session = await auth.api.getSession({headers: headersList });
        if (!session) {
            throw new NextResponse("Unauthenticated", { status: 403});
        }
        
        const body = await req.json();
        const validation = transactionSchema.safeParse(body);
        
        if (!validation.success) {
            return new NextResponse(validation.error.message, { status: 400 })
        }
        
        const { amount, date, isRecurring, name, type, recurringInterval } = validation.data
        
        const transaction = await prismadb.transaction.create({
            data: {
                amount,
                date,
                isRecurring,
                name,
                type,
                recurringInterval,
                userId: session.user.id
            },
            select: {
                id: true,
                amount: true,
                date: true,
                name: true,
                isRecurring: true,
                recurringInterval: true,
                type: true,
                createdAt: true
            }
        });
        
        return NextResponse.json(transaction);
    } catch (error) {
        console.log("[TRANSACTIONS_POST]: ", error)
        return new NextResponse("Internal error", { status: 500})
    }
}
