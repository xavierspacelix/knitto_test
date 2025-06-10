import { Request, Response, NextFunction } from "express";
import { fetchExternalProducts } from "../services/externalApiService";
import { syncExternalProduct } from "../services/dbService";
import { generateUniqueCode } from "../utils/generateCode";

export const syncExternalProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const products = await fetchExternalProducts();
    console.log("Fetched products:", products);
    await Promise.all(
      products.map(async (product) => {
        const uniqueCode = await generateUniqueCode(
          "products",
          "product_code",
          "PROD-"
        );
        await syncExternalProduct(product.title, product.price);
      })
    );

    res.status(200).json({ message: "Sync completed", total: products.length });
  } catch (error) {
    next(error);
  }
};
