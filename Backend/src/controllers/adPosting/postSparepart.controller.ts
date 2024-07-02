import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import multer from 'multer';

const prisma = new PrismaClient();

// Configure multer for image upload
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
}).single('image');

export const postSparePart = (req: Request, res: Response) => {
  upload(req, res, async (err: any) => {
    if (err) {
      console.error('Image upload error:', err);
      return res.status(400).send({ error: 'Image upload error' });
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
      let image: Buffer | undefined = undefined;

      console.log('Request Body:', req.body);

      if (req.file) {
        image = req.file.buffer;
      }

      if (
        !sellerId || !title || !description || !price ||
        !make || !model || !origin || !condition || !fuel || !year
      ) {
        return res.status(400).send({ error: 'Missing required fields' });
      }

      const sparePart = await prisma.sparePart.create({
        data: {
          userId: Number(sellerId),
          sellerId: Number(sellerId),
          title,
          description,
          image,
          price: Number(price),
          make,
          model,
          origin,
          condition,
          fuel,
          year: Number(year),
        },
      });

      res.status(201).json(sparePart);
    } catch (error) {
      console.error('Internal server error:', error);
      res.status(500).send({ error: 'Internal server error' });
    }
  });
};
