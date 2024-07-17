import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getBusinessPhoneNoBySellerId = async (req: Request, res: Response) => {
  const { sellerId } = req.params;

  try {
    const seller = await prisma.seller.findUnique({
      where: { userId: parseInt(sellerId) },
      select: { businessPhoneNo: true },
    });

    if (!seller) {
      return res.status(404).json({ message: 'Seller not found' });
    }

    res.json({ businessPhoneNo: seller.businessPhoneNo });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
};
