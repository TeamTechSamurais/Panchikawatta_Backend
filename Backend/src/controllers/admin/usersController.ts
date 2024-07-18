import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Get all users
export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        userName: true,
        email: true,
        phoneNo: true,
        province: true,
        district: true,
        createdAt: true,
        imageUrls: true,
      },
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

// Delete a user by Email
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const userEmail = req.params.email;

    if (!userEmail) {
      return res.status(400).json({ message: 'Invalid email' });
    }

    const user = await prisma.user.findUnique({
      where: { email: userEmail },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await prisma.user.delete({
      where: { email: userEmail },
    });

    return res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
};




// Get user by email
export const getUserById = async (req: Request, res: Response) => {
  const { UserEmail } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: UserEmail, // Use email instead of id
      },
      select: {
        firstName: true,
        lastName: true,
        email: true,
        phoneNo: true,
        imageUrls:true,
        favoriteSpareParts: true,
        vehicles: true,
        seller: {
          select: {
            businessAddress: true,
            businessDescription: true,
            businessName: true,
            businessPhoneNo: true,
          },
        },
      },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

