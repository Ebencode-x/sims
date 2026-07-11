# SIMS - Smart Inventory Management System

Final project for IT 8114 Software Engineering.

## Team Setup Instructions

1. Clone this repository.
2. Run:
   ```
   npm install
   ```
3. Add one real photo — see `public/images/README-IMAGES.txt` for exact
   instructions (needed for the landing/login/register pages).
4. Start the server:
   ```
   npm start
   ```
5. Open `http://localhost:3000` in your browser — this shows the landing
   page. Create an account, then you'll land on the dashboard.

The SQLite database file (`db/inventory.db`) is created automatically the
first time the server runs.

## Pages

Public (no login required):
- **Landing** (`index.html`) — marketing page, entry point at `/`
- **Log In** (`login.html`)
- **Create Account** (`register.html`)

Protected (redirects to `login.html` if not logged in):
- **Dashboard** (`dashboard.html`) — stock overview: total products, units
  in stock, inventory value, low-stock alerts, recently added items
- **Inventory** (`products.html`) — full product list with search, category
  filter, inline edit (modal), and delete
- **Add Product** (`add-product.html`) — form to register a new product
- **Reports** (`reports.html`) — inventory value by category, low-stock report

Low stock threshold is defined once in `public/js/api.js`
(`LOW_STOCK_THRESHOLD`) and shared across every page.

## Authentication

Simple session-based auth: passwords are hashed with bcrypt before being
stored, and a signed session cookie (`express-session`) keeps a user
logged in for 8 hours. The `/products` API routes require a valid session.

## Project Structure

```
sims/
├── db/                  -> SQLite database file is created here automatically
├── models/              -> reserved for future data-layer organization
├── public/
│   ├── css/style.css    -> design system (colors, type, components)
│   ├── images/          -> real photo(s) used on landing/login/register
│   ├── js/
│   │   ├── api.js        -> shared fetch helpers + constants
│   │   ├── components.js -> shared sidebar/topbar/footer (protected pages)
│   │   ├── auth-guard.js -> redirects to login if not authenticated
│   │   ├── dashboard.js
│   │   ├── products.js
│   │   ├── add-product.js
│   │   └── reports.js
│   ├── index.html        -> Landing page
│   ├── login.html
│   ├── register.html
│   ├── dashboard.html
│   ├── products.html
│   ├── add-product.html
│   └── reports.html
├── index.js              -> Express app entry point (routes + DB + auth)
└── package.json
```

## Tech Stack

- Backend: Node.js, Express, SQLite (sqlite3), express-session, bcryptjs
- Frontend: HTML, CSS (custom design system), vanilla JavaScript (Fetch API)
