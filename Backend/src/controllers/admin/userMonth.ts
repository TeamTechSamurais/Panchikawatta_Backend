// src/services/userService.ts

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getUserSignupsByMonth = async () => {
  const users = await prisma.user.groupBy({
    by: ['createdAt'],
    _count: {
      id: true,
    },
    orderBy: {
      createdAt: 'asc',
    },
  });

  const monthlySignups = users.reduce((acc, user) => {
    const month = `${user.createdAt.getFullYear()}-${(user.createdAt.getMonth() + 1).toString().padStart(2, '0')}`;
    if (!acc[month]) {
      acc[month] = 0;
    }
    acc[month] += user._count.id;
    return acc;
  }, {} as { [key: string]: number });

  return monthlySignups;
};
