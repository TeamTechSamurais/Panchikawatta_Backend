import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Helper function to format spare parts data
const formatSparePartsData = (spareParts: any) => {
  return spareParts.map((sparePart: any) => {
    return {
      ...sparePart,
      images: sparePart.imageUrls, // Use the imageUrls field
    };
  });
};

// To display all ads from DB
export const getSpareparts = async (req: Request, res: Response) => {
  try {
    const spareParts = await prisma.sparePart.findMany({
      orderBy: {
        sparePartId: 'desc'
      },
      take: 10,
      include: {
        user: true, // Include user relation if needed
      },
    });

    const formattedSpareParts = formatSparePartsData(spareParts);

    res.json(formattedSpareParts);
  } catch (error) {
    console.error('Error fetching spare parts:', error);
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
          },
          {
            description: {
              contains: keyword as string,
              mode: 'insensitive'
            }
          },
          {
            condition: {
              contains: keyword as string,
              mode: 'insensitive'
            }
          },
        ]
      },
      include: {
        user: true, // Include user relation if needed
      },
    });

    const formattedSpareParts = formatSparePartsData(spareParts);

    res.json(formattedSpareParts);
  } catch (error) {
    console.error('Error searching spare parts:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
