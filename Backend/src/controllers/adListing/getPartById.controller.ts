import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getSparePartById(req: Request, res: Response) {
    const { id } = req.params;
  const sparePart = await prisma.sparePart.findUnique({
    where: { sparePartId: Number(id) },
  });

  if (!sparePart) {
    return res.status(404).send({ error: 'Spare part not found' });
  }
}
