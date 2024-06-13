// import { Request, Response } from "express";
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// export async function getPhoneNumber(req: Request, res: Response) {
//     const { userId } = req.params;

//     if (!userId) {
//         return res.status(400).json({ error: 'userId is required' });
//     }

//     try {
//         // Fetch the user's phone number from the database
//         const user = await prisma.user.findUnique({
//             where: { id: parseInt(userId) },
//             //select: { phoneNumber: true }
//         });

//         // if (!user || !user.phoneNumber) {
//             return res.status(404).json({ error: 'Phone number not found for this user' });
//         }

//         // Log the action (you can enhance this with more logging details if needed)
//         console.log(`User with ID ${userId} clicked the phone button. Phone number: ${user.phoneNumber}`);

//         // Return the phone number
//         return res.status(200).json({ phoneNumber: user.phoneNumber });
//     } catch (error) {
//         console.error('Error fetching phone number:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// }
