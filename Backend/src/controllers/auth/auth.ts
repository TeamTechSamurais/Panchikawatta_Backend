//  // controllers/auth.ts

// import { Request, Response } from 'express';
// import { PrismaClient } from '@prisma/client';
// import jwt from 'jsonwebtoken';
// import { compareSync, hashSync } from 'bcrypt';
// import { JWT_SECRET } from '../../config/config';

// import admin from 'firebase-admin';

//  // Ensure you have JWT_SECRET defined
// const prisma = new PrismaClient();

// export const login = async (req: Request, res: Response) => {
//   const { token } = req.body;

//   if (!token) {
//     return res.status(400).json({ error: 'Token is required' });
//   }

//   try {
//     // Verify the Firebase ID token
//     const decodedToken = await admin.auth().verifyIdToken(token);
//     const email = decodedToken.uid;

//     // Check if user exists in the database
//     const user = await prisma.user.findUnique({
//       where: { email },
//     });

//     if (user) {
//       // Generate JWT token
//       const jwtToken = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });

//       return res.status(200).json({ message: 'Login successful', user, token: jwtToken });
//     } else {
//       return res.status(404).json({ error: 'User not found' });
//     }
//   } catch (error) {
//     console.error('Error verifying Firebase ID token:', error);
//     return res.status(403).json({ error: 'Unauthorized' });
//   }
// };
// // export const login = async (req: Request, res: Response) => {
// //   const { email, password } = req.body;
// //   console.log('Received login request:', req.body);
// //   try {
// //     // Find user by email
// //     const user = await prisma.user.findUnique({ where: { email } });

// //     if (!user) {
// //       return res.status(404).json({ error: 'User not found' });
// //     }

// //     // Check if the provided password matches the stored hashed password
// //     const passwordValid = compareSync(password, user.password);

// //     if (!passwordValid) {
// //       return res.status(401).json({ error: 'Invalid password' });
// //     }

// //     // Generate JWT token
// //     const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '5m' });
// //     return res.status(200).json({ user, token, message: 'Login successful' });

// //   } catch (error) {
// //     console.error('Error in login:', error);
// //     return res.status(500).json({ error: 'Login failed' });
// //   }
// // };
