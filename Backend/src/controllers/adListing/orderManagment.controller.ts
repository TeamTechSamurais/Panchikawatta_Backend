// orderController.ts
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const placeOrder = async (req: Request, res: Response) => {
    const { name, email, phoneNO, address } = req.body;
    try {
        const newOrder = await prisma.orderSparePart.create({
            data: {
                name,
                email,
                phoneNO,
                address,
                status: 'Pending',
                sparePartId: 1,  // Modify based on actual requirements
                userId: 1,       // Modify based on actual requirements
            }
        });
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(400).json({ error: `An error occurred:` });
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
