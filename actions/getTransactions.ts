import type { Transaction } from "@prisma/client";
import axios from "axios"


const getTransactions = async (id?: string): Promise<Transaction[]> => {
    try {
        const res = await axios.get(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/transaction${id ? `/${id}` : ''}`,
            { withCredentials: true}
        );
        return res.data;
    } catch (error: any) {
        if (error.response?.status === 403) {
            console.error("Unauthorized: please log in", error);
            return [];
        }
        
        console.error("[GET_TRANSACTIONS_FAILED]", error);
        throw new Error("Failed to fetch transactions");
    }
};


export default getTransactions
