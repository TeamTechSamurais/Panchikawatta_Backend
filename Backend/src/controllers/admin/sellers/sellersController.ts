// controllers/adminController.ts

import { Request, Response } from 'express';
import { PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient();

export const getSellersProvinces = async (req: Request, res: Response) => {
  try {
    const sellersByProvince = await prisma.user.groupBy({
      by: ['province'],
      _count: {
        id: true, // Assuming 'id' is the primary key of your 'user' table
      },
    });

    const totalSellers = await prisma.user.count();

    // Calculate percentages for each province
    const provinces = sellersByProvince.map(entry => {
      const province = entry.province;
      const sellerCount = entry._count.id;
      const percentage = (sellerCount / totalSellers) * 100;
      return {
        province,
        percentage: percentage.toFixed(2), // Round to 2 decimal places
      };
    });

    res.json({ provinces });
  } catch (error) {
    console.error('Error fetching sellers provinces:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};