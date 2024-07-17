import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import moment from 'moment';

const prisma = new PrismaClient();

export const calculateNearestReminder = (vehicle: any) => {
  const now = moment();
  const licenseDate = moment(vehicle.licenceDate, 'DD/MM/YYYY').add(1, 'year');
  const insuranceDate = moment(vehicle.insuranceDate, 'DD/MM/YYYY').add(1, 'year');
  const lastServiceDate = moment(vehicle.lastServiceDate, 'DD/MM/YYYY');
  const mileagePerMonth = vehicle.milagePerWeek * 4;
  const monthsToNextService = Math.ceil(5000 / mileagePerMonth);

  const nextServiceDate = lastServiceDate.clone().add(monthsToNextService, 'months');

  const batteryCheckIntervals: { [key: string]: number } = {
    'excellent': 12,
    'good': 6,
    'fair': 3,
    'average': 2,
    'low': 1
  };

  const batteryCheckInterval = batteryCheckIntervals[vehicle.batteryCondition.toLowerCase()] || 6;
  const nextBatteryCheckDate = lastServiceDate.clone().add(batteryCheckInterval, 'months');

  const reminders = [
    { type: 'License Renewal is due', date: licenseDate },
    { type: 'Insurance Renewal is due', date: insuranceDate },
    { type: 'Next Service is due', date: nextServiceDate },
    { type: 'Battery Check is due', date: nextBatteryCheckDate }
  ];

  const futureReminders = reminders.filter(reminder => reminder.date.isAfter(now));

  if (futureReminders.length === 0) {
    return null;
  }

  const nearestReminder = futureReminders.reduce((nearest, reminder) => {
    return reminder.date.isBefore(nearest.date) ? reminder : nearest;
  }, futureReminders[0]);

  return nearestReminder;
};

export const getUserVehicleReminders = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const vehicles = await prisma.vehicle.findMany({
      where: { userId: parseInt(userId) },
    });

    if (!vehicles || vehicles.length === 0) {
      return res.status(404).json({ error: 'No vehicles found for this user' });
    }

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

export const markAsDone = async (req: Request, res: Response) => {
  try {
    const { vehicleId, reminderType } = req.params;
    const today = moment().format('DD/MM/YYYY');

    let updateData: any = {};

    switch (reminderType) {
      case 'License Renewal is due':
        updateData.licenceDate = today;
        break;
      case 'Insurance Renewal is due':
        updateData.insuranceDate = today;
        break;
      case 'Next Service is due':
        updateData.lastServiceDate = today;
        break;
      case 'Battery Check is due':
        updateData.lastServiceDate = today;
        break;
      default:
        return res.status(400).json({ error: 'Invalid reminder type' });
    }

    await prisma.vehicle.update({
      where: { vehicleId: parseInt(vehicleId) },
      data: updateData,
    });

    res.status(200).json({ message: 'Reminder marked as done successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
