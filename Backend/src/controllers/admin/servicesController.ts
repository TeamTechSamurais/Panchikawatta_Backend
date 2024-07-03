import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();

// Middleware
app.use(express.json()); // Example middleware for JSON parsing

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

// Route to get seller details by userId
app.get('/seller/:userId', async (req: Request, res: Response) => {
  const userId = parseInt(req.params.userId);

  try {
    // Fetch user details including associated seller
    const userWithSeller = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        sellers: true, // Include the sellers relation
      },
    });

    if (!userWithSeller) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Extract seller details if available
    const sellerDetails = userWithSeller.sellers;

    if (!sellerDetails) {
      return res.status(404).json({ error: 'Seller details not found for this user' });
    }

    res.json(sellerDetails);
  } catch (error) {
    console.error('Error fetching seller details:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Close Prisma client connection
export async function shutdown() {
  await prisma.$disconnect();
}

// Export your app instance for use in other files if needed
export default app;
