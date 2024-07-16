// orderController.ts
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const placeOrder = async (req: Request, res: Response) => {
    const { name, email, phoneNo, address, userId, sparePartId } = req.body;
    try {
        const newOrder = await prisma.orderSparePart.create({
            data: {
                name,
                email,
                phoneNo,
                address,
                status: 'Pending',
                sparePartId: sparePartId,  // Use sparePartId from the request body
                userId: userId,            // Use userId from the request body
            }
        });
        res.status(201).json(newOrder);
    } catch (error: any) {
        res.status(400).json({ error: `An error occurred: ${error.message}` });
    }
};


export const finalizeOrder = async (req: Request, res: Response) => {
    const { orderId } = req.body;
    try {
        const updatedOrder = await prisma.orderSparePart.update({
            where: { orderId },
            data: { status: 'Completed' }
        });
        res.status(200).json(updatedOrder);
    } catch (error) {
        res.status(400).json({ error: `An error occurred:` });
    }
};
