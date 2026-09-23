import { Link } from "react-router-dom";
import type { Product } from "../types";

export function ProductCard({ product }: { product: Product }) {
  const inStock = (product.stock ?? 1) > 0;

  return (
    <Link
      to={`/products/${product.id}`}
      className="group block border-b border-hairline pb-4 pt-4 first:pt-0"
    >
      <div className="flex gap-4">
        <div className="h-24 w-24 flex-shrink-0 overflow-hidden bg-surface">
          {product.imageUrl ? (
            <img
              src={product.imageUrl}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-xs text-muted">
              No image
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col justify-between">
          <div>
            <h3 className="font-display text-lg text-ink group-hover:text-pine">
              {product.name}
            </h3>
            {product.category && (
              <p className="text-sm text-muted">{product.category.name}</p>
            )}
          </div>
          <div className="flex items-center justify-between">
            <span className="text-base text-ink">${product.price.toFixed(2)}</span>
            {!inStock && (
              <span className="text-sm text-amber">Out of stock</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
