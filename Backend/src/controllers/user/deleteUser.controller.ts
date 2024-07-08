import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function deleteUser(req: Request, res: Response) {
    const { email } = req.params;

    if (!email || typeof email !== 'string') {
        return res.status(400).json({ error: 'Email parameter is required' });
    }

    try {
        const user = await prisma.user.findUnique({
            where: {
                email: email,
            },
            include: {
                vehicles: true,
                sellers: true,
            },
        });

        if (!user) {
            console.log('User not found');
            return res.status(404).json({ error: 'User not found' });
        }

        console.log('User found:', user);

        if (user.deletedAt == null) {
            await prisma.user.update({
                where: {
                    email: email,
                },
                data: {
                    deletedAt: new Date(),
                    services: {
                        updateMany: {
                            where: {
                                userId: user.id,
                            },
                            data: {
                                deletedAt: new Date(),
                            },
                        },
                    },
                    spareParts: {
                        updateMany: {
                            where: {
                                userId: user.id,
                            },
                            data: {
                                deletedAt: new Date(),
                            },
                        },
                    },
                    vehicles: {
                        updateMany: {
                            where: {
                                userId: user.id,
                            },
                            data: {
                                deletedAt: new Date(),
                            },
                        },
                    },
                },
            });
        } 

        return res.status(200).json({ message: 'User and related records deleted successfully' });

    } catch (error) {
        console.error('Error deleting user:', error);
        return res.status(500).json({ error: 'Internal server error'});
    }
}