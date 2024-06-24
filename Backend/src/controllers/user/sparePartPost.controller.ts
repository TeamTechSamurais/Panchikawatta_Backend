import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createSparePartAd = async (req: Request, res: Response) => {
  const { userId, model, origin, year, description, price } = req.body;

  try {
    const newSparePart = await prisma.sparePart.create({
      data: {
        sellerId: userId,
        model,
        origin,
        year,
        description,
        price,
        title: '', // Add the missing properties
        make: '',
        condition: '',
        fuel: ''
      }
    });

    res.status(201).json(newSparePart);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create spare part ad' });
  }
};
