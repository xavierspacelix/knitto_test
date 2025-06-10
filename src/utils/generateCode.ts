import { dbQuery } from '../config/dbConfig';
import { RowDataPacket } from 'mysql2/promise';

export const generateUniqueCode = async (table: string, column: string, prefix: string): Promise<string> => {
  await dbQuery('LOCK TABLES ?? WRITE', [table]);
  try {
    const query = `SELECT MAX(??) as last_code FROM ?? WHERE ?? LIKE ?`;
    const result = await dbQuery<RowDataPacket[]>(query, [column, table, column, `${prefix}%`]);
    
    let nextNumber = 1;
    if (result.length > 0 && result[0].last_code) {
      const lastNumber = parseInt(result[0].last_code.replace(prefix, '')) || 0;
      nextNumber = lastNumber + 1;
    }

    return `${prefix}${nextNumber.toString().padStart(3, '0')}`;
  } finally {
    await dbQuery('UNLOCK TABLES');
  }
};