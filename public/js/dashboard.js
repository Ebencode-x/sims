async function loadDashboard() {
    const statGrid = document.getElementById("stat-grid");
    const lowStockSection = document.getElementById("low-stock-section");
    const recentSection = document.getElementById("recent-section");

    let products = [];
    try {
        products = await fetchProducts();
    } catch (err) {
        statGrid.innerHTML = `<div class="card" style="padding:1rem;">Could not load inventory data.</div>`;
        return;
    }

    const totalProducts = products.length;
    const totalUnits = products.reduce((sum, p) => sum + Number(p.quantity || 0), 0);
    const totalValue = products.reduce((sum, p) => sum + Number(p.quantity || 0) * Number(p.price || 0), 0);
    const lowStockItems = products.filter(isLowStock);
    const hasData = totalProducts > 0;

    statGrid.innerHTML = `
        <div class="stat-card">
            <div class="stat-label">Total Products</div>
            <div class="stat-value mono">${hasData ? totalProducts : "—"}</div>
            <div class="stat-hint">distinct SKUs registered</div>
        </div>
        <div class="stat-card moss">
            <div class="stat-label">Units In Stock</div>
            <div class="stat-value mono">${hasData ? totalUnits : "—"}</div>
            <div class="stat-hint">across all products</div>
        </div>
        <div class="stat-card amber">
            <div class="stat-label">Inventory Value</div>
            <div class="stat-value mono">${hasData ? "Tsh " + formatCurrency(totalValue) : "—"}</div>
            <div class="stat-hint">quantity &times; price</div>
        </div>
        <div class="stat-card rust">
            <div class="stat-label">Low Stock Alerts</div>
            <div class="stat-value mono">${hasData ? lowStockItems.length : "—"}</div>
            <div class="stat-hint">below ${LOW_STOCK_THRESHOLD} units</div>
        </div>
    `;

    // Low stock section
    if (lowStockItems.length === 0) {
        lowStockSection.innerHTML = `<div class="empty-state">
            <div class="stamp stamp-moss">All Clear</div>
            <p>No products are currently below the ${LOW_STOCK_THRESHOLD}-unit threshold.</p>
        </div>`;
    } else {
        lowStockSection.innerHTML = `
            <div class="table-wrap" style="box-shadow:none;">
                <table>
                    <thead>
                        <tr><th>Product</th><th>SKU</th><th>Quantity</th><th>Category</th></tr>
                    </thead>
                    <tbody>
                        ${lowStockItems.map(p => `
                            <tr>
                                <td>${escapeHtml(p.name)}</td>
                                <td class="mono">${escapeHtml(p.sku)}</td>
                                <td><span class="tag tag-rust">${p.quantity} left</span></td>
                                <td>${escapeHtml(p.category || "—")}</td>
                            </tr>
                        `).join("")}
                    </tbody>
                </table>
            </div>
        `;
    }

    // Recently added (highest id first, top 5)
    const recent = [...products].sort((a, b) => b.id - a.id).slice(0, 5);

    if (recent.length === 0) {
        recentSection.innerHTML = `<div class="empty-state">
            <div class="stamp stamp-rust">Empty</div>
            <p>No products yet. Add your first one to see it here.</p>
        </div>`;
    } else {
        recentSection.innerHTML = `
            <div class="table-wrap" style="box-shadow:none;">
                <table>
                    <thead>
                        <tr><th>Product</th><th>SKU</th><th>Quantity</th><th>Price</th><th>Status</th></tr>
                    </thead>
                    <tbody>
                        ${recent.map(p => `
                            <tr>
                                <td>${escapeHtml(p.name)}</td>
                                <td class="mono">${escapeHtml(p.sku)}</td>
                                <td class="mono">${p.quantity}</td>
                                <td class="mono">Tsh ${formatCurrency(p.price)}</td>
                                <td>${isLowStock(p)
                                    ? `<span class="tag tag-rust">Low</span>`
                                    : `<span class="tag tag-moss">Healthy</span>`}</td>
                            </tr>
                        `).join("")}
                    </tbody>
                </table>
            </div>
        `;
    }
}

document.addEventListener("DOMContentLoaded", loadDashboard);
