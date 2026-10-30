# مانديلا · Mandella Cafe — Full-Stack Prototype

Pixel-oriented implementation of the **Mandella** flow from the Figma file
([`node-id=16-2096`](https://www.figma.com/design/UldLZPD7GFvtUsE7DTtGSl/Untitled?node-id=16-2096&m=dev)):
a Syrian café / tea-shop mobile ordering experience, RTL Arabic, rebuilt as a real
full-stack app.

Monorepo layout:

```
mandella_cafe/
├── client/     Vite + React + Tailwind (RTL mobile UI, 430×932 design canvas)
└── server/     Express + MongoDB (ESM, layered App → Route → Controller → Service → Model)
```

## Screens (1:1 with the Figma frames)

| Figma frame | Route | Screen |
| --- | --- | --- |
| `01 Splash · أهلاً في مانديلا` | `/` | Brand rosette + "اهلا وسهلا بكم" |
| `02 Home · يا هلا` | `/home` | Greeting, search, category pills, promo, recommendations |
| `03 Drinks menu · قائمة المشروبات` | `/menu` | Filters, product rows, promo CTA |
| `04 Product details · شاي مانديلا` | `/product/:slug` | Hero, size, sugar, quantity, add |
| `05 Order summary · ملخّص الطلب` | `/summary` | Items, pickup card, cash payment, totals |
| `06 Order confirmation · طلبك قيد التحضير` | `/confirmation/:orderId` | Success state, order card, status |

Colors, typography and copy follow the extracted spec (see Design system below).

## Design system

| Token | Value | Usage |
| --- | --- | --- |
| `ivory` | `#F8F5EF` | screen background |
| `ink` | `#172321` | primary text |
| `teal` | `#00A7A5` | primary actions, selected states |
| `teal.deep` | `#007B78` | wordmark, emphasis |
| `rose` | `#E82E73` | logo accents, cart badge |
| `gold` | `#F5D840` | logo accents |
| `price` | `#F22D32` | prices (ل.س) |
| `amber` | `#F5B33C` | pickup card, confirmation status |
| `sand` / `line` / `muted` | `#EFE7DA` / `#E6DED1` / `#7C8A85` | surfaces, dividers, helper text |

Fonts: **Cairo** (Arabic UI, 400–800) + **Dancing Script** for the `Restaurant & Cafe` line.
Prices render in Arabic-Indic numerals (`١٨٠٠ ل.س`). The frame is capped at 430 px wide and
932 px tall, centered as a device canvas on desktop.

## Getting started

```bash
# 1. install
npm run install:all

# 2. configure
cp server/.env.example server/.env      # set MONGODB_URI + JWT_SECRET
cp client/.env.example client/.env      # optional: VITE_API_URL

# 3. run (needs MongoDB; `docker compose up -d` starts one)
npm run dev                             # API :4000 + client :5173
```

`AUTO_SEED=true` inserts the six menu items (Mandella house tea, Shami coffee,
lemon & mint, rose sherbet, baklava, barazek) on first boot. To reseed from scratch:
`npm --prefix server run seed`.

## API

Base URL `/api`. Success envelope `{ success, message, data, meta? }`,
errors `{ success: false, message, details? }`.

| Method | Endpoint | Auth | Description |
| --- | --- | --- | --- |
| `GET` | `/health` | – | liveness |
| `POST` | `/auth/guest` | – | create a guest session (used on first app load) |
| `POST` | `/auth/register` | – | phone + password → JWT |
| `POST` | `/auth/login` | – | phone + password → JWT |
| `GET` | `/auth/me` | JWT | current user |
| `GET` | `/products?category=hot\|cold\|sweets&q=&featured=` | – | menu |
| `GET` | `/products/categories` | – | filter pills with counts |
| `GET` | `/products/:idOrSlug` | – | product detail |
| `POST` | `/orders` | JWT | checkout (cash on pickup) |
| `GET` | `/orders` | JWT | my orders |
| `GET` | `/orders/:id` | JWT | order receipt |
| `PATCH` | `/orders/:id/status` | JWT | status transition (owner/admin) |

The client boots a **guest JWT** automatically, so the Figma flow is untouched by a
login screen while every order stays authenticated and scoped to its owner.

## Client architecture

```
client/src/
├── lib/            http client (fetch, one error boundary), REST resource factory, formatters
├── providers/      AuthProvider, CartProvider (context + localStorage)
├── hooks/          useAuth, useCart, useProducts, useProduct, useResource
├── components/
│   ├── ui/         Button, Card, Chip, Stepper, SearchField, Image, Notices, icons
│   ├── layout/     Screen (device frame), ScreenHeader, StatusBar, HomeIndicator
│   ├── brand/      Logo (SVG rosette + wordmark)
│   └── menu/       ProductCard, ProductRow, CategoryPills
├── screens/        one file per Figma frame
└── routes/         AppRoutes
```

- **REST by hand**: `lib/http.js` is a tiny `fetch` wrapper (token injection, JSON
  parsing, `HttpError`); `lib/api/factory.js` builds each resource
  (`list/get/create/update/replace/remove`) so new endpoints are one line.
- **Centralized errors**: transport, HTTP and unauthorized failures normalize into
  `HttpError`; `useResource` exposes `{ data, loading, error, refetch }` and the
  `Notices` components render them consistently.
- **Server layering**: `app.js` (App) → `routes/*` → `controllers/*` → `services/*` →
  `models/*`, with `utils` (ApiError, asyncHandler, response, token) and one
  `errorHandler` that maps Mongoose/JWT/duplicate-key errors to Arabic messages.
- Every React component is a functional arrow component with `export default`.

## Environment

`server/.env`

```
PORT=4000
MONGODB_URI=mongodb://127.0.0.1:27017/mandella_cafe
JWT_SECRET=replace-with-a-long-random-string
JWT_EXPIRES_IN=30d
CLIENT_ORIGIN=http://localhost:5173
AUTO_SEED=true
```

`client/.env`

```
VITE_API_URL=http://localhost:4000/api
```


## Deploy on GitHub Pages (free, GitHub only)

GitHub Pages serves static files only, so the Express API cannot run there. The repo
ships a **prebuilt demo bundle** in `docs/`, built with `VITE_MOCK=true`: `lib/api/mock/`
implements the exact same `authApi` / `productApi` / `orderApi` surface as the HTTP
clients, backed by the seeded menu and `localStorage` orders. Same screens, hooks and
contexts — only the transport is swapped.

The real full-stack path (Express + MongoDB) is untouched and remains the default for
`npm run dev` and any Node host.

**Enable it once:** repo → **Settings → Pages → Build and deployment → Source:
Deploy from a branch → Branch: `main`, folder: `/docs` → Save**.

Live at `https://a1-1ab.github.io/mandella_cafe/`.

Rebuild the demo after changes:

```bash
cd client
VITE_MOCK=true VITE_BASE=/mandella_cafe/ npm run build
cp dist/index.html dist/404.html && touch dist/.nojekyll
rm -rf ../docs && cp -r dist ../docs
```

To point the demo at a real API instead: build without `VITE_MOCK` and set
`VITE_API_URL` to your deployed API URL.

## Environment (continued)

## Notes / known gaps from the source file

- Exact font names, letter-spacing and some tiny helper lines were not readable in the
  (signed-out) Figma viewer; values are close matches to the extracted spec.
- Product photography uses remote Unsplash placeholders; swap the `image` fields in
  `server/src/seed/seed.js` (or in MongoDB) for the real shoot.
- The Cafflix page in the same Figma file is a separate brand and intentionally not
  implemented here.
