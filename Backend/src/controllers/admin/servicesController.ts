import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

// GET /service-details/:serviceId
export const getServiceDetails = async (req: Request, res: Response) => {
  const { serviceId } = req.params;

  try {
    // Fetch service details
    const service = await prisma.service.findUnique({
      where: { serviceId: parseInt(serviceId) },
    });

    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }

    // Fetch seller details separately
    const seller = await prisma.seller.findUnique({
      where: { userId: service.sellerId },
    });

    if (!seller) {
      return res.status(404).json({ error: 'Seller details not found' });
    }

    // Extract necessary details
    const { title, description, price, createdAt, imageUrls } = service;
    const { businessName, businessAddress } = seller;

    // Ensure image URLs are absolute
    const absoluteImageUrls = imageUrls.map((url: string) => 
      url.startsWith('http') ? url : `http://10.0.2.2:8000/${url}`
    );

    // Construct response data
    const responseData = {
      title,
      description,
      price,
      createdAt,
      imageUrls: absoluteImageUrls.length > 0 ? absoluteImageUrls : ['https://via.placeholder.com/200'], // Ensure there is at least one image URL
      businessName,
      businessAddress,
    };

    res.status(200).json(responseData);
  } catch (error) {
    console.error('Error fetching service details:', error);
    res.status(500).json({ error: 'Failed to fetch service details' });
  }
};

export async function getAllServices(req: Request, res: Response): Promise<void> {
  try {
    const services = await prisma.service.findMany({
      include: {
        user: true, // Include the user relation to fetch user details
      },
    });
    res.status(200).json(services);
  } catch (error) {
    console.error('Error fetching services:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
