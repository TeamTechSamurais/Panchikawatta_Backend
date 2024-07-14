import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getSparePartById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const sparePart = await prisma.sparePart.findUnique({
      where: { sparePartId: Number(id) },
    });

    if (!sparePart) {
      return res.status(404).send({ error: 'Spare part not found' });
    }

    res.json(sparePart);
  } catch (error) {
    console.error('Error fetching spare part:', error);
    res.status(500).send({ error: 'Internal server error' });
  }
}

export async function getServiceById(req: Request, res: Response) {
  const { serviceId } = req.params;

  try {
    const service = await prisma.service.findUnique({
      where: { serviceId: Number(serviceId) },
    });

    if (!service) {
      return res.status(404).send({ error: 'Service not found' });
    }

    res.json(service);
  } catch (error) {
    console.error('Error fetching service:', error);
    res.status(500).send({ error: 'Internal server error' });
  }
}