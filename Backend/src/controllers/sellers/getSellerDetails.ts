import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getSellerDetails(req: Request, res: Response) {
    console.log('Fetching seller by email...');

    const { userID } =  req.params ;

    try {
        const seller = await prisma.seller.findUnique({
            where: {
                userId: parseInt(userID),
            },
        });

        if (!seller) {
            return res.status(404).json({ error: 'User is not a seller' });
        } else {
            return res.json(seller);
        }
        
    } catch (error) {
        console.error('Error fetching user by email:', error);
        return res.status(500).json({ error: 'Internal server error' });;
    }
}