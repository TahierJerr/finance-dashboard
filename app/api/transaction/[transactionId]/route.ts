import { auth } from "@/lib/auth";
import prismadb from "@/lib/prismadb";
import { transactionSchema } from "@/lib/schemas/transaction";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(_: Request,{ params }: { params: { transactionId: string}}) {
    try {
        if (!params.transactionId) {
            return new NextResponse("Transaction ID is required", { status: 400 })
        }
        
        const headersList = await headers()
        const session = await auth.api.getSession({
            headers: headersList
        })

        if (!session) {
            return NextResponse.json({ error: "Not Authenticated" }, { status: 401 })
        }
        
        const transaction = await prismadb.transaction.findFirst({
            where: {
                id: params.transactionId,
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
        
        if (!transaction) {
            return new NextResponse("Transaction not found", { status: 404 })
        }
        
        return NextResponse.json(transaction);
    } catch (error) {
        console.log("[TRANSACTION_GET]: ", params.transactionId, error)
        return new NextResponse("Internal error", { status: 500})
    }
}



export async function PATCH(req: Request, { params }: { params: { transactionId: string}}) {
    try {
        if (!params.transactionId) {
            return new NextResponse("Transaction ID is required", { status: 400 })
        }
        
        const headersList = await headers()
        const session = await auth.api.getSession({
            headers: headersList
        })

        if (!session) {
            return NextResponse.json({ error: "Not Authenticated" }, { status: 401 })
        }
        
        const transaction = await prismadb.transaction.findFirst({
            where: {
                id: params.transactionId,
                userId: session.user.id
            }
        })
        
        if (!transaction) return new NextResponse("Transaction not found", { status: 404 })
            
        const body = await req.json();
        
        const validation = transactionSchema.safeParse(body);
        
        if (!validation.success) {
            return new NextResponse(validation.error.message, { status: 400 })
        }
        
        
        const { amount, date, isRecurring, name, type, recurringInterval } = validation.data
        
        const updatedTransaction = await prismadb.transaction.update({
            where: {
                id: transaction.id,
            },
            data: {
                amount,
                date,
                isRecurring,
                name,
                type,
                recurringInterval,
            },
            select: {
                id: true,
                amount: true,
                date: true,
                name: true,
                isRecurring: true,
                recurringInterval: true,
                type: true,
                createdAt: true,
            }
        });          
        
        return NextResponse.json(updatedTransaction);
    } catch (error) {
        console.log("[TRANSACTION_PATCH]: ", params.transactionId, error)
        return new NextResponse("Internal error", { status: 500})
    }
}

export async function DELETE(_: Request, { params }: { params: { transactionId: string}}) {
    try {
        if (!params.transactionId) {
            return new NextResponse("Transaction ID is required", { status: 400 })
        }
        
        const headersList = await headers()
        const session = await auth.api.getSession({
            headers: headersList
        })

        if (!session) {
            return NextResponse.json({ error: "Not Authenticated" }, { status: 401 })
        }
        
        const transaction = await prismadb.transaction.findFirst({
            where: {
                id: params.transactionId,
                userId: session.user.id
            }
        })
        
        if (!transaction) {
            return new NextResponse("Transaction not found", { status: 404 })
        } 
        
        await prismadb.transaction.delete({
            where: {
                id: transaction.id
            }
        })
        
        return new NextResponse(null, { status: 204 })
    } catch (error) {
        console.log("[TRANSACTION_DELETE]: ", params.transactionId, error)
        return new NextResponse("Internal error", { status: 500})
    }
}