// Shared constants
const LOW_STOCK_THRESHOLD = 5;

// Shared fetch helpers so every page talks to the backend the same way.
// If a session has expired (401), every helper redirects to login.html
// instead of showing a confusing error.

function handleUnauthorized() {
    window.location.href = "login.html";
}

async function fetchProducts() {
    const res = await fetch("/products");
    if (res.status === 401) {
        handleUnauthorized();
        throw new Error("Session expired");
    }
    if (!res.ok) throw new Error("Failed to load products");
    return res.json();
}

async function createProduct(product) {
    const res = await fetch("/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product)
    });
    if (res.status === 401) {
        handleUnauthorized();
        throw new Error("Session expired");
    }
    if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Failed to create product");
    }
    return res.json();
}

async function updateProduct(id, product) {
    const res = await fetch(`/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product)
    });
    if (res.status === 401) {
        handleUnauthorized();
        throw new Error("Session expired");
    }
    if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Failed to update product");
    }
    return res.json();
}

async function deleteProduct(id) {
    const res = await fetch(`/products/${id}`, { method: "DELETE" });
    if (res.status === 401) {
        handleUnauthorized();
        throw new Error("Session expired");
    }
    if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Failed to delete product");
    }
    return res.json();
}

// Small formatting helpers reused across pages
function formatCurrency(value) {
    const n = Number(value) || 0;
    return n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function isLowStock(product) {
    return Number(product.quantity) < LOW_STOCK_THRESHOLD;
}

function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str ?? "";
    return div.innerHTML;
}
