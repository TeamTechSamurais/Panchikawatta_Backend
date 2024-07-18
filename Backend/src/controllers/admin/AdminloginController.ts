import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import bodyParser from 'body-parser';
import { log } from 'console';

const app = express();
const prisma = new PrismaClient();

app.use(bodyParser.json());

// Check Credential Function
export const checkCredential = async (req: Request, res: Response) => {
  console.log('Check Credential Called');
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and Password are required' });
  }

  try {
    const admin = await prisma.admin.findUnique({
      where: { email },
    });

    if (!admin) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    console.log('Admin Password (hashed):', admin.password);
    console.log('Provided Password:', password);

  
    const isPasswordValid = checkPassowrd(password,admin.password);

    console.log(isPasswordValid);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    

    res.json({ message: 'Login successful' });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

function checkPassowrd(_password?: any, password?: string){
        if(_password===password){
          return true;
        }else{
          return false;
        }
}