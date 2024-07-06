 
import { Request, Response } from 'express';
import express from 'express';
import { authenticateUser } from '../../../middlewares/authmiddlewares';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = express.Router();

// Fetch Services for a User
router.get('/users/:userId/services', authenticateUser, async (req:Request, res:Response) => {
  const { userId } = req.params;

  try {
    const services = await prisma.service.findMany({
      where: { userId: parseInt(userId) },
      select: {
        title: true,
      },
    });

    res.json(services);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch services' });
  }
});

module.exports = router;
