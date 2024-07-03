import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const filterAds = async (req: Request, res: Response) => {
  try {
    const {
      keyword,
      province,
      district,
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

    const filters: any = {};

    if (keyword) {
      filters.OR = [
        { model: { contains: keyword as string, mode: 'insensitive' } },
        { vehicleMake: { contains: keyword as string, mode: 'insensitive' } },
        // Add other fields you want to include in the keyword search
      ];
    }

    if (province) filters.province = province;
    if (district) filters.district = district;
    if (vehicleMake) filters.vehicleMake = vehicleMake;
    if (model) filters.model = model;
    if (origin) filters.origin = origin;
    if (minPrice) filters.price = { gte: parseInt(minPrice as string, 10) };
    if (maxPrice) filters.price = { ...filters.price, lte: parseInt(maxPrice as string, 10) };
    if (minYear) filters.year = { gte: parseInt(minYear as string, 10) };
    if (maxYear) filters.year = { ...filters.year, lte: parseInt(maxYear as string, 10) };
    if (conditions && (conditions as string[]).length > 0) filters.condition = { in: conditions as string[] };
    if (fuelTypes && (fuelTypes as string[]).length > 0) filters.fuel = { in: fuelTypes as string[] };

    const ads = await prisma.sparePart.findMany({
      where: filters,
    });

    res.status(200).json(ads);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to filter ads' });
  }
};
