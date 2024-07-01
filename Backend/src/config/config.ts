// config.ts

import crypto from 'crypto';

const generateJwtSecret = (): string => {
  return crypto.randomBytes(32).toString('hex'); // Generate a 32-byte (256-bit) hex string
};

export const JWT_SECRET = generateJwtSecret();


// // config.ts

// export const JWT_SECRET = 'your_jwt_secret';
