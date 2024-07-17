import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Function to add to favorites
export const addToFavorites = async (req: Request, res: Response) => {
    const { userId, sparePartId } = req.body;

    console.log(`Received userId: ${userId}, sparePartId: ${sparePartId}`);

    if (!userId || !sparePartId) {
        return res.status(400).json({ error: 'userId and sparePartId must be provided' });
    }

    const parsedUserId = parseInt(userId, 10);
    const parsedSparePartId = parseInt(sparePartId, 10);

    if (isNaN(parsedUserId) || isNaN(parsedSparePartId)) {
        return res.status(400).json({ error: 'userId and sparePartId must be valid numbers' });
    }

    try {
        const favorite = await prisma.userFavoriteSparePart.create({
            data: {
                userId: parsedUserId,
                sparePartId: parsedSparePartId,
            }
        });
        res.status(201).json(favorite);
    } catch (error: any) {
        console.error('Error adding to favorites:', error);
        res.status(500).json({ error: 'Failed to add to favorites: ' + error.message });
    }
};

// Function to get favorites by user
export const getFavoritesByUser = async (req: Request, res: Response) => {
    const userId = parseInt(req.params.userId, 10);
    try {
        const favorites = await prisma.userFavoriteSparePart.findMany({
            where: {
                userId: userId
            },
            include: {
                sparePart: true,
            }
        });
        res.status(200).json(favorites);
    } catch (error: any) {
        res.status(500).json({ error: 'Failed to retrieve favorites: ' + error.message });
    }
};

// Function to search within user's wishlist
export const searchWishlist = async (req: Request, res: Response) => {
    const userId = parseInt(req.params.userId, 10);
    const { keyword } = req.query;

    if (isNaN(userId)) {
        return res.status(400).json({ error: 'Invalid userId' });
    }

    try {
        const favorites = await prisma.userFavoriteSparePart.findMany({
            where: {
                userId: userId,
                sparePart: keyword ? {
                    OR: [
                        { title: { contains: keyword as string, mode: 'insensitive' } },
                        { make: { contains: keyword as string, mode: 'insensitive' } },
                        { model: { contains: keyword as string, mode: 'insensitive' } },
                        { description: { contains: keyword as string, mode: 'insensitive' } },
                        { condition: { contains: keyword as string, mode: 'insensitive' } },
                    ],
                } : {},
            },
            include: {
                sparePart: true,
            },
        });

        res.status(200).json(favorites);
    } catch (error: any) {
        console.error('Error searching wishlist:', error);
        res.status(500).json({ error: 'Failed to search wishlist: ' + error.message });
    }
};
