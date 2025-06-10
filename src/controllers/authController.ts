import { Request, Response, NextFunction } from 'express';
import { getUserByEmail, createUser } from '../services/dbService';
import { generateToken } from '../utils/jwtUtil';
import axios from 'axios';
import { LoginCredentials, GoogleLoginCredentials } from '../types/authTypes';

export const loginWithEmail = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password }: LoginCredentials = req.body;
    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    const user = await getUserByEmail(email, password);

    if (!user.length) {
      throw new Error('Invalid credentials');
    }

    const token = generateToken({ userId: user[0].id, email: user[0].email });
    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};

export const loginWithGoogle = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { googleToken }: GoogleLoginCredentials = req.body;
    if (!googleToken) {
      throw new Error('Google token is required');
    }

    const response = await axios.get(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${googleToken}`);
    const googleUser = response.data;

    let user = await getUserByEmail(googleUser.email);

    if (!user.length) {
      await createUser(googleUser.email, googleUser.name);
      user = await getUserByEmail(googleUser.email);
    }

    const token = generateToken({ userId: user[0].id, email: user[0].email });
    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};