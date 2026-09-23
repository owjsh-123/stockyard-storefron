import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getOrders } from "../api/endpoints";
import type { Order } from "../types";

export function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getOrders()
      .then(setOrders)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="font-display text-3xl text-ink">Order history</h1>

      {loading && <p className="mt-6 text-muted">Loading orders…</p>}
      {!loading && orders.length === 0 && (
        <p className="mt-6 text-muted">No orders placed yet.</p>
      )}

      <div className="mt-8">
        {orders.map((order) => (
          <Link
            key={order.id}
            to={`/orders/${order.id}`}
            className="flex items-center justify-between border-b border-hairline py-4 hover:text-pine"
          >
            <div>
              <p className="text-ink">Order #{order.id}</p>
              <p className="text-sm text-muted">
                {new Date(order.createdAt).toLocaleDateString()} · {order.status}
              </p>
            </div>
            <span className="text-ink">${order.total.toFixed(2)}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
