import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Helper function to convert image bytes to Base64
const convertImagesToBase64 = (service: any) => {
    return service.map((service: any) => {
        if (service.images && service.images.length > 0) {
            service.images = service.images.map((image: any) => {
                return {
                    ...image,
                    data: image.data.toString('base64')
                };
            });
        }
        return service;
    });
};

// To display all service ads from DB
export const getServices = async (req: Request, res: Response) => {
    try {
        const service = await prisma.service.findMany({
            orderBy: {
                serviceId: 'desc'
            },
            take: 10,
            include: {
                images: true, // Include images relation
            },
        });

        const serviceWithBase64Images = convertImagesToBase64(service);

        res.json(serviceWithBase64Images);
    } catch (error) {
        console.error('Error fetching spare parts:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const searchServices = async (req: Request, res: Response) => {
    const { keyword } = req.query;

    try {
        const spareParts = await prisma.sparePart.findMany({
            where: {
                OR: [
                    {
                        title: {
                            contains: keyword as string,
                            mode: 'insensitive'
                        }
                    },
                    {
                        description: {
                            contains: keyword as string,
                            mode: 'insensitive'
                        }
                    },
                ]
            },
            include: {
                images: true, // Include images relation
            },
        });

        //const servicesWithBase64Images = convertImagesToBase64(serviceAccount);
        //res.json(servicesWithBase64Images);
    } catch (error) {
        console.error('Error searching service:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
