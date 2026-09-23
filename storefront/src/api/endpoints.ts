import { api } from "./client";
import type {
  AuthResponse,
  Cart,
  Category,
  Order,
  Product,
  Wallet,
} from "../types";

// --- Auth -------------------------------------------------------------
export const registerUser = (data: { name: string; email: string; password: string }) =>
  api.post<AuthResponse>("/users", data).then((res) => res.data);

export const loginUser = (data: { email: string; password: string }) =>
  api.post<AuthResponse>("/users/login", data).then((res) => res.data);

// --- Products -----------------------------------------------------------
export const getProducts = (params?: { categoryId?: number; search?: string }) =>
  api.get<Product[]>("/products", { params }).then((res) => res.data);

export const getProduct = (id: number) =>
  api.get<Product>(`/products/${id}`).then((res) => res.data);

export const getCategories = () =>
  api.get<Category[]>("/categories").then((res) => res.data);

// --- Cart -----------------------------------------------------------------
export const getCart = () => api.get<Cart>("/cart").then((res) => res.data);

export const addToCart = (productId: number, quantity: number) =>
  api.post<Cart>("/cart", { productId, quantity }).then((res) => res.data);

export const updateCartItem = (itemId: number, quantity: number) =>
  api.put<Cart>(`/cart/${itemId}`, { quantity }).then((res) => res.data);

export const removeCartItem = (itemId: number) =>
  api.delete<Cart>(`/cart/${itemId}`).then((res) => res.data);

// --- Orders -----------------------------------------------------------------
export const createOrder = () => api.post<Order>("/orders").then((res) => res.data);

export const getOrders = () => api.get<Order[]>("/orders").then((res) => res.data);

export const getOrder = (id: number) =>
  api.get<Order>(`/orders/${id}`).then((res) => res.data);

// --- Wallet -----------------------------------------------------------------
export const getWallet = () => api.get<Wallet>("/wallets").then((res) => res.data);
