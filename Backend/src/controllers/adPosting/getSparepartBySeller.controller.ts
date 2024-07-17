import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getSparepartBySeller = async (req: Request, res: Response) => {
    const { sellerId } = req.params;

    if (!sellerId) {
        return res.status(400).json({ error: 'sellerId is required' });
    }

    try {
        const sparePart = await prisma.sparePart.findMany({
            where: {
                sellerId: parseInt(sellerId),
            },
        });

        if (!sparePart.length) {
            return res.status(404).json({ message: 'No spare parts found for this seller' });
        }

        res.status(200).json(sparePart);
    } catch (error: any) {
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
};
