import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import multer from 'multer';

const prisma = new PrismaClient();

// Configure multer for image upload
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
}).single('image');

// Step 1: Add title, description, image, and price
export const postService = (req: Request, res: Response) => {
  upload(req, res, async (err: any) => {
    if (err) {
      return res.status(400).send({ error: 'Image upload error' });
    }

    try {
      const { sellerId, title, description } = req.body;
      let image: Buffer | undefined = undefined;

      if (req.file) {
        image = req.file.buffer;
      }

      if (!sellerId || !title || !description) {
        return res.status(400).send({ error: 'Missing required fields' });
      }

      const service = await prisma.service.create({
        data: {
          userId: Number(sellerId),
          sellerId: Number(sellerId),
          title,
          description,
          image,
        },
      });

      res.status(201).json(service);
    } catch (error) {
      res.status(500).send({ error: 'Internal server error' });
    }
  });
};

