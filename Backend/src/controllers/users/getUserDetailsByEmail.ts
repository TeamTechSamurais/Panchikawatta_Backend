import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getUserDetailsByEmail(req: Request, res: Response) {
    console.log('Fetching user by email...');

    let { email } =  req.params;

    if (!email || typeof email !== 'string') {
        return res.status(400).json({ error: 'Email query parameter is required' });
    }

    email = decodeURIComponent(email);

    try {
        const user = await prisma.user.findUnique({
            where: {
                email: email,
            },
            include: {
                vehicles: false,
                sellers: false,
            },
        });

        if (!user || user.deletedAt !== null) {
            return res.status(404).json({ error: 'User not found' });
        } else {
            return res.json(user);
        }
        
    } catch (error) {
        console.error('Error fetching user by email:', error);
        return res.status(500).json({ error: 'Internal server error' });;
    }
}

// Usage
// getUserDetailsByEmail('user@example.com')
//   .then(user => console.log(user))
//   .catch(error => console.error(error))
//   .finally(() => prisma.$disconnect());