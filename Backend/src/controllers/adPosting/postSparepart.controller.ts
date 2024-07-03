// import { Request, Response } from 'express';
// import { PrismaClient } from '@prisma/client';
// import multer from 'multer';

// const prisma = new PrismaClient();

// // Configure multer for image upload
// const upload = multer({
//   storage: multer.memoryStorage(),
//   limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
// }).single('image');

// // Step 1: Add title, description, image, and price
// export const postSparePartStep1 = (req: Request, res: Response) => {
//   upload(req, res, async (err: any) => {
//     if (err) {
//       return res.status(400).send({ error: 'Image upload error' });
//     }

//     try {
//       const { sellerId, title, description, price } = req.body;
//       let images: Buffer | undefined = undefined;

//       if (req.file) {
//         images = req.file.buffer;
//       }

//       if (!sellerId || !title || !description || !price) {
//         return res.status(400).send({ error: 'Missing required fields' });
//       }

//       const sparePart = await prisma.sparePart.create({
//         data: {
//           userId: Number(sellerId),
//           sellerId: Number(sellerId),
//           title,
//           description,
//           images,
//           price: Number(price),
//           make: '', // Add the missing properties with appropriate values
//           model: '',
//           origin: '',
//           condition: '',
//           fuel: '',
//           year: 0,
//         },
//       });

//       res.status(201).json(sparePart);
//     } catch (error) {
//       res.status(500).send({ error: 'Internal server error' });
//     }
//   });
// };

// // Step 2: Add vehicle make, model, origin, year, condition, and fuel
// export const postSparePartStep2 = async (req: Request, res: Response) => {
//   try {
//     const { sparePartId, make, model, origin, condition, fuel, year } = req.body;

//     if (!sparePartId || !make || !model || !origin || !condition || !fuel || !year) {
//       return res.status(400).send({ error: 'Missing required fields' });
//     }

//     const updatedSparePart = await prisma.sparePart.update({
//       where: { sparePartId: Number(sparePartId) },
//       data: {
//         make,
//         model,
//         origin,
//         condition,
//         fuel,
//         year: Number(year),
//       },
//     });

//     res.status(200).json(updatedSparePart);
//   } catch (error) {
//     res.status(500).send({ error: 'Internal server error' });
//   }
// };
