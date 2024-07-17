import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Helper function to format spare parts data
const formatServiceData = (service: any) => {
  return service.map((service: any) => {
    return {
      ...service,
      images: service.imageUrls, // Use the imageUrls field
    };
  });
};

// To display all ads from DB
export const getServices = async (req: Request, res: Response) => {
  try {
    const service = await prisma.service.findMany({
      orderBy: {
        serviceId: 'desc'
      },
      take: 10,
      include: {
        user: true, // Include user relation if needed
      },
    });

    const formattedServices = formatServiceData(service);

    res.json(formattedServices);
  } catch (error) {
    console.error('Error fetching spare parts:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const searchServices = async (req: Request, res: Response) => {
  const { keyword } = req.query;

  try {
    const service = await prisma.service.findMany({
      where: {
        OR: [
          {
            title: {
              contains: keyword as string,
              mode: 'insensitive'
            }
          },
          {
            description: {
              contains: keyword as string,
              mode: 'insensitive'
            }
          }
        ]
      },
      include: {
        user: true, // Include user relation if needed
      },
    });

    const formattedServices = formatServiceData(service);

    res.json(formattedServices);
  } catch (error) {
    console.error('Error searching services:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
