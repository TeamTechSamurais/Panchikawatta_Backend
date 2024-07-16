import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function updateBusiness(req: Request, res: Response) {
    console.log('Updating business details...');
    
    const { id } = req.params;
    const updateData = req.body;

    console.log('updateData:', updateData); //For debugging

    if (!updateData || Object.keys(updateData).length === 0) {
        return res.status(400).json({ error: 'No update data provided' });
    }

    try {
        const seller = await prisma.seller.findUnique({
            where: {
                userId: Number(id),
            },
        });

        // Check if the fields in updateData are allowed to be updated
        const allowedFields = ['businessName', 'businessAddress', 'businessPhoneNo', 'businessDescription'];
        const updateDataKeys = Object.keys(updateData);

        const isValidUpdate = updateDataKeys.every((key) => allowedFields.includes(key));

        if (!isValidUpdate) {
            return res.status(400).json({ error: 'Invalid fields in update data' });
        }

        const updatedBusiness = await prisma.seller.update({
            where: {
                userId : Number(id),
            },
            data: updateData,
        });

        console.log('Business details updated successfully!');
        return res.json(updatedBusiness);
    } catch (error) {
        console.error('Error updating user:', error);
        return res.status(500).json({ error: 'Internal server error'});
    }
}