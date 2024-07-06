// // business.ts

// import { Request, Response } from 'express';
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();
// // Create a new business
// export const createBusiness = async (req: Request, res: Response) => {
//     const { userId, businessName, businessAddress, businessContactno, businessDescription } = req.body;
//     console.log('Received signup request:', req.body);
//     try {
//       const business = await prisma.business.create({
//         data: {
//           userId,
//           BusinessName: businessName,
//           BusinessAddress: businessAddress,
//           BusinessContactno: businessContactno,
//           Businessdescrption: businessDescription,
//         },
//       });
  
//       res.status(201).json(business);
//     } catch (error) {
//       console.error('Error creating business:', error);
//       res.status(500).json({ error: 'Failed to create business' });
//     }
//   };
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createBusiness = async (req: Request, res: Response) => {
  const { userId, businessName, businessAddress, businessPhoneNo, businessDescription } = req.body;
  console.log('Received create business request:', req.body);

  try {
    // Check if the user exists
    const existingUser = await prisma.user.findUnique({ where: { id: userId } });
    if (!existingUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Create the business
    const business = await prisma.seller.create({
      data: {
        userId,
        businessName,
        businessAddress,
        businessPhoneNo,
        businessDescription,
      },
    });

    res.status(201).json(business);
  } catch (error) {
    console.error('Error creating business:', error);
    res.status(500).json({ error: 'Failed to create business' });
  }
};
