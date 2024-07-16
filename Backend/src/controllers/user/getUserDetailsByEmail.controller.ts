import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getUserDetailsByEmail(req: Request, res: Response) {

    let { email } =  req.params;

    if (!email || typeof email !== 'string') {
        return res.status(400).json({ error: 'Email query parameter is required' });
    }

    email = decodeURIComponent(email);
    console.log('Fetch details of:', email);

    try {
        const user = await prisma.user.findUnique({
            where: {
                email: email,
            },
            include: {
                vehicles: false,
                seller: false,
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