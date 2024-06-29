import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function updateUserDetails(req: Request, res: Response) {
    console.log('Updating user details...');
    
    const { email } = req.params;
    const updateData = req.body;

    console.log('updateData:', updateData); //For debugging

    if (!email || typeof email !== 'string') {
        return res.status(400).json({ error: 'Email parameter is required' });
    }

    if (!updateData || Object.keys(updateData).length === 0) {
        return res.status(400).json({ error: 'No update data provided' });
    }

    try {
        const user = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });

        if (!user || user.deletedAt !== null) { 
            return res.status(404).json({ error: 'User not found' });
        }

        // Check if the fields in updateData are allowed to be updated
        const allowedFields = ['firstName', 'lastName', 'password'];
        const updateDataKeys = Object.keys(updateData);

        const isValidUpdate = updateDataKeys.every((key) => allowedFields.includes(key));

        if (!isValidUpdate) {
            return res.status(400).json({ error: 'Invalid fields in update data' });
        }

        const updatedUser = await prisma.user.update({
            where: {
                email: email,
            },
            data: updateData,
        });

        return res.json(updatedUser);
    } catch (error) {
        console.error('Error updating user:', error);
        return res.status(500).json({ error: 'Internal server error'});
    }
}
