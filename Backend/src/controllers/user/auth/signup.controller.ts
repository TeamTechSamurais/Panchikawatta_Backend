import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { hashSync } from 'bcrypt';

const prisma = new PrismaClient();

// Signup function to create a new user
export const signup = async (req: Request, res: Response) => {
  const {
    firstName,
    lastName,
    userName,
    password,
    email,
    phoneNo,
    province,
    district,
    vehicles,
    sellers,
    SparePart,
    Service,
    imageUrls
  } = req.body;
  console.log('Request Body:', req.body);

  try {
    // Check if email already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ error: 'The email address is already in use' });
    }

    // Create new user
    const hashedPassword = hashSync(password, 10);
    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        userName,
        password: hashedPassword,
        email,
        phoneNo,
        province,
        district,
        vehicles: { 
          create: vehicles.map((vehicle: any) => ({
            ...vehicle,
            imageUrls: Array.isArray(vehicle.imageUrls) ? vehicle.imageUrls : []
          }))
        },
        sellers: { create: sellers },
        spareParts: { 
          create: SparePart.map((part: any) => ({
            ...part,
            imageUrls: Array.isArray(part.imageUrls) ? part.imageUrls : []
          }))
        },
        services: { 
          create: Service.map((service: any) => ({
            ...service,
            imageUrls: Array.isArray(service.imageUrls) ? service.imageUrls : []
          }))
        }
      },
    });

    // Respond with user data
    res.status(200).json({ userId: user.id });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
};

// Delete user function
export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    // Convert id to integer
    const userId = parseInt(id);

    // Delete related records in associated tables
    await prisma.seller.deleteMany({
      where: {
        userId: userId,
      },
    });

    await prisma.vehicle.deleteMany({
      where: {
        userId: userId,
      },
    });

    await prisma.sparePart.deleteMany({
      where: {
        userId: userId,
      },
    });

    await prisma.service.deleteMany({
      where: {
        userId: userId,
      },
    });

    // Delete the user by id
    const user = await prisma.user.delete({
      where: {
        id: userId,
      },
    });

    // Respond with deleted user data
    res.status(200).json(user);
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Failed to delete user' });
  }
};
