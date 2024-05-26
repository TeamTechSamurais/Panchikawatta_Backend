import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getSparePartById(req: Request, res: Response) {
    const { id } = req.params;

    try {
        const sparePart = await prisma.sparePart.findUnique({
            where: {
                sparePartId: parseInt(id)
            }
        });

        if (!sparePart) {
            return res.status(404).json({ error: 'Spare part not found' });
        }

        return res.json({ sparePart });
    } catch (error) {
        console.error('Error fetching spare part by ID:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
