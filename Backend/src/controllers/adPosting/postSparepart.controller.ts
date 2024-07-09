import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import multer from 'multer';


const prisma = new PrismaClient();

// Configure multer for image upload
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
}).array('images', 10); // Allow up to 10 images

export const postSparePart = async (req: Request, res: Response) => {
  upload(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(400).send({ error: err.message });
    } else if (err) {
      return res.status(500).send({ error: 'Internal server error' });
    }

    try {
      const {
        sellerId,
        title,
        description,
        price,
        make,
        model,
        origin,
        condition,
        fuel,
        year
      } = req.body;

      if (
        !sellerId || !title || !description || !price ||
        !make || !model || !origin || !condition || !fuel || !year
      ) {
        return res.status(400).send({ error: 'Missing required fields' });
      }

      // Convert price and year to numbers
      const parsedPrice = parseFloat(price);
      const parsedYear = parseInt(year, 10);

      // Ensure valid number conversion
      if (isNaN(parsedPrice) || isNaN(parsedYear)) {
        return res.status(400).send({ error: 'Invalid price or year format' });
      }

      // Process uploaded images
      const imageUrls: string[] = [];
      if (Array.isArray(req.files) && req.files.length > 0) {
        for (const file of req.files as Express.Multer.File[]) {
          // Simulate saving the image to some storage and getting a URL
          const imageUrl = `path/to/your/storage/${file.originalname}`;
          imageUrls.push(imageUrl);
        }
      }

      const sparePart = await prisma.sparePart.create({
        data: {
          sellerId: Number(sellerId),
          title,
          description,
          price: parsedPrice,
          type: '',
          make,
          model,
          origin,
          condition,
          fuel,
          year: parsedYear,
          imageUrls,
        },
      });

      res.status(201).json(sparePart);
    } catch (error) {
      console.error('Internal server error:', error);
      res.status(500).send({ error: 'Internal server error' });
    }
  });
};
