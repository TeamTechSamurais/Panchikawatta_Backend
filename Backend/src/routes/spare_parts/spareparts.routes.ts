import { Router } from 'express';
import { getSparePartById } from '../../controllers/adListing/getPartById.controller';
import { getSparepartBySeller } from '../../controllers/adPosting/getSparepartBySeller.controller';
import { getBusinessPhoneNoBySellerId } from '../../controllers/adListing/getPhoneNoById.controller';
import { removeUserFavoriteSparePart } from '../../controllers/adListing/removeFav.controller';

export function configureSparePartsRoutes(router: Router) {
    router.get('/spare-parts/:sparePartId', getSparePartById);
    router.get('/getSparePartsBySeller/:sellerId', getSparepartBySeller);
    router.get('/getPhoneNoById/:sellerId', getBusinessPhoneNoBySellerId);

    //to remove the favorite spare part
    router.delete('/removeFav/:userId/:sparePartId', removeUserFavoriteSparePart);
}