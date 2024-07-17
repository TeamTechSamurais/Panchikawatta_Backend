import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getSparePartById = async (req: Request, res: Response) => {
  const { sparePartId } = req.params;

  try {
    const sparePart = await prisma.sparePart.findUnique({
      where: { sparePartId: Number(sparePartId) },
      include: {
        user: {
          select: {
            seller: {
              select: {
                businessPhoneNo: true,
              },
            },
          },
        },
      },
    });

    if (!sparePart) {
      return res.status(404).json({ message: 'sparepart not found' });
    }

    res.json(sparePart);
  } catch (error: any) {
    console.error('Error fetching sparepart', error);
    res.status(500).json({ message: error.message });
  }
};

// export const getSparePartById = async (req: Request, res: Response) => {
//   const { sparePartId } = req.params;

//   try {
//     const sparePart = await prisma.sparePart.findUnique({
//       where: { sparePartId: Number(sparePartId) },
//       // include: {
//       //   seller: true, // Include the seller to get the phone number
//       // } as any
//     });

//     if (!sparePart) {
//       return res.status(404).json({ message: 'sparepart not found' });
//     }

//     res.json(sparePart);
//   } catch (error:any) {
//     console.error('Error fetching sparepart', error);
//     res.status(500).json({ message: error.message });
//   }
// };

export const getServiceById = async (req: Request, res: Response) => {
  const { serviceId } = req.params;

  try {
    const service = await prisma.service.findUnique({
      where: { serviceId: Number(serviceId) },
      // include: {
      //   seller: true, // Include the seller to get the phone number
      // } as any
    });

    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    res.json(service);
  } catch (error:any) {
    console.error('Error fetching service', error);
    res.status(500).json({ message: error.message });
  }
};