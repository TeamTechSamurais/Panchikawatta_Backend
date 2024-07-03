import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const filterAds = async (req: Request, res: Response) => {
  try {
    const {
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
    } = req.body;

    const filters: any = {};

    if (province) filters.province = province;
    if (district) filters.district = district;
    if (vehicleMake) filters.vehicleMake = vehicleMake;
    if (model) filters.model = model;
    if (origin) filters.origin = origin;
    if (minPrice) filters.price = { gte: parseInt(minPrice, 10) };
    if (maxPrice) filters.price = { ...filters.price, lte: parseInt(maxPrice, 10) };
    if (minYear) filters.year = { gte: parseInt(minYear, 10) };
    if (maxYear) filters.year = { ...filters.year, lte: parseInt(maxYear, 10) };
    if (conditions && conditions.length > 0) filters.condition = { in: conditions };
    if (fuelTypes && fuelTypes.length > 0) filters.fuel = { in: fuelTypes };

    // Assuming your model name is `sparePart`
    const ads = await prisma.sparePart.findMany({
      where: filters,
    });

    res.status(200).json(ads);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to filter ads' });
  }
};
