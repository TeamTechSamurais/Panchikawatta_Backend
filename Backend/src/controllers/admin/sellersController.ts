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



export const getSellerDetailsByUserId = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.userId, 10);

  if (isNaN(userId)) {
    return res.status(400).json({ error: 'Invalid userId' });
  }

  try {
    const seller = await prisma.seller.findUnique({
      where: { userId },
      include: { user: true }, // Adjust if you want to include related user data
    });

    if (!seller) {
      return res.status(404).json({ error: 'Seller not found' });
    }

    res.json({ seller });
  } catch (error) {
    console.error('Error fetching seller details:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
