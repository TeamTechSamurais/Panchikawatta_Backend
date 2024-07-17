import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getServicesBySeller = async (req: Request, res: Response) => {
    const { sellerId } = req.params;

    if (!sellerId) {
        return res.status(400).json({ error: 'sellerId is required' });
    }

    try {
        const services = await prisma.service.findMany({
            where: {
                sellerId: parseInt(sellerId),
            },
        });

        if (!services.length) {
            return res.status(404).json({ message: 'No services found for this seller' });
        }

        res.status(200).json(services);
    } catch (error: any) {
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
};
