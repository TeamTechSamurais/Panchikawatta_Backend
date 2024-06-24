import { Request, Response } from 'express';
import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getAllSpareParts(req: Request, res: Response) {
    try {
        const allSpareParts = await prisma.sparePart.findMany();

        return res.json({spareParts: allSpareParts});
    } catch(error){
        console.error('Error fetching spare parts:', error);
        throw error;
    } finally {
        
        await prisma.$disconnect();
      }
}