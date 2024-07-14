import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const postService = async (req: Request, res: Response) => {
  try {
    const {
      sellerId,
      title,
      description,
      price,
      imageUrls, // Added field to fetch image URLs
      type,      // Added type field
    } = req.body;

    // Validate the presence of all required fields
    if (!sellerId || !title || !description || !price) {
      return res.status(400).send({ error: 'Missing required fields' });
    }

    // Convert price to a number
    const parsedPrice = parseInt(price, 10);
    if (isNaN(parsedPrice)) {
      return res.status(400).send({ error: 'Invalid price format' });
    }

    // Ensure imageUrls is an array if provided
    const parsedImageUrls = Array.isArray(imageUrls) ? imageUrls : [];

    const service = await prisma.service.create({
      data: {
        sellerId: Number(sellerId),
        title,
        description,
        price: parsedPrice,
        imageUrls: parsedImageUrls, // Store the image URLs
        type: type || '', // Use type if provided, else an empty string
      },
    });

    res.status(201).json(service);
  } catch (error) {
    console.error('Internal server error:', error);
    res.status(500).send({ error: 'Internal server error' });
  }
};
