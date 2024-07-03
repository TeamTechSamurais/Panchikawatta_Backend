import { Router } from "express";
import { addDataToDB } from "../../controllers/addData/addDataToDB.controller";
//import { uploadImage ,uploadImageById } from "../../controllers/addData/addImagesToDB.controller";


export function configureAddDataRoutes(router: Router) {
    router.post('/', addDataToDB);
    //router.post('/upload/:id', uploadImage, uploadImageById); // Ensure correct ordering of middleware and handler
  }