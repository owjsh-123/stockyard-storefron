# Stockyard — Commerce Storefront

A React + TypeScript storefront front-end for the [Commerce API](https://github.com/ayobamiseun/typescript-ecommerce-api) (Node.js, Express, TypeORM). It covers browsing products, authentication, a cart, checkout, order history, and a wallet balance.

Built with:
- **React 18 + TypeScript + Vite**
- **React Router** for pages
- **Axios** for API calls, with a JWT interceptor
- **Tailwind CSS v4** for styling

## Getting started

```bash
npm install
cp .env.example .env
# edit .env if your API runs on a different host/port
npm run dev
```

The app runs at `http://localhost:5173` by default. It expects the Commerce API to be running and reachable at the URL set in `.env` (`VITE_API_URL`, default `http://localhost:5000/api`).

## Connecting to the backend

This storefront calls the endpoints listed in the Commerce API's own README:

| Endpoint | Method | Used for |
|---|---|---|
| `/api/users` | POST | Register |
| `/api/users/login` | POST | Login |
| `/api/products` | GET | Catalog listing |
| `/api/products/:id` | GET | Product detail |
| `/api/categories` | GET | Category filter |
| `/api/cart` | GET / POST | View cart / add item |
| `/api/cart/:itemId` | PUT / DELETE | Update quantity / remove item |
| `/api/orders` | GET / POST | Order history / checkout |
| `/api/orders/:id` | GET | Order confirmation |
| `/api/wallets` | GET | Wallet balance |

**Important:** the backend README only documents a handful of endpoints (register, login, list products, add to cart, create order, get wallet). This storefront also calls a few endpoints that are common for this kind of app but not explicitly listed in the backend README — `GET /api/products/:id`, `GET /api/categories`, `PUT`/`DELETE /api/cart/:itemId`, `GET /api/orders`, and `GET /api/orders/:id`. If your backend uses different paths or response shapes for any of these, update `src/api/endpoints.ts` and the types in `src/types/index.ts` to match — that's the only file you should need to touch to rewire the frontend to your actual API.

The expected login/register response shape is:
```json
{ "user": { "id": 1, "name": "...", "email": "..." }, "token": "..." }
```
If your backend returns something different, adjust `AuthResponse` in `src/types/index.ts` and `AuthContext.tsx` accordingly.

## Project structure

```
src/
  api/          axios client + one function per endpoint
  context/      AuthContext (login state) and CartContext (cart state)
  components/   Navbar, ProductCard, ProtectedRoute
  pages/        Home, ProductDetail, Cart, Login, Register, Orders, OrderDetail, Wallet
  types/        shared TypeScript interfaces matching the API entities
```

## Building for production

```bash
npm run build
```

Outputs a static bundle to `dist/`, deployable to any static host (Vercel, Netlify, GitHub Pages, etc.). Remember to point `VITE_API_URL` at your deployed backend before building.

## Design

Catalog/ledger-inspired look: warm paper background, hairline dividers instead of card shadows, a serif display face (Fraunces) for headings paired with Inter for UI text.
