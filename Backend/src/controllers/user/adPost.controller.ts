// import express, { Request, Response } from 'express';
// import { PrismaClient } from '@prisma/client';
// import bodyParser from 'body-parser';

// const prisma = new PrismaClient();
// const app = express();
// app.use(bodyParser.json());

// interface PlaceOrderRequest extends Request {
//   body: {
//     userId: number;
//     sparePartId: number;
//     status: string;
//   };
// }

// app.post('/place-order', async (req: PlaceOrderRequest, res: Response) => {
//   const { userId, sparePartId, status } = req.body;

//   // Validate the input
//   if (!userId || !sparePartId || !status) {
//     return res.status(400).json({ error: 'All fields are required' });
//   }

//   try {
//     const newOrder = await prisma.orderSparePart.create({
//       data: {
//         userId,
//         sparePartId,
//         status,
//         dateTime: new Date(),
//       },
//     });
//     res.status(201).json(newOrder);
//   } catch (error) {
//     res.status(500).json({ error: 'Something went wrong' });
//   }
// });

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

// //edit this to  use by using routes