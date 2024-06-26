import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export const addDataToDB = async (req: Request, res: Response) => {
  try {
    const { model, data } = req.body;

    if (!model || !data) {
      return res.status(400).json({ message: 'Model and data are required' });
    }

    // Dynamically call the Prisma create method based on the model name
    const result = await (prisma[model] as any).create({ data } as any);

    res.status(201).json(result);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

