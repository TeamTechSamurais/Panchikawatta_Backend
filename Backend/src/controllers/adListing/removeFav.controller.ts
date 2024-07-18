import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const removeUserFavoriteSparePart = async (req: Request, res: Response) => {
  const { userId, sparePartId } = req.params;

  if (!userId || !sparePartId) {
    return res.status(400).json({ error: 'userId and sparePartId are required' });
  }

  try {
    await prisma.userFavoriteSparePart.delete({
      where: {
        userId_sparePartId: {
          userId: parseInt(userId),
          sparePartId: parseInt(sparePartId),
        },
      },
    });

    res.status(200).json({ message: 'User favorite spare part removed successfully' });
  } catch (error: any) {
    if (error.code === 'P2025') { // Prisma specific error code for not found
      return res.status(404).json({ error: 'User favorite spare part not found' });
    }
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
};
