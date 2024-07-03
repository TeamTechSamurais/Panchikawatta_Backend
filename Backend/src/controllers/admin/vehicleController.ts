
import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export const getVehiclesByUserId = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id, 10);

  try {
    console.log('Fetching vehicles for user ID:', userId);
    const vehicles = await prisma.vehicle.findMany({
      where: { userId },
    });
    console.log('Vehicles found:', vehicles);

    if (!vehicles) {
      console.log('No vehicles found for user ID:', userId);
      return res.status(404).json({ error: 'No vehicles found for this user' });
    }

    return res.json(vehicles);
  } catch (error) {
    console.error('Error fetching vehicles:', error);
    return res.status(500).json({ error: 'Error fetching vehicles' });
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
