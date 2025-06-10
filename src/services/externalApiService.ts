import axios from 'axios';

interface ExternalProduct {
  title: string;
  price: number;
}

export const fetchExternalProducts = async (): Promise<ExternalProduct[]> => {
  try {
    const response = await axios.get('https://api.escuelajs.co/api/v1/products');
    return response.data.map((product: any) => ({
      title: product.title,
      price: product.price
    }));
  } catch (error) {
    throw new Error('Failed to fetch external products');
  }
};