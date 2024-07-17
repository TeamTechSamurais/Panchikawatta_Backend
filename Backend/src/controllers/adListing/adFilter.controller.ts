import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getFilteredAds(req: Request, res: Response) {
  const {
    vehicleType,
    vehicleMake,
    model,
    origin,
    minPrice,
    maxPrice,
    conditions,
    fuelTypes,
    minYear,
    maxYear,
  } = req.query;

  try {
    const ads = await prisma.sparePart.findMany({
      where: {
        AND: [
          vehicleType ? { type: String(vehicleType) } : {},
          vehicleMake ? { make: String(vehicleMake) } : {},
          model ? { model: String(model) } : {},
          origin ? { origin: String(origin) } : {},
          minPrice ? { price: { gte: Number(minPrice) } } : {},
          maxPrice ? { price: { lte: Number(maxPrice) } } : {},
          conditions ? { condition: { in: conditions.toString().split(',') } } : {},
          fuelTypes ? { fuel: { in: fuelTypes.toString().split(',') } } : {},
          minYear ? { year: { gte: Number(minYear) } } : {},
          maxYear ? { year: { lte: Number(maxYear) } } : {},
        ],
      },
      include: {
        user: true,
      },
    });

    const adsWithImages = ads.map(ad => ({
      ...ad,
      images: ad.imageUrls.length > 0 ? ad.imageUrls : [],
    }));

    res.json(adsWithImages);
  } catch (error) {
    console.error('Failed to fetch filtered ads:', error);
    res.status(500).send({ error: 'Failed to fetch filtered ads' });
  }
}
