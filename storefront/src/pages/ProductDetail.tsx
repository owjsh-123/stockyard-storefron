import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProduct } from "../api/endpoints";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import type { Product } from "../types";

export function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { add } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [status, setStatus] = useState<"idle" | "adding" | "added" | "error">("idle");

  useEffect(() => {
    if (!id) return;
    getProduct(Number(id)).then(setProduct);
  }, [id]);

  if (!product) {
    return <div className="mx-auto max-w-5xl px-6 py-10 text-muted">Loading…</div>;
  }

  const handleAdd = async () => {
    if (!user) {
      navigate("/login");
      return;
    }
    setStatus("adding");
    try {
      await add(product.id, quantity);
      setStatus("added");
    } catch {
      setStatus("error");
    }
  };

  const avgRating =
    product.rates && product.rates.length > 0
      ? (
          product.rates.reduce((sum, r) => sum + r.score, 0) / product.rates.length
        ).toFixed(1)
      : null;

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <div className="grid gap-10 md:grid-cols-2">
        <div className="aspect-square bg-surface">
          {product.imageUrl ? (
            <img
              src={product.imageUrl}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-muted">
              No image available
            </div>
          )}
        </div>

        <div>
          {product.category && (
            <p className="text-sm text-muted">{product.category.name}</p>
          )}
          <h1 className="mt-1 font-display text-3xl text-ink">{product.name}</h1>
          {avgRating && (
            <p className="mt-2 text-sm text-muted">
              {avgRating} / 5 · {product.rates?.length} review
              {product.rates?.length === 1 ? "" : "s"}
            </p>
          )}
          <p className="mt-6 text-2xl text-ink">${product.price.toFixed(2)}</p>
          <p className="mt-4 max-w-md text-ink/80">{product.description}</p>

          <div className="mt-8 flex items-center gap-4 border-t border-hairline pt-6">
            <label className="flex items-center gap-2 text-sm text-muted">
              Qty
              <input
                type="number"
                min={1}
                max={product.stock ?? 99}
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                className="w-16 border border-hairline bg-surface px-2 py-1 text-ink"
              />
            </label>
            <button
              onClick={handleAdd}
              disabled={status === "adding" || (product.stock ?? 1) <= 0}
              className="bg-pine px-5 py-2 text-paper hover:bg-pine-dark disabled:opacity-50"
            >
              {status === "adding"
                ? "Adding…"
                : status === "added"
                ? "Added to cart"
                : "Add to cart"}
            </button>
          </div>
          {status === "error" && (
            <p className="mt-3 text-sm text-amber">
              Couldn't add that to your cart. Try again in a moment.
            </p>
          )}
        </div>
      </div>

      {product.rates && product.rates.length > 0 && (
        <div className="mt-14 border-t border-hairline pt-8">
          <h2 className="font-display text-xl text-ink">Reviews</h2>
          <div className="mt-4 space-y-4">
            {product.rates.map((rate) => (
              <div key={rate.id} className="border-b border-hairline pb-4">
                <p className="text-sm text-ink">{rate.score} / 5</p>
                {rate.comment && <p className="mt-1 text-ink/80">{rate.comment}</p>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
