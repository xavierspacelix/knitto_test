import mysql, { RowDataPacket, OkPacket, ResultSetHeader } from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export const dbQuery = async <T extends RowDataPacket[] | OkPacket | ResultSetHeader>(
  query: string,
  params: any[] = []
): Promise<T> => {
  const connection = await pool.getConnection();
  try {
    const [results] = await connection.query<T>(query, params);
    return results;
  } catch (error) {
    throw error;
  } finally {
    connection.release();
  }
};

export default pool;