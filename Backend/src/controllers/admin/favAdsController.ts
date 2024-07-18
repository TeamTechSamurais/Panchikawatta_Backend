import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getTopFavoriteSpareParts = async (req: Request, res: Response) => {
  try {
    // Fetch the count of favorites for each spare part
    const sparePartCounts = await prisma.userFavoriteSparePart.groupBy({
      by: ['sparePartId'],
      _count: {
        sparePartId: true,
      },
      orderBy: {
        _count: {
          sparePartId: 'desc',
        },
      },
      take: 5,
    });

    // Calculate the total number of favorites
    const totalFavorites = await prisma.userFavoriteSparePart.count();

    // Calculate the percentages and add to the result
    const result = sparePartCounts.map((sparePart) => ({
      sparePartId: sparePart.sparePartId,
      count: sparePart._count.sparePartId,
      percentage: (sparePart._count.sparePartId / totalFavorites) * 100,
    }));

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
