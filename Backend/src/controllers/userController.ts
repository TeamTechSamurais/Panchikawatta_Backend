// import { Request, Response } from 'express';
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// export const getUsers = async (req: Request, res: Response) => {
//   try {
//     const users = await prisma.user.findMany();
//     res.json(users);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to fetch users' });
//   }
// };

// export const createUser = async (req: Request, res: Response) => {
//   const { email, firstName, lastName,username, password, Province, District,phoneNo  } = req.body;
//   try {
//     const user = await prisma.user.create({
//       data: {
//         email,
//         firstName,
//         lastName,
//         username,
//         password,
//         Province,
//         District,
//         phoneNo,
//       },
//     });
//     res.status(201).json(user);
//   } catch (error) {
//     console.error(error); // Log the error for debugging purposes
//     res.status(500).json({ error: 'Failed to create user' });
//   }
// };
