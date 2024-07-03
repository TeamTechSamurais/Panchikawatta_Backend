import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { title } from 'process';

const prisma = new PrismaClient();

//To display all ads from DB
export const getSpareparts = async (req: Request, res: Response) => {
  try {
    const sparePart = await prisma.sparePart.findMany({
      orderBy: {
        sparePartId: 'desc'
      },
      take: 8
    });
    res.json(sparePart);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const searchAds = async (req: Request, res: Response) => {
  const { keyword } = req.query;

  try {
    const spareParts = await prisma.sparePart.findMany({
      where: {
        OR: [
          {
            model: {
              contains: keyword as string,
              mode: 'insensitive'
            }
          },
          // Add other fields if necessary
        ]
      }
    });
    res.json(spareParts);
  } catch (error) {
    console.error('Error searching spare parts:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
