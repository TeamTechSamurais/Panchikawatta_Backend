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
      take: 10
    });
    res.json(sparePart);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const searchSpareParts = async (req: Request, res: Response) => {
  const { keyword } = req.query;

  try {
    const spareParts = await prisma.sparePart.findMany({
      where: {
        OR: [
          {
            title: {
              contains: keyword as string,
              mode: 'insensitive'
            }
          },
          {
            make: {
              contains: keyword as string,
              mode: 'insensitive'
            }
          },
          {
            model: {
              contains: keyword as string,
              mode: 'insensitive'
            }
          }
          // Add other fields if necessary
        ]
      }
    });
    res.json(spareParts);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
