import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

export function Navbar() {
  const { user, logout } = useAuth();
  const { itemCount } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="border-b border-hairline bg-paper">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
        <Link to="/" className="font-display text-2xl tracking-tight text-ink">
          Stockyard
        </Link>

        <nav className="flex items-center gap-6 text-sm">
          <Link to="/" className="text-ink hover:text-pine">
            Catalog
          </Link>

          {user ? (
            <>
              <Link to="/orders" className="text-ink hover:text-pine">
                Orders
              </Link>
              <Link to="/wallet" className="text-ink hover:text-pine">
                Wallet
              </Link>
              <Link to="/cart" className="relative text-ink hover:text-pine">
                Cart
                {itemCount > 0 && (
                  <span className="ml-1 rounded-full bg-pine px-1.5 py-0.5 text-xs text-paper">
                    {itemCount}
                  </span>
                )}
              </Link>
              <span className="hidden text-muted sm:inline">{user.name}</span>
              <button
                onClick={handleLogout}
                className="border border-ink px-3 py-1.5 text-ink hover:bg-ink hover:text-paper"
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-ink hover:text-pine">
                Sign in
              </Link>
              <Link
                to="/register"
                className="border border-ink px-3 py-1.5 text-ink hover:bg-ink hover:text-paper"
              >
                Create account
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
