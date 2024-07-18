import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const deleteServiceById = async (req: Request, res: Response) => {
  const { serviceId } = req.params;

  if (!serviceId) {
    return res.status(400).json({ error: 'id is required' });
  }

  try {
    const service = await prisma.service.delete({
      where: {
        serviceId: parseInt(serviceId),
      },
    });

    res.status(200).json({ message: 'Service deleted successfully', service });
  } catch (error:any) {
    if (error.code === 'P2025') { // Prisma specific error code for not found
      return res.status(404).json({ error: 'Service not found' });
    }
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
};