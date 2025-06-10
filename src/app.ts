import express from 'express';
import authRoutes from './routes/authRoutes';
import dataRoutes from './routes/dataRoutes';
import integrationRoutes from './routes/integrationRoutes';
import scheduleRoutes from './routes/scheduleRoutes';
import transactionRoutes from './routes/transactionRoutes';
import reportRoutes from './routes/reportRoutes';
import { errorHandler } from './middleware/errorHandler';

const app = express();

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api', dataRoutes);
app.use('/api', integrationRoutes);
app.use('/api', scheduleRoutes);
app.use('/api', transactionRoutes);
app.use('/api', reportRoutes);

app.use(errorHandler);

export default app;