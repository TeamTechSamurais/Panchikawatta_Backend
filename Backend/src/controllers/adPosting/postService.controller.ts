import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import multer from 'multer';

const prisma: PrismaClient & { images: any } = new PrismaClient() as PrismaClient & { images: any };

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
      const { sellerId, title, description, price } = req.body;
      let imageBuffer: Buffer | undefined = undefined;

      if (req.file) {
        imageBuffer = req.file.buffer;
      }

      if (!sellerId || !title || !description || !price) {
        return res.status(400).send({ error: 'Missing required fields' });
      }

      // Create the service record first
      const service = await prisma.service.create({
        data: {
          userId: Number(sellerId),
          sellerId: Number(sellerId),
          title,
          description,
          price: Number(price)
        },
      });

      // If an image is uploaded, create the image record
      if (imageBuffer) {
        await prisma.images.create({
          data: {
            data: imageBuffer,
            serviceId: service.serviceId,
          },
        });
      }

      res.status(201).json(service);
    } catch (error) {
      console.error('Internal server error:', error);
      res.status(500).send({ error: 'Internal server error' });
    }
  });
};
