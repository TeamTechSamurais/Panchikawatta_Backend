import { Request, Response } from 'express';
import { prismaClient } from '../..';

// Fetch orders for a user (buyer)
export const getBuyerOrders = async (req: Request, res: Response) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  try {
    const orders = await prismaClient.orderSparePart.findMany({
      where: { userId: parseInt(userId) },
      include: { sparePart: true },
    });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};

// Fetch orders for a seller
export const getSellerOrders = async (req: Request, res: Response) => {
  const { sellerId } = req.params;

  if (!sellerId) {
    return res.status(400).json({ error: 'Seller ID is required' });
  }

  try {
    const orders = await prismaClient.orderSparePart.findMany({
      where: { sparePart: { sellerId: parseInt(sellerId) } },
      include: { sparePart: true },
    });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};

// Update order status to dispatched (seller action)
export const markOrderAsDispatched = async (req: Request, res: Response) => {
  const { orderId } = req.body;

  if (!orderId) {
    return res.status(400).json({ error: 'Order ID is required' });
  }

  try {
    await prismaClient.orderSparePart.update({
      where: { orderId: parseInt(orderId) },
      data: { status: 'Dispatched' },
    });
    res.status(200).json({ message: 'Order marked as dispatched' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update order status' });
  }
};

// Update order status to delivered (buyer action)
export const markOrderAsDelivered = async (req: Request, res: Response) => {
  const { orderId } = req.params;
  const { userId } = req.body;

  if (!orderId) {
    return res.status(400).json({ error: 'Order ID is required' });
  }

  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  try {
    await prismaClient.orderSparePart.update({
      where: { orderId: parseInt(orderId) },
      data: { status: 'Delivered' },
    });
    res.status(200).json({ message: 'Order marked as delivered' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update order status' });
  }
};