import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Add to favorites
export const addFavorite = async (req: Request, res: Response) => {
    const { userId, sparePartId } = req.body;

    try {
        const favorite = await prisma.userFavoriteSparePart.create({
            data: {
                userId: userId,
                sparePartId: sparePartId,
            },
        });
        res.status(200).json(favorite);
    } catch (error) {
        res.status(500).json({ error: 'Error adding to favorites' });
    }
};

// Get user favorites
export const getFavorites = async (req: Request, res: Response) => {
    const { userId } = req.params;

    try {
        const favorites = await prisma.userFavoriteSparePart.findMany({
            where: {
                userId: parseInt(userId),
            },
            include: {
                sparePart: true,
            },
        });
        res.status(200).json(favorites);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching favorites' });
    }
};
