import { Request, Response, NextFunction } from 'express';
import { getTopCustomers as GTP } from '../services/dbService';

export const getTopCustomers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const results = await GTP();
    res.status(200).json({ data: results });
  } catch (error) {
    next(error);
  }
};