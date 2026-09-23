import { useEffect, useState } from "react";
import { getWallet } from "../api/endpoints";
import type { Wallet as WalletType } from "../types";

export function Wallet() {
  const [wallet, setWallet] = useState<WalletType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getWallet()
      .then(setWallet)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="mx-auto max-w-sm px-6 py-16 text-center">
      <p className="text-sm text-muted">Wallet balance</p>
      {loading ? (
        <p className="mt-4 text-muted">Loading…</p>
      ) : (
        <p className="mt-4 font-display text-5xl text-ink">
          ${wallet?.balance.toFixed(2) ?? "0.00"}
        </p>
      )}
      <p className="mt-6 text-sm text-muted">
        Used automatically when you place an order.
      </p>
    </div>
  );
}
