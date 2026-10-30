# Server — Mandella Cafe API

Express + MongoDB, ESM JavaScript, layered `App → Route → Controller → Service → Model`.

```bash
npm install
cp .env.example .env
npm run dev     # http://localhost:4000
```

Middlewares: `cors`, `express.json`, JWT (`authenticate`), role guard (`authorize`),
`notFoundHandler` + single `errorHandler`.

```
src/
├── app.js            App: middleware + route mounting + error pipeline
├── index.js          boot: db → seed → listen
├── config/           env, database
├── routes/           auth, products, orders
├── controllers/      HTTP mapping only
├── services/         business rules (pricing, order numbers, ownership)
├── models/           User, Product, Order
├── middleware/       auth.middleware, error.middleware
├── utils/            ApiError, asyncHandler, response helpers, token
└── seed/             seed products
```
