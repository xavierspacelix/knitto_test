import { dbQuery } from '../config/dbConfig';
import { ProductData, OrderData } from '../types/dataTypes';
import { RowDataPacket, ResultSetHeader } from 'mysql2/promise';

export const getUserByEmail = async (email: string, password?: string): Promise<RowDataPacket[]> => {
  const query = password
    ? `SELECT * FROM users WHERE email = ? AND password = ?`
    : `SELECT * FROM users WHERE email = ?`;
  const params = password ? [email, password] : [email];
  return await dbQuery<RowDataPacket[]>(query, params);
};

export const createUser = async (email: string, name: string): Promise<ResultSetHeader> => {
  const query = `INSERT INTO users (email, name) VALUES (?, ?)`;
  return await dbQuery<ResultSetHeader>(query, [email, name]);
};

export const createProduct = async (product_code: string, data: ProductData): Promise<ResultSetHeader> => {
  const query = `INSERT INTO products (product_code, nama_produk, harga_jual) VALUES (?, ?, ?)`;
  return await dbQuery<ResultSetHeader>(query, [product_code, data.nama_produk, data.harga_jual]);
};

export const syncExternalProduct = async (name: string, price: number): Promise<ResultSetHeader> => {
  const query = `INSERT INTO products (nama_produk, harga_jual) VALUES (?, ?)
                 ON DUPLICATE KEY UPDATE harga_jual = ?`;
  return await dbQuery<ResultSetHeader>(query, [name, price, price]);
};

export const createOrder = async (customer_id: number): Promise<number> => {
  const query = `INSERT INTO orders (customer_id, order_date) VALUES (?, NOW())`;
  const result = await dbQuery<ResultSetHeader>(query, [customer_id]);
  return result.insertId;
};

export const createOrderDetail = async (order_id: number, product_id: number, quantity: number): Promise<ResultSetHeader> => {
  const query = `INSERT INTO order_details (order_id, product_id, quantity) VALUES (?, ?, ?)`;
  return await dbQuery<ResultSetHeader>(query, [order_id, product_id, quantity]);
};

export const updateProductStock = async (product_id: number, quantity: number): Promise<ResultSetHeader> => {
  const query = `UPDATE products SET stock = stock - ? WHERE id = ?`;
  return await dbQuery<ResultSetHeader>(query, [quantity, product_id]);
};

export const getTopCustomers = async (): Promise<RowDataPacket[]> => {
  const query = `
    SELECT 
      c.customer_id, 
      c.customer_name, 
      SUM(od.quantity * p.harga_jual) AS total_pembelian
    FROM customers c
    INNER JOIN orders o ON c.customer_id = o.customer_id
    INNER JOIN order_details od ON o.order_id = od.order_id
    INNER JOIN products p ON od.product_id = p.id
    GROUP BY c.customer_id, c.customer_name
    ORDER BY total_pembelian DESC
    LIMIT 10
  `;
  return await dbQuery<RowDataPacket[]>(query, []);
};

export const scheduleNotification = async (message: string): Promise<ResultSetHeader> => {
  const query = `INSERT INTO notifications (message, status) VALUES (?, ?)`;
  return await dbQuery<ResultSetHeader>(query, [message, 'SENT']);
};