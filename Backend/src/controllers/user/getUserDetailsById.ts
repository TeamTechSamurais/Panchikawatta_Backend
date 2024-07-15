import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getUserDetailsById(req: Request, res: Response) {

    const { id } =  req.params;
    console.log('Fetch details of:', id);

    try {
        const user = await prisma.user.findUnique({
            where: {
                id: Number(id),
            },
            include: {
                vehicles: false,
                sellers: false,
            },
        });

        if (!user || user.deletedAt !== null) {
            console.log('User not found');
            return res.status(404).json({ error: 'User not found' });
        } else {
            console.log('User found:', user);
            return res.json(user);
        }
        
    } catch (error) {
        console.error('Error fetching user by email:', error);
        return res.status(500).json({ error: 'Internal server error' });;
    }
}