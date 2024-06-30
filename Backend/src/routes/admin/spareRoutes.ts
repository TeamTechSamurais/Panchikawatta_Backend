import { Router } from 'express';
import { getAllSpareParts } from '../../controllers/spare_parts/showAllParts.controllers'; // Ensure the path is correct



export function configureSparePartsRoutes(router: Router) {
    router.get('/details', getAllSpareParts);
}