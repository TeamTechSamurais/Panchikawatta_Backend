// import express, { Request, Response } from "express";
// import { PrismaClient } from "@prisma/client";
// import multer from "multer";

// const prisma = new PrismaClient();
// const upload = multer({ storage: multer.memoryStorage() });

// const app = express();

// app.post('/api/spare-parts', upload.single('image'), async (req: Request, res: Response) => {
//     const { sellerId, price, model, origin, year, description } = req.body;

//     // Validate required fields
//     if (!sellerId || !price || !model || !origin || !year || !description) {
//         return res.status(400).json({ error: 'All fields are required except image' });
//     }

//     try {
//         const sparePart = await prisma.sparePart.create({
//             data: {
//                 sparePartId: 1, // Replace with the appropriate sparePartId value
//                 sellerId: parseInt(sellerId),
//                 price: parseInt(price),
//                 model,
//                 origin,
//                 year: parseInt(year),
//                 description,
//                 image: req.file ? req.file.buffer : null
//             }
//         });

//         return res.status(201).json(sparePart);
//     } catch (error) {
//         console.error('Error saving spare part:', error);
//         return res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

// app.listen(3000, () => {
//     console.log('Server is running on port 3000');
// });
