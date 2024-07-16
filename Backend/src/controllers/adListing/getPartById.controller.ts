import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getSparePartById = async (req: Request, res: Response) => {
export const getSparePartById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const sparePart = await prisma.sparePart.findUnique({
      where: { sparePartId: Number(id) },
      include: {
        seller: true, // Include the seller to get the phone number
      } as any
    });

    if (!sparePart) {
      return res.status(404).json({ message: 'Spare part not found' });
    }

    const response = {
      id: sparePart.id,
      title: sparePart.title,
      price: sparePart.price,
      make: sparePart.make,
      model: sparePart.model,
      year: sparePart.year,
      condition: sparePart.condition,
      fuel: sparePart.fuel,
      origin: sparePart.origin,
      description: sparePart.description,
      phoneNumber: sparePart.businessPhoneNo, // Add this line
      sellerId: sparePart.sellerId,
    };

    res.json(response);
  } catch (error:any) {
    res.status(500).json({ message: error.message });
  }
};
