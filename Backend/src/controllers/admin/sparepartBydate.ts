import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export const getSparePartsByDate = async (req: Request, res: Response) => {
  const { selectedDate } = req.query;

  if (!selectedDate || typeof selectedDate !== 'string') {
    return res.status(400).json({ error: 'Invalid or missing selectedDate parameter' });
  }

  try {
    // Convert selectedDate to a Date object
    const date = new Date(selectedDate);

    // Start and end of the selected date
    const startDate = new Date(date.setHours(0, 0, 0, 0));
    const endDate = new Date(date.setHours(23, 59, 59, 999));

    const spareParts = await prisma.sparePart.findMany({
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
        deletedAt: null, // Ensure to fetch only non-deleted spare parts
      },
      orderBy: {
        createdAt: 'asc', // Order by creation date
      },
    });

    // Construct absolute image URLs
    const sparePartsWithAbsoluteUrls = spareParts.map(part => ({
      ...part,
      imageUrls: part.imageUrls.map(url =>
        url.startsWith('http') ? url : `http://10.0.2.2:8000/${url}`
      ),
    }));

    res.status(200).json(sparePartsWithAbsoluteUrls);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching spare parts' });
  }
};
