import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client'; // Ensure the correct path to cloudinaryConfig
import cloudinary from '../../cloudinaryConfig';

const prisma = new PrismaClient();

export const createSparePartAd = async (req: Request, res: Response): Promise<void> => {
  const { userId, model, origin, year, description, price, images } = req.body;

  try {
    // Upload images to Cloudinary
    const uploadPromises = images.map((image: string) => {
      return cloudinary.uploader.upload(image, {
        folder: 'spareParts'
      });
    });

    const uploadResults = await Promise.all(uploadPromises);

    // Extract URLs from Cloudinary response
    const imageUrls = uploadResults.map(result => result.secure_url);

    // Create spare part entry in the database
    const newSparePart = await prisma.sparePart.create({
      data: {
        sellerId: userId,
        model,
        origin,
        year,
        description,
        price,
        title: '', // Add the missing properties
        make: '',
        condition: '',
        fuel: '',
        imageUrls // Save the URLs in the 'imageUrls' field
      }
    });

    res.status(201).json(newSparePart);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create spare part ad' });
  }
};
