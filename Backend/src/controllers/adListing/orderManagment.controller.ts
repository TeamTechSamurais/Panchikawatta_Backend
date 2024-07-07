import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createOrder(req: Request, res: Response) {
    const { name, email, address, phoneNO, sparePartId, userId, status } = req.body;

    try {
        const newOrder = await prisma.orderSparePart.create({
            data: {
                name,
                email,
                address,
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
    } catch (error: any) {
      console.error('Error confirming order:', error);
      if (error.code === 'P2025') { // Prisma error code for record not found
        res.status(404).json({ error: 'Order not found' });
      } else {
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }
  }

export async function cancelOrder(req: Request, res: Response) {
    const { orderId } = req.body;

    try {
        const updatedOrder = await prisma.orderSparePart.update({
            where: { orderId: Number(orderId) },
            data: { status: 'Cancelled' },
        });
        res.status(200).json(updatedOrder);
    } catch (error) {
        console.error('Error cancelling order:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
