// vehicleController.ts

import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export const getVehiclesByUserId = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.userId);
  try {
    const vehicles = await prisma.vehicle.findMany({
      where: {
        userId: userId,
      },
    });
    res.status(200).json(vehicles);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching vehicles' });
  }
};

export const getVehiclesHandler = async (_req: Request, res: Response) => {
  try {
    const vehicles = await prisma.vehicle.findMany();
    res.status(200).json(vehicles);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching vehicles' });
  }
};
