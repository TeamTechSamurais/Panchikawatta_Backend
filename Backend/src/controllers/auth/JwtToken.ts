// jwtHandler.ts

import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import admin from 'firebase-admin';
import { JWT_SECRET } from '../../config/config';

 


export const generateJwtToken= async (req: Request, res: Response) => {
    try {
      const idToken = req.body.idToken;
       
      console.log('Generated idToken token:',idToken); 
      // Verify Firebase ID token
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      const userId = decodedToken.uid;
  
      // Generate JWT token
      const jwtToken = jwt.sign({ uid: userId }, JWT_SECRET, { expiresIn: '1h' }); // Use your actual secret key
      console.log('Generated JWT token:', jwtToken); 
      res.status(201).json({ token: jwtToken });
    } catch (error) {
      console.error('Error generating JWT token:', error);
      res.status(500).json({ error: 'Failed to generate JWT token' });
    }
  };
