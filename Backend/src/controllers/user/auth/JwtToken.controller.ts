import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import admin from 'firebase-admin';
import { JWT_SECRET } from '../../../config/config';

// Function to generate JWT token
export const generateJwtToken = async (req: Request, res: Response) => {
  try {
    const idToken = req.body.idToken;

    console.log('Received idToken:', idToken);

    // Verify Firebase ID token
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const userId = decodedToken.uid;

    
    const expiresIn = '5m';
     

    // Generate JWT token
    const jwtToken = jwt.sign({ uid: userId }, JWT_SECRET, { expiresIn });
    console.log('Generated JWT token:', jwtToken);

    res.status(201).json({ token: jwtToken });
  } catch (error) {
    console.error('Error generating JWT token:', error);
    res.status(500).json({ error: 'Failed to generate JWT token' });
  }
};

// Middleware to verify JWT token and check expiration
 

// Route to check token expiration
export const checkTokenExpiration = (req: Request, res: Response) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Assuming the token is sent in the Authorization header

  if (!token) {
    return res.status(401).json({ error: 'Token is required' });
  }

  try {
    const decoded = jwt.decode(token) as jwt.JwtPayload;
    if (!decoded) {
      return res.status(401).json({ error: 'Failed to decode token' });
    }

    const nowInSeconds = Math.floor(Date.now() / 1000);
    if (decoded.exp && decoded.exp < nowInSeconds) {
      return res.status(401).json({ error: 'Token has expired' });
    }

    res.status(200).json({ message: 'Token is valid', user: decoded });
  } catch (error) {
    console.error('Error decoding JWT token:', error);
    return res.status(401).json({ error: 'Failed to decode token' });
  }
};