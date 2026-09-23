import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { addToCart, getCart, removeCartItem, updateCartItem } from "../api/endpoints";
import type { Cart } from "../types";
import { useAuth } from "./AuthContext";

interface CartContextValue {
  cart: Cart | null;
  itemCount: number;
  loading: boolean;
  refresh: () => Promise<void>;
  add: (productId: number, quantity?: number) => Promise<void>;
  updateQuantity: (itemId: number, quantity: number) => Promise<void>;
  remove: (itemId: number) => Promise<void>;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(false);

  const refresh = useCallback(async () => {
    if (!user) {
      setCart(null);
      return;
    }
    setLoading(true);
    try {
      const data = await getCart();
      setCart(data);
    } catch {
      setCart(null);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const add = async (productId: number, quantity = 1) => {
    const data = await addToCart(productId, quantity);
    setCart(data);
  };

  const updateQuantity = async (itemId: number, quantity: number) => {
    const data = await updateCartItem(itemId, quantity);
    setCart(data);
  };

  const remove = async (itemId: number) => {
    const data = await removeCartItem(itemId);
    setCart(data);
  };

  const itemCount = cart?.items?.reduce((sum, item) => sum + item.quantity, 0) ?? 0;

  return (
    <CartContext.Provider value={{ cart, itemCount, loading, refresh, add, updateQuantity, remove }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
