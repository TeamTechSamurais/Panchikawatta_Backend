import { Request, Response } from 'express';
import multer from 'multer';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

export const createSparePart = async (req: Request, res: Response) => {
  try {

    const { title, description, price, make, model, origin, condition, fuel, year, sellerId, userId } = req.body;

    const images = req.files as Express.Multer.File[];

    const image = images.length > 0 ? images[0].buffer : null;

    const sparePart = await prisma.sparePart.create({
      data: {
        title,
        description,
        price: parseInt(price, 10),
        make,
        model,
        origin,
        condition,
        fuel,
        year: parseInt(year, 10),
        sellerId: parseInt(sellerId, 10),
        userId: parseInt(userId, 10),
        image,
      },
    });

    res.status(201).json(sparePart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create spare part' });
  }
};

export const uploadMiddleware = upload.array('images', 4);
