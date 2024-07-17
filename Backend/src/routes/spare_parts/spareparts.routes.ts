import { Router } from 'express';
import { getSparePartById } from '../../controllers/adListing/getPartById.controller';
import { getSparepartBySeller } from '../../controllers/adPosting/getSparepartBySeller.controller';
import { getBusinessPhoneNoBySellerId } from '../../controllers/adListing/getPhoneNoById.controller';

export function configureSparePartsRoutes(router: Router) {
    router.get('/spare-parts/:sparePartId', getSparePartById);
    router.get('/getSparePartsBySeller/:sellerId', getSparepartBySeller);
    router.get('/getPhoneNoById/:sellerId', getBusinessPhoneNoBySellerId);
}