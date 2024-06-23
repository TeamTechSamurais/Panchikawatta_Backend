import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAdminDetails = async (req: Request, res: Response) => {
  try {
    const admin = await prisma.admin.findFirst();
    if (admin) {
      res.status(200).json({
        userName: admin.adminUsername,
        email: admin.adminID,
      });
    } else {
      res.status(404).json({ message: 'Admin not found' });
    }
  } catch (error) {
    console.error('Error fetching admin details:', error);
    res.status(500).json({ error: 'An error occurred while fetching admin details' });
  }
};
