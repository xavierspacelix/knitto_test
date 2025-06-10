import { Request, Response, NextFunction } from 'express';
import { createProduct as CreateProduct } from '../services/dbService';
import { generateUniqueCode } from '../utils/generateCode';
import { ProductData } from '../types/dataTypes';

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { nama_produk, harga_jual }: ProductData = req.body;
    if (!nama_produk || !harga_jual) {
      throw new Error('Nama produk dan harga jual wajib diisi');
    }

    const uniqueCode = await generateUniqueCode('products', 'product_code', 'PROD-');

    await CreateProduct(uniqueCode, { nama_produk, harga_jual });

    res.status(201).json({ message: 'Produk berhasil disimpan', product_code: uniqueCode });
  } catch (error) {
    next(error);
  }
};