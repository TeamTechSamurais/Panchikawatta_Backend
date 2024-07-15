import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import admin from 'firebase-admin';
import { hashSync } from 'bcrypt';

const prisma = new PrismaClient();

export const resetPassword = async (req: Request, res: Response) => {
  const { email, newPassword } = req.body;
  console.log('Request Body:', req.body);

  try {
    // Find user by email
    const userRecord = await admin.auth().getUserByEmail(email);

    // Update user's password
    await admin.auth().updateUser(userRecord.uid, {
      password: newPassword,
    });

    // Hash the new password (optional, depending on your security requirements)
    const hashedPassword = hashSync(newPassword, 10); // Example hashing with bcrypt

    // Update user's password in your database (using Prisma as an example)
    const updatedUser = await prisma.user.update({
      where: {
        email: email,
      },
      data: {
        password: hashedPassword, // Store hashed password in your database
      },
    });

    // Send response
    res.status(200).send('Password updated successfully.');
  } catch (error) {
    console.error('Error updating password:', error);
    res.status(500).send('An error occurred while updating password.');
  }
};
