// import { Request, Response } from 'express';
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// // Create a new vehicle
// export const createVehicle = async (req: Request, res: Response) => {
//   const { userId, type, make, model, year, milagePerWeek, licenceDate, insuranceDate, lastServiceDate, batteryCondition } = req.body;

//   try {
//     const vehicle = await prisma.vehicle.create({
//       data: {
//         user: { connect: { id: userId } }, // Connect to the user by userId
//         type: type,
//         make: make,
//         model: model,
//         year: year,
//         milagePerWeek: milagePerWeek,
//         licenceDate: licenceDate,
//         insuranceDate: insuranceDate,
//         lastServiceDate: lastServiceDate,
//         batteryCondition: batteryCondition,
//       },
//     });

//     res.status(201).json(vehicle);
//   } catch (error) {
//     console.error('Error creating vehicle:', error);
//     res.status(500).json({ error: 'Failed to create vehicle' });
//   }
// };
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Create a new vehicle with initial data
export const createVehicle = async (req: Request, res: Response) => {
  const { userId, type, make, model, year, licenceDate, insuranceDate,Image } = req.body;
  console.log('Request Body:', req.body);
  try {
    const vehicle = await prisma.vehicle.create({
      data: {
        user: { connect: { id: userId } },
        type: type|| '',
        make: make || '',
        model: model || '',
        year: year || 0, // Connect to the user by userId
        licenceDate: licenceDate || '',
        insuranceDate: insuranceDate|| '',
        milagePerWeek: 0,
        lastServiceDate: '',
        batteryCondition: '',
        images : {create: Image}||''
      },
    });

    // Only send one response to the client
    res.status(201).json({ vehicleId: vehicle.vehicleId });
  } catch (error) {
    console.error('Error creating vehicle:', error);
    res.status(500).json({ error: 'Failed to create vehicle' });
  }
};

// Update the vehicle with additional data
export const updateVehicle = async (req: Request, res: Response) => {
  const { vehicleId, milagePerWeek, lastServiceDate, batteryCondition } = req.body;
  console.log('Request Body:', req.body);
  const updateData: any = {};
  if (milagePerWeek !== undefined) updateData.milagePerWeek = milagePerWeek;
  if (lastServiceDate !== undefined) updateData.lastServiceDate = lastServiceDate;
  
  if (batteryCondition !== undefined && batteryCondition !== null) updateData.batteryCondition = batteryCondition;
  try {
    const vehicle = await prisma.vehicle.update({
      where: { vehicleId }, // Ensure vehicleId is a unique identifier
      data: updateData,
    });


    res.status(200).json(vehicle);
  } catch (error) {
    console.error('Error updating vehicle:', error);
    res.status(500).json({ error: 'Failed to update vehicle' });
  }
};
