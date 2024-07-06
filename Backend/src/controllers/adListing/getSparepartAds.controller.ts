import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Helper function to convert image bytes to Base64
const convertImagesToBase64 = (spareParts: any) => {
  return spareParts.map((sparePart: any) => {
    if (sparePart.images && sparePart.images.length > 0) {
      sparePart.images = sparePart.images.map((image: any) => {
        return {
          ...image,
          data: image.data.toString('base64')
        };
      });
    }
    return sparePart;
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
        images: true, // Include images relation
      },
    });

    const sparePartsWithBase64Images = convertImagesToBase64(spareParts);

    res.json(sparePartsWithBase64Images);
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
        images: true, // Include images relation
      },
    });

    const sparePartsWithBase64Images = convertImagesToBase64(spareParts);

    res.json(sparePartsWithBase64Images);
  } catch (error) {
    console.error('Error searching spare parts:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
