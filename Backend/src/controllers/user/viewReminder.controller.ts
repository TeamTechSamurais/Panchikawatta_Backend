import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import moment from 'moment';

const prisma = new PrismaClient();

const calculateNearestReminder = (vehicle: any) => {
  const now = moment();
  const licenseDate = moment(vehicle.licenceDate, 'YYYY-MM-DD').add(1, 'year');
  const insuranceDate = moment(vehicle.insuranceDate, 'YYYY-MM-DD').add(1, 'year');
  const lastServiceDate = moment(vehicle.lastServiceDate, 'YYYY-MM-DD');
  const serviceInterval = Math.ceil(vehicle.milagePerWeek * 52 / 10000); // assuming service every 10,000 miles

  const nextServiceDate = lastServiceDate.add(serviceInterval, 'weeks');

  // Battery check intervals based on condition
  const batteryCheckIntervals: { [key: string]: number } = {
    'excellent': 52, // once a year
    'good': 26,      // every 6 months
    'fair': 13,      // every 3 months
    'average': 8,    // every 2 months
    'low': 4         // every month
  };

  const batteryCheckInterval = batteryCheckIntervals[vehicle.batteryCondition.toLowerCase()] || 26; // default to 6 months
  const lastBatteryCheckDate = moment(vehicle.lastServiceDate, 'YYYY-MM-DD');
  const nextBatteryCheckDate = lastBatteryCheckDate.add(batteryCheckInterval, 'weeks');

  const reminders = [
    { type: 'License Renewal', date: licenseDate },
    { type: 'Insurance Renewal', date: insuranceDate },
    { type: 'Next Service', date: nextServiceDate },
    { type: 'Battery Check', date: nextBatteryCheckDate }
  ];

  const nearestReminder = reminders.reduce((nearest, reminder) => {
    return reminder.date.isBefore(nearest.date) ? reminder : nearest;
  }, reminders[0]);

  return nearestReminder;
};

export const getVehicleReminders = async (req: Request, res: Response) => {
  try {
    const { vehicleId } = req.params;
    const vehicle = await prisma.vehicle.findUnique({
      where: { vehicleId: parseInt(vehicleId) },
    });

    if (!vehicle) {
      return res.status(404).json({ error: 'Vehicle not found' });
    }

    const nearestReminder = calculateNearestReminder(vehicle);
    const vehicleWithReminder = { ...vehicle, nearestReminder };

    res.status(200).json(vehicleWithReminder);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteReminder = async (req: Request, res: Response) => {
  try {
    const { vehicleId } = req.params;
    await prisma.vehicle.delete({
      where: { vehicleId: parseInt(vehicleId) },
    });
    res.status(200).json({ message: 'Reminder deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
