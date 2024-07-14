import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Fetch orders for a specific seller
export const getOrdersBySeller = async (req: Request, res: Response) => {
  const sellerId = parseInt(req.params.sellerId);

  try {
    const orders = await prisma.orderSparePart.findMany({
      where: {
        userId: sellerId,
      },
    });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};

// Update order status
export const updateOrderStatus = async (req: Request, res: Response) => {
  const orderId = parseInt(req.params.orderId);
  const { status } = req.body;

  try {
    const order = await prisma.orderSparePart.update({
      where: { orderId: orderId },
      data: { status: status },
    });
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update order status' });
  }
};
