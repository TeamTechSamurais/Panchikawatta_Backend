// import { Request, Response, NextFunction } from 'express';
// import jwt from 'jsonwebtoken';
// import { PrismaClient } from '@prisma/client';
// import { JWT_SECRET } from '../config/config';


// const prisma = new PrismaClient();

// export const authenticateUser = async (req: Request, res: Response, next: NextFunction) => {
//   const token = req.header('Authorization')?.replace('Bearer ', '');

//   if (!token) {
//     return res.status(401).send({ error: 'No token provided' });
//   }

//   try {
//     const decoded: any = jwt.verify(token, JWT_SECRET);
//     const user = await prisma.user.findUnique({ where: { id: decoded.uid } });

//     if (!user) {
//       throw new Error('User not found');
//     }

//     req.user = user;
//     req.token = token;
//     next();
//   } catch (error) {
//     res.status(401).send({ error: 'Please authenticate' });
//   }
// };


// // // src/middleware/authMiddleware.ts

// // import jwt from 'jsonwebtoken';
// // import { Request, Response, NextFunction } from 'express';

// // export const checkJwtExpiry = (req: Request, res: Response, next: NextFunction) => {
// //   const authHeader = req.headers.authorization;

// //   if (authHeader) {
// //     const token = authHeader.split(' ')[1];

// //     jwt.verify(token, 'JWT_SECRET', (err: any, decoded: any) => {
// //       if (err) {
// //         return res.status(403).json({ error: 'Token is not valid or has expired' });
// //       }

// //       // Optional: Attach decoded token to request object
// //       req.decodedToken = decoded;
// //       next();
// //     });
// //   } else {
// //     res.sendStatus(401);
// //   }
// // };
import { Request, Response, NextFunction } from 'express';

export const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
  // Your authentication logic here
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  // Verify token logic here
  // If valid, call next()
  // If invalid, respond with an error

  next();
};

