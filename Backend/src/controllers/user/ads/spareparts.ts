 
 
 // sparePartsRouter.ts

import { Request, Response } from 'express';
import express from 'express';
import { authenticateUser } from '../../../middlewares/authmiddlewares';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = express.Router();

// Fetch Spare Parts for a User
router.get('/users/:userId/spare-parts', authenticateUser, async (req: Request, res: Response) => {
  console.log(`Fetching spare parts for userId: ${req.params.userId}`);
  const { userId } = req.params;

  try {
    const spareParts = await prisma.sparePart.findMany({
      where: { userId: parseInt(userId) },
      select: {
        title: true,
        price: true,
      },
    });

    res.json(spareParts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch spare parts' });
  }
});

module.exports = router;
