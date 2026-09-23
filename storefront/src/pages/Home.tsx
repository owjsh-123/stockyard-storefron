import { useEffect, useState } from "react";
import { getCategories, getProducts } from "../api/endpoints";
import { ProductCard } from "../components/ProductCard";
import type { Category, Product } from "../types";

export function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getCategories()
      .then(setCategories)
      .catch(() => setCategories([]));
  }, []);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getProducts({
      categoryId: activeCategory ?? undefined,
      search: search || undefined,
    })
      .then(setProducts)
      .catch(() => setError("Couldn't reach the catalog. Check that the API is running."))
      .finally(() => setLoading(false));
  }, [activeCategory, search]);

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <div className="mb-10">
        <h1 className="font-display text-4xl text-ink">The catalog</h1>
        <p className="mt-2 max-w-md text-muted">
          Everything currently in stock, sorted the way it came off the shelf.
        </p>
      </div>

      <div className="mb-8 flex flex-wrap items-center gap-4 border-y border-hairline py-4">
        <input
          type="search"
          placeholder="Search products"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-hairline bg-surface px-3 py-2 text-sm focus:border-pine"
        />
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveCategory(null)}
            className={`px-3 py-1.5 text-sm ${
              activeCategory === null ? "bg-ink text-paper" : "border border-hairline text-ink"
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1.5 text-sm ${
                activeCategory === cat.id
                  ? "bg-ink text-paper"
                  : "border border-hairline text-ink"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {error && <p className="text-amber">{error}</p>}
      {loading && !error && <p className="text-muted">Loading catalog…</p>}
      {!loading && !error && products.length === 0 && (
        <p className="text-muted">No products match that search yet.</p>
      )}

      <div>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
