import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import { SECRET_KEY } from '../config';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

const prisma = new PrismaClient();

interface JwtPayload {
  userId: string;
  email: string;
}

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

export const resetPassword = async (req: Request, res: Response) => {
  const { token, newPassword } = req.body;

  try {
      const secretKey = process.env.SECRET_KEY || 'default_secret_key';
      if (!secretKey) {
          return res.status(500).json({ message: 'Internal server error: secret key not defined' });
      }

      const decoded = jwt.verify(token, secretKey) as JwtPayload;

      if (!decoded || !decoded.email) {
          return res.status(400).json({ message: 'Invalid token' });
      }

      const hashedPassword = bcrypt.hashSync(newPassword, 10);

      const updatedUser = await prisma.user.update({
          where: { email: decoded.email },
          data: { password: hashedPassword }
      });

      if (!updatedUser) {
          return res.status(500).json({ message: 'Failed to update password' });
      }

      res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
      console.error('Error resetting password:', error);
      if (error instanceof jwt.JsonWebTokenError) {
          return res.status(400).json({ message: 'Invalid token' });
      }
      res.status(500).json({ message: 'Internal server error' });
  }
};


export const requestPasswordReset = async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
      const user = await prisma.user.findUnique({ where: { email } });

      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      const secretKey = process.env.SECRET_KEY || 'default_secret_key';
      const token = jwt.sign({ userId: user.userid, email: user.email }, secretKey, { expiresIn: '5m' });

      const resetLink = `http://localhost:3001/reset?token=${token}`;

      await sendPasswordResetEmail(email, resetLink);

      res.status(200).json({ message: 'Password reset email sent' });
  } catch (error) {
      console.error('Error requesting password reset:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
};

























const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
  },
});

export const sendPasswordResetEmail = async (email: string, resetLink: string) => {
  try {
      await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: email,
          subject: 'Password Reset',
          html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #f9f9f9;">
                  <h2 style="color: #333;">Password Reset Request</h2>
                  <p style="color: #555;">Hello,</p>
                  <p style="color: #555;">You requested a password reset. Click the button below to reset your password:</p>
                  <a href="${resetLink}" style="display: inline-block; padding: 10px 20px; margin: 20px 0; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px;">Reset Password</a>
                  <p style="color: #555;">If you did not request this, please ignore this email.</p>
                  <p style="color: #555;">Thank you,</p>
                  <p style="color: #555;">The Support Team</p>
              </div>
          `,
      });
      console.log('Password reset email sent successfully');
  } catch (error) {
      console.error('Error sending password reset email:', error);
      throw error;
  }
};
