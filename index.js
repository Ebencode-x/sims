const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const session = require("express-session");
const bcrypt = require("bcryptjs");
const path = require("path");

const app = express();
const PORT = 3000;

// middleware
app.use(express.json());

app.use(session({
    secret: "sims-final-project-secret-key", // fine for a class project; would come from .env in production
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 8 } // 8 hours
}));

// connect to SQLite (auto-creates file)
const dbPath = path.join(__dirname, "db", "inventory.db");
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error("Database error:", err.message);
    } else {
        console.log("Connected to SQLite database");
    }
});

// create tables if not exist
db.run(`
  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    sku TEXT NOT NULL UNIQUE,
    quantity INTEGER NOT NULL DEFAULT 0,
    price REAL NOT NULL DEFAULT 0,
    category TEXT
  )
`);

db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL
  )
`);

// ---------- Auth middleware ----------

function requireAuth(req, res, next) {
    if (req.session && req.session.userId) {
        return next();
    }
    return res.status(401).json({ error: "You must be logged in." });
}

// ---------- Auth routes ----------

app.post("/auth/register", (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: "Username and password are required." });
    }
    if (password.length < 6) {
        return res.status(400).json({ error: "Password must be at least 6 characters." });
    }

    const passwordHash = bcrypt.hashSync(password, 10);

    const sql = "INSERT INTO users (username, password_hash) VALUES (?, ?)";
    db.run(sql, [username, passwordHash], function (err) {
        if (err) {
            if (err.message.includes("UNIQUE")) {
                return res.status(400).json({ error: "That username is already taken." });
            }
            return res.status(400).json({ error: err.message });
        }

        req.session.userId = this.lastID;
        req.session.username = username;
        res.json({ id: this.lastID, username });
    });
});

app.post("/auth/login", (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: "Username and password are required." });
    }

    db.get("SELECT * FROM users WHERE username = ?", [username], (err, user) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!user || !bcrypt.compareSync(password, user.password_hash)) {
            return res.status(401).json({ error: "Invalid username or password." });
        }

        req.session.userId = user.id;
        req.session.username = user.username;
        res.json({ id: user.id, username: user.username });
    });
});

app.post("/auth/logout", (req, res) => {
    req.session.destroy(() => {
        res.json({ success: true });
    });
});

app.get("/auth/me", (req, res) => {
    if (req.session && req.session.userId) {
        return res.json({ loggedIn: true, username: req.session.username });
    }
    res.json({ loggedIn: false });
});

// ---------- Product routes (protected) ----------

app.post("/products", requireAuth, (req, res) => {
    const { name, sku, quantity, price, category } = req.body;

    const sql = "INSERT INTO products (name, sku, quantity, price, category) VALUES (?, ?, ?, ?, ?)";
    db.run(sql, [name, sku, quantity, price, category], function (err) {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        res.json({ id: this.lastID, name, sku, quantity, price, category });
    });
});

app.get("/products", requireAuth, (req, res) => {
    db.all("SELECT * FROM products", [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

app.put("/products/:id", requireAuth, (req, res) => {
    const { name, sku, quantity, price, category } = req.body;
    const { id } = req.params;

    const sql = `
    UPDATE products
    SET name = ?, sku = ?, quantity = ?, price = ?, category = ?
    WHERE id = ?
  `;

    db.run(sql, [name, sku, quantity, price, category, id], function (err) {
        if (err) {
            return res.status(400).json({ error: err.message });
        }

        if (this.changes === 0) {
            return res.status(404).json({ error: "Product not found" });
        }

        res.json({ success: true });
    });
});

app.delete("/products/:id", requireAuth, (req, res) => {
    const { id } = req.params;

    const sql = "DELETE FROM products WHERE id = ?";

    db.run(sql, [id], function (err) {
        if (err) {
            return res.status(400).json({ error: err.message });
        }

        if (this.changes === 0) {
            return res.status(404).json({ error: "Product not found" });
        }

        res.json({ success: true });
    });
});

// static files (must come after routes so /products and /auth are never
// shadowed by a same-named file in public/)
app.use(express.static("public"));

// start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
