import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getSortedSpareParts = async (req: Request, res: Response) => {
  const { sort } = req.query;

  try {
    let spareParts;
    switch (sort) {
      case 'oldest':
        spareParts = await prisma.sparePart.findMany({
          orderBy: { createdAt: 'asc' },
        });
        break;
      case 'price_low_high':
        spareParts = await prisma.sparePart.findMany({
          orderBy: { price: 'asc' },
        });
        break;
      case 'price_high_low':
        spareParts = await prisma.sparePart.findMany({
          orderBy: { price: 'desc' },
        });
        break;
      case 'newest_first':
      default:
        spareParts = await prisma.sparePart.findMany({
          orderBy: { createdAt: 'desc' },
        });
        break;
    }

    res.json(spareParts);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching sorted spare parts' });
  }
};

export const getSortedServices = async (req: Request, res: Response) => {
  const { sort } = req.query;

  try {
    let services;
    switch (sort) {
      case 'oldest':
        services = await prisma.service.findMany({
          orderBy: { createdAt: 'asc' },
        });
        break;
      case 'price_low_high':
        services = await prisma.service.findMany({
          orderBy: { price: 'asc' },
        });
        break;
      case 'price_high_low':
        services = await prisma.service.findMany({
          orderBy: { price: 'desc' },
        });
        break;
      case 'newest_first':
      default:
        services = await prisma.service.findMany({
          orderBy: { createdAt: 'desc' },
        });
        break;
    }

    res.json(services);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching sorted services' });
  }
};
