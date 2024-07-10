import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

interface MonthlyUserCount {
  [key: string]: {
    month: string;
    year: number;
    count: number;
  };
}

export const getAccountCount = async (req: Request, res: Response) => {
  try {
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const result = await prisma.user.groupBy({
      by: ['createdAt'],
      _count: {
        id: true,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    const monthlyUserCount: MonthlyUserCount = result.reduce((acc: MonthlyUserCount, item) => {
      const month = item.createdAt.getMonth(); // getMonth() is zero-based
      const year = item.createdAt.getFullYear();
      const key = `${year}-${month}`;

      if (!acc[key]) {
        acc[key] = { month: monthNames[month], year, count: 0 };
      }
      acc[key].count += item._count.id;

      return acc;
    }, {});

    res.status(200).json(Object.values(monthlyUserCount));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching user counts' });
  } finally {
    await prisma.$disconnect();
  }
};
