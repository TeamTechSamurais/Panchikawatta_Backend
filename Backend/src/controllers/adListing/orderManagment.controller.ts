import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createOrder(req: Request, res: Response) {
    const { name, email, adress, phoneNO, sparePartId, userId, status } = req.body;

    try {
        const newOrder = await prisma.orderSparePart.create({
            data: {
                name,
                email,
                adress,
                phoneNO,
                sparePartId,
                userId,
                status: status || 'Pending',
            },
        });
        res.status(201).json(newOrder);
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export async function confirmOrder(req: Request, res: Response) {
    const { orderId } = req.body;

    try {
        const updatedOrder = await prisma.orderSparePart.update({
            where: { orderId: Number(orderId) },
            data: { status: 'Confirmed' },
        });
        res.status(200).json(updatedOrder);
    } catch (error) {
        console.error('Error confirming order:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
