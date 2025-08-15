export type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
  stock: number;
};

export type CartItem = {
  id: number;
  name: string;
  price: number;
  description: string;
  stock: number;
  qty: number;
  lineTotal: number;
};
