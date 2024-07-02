import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function addSparePartToFavorites(req: Request, res: Response) {
    const { userId, sparePartId } = req.body;

    if (!userId || !sparePartId) {
        return res.status(400).json({ error: 'userId and sparePartId are required' });
    }

    try {
        //Check if the user exists
        const user = await prisma.user.findUnique({
            where: { id: userId }
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Check if the spare part exists
        const sparePart = await prisma.sparePart.findUnique({
            where: { sparePartId: sparePartId }
        });

        if (!sparePart) {
            return res.status(404).json({ error: 'Spare part not found' });
        }

        // Add the spare part to the user's favorites
        const favorite = await prisma.userSparePart.create({
            data: {
                userId: userId,
                sparePartId: sparePartId
            }
        });

        return res.status(201).json({ message: 'Spare part added to favorites', favorite });
    } catch (error) {
        console.error('Error adding spare part to favorites:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
