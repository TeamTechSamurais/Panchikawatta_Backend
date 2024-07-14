import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { calculateNearestReminder } from '../user/viewReminder.controller';
const prisma = new PrismaClient();

export const getVehiclesById = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    // Convert userId to integer
    const userIdInt = parseInt(userId);

    if (isNaN(userIdInt)) {
      return res.status(400).json({ error: 'Invalid user ID' });
    }

    // Fetch the user by ID
    const user = await prisma.user.findUnique({
      where: { id: userIdInt },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Fetch vehicles by user ID
    const vehicles = await prisma.vehicle.findMany({
      where: { userId: user.id },
    });

    if (!vehicles || vehicles.length === 0) {
      return res.status(404).json({ error: 'No vehicles found for this user' });
    }

    // Calculate nearest reminders for each vehicle
    const vehiclesWithReminders = vehicles.map(vehicle => {
      const nearestReminder = calculateNearestReminder(vehicle);
      if (nearestReminder) {
        const formattedDate = nearestReminder.date.format('DD/MM/YYYY');
        return { ...vehicle, nearestReminder: { type: nearestReminder.type, date: formattedDate } };
      }
      return { ...vehicle, nearestReminder };
    });

    res.status(200).json(vehiclesWithReminders);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
