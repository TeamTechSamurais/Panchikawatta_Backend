import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { title } from "process";

const prisma = new PrismaClient();

export async function searchSparePartsByName(req: Request, res: Response) {
    const { name } = req.query;

    if (!name) {
        return res.status(400).json({ error: 'Name query parameter is required' });
    }

    try {
        const spareParts = await prisma.sparePart.findMany({
            where: {
                model: {
                    contains: title as string,
                    mode: 'insensitive'
                }
            }
        });

        if (spareParts.length === 0) {
            return res.status(404).json({ message: 'No spare parts found matching the search criteria' });
        }

        return res.status(200).json({ spareParts });
    } catch (error) {
        console.error('Error searching for spare parts by name:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
