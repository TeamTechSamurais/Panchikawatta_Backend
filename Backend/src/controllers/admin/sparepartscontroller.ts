import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

// GET /spare-part-details/:sparePartId
export const getSparePartDetails = async (req: Request, res: Response) => {
  const { sparePartId } = req.params;

  try {
    // Fetch spare part details
    const sparePart = await prisma.sparePart.findUnique({
      where: { sparePartId: parseInt(sparePartId) },
    });

    if (!sparePart) {
      return res.status(404).json({ error: 'Spare part not found' });
    }

    // Fetch seller details separately
    const seller = await prisma.seller.findUnique({
      where: { userId: sparePart.sellerId },
    });

    if (!seller) {
      return res.status(404).json({ error: 'Seller details not found' });
    }

    // Extract necessary details
    const { title, description, price, createdAt } = sparePart;
    const { businessName, businessAddress } = seller;

    // Construct response data
    const responseData = {
      title,
      description,
      price,
      createdAt,
      businessName,
      businessAddress,
    };

    res.status(200).json(responseData);
  } catch (error) {
    console.error('Error fetching spare part details:', error);
    res.status(500).json({ error: 'Failed to fetch spare part details' });
  }
};

export async function getAllSpareParts(req: Request, res: Response): Promise<void> {
  try {
    const spareParts = await prisma.sparePart.findMany({
      include: {
        user: true, // Include the user relation to fetch user details
      },
    });
    res.status(200).json(spareParts);
  } catch (error) {
    console.error('Error fetching spare parts:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

