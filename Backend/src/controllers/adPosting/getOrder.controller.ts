import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getOrders(req: Request, res: Response) {
    try {
        const orders = await prisma.orderSparePart.findMany({
            include: {
                sparePart: true,
                user: true,
            },
        });
        res.status(200).json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
