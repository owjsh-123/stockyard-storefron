import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOrder } from "../api/endpoints";
import type { Order } from "../types";

export function OrderDetail() {
  const { id } = useParams();
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (!id) return;
    getOrder(Number(id)).then(setOrder);
  }, [id]);

  if (!order) {
    return <div className="mx-auto max-w-3xl px-6 py-10 text-muted">Loading order…</div>;
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <p className="text-sm text-muted">Order #{order.id}</p>
      <h1 className="mt-1 font-display text-3xl text-ink">Thanks — it's on its way</h1>
      <p className="mt-2 text-muted">
        Status: <span className="text-ink">{order.status}</span>
      </p>

      <div className="mt-8 border-t border-hairline pt-6">
        {order.details?.map((detail) => (
          <div
            key={detail.id}
            className="flex items-center justify-between border-b border-hairline py-3"
          >
            <div>
              <p className="text-ink">{detail.product.name}</p>
              <p className="text-sm text-muted">Qty {detail.quantity}</p>
            </div>
            <span className="text-ink">${(detail.price * detail.quantity).toFixed(2)}</span>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between">
        <span className="font-display text-xl text-ink">Total</span>
        <span className="font-display text-xl text-ink">${order.total.toFixed(2)}</span>
      </div>
    </div>
  );
}
