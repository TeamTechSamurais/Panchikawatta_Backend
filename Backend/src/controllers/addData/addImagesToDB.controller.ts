import { Request, Response } from 'express';
import multer from 'multer';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Multer configuration for memory storage
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB file size limit
  },
});

// Middleware to handle file uploads
export const uploadImage = upload.single('image'); // Handle a single image

export const uploadImageById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!req.file) {
      console.log('No file uploaded'); // Debug log
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const sparePartId = Number(id);
    if (isNaN(sparePartId)) {
      return res.status(400).json({ message: 'Invalid sparePartId' });
    }

    const imageBuffer = req.file.buffer;

    const updatedSparePart = await prisma.sparePart.update({
      where: { sparePartId: sparePartId },
      data: { image: imageBuffer },
    });

    return res.json({ message: 'Image uploaded successfully', sparePart: updatedSparePart });
  } catch (error) {
    console.error('Error uploading image:', error);
    return res.status(500).json({ message: 'Failed to upload image', error: (error as Error).message });
  } finally {
    await prisma.$disconnect();
  }
};
