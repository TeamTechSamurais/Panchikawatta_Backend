import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Function to get all services with user details
export async function getAllServices(req: Request, res: Response): Promise<void> {
  try {
    const services = await prisma.service.findMany({
      include: {
        user: true, // Include the user relation to fetch user details
      },
    });
    res.status(200).json(services);
  } catch (error) {
    console.error('Error fetching services:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Close Prisma client connection
export async function shutdown() {
  await prisma.$disconnect();
}
