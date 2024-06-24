import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getVehicles = async (req: Request, res: Response) => {
  try {
    const vehicles = await prisma.vehicle.findMany({
      orderBy: {
        vehicleId: 'desc'
      },
      take: 8
    });
    res.json(vehicles);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const searchVehicles = async (req: Request, res: Response) => {
  const { keyword } = req.query;

  try {
    const vehicles = await prisma.vehicle.findMany({
      where: {
        OR: [
          {
            model: {
              contains: keyword as string,
              mode: 'insensitive'
            }
          },
          // Add other fields if necessary
        ]
      }
    });
    res.json(vehicles);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
