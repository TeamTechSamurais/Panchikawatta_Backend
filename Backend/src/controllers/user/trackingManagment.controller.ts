import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const placeOrder = async (req: Request, res: Response): Promise<void> => {
  const { name, email, address, phoneNO, sparePartId, userId } = req.body;
  try {
    const newOrder = await prisma.orderSparePart.create({
      data: {
        name,
        email,
        address,
        phoneNO,
        sparePartId,
        userId,
        status: 'Processing',
      },
    });
    res.status(201).json(newOrder);
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateOrderStatus = async (req: Request, res: Response): Promise<void> => {
  const { orderId } = req.params;
  const { status } = req.body;
  try {
    const updatedOrder = await prisma.orderSparePart.update({
      where: { orderId: Number(orderId) },
      data: { status },
    });
    res.status(200).json(updatedOrder);
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
};

export const getUserOrders = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.params;
  try {
    const orders = await prisma.orderSparePart.findMany({
      where: { userId: Number(userId) },
      include: { sparePart: true },
    });
    res.status(200).json(orders);
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
};

export const getSellerOrders = async (req: Request, res: Response): Promise<void> => {
  const { sellerId } = req.params;
  try {
    const orders = await prisma.orderSparePart.findMany({
      where: {
        sparePart: {
          sellerId: Number(sellerId),
        },
      },
      include: { sparePart: true, user: true },
    });
    res.status(200).json(orders);
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
};
