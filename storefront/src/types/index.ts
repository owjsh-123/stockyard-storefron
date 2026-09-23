export interface Category {
  id: number;
  name: string;
}

export interface Rate {
  id: number;
  score: number;
  comment?: string;
  userId?: number;
}

export interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  stock?: number;
  imageUrl?: string;
  category?: Category;
  rates?: Rate[];
}

export interface CartItem {
  id: number;
  product: Product;
  quantity: number;
}

export interface Cart {
  id: number;
  items: CartItem[];
  total?: number;
}

export interface OrderDetail {
  id: number;
  product: Product;
  quantity: number;
  price: number;
}

export interface Order {
  id: number;
  status: string;
  total: number;
  createdAt: string;
  details?: OrderDetail[];
}

export interface Wallet {
  id: number;
  balance: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}
