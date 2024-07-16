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
  const { email, firstName, lastName, password } = req.body;
  try {
    const user = await prisma.user.create({
      data: {
        email,
        firstName,
        lastName,
        password,
        userName: 'your_username', // Provide a value for userName
        phoneNo: 'your_phone_number', // Provide a value for phoneNo
      },
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user' });
  }
};
