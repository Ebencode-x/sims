async function loadReports() {
    const statGrid = document.getElementById("report-stats");
    const categoryBreakdown = document.getElementById("category-breakdown");
    const lowStockReport = document.getElementById("low-stock-report");

    let products = [];
    try {
        products = await fetchProducts();
    } catch (err) {
        statGrid.innerHTML = `<div class="card" style="padding:1rem;">Could not load report data.</div>`;
        return;
    }

    const totalValue = products.reduce((sum, p) => sum + Number(p.quantity || 0) * Number(p.price || 0), 0);
    const categoryCount = new Set(products.map(p => p.category).filter(Boolean)).size;
    const lowStockItems = products.filter(isLowStock);

    statGrid.innerHTML = `
        <div class="stat-card amber">
            <div class="stat-label">Total Inventory Value</div>
            <div class="stat-value mono">$${formatCurrency(totalValue)}</div>
        </div>
        <div class="stat-card">
            <div class="stat-label">Categories Tracked</div>
            <div class="stat-value mono">${categoryCount}</div>
        </div>
        <div class="stat-card rust">
            <div class="stat-label">Items Below Threshold</div>
            <div class="stat-value mono">${lowStockItems.length}</div>
        </div>
    `;

    // Category breakdown by value
    const byCategory = {};
    products.forEach(p => {
        const key = p.category || "Uncategorized";
        const value = Number(p.quantity || 0) * Number(p.price || 0);
        byCategory[key] = (byCategory[key] || 0) + value;
    });

    const maxValue = Math.max(1, ...Object.values(byCategory));
    const sortedCategories = Object.entries(byCategory).sort((a, b) => b[1] - a[1]);

    if (sortedCategories.length === 0) {
        categoryBreakdown.innerHTML = `<div class="empty-state"><p>No products registered yet.</p></div>`;
    } else {
        categoryBreakdown.innerHTML = sortedCategories.map(([category, value]) => `
            <div class="category-bar-row">
                <div>${escapeHtml(category)}</div>
                <div class="bar-track">
                    <div class="bar-fill" style="width: ${(value / maxValue) * 100}%;"></div>
                </div>
                <div class="mono" style="text-align:right;">$${formatCurrency(value)}</div>
            </div>
        `).join("");
    }

    // Low stock report
    if (lowStockItems.length === 0) {
        lowStockReport.innerHTML = `
            <div class="empty-state">
                <div class="stamp stamp-moss">All Clear</div>
                <p>Every product is above the ${LOW_STOCK_THRESHOLD}-unit threshold.</p>
            </div>
        `;
    } else {
        lowStockReport.innerHTML = `
            <div class="table-wrap" style="box-shadow:none;">
                <table>
                    <thead>
                        <tr><th>Product</th><th>SKU</th><th>Category</th><th>Quantity</th></tr>
                    </thead>
                    <tbody>
                        ${lowStockItems.map(p => `
                            <tr>
                                <td>${escapeHtml(p.name)}</td>
                                <td class="mono">${escapeHtml(p.sku)}</td>
                                <td>${escapeHtml(p.category || "—")}</td>
                                <td><span class="tag tag-rust">${p.quantity} left</span></td>
                            </tr>
                        `).join("")}
                    </tbody>
                </table>
            </div>
        `;
    }
}

document.addEventListener("DOMContentLoaded", loadReports);
