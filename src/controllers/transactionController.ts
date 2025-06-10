import { Request, Response, NextFunction } from 'express';
import { dbQuery } from '../config/dbConfig';
import { createOrder as CO, createOrderDetail, updateProductStock } from '../services/dbService';
import { OrderData } from '../types/dataTypes';

export const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { customer_id, products }: OrderData = req.body;
    if (!customer_id || !products.length) {
      throw new Error('Customer ID and products are required');
    }

    await dbQuery('START TRANSACTION');

    const orderId = await CO(customer_id);

    for (const product of products) {
      await createOrderDetail(orderId, product.product_id, product.quantity);
      await updateProductStock(product.product_id, product.quantity);
    }

    await dbQuery('COMMIT');
    res.status(201).json({ message: 'Order created', orderId });
  } catch (error) {
    await dbQuery('ROLLBACK');
    next(error);
  }
};