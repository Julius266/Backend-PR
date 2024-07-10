import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import { SECRET_KEY } from '../config';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

// getAllUsers
export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const allUsers = await prisma.user.findMany();
    res.status(200).json({ data: allUsers });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// createUser
export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    const newUser = await prisma.user.create({
      data: {
        email: req.body.email,
        password: hashedPassword,
        name: req.body.name,
        lastname: req.body.lastname,
      }
    });

    console.log("User created successfully:", newUser);

    res.status(201).json({ data: newUser });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: 'Email or password is incorrect' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Email or password is incorrect' });
    }

    const token = jwt.sign({ userId: user.userid, email: user.email }, SECRET_KEY, { expiresIn: '1h' });

    console.log("User logged in successfully:", { userId: user.userid, email: user.email });

    res.json({ token });
  } catch (error) {
    console.log("Error logging in user:", error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
