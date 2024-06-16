import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

export const createUser = async (req: Request, res: Response) => {
    const { email, name, firstName, lastName, password, vehicles, sellers } = req.body;
    try {
      const user = await prisma.user.create({
        data: {
          email, // Assuming 'name' is a valid field in your User model
          firstName, // Make sure this field exists in your User model
          lastName, // Make sure this field exists in your User model
          password, // Make sure this field exists in your User model
          vehicles, // This should be structured according to your schema, e.g., connect: [{id: vehicleId}]
          sellers, // This should be structured according to your schema, e.g., connect: [{id: sellerId}]
        },
      });
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create user' });
    }
  };

  