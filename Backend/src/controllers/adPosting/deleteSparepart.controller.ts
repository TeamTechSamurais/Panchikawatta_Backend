import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const deleteSparepartById = async (req: Request, res: Response) => {
    const { sparePartId } = req.params;
  
    if (!sparePartId) {
      return res.status(400).json({ error: 'id is required' });
    }
  
    try {
      const sparePart = await prisma.sparePart.delete({
        where: {
            sparePartId: parseInt(sparePartId),
        },
      });
  
      res.status(200).json({ message: 'Sparepart deleted successfully', sparePart });
    } catch (error:any) {
      if (error.code === 'P2025') { // Prisma specific error code for not found
        return res.status(404).json({ error: 'Sparepart not found' });
      }
      res.status(500).json({ error: 'Internal server error', details: error.message });
    }
  };