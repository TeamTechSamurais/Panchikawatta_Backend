// // src/controllers/sparePartController.ts
// import { Request, Response } from 'express';
// import multer from 'multer';
// import prisma from '@prisma/client';

// // Set up multer for file handling
// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

// // Controller to handle the POST request
// export const createSparePart = async (req: Request, res: Response) => {
//   try {
//     // Extract form fields
//     const { title, description, price, make, model, origin, condition, fuel, year, sellerId, userId } = req.body;

//     // Handle images
//     const images = req.files as Express.Multer.File[];

//     // For simplicity, handle only the first image
//     const image = images.length > 0 ? images[0].buffer : null;

//     // Create new spare part
//     const sparePart = await prisma.sparePart.create({
//       data: {
//         title,
//         description,
//         price: parseInt(price, 10),
//         make,
//         model,
//         origin,
//         condition,
//         fuel,
//         year: parseInt(year, 10),
//         sellerId: parseInt(sellerId, 10),
//         userId: parseInt(userId, 10),
//         image,
//       },
//     });

//     res.status(201).json(sparePart);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Failed to create spare part' });
//   }
// };

// // Export upload middleware to handle file uploads
// export const uploadMiddleware = upload.array('images', 4);
