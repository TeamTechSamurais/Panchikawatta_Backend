import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { hashSync } from 'bcrypt';

const prisma = new PrismaClient();

export const signup = async (req: Request, res: Response) => {
  const { firstName, lastName, userName, password, email, phoneNo, province, district,image, vehicles, sellers, SparePart, Service,Image } = req.body;
  console.log('Request Body:', req.body);
  try {
    // Check if email already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ error: 'The email addreess is already in use' });
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
        
        vehicles: { create: vehicles },
        sellers: { create: sellers },
        spareParts: { create: SparePart },
        services: { create: Service },
        images : {create: Image}||''
      },
    });

    // Respond with user data
    
    res.status(200).json({ userId: user.id });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
};
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