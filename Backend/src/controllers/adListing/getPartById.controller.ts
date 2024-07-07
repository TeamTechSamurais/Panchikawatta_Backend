import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getSparePartById(req: Request, res: Response) {
  const { id } = req.params;
  const sparePart = await prisma.sparePart.findUnique({
    where: { sparePartId: Number(id) },
    include: { imageUrl }, // Include the images in the query
  });

  if (!sparePart) {
    return res.status(404).send({ error: 'Spare part not found' });
  }

  // Assuming there is only one image per spare part for simplicity
  const image = sparePart.imageUrls.length > 0 ? sparePart.imageUrls[0] : null;
  res.json({ ...sparePart, image });
}

export async function getServiceById(req: Request, res: Response) {
  const { serviceId } = req.params;
  const service = await prisma.service.findUnique({
    where: { serviceId: Number(serviceId) },
  });

  if (!service) {
    return res.status(404).send({ error: 'Service not found' });
  }

  res.json(service); 
}