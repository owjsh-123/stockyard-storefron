import { useNavigate } from "react-router-dom";
import { createOrder } from "../api/endpoints";
import { useCart } from "../context/CartContext";
import { useState } from "react";

export function Cart() {
  const { cart, updateQuantity, remove, refresh } = useCart();
  const navigate = useNavigate();
  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const items = cart?.items ?? [];
  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const handleCheckout = async () => {
    setPlacing(true);
    setError(null);
    try {
      const order = await createOrder();
      await refresh();
      navigate(`/orders/${order.id}`);
    } catch {
      setError("Couldn't place the order. Check your wallet balance and try again.");
    } finally {
      setPlacing(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-16 text-center">
        <h1 className="font-display text-2xl text-ink">Your cart is empty</h1>
        <p className="mt-2 text-muted">Nothing set aside yet — go pick something out.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="font-display text-3xl text-ink">Your cart</h1>

      <div className="mt-8">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between gap-4 border-b border-hairline py-4"
          >
            <div>
              <p className="text-ink">{item.product.name}</p>
              <p className="text-sm text-muted">${item.product.price.toFixed(2)} each</p>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="number"
                min={1}
                value={item.quantity}
                onChange={(e) => updateQuantity(item.id, Math.max(1, Number(e.target.value)))}
                className="w-16 border border-hairline bg-surface px-2 py-1 text-ink"
              />
              <span className="w-20 text-right text-ink">
                ${(item.product.price * item.quantity).toFixed(2)}
              </span>
              <button
                onClick={() => remove(item.id)}
                className="text-sm text-muted hover:text-amber"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-hairline pt-6">
        <span className="font-display text-xl text-ink">Total</span>
        <span className="font-display text-xl text-ink">${total.toFixed(2)}</span>
      </div>

      {error && <p className="mt-4 text-amber">{error}</p>}

      <button
        onClick={handleCheckout}
        disabled={placing}
        className="mt-6 w-full bg-pine py-3 text-paper hover:bg-pine-dark disabled:opacity-50"
      >
        {placing ? "Placing order…" : "Place order"}
      </button>
    </div>
  );
}
