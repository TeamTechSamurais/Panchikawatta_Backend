import { Request, Response } from 'express';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createServiceAd = async (req: Request, res: Response) => {
  const { userId, serviceName, description, price } = req.body;

  try {
    const newService = await prisma.service.create({
      data: {
        sellerId: userId,
        title: serviceName,
        description: description,
        price: price,
        userId: userId
      
        
      }
    });

    res.status(201).json(newService);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create service ad' });
  }
};
