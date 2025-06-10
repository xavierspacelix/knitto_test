import { Request, Response, NextFunction } from 'express';
import schedule from 'node-schedule';
import { scheduleNotification as SN } from '../services/dbService';

export const scheduleNotification = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { message, scheduleTime }: { message: string; scheduleTime: string } = req.body;
    if (!message || !scheduleTime) {
      throw new Error('Message and schedule time are required');
    }

    const job = schedule.scheduleJob(new Date(scheduleTime), async () => {
      await SN(message);
      console.log(`Notification sent: ${message}`);
    });

    res.status(200).json({ message: 'Notification scheduled', jobId: job.name });
  } catch (error) {
    next(error);
  }
};