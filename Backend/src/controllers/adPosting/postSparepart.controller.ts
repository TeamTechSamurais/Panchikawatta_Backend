import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import multer from 'multer';

const prisma: PrismaClient & { image: any } = new PrismaClient();

// Configure multer for image upload
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
}).single('image');

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
      let imageBuffer: Buffer | undefined = undefined;

      console.log('Request Body:', req.body);

      if (req.file) {
        imageBuffer = req.file.buffer;
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
          price: Number(price),
          make,
          model,
          origin,
          condition,
          fuel,
          year: Number(year),
        },
      });

      if (imageBuffer) {
        await prisma.image.create({
          data: {
            data: imageBuffer,
            sparePartId: sparePart.sparePartId,
          },
        });
      }

      res.status(201).json(sparePart);
    } catch (error) {
      console.error('Internal server error:', error);
      res.status(500).send({ error: 'Internal server error' });
    }
  });
};
