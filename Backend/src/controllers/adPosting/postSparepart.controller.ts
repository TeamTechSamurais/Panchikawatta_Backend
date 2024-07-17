import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const postSparePart = async (req: Request, res: Response) => {
  try {
    const {
      sellerId,
      title,
      description,
      price,
      type,
      make,
      model,
      origin,
      condition,
      fuel,
      year,
      imageUrls, // Added field to fetch image URLs
    } = req.body;

    // Validate the presence of all required fields
    if (
      !sellerId || !title || !description || !price || !type ||
      !make || !model || !origin || !condition || !fuel || !year 
    ) {
      return res.status(400).send({ error: 'Missing required fields' });
    }

    // Convert price and year to numbers
    const parsedPrice = parseInt(price, 10);
    const parsedYear = parseInt(year, 10);

    // Ensure valid number conversion
    if (isNaN(parsedPrice) || isNaN(parsedYear)) {
      return res.status(400).send({ error: 'Invalid price or year format' });
    }

    // Ensure imageUrls is an array if provided
    const parsedImageUrls = Array.isArray(imageUrls) ? imageUrls : [];

    const sparePart = await prisma.sparePart.create({
      data: {
        sellerId: Number(sellerId),
        title,
        description,
        price: parsedPrice,
        type,
        make,
        model,
        origin,
        condition,
        fuel,
        year: parsedYear,
        imageUrls: parsedImageUrls, // Store the image URLs
      },
    });

    res.status(201).json(sparePart);
  } catch (error) {
    console.error('Internal server error:', error);
    res.status(500).send({ error: 'Internal server error' });
  }
};
