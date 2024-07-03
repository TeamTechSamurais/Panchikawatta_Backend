import { Request, Response } from "express";
import prisma from "../../prismaClient";

export const getAdminData = async (req: Request, res: Response) => {
  try {
    const admin = await prisma.admin.findUnique({
      where: { adminID: "2" }, // Example, adjust based on your schema
    });
    
    const sellersCount = await prisma.seller.count();
    const buyersCount = await prisma.user.count();
    const vehiclesCount = await prisma.vehicle.count();
    const sparepartsCount = await prisma.sparePart.count();
    const servicesCount = await prisma.service.count();

    res.json({
      admin,
      counts: {
        sellersCount,
        buyersCount,
        vehiclesCount, // Ensure these names match the ones used in your Flutter code
        sparepartsCount,
        servicesCount,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching data." });
  }
};
