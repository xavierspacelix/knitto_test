export interface ProductData {
  nama_produk: string;
  harga_jual: number;
}

export interface OrderData {
  customer_id: number;
  products: { product_id: number; quantity: number }[];
}