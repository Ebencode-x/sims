let allProducts = [];

async function loadInventory() {
    try {
        allProducts = await fetchProducts();
    } catch (err) {
        document.getElementById("product-table-body").innerHTML = "";
        document.getElementById("empty-state-wrap").innerHTML =
            `<div class="empty-state"><p>Could not load inventory. Is the server running?</p></div>`;
        return;
    }
    populateCategoryFilter();
    renderTable();
}

function populateCategoryFilter() {
    const select = document.getElementById("category-filter");
    const current = select.value;
    const categories = [...new Set(allProducts.map(p => p.category).filter(Boolean))].sort();

    select.innerHTML = `<option value="">All categories</option>` +
        categories.map(c => `<option value="${escapeHtml(c)}">${escapeHtml(c)}</option>`).join("");

    select.value = current;
}

function renderTable() {
    const body = document.getElementById("product-table-body");
    const emptyWrap = document.getElementById("empty-state-wrap");

    const query = document.getElementById("search-input").value.trim().toLowerCase();
    const category = document.getElementById("category-filter").value;

    const filtered = allProducts.filter(p => {
        const matchesQuery = !query ||
            p.name.toLowerCase().includes(query) ||
            p.sku.toLowerCase().includes(query);
        const matchesCategory = !category || p.category === category;
        return matchesQuery && matchesCategory;
    });

    if (filtered.length === 0) {
        body.innerHTML = "";
        document.getElementById("results-count").textContent = "";
        emptyWrap.innerHTML = `
            <div class="empty-state">
                <div class="stamp stamp-rust">No Matches</div>
                <p>No products match your search. Try a different name, SKU, or category.</p>
            </div>
        `;
        return;
    }

    emptyWrap.innerHTML = "";
    document.getElementById("results-count").textContent =
        filtered.length === allProducts.length
            ? `${filtered.length} product${filtered.length === 1 ? "" : "s"} on record`
            : `Showing ${filtered.length} of ${allProducts.length} products`;

    body.innerHTML = filtered.map(p => `
        <tr>
            <td data-label="Product">${escapeHtml(p.name)}</td>
            <td class="mono" data-label="SKU">${escapeHtml(p.sku)}</td>
            <td data-label="Category">${escapeHtml(p.category || "—")}</td>
            <td class="mono" data-label="Quantity">${p.quantity}</td>
            <td class="mono" data-label="Price">$${formatCurrency(p.price)}</td>
            <td data-label="Status">${isLowStock(p)
                ? `<span class="tag tag-rust">Low</span>`
                : `<span class="tag tag-moss">Healthy</span>`}</td>
            <td data-label="">
                <div class="row-actions">
                    <button class="btn btn-ghost btn-sm" onclick="openEditModal(${p.id})">Edit</button>
                    <button class="btn btn-danger btn-sm" onclick="handleDelete(${p.id}, '${escapeHtml(p.name)}')">Delete</button>
                </div>
            </td>
        </tr>
    `).join("");
}

function openEditModal(id) {
    const product = allProducts.find(p => p.id === id);
    if (!product) return;

    document.getElementById("edit-id").value = product.id;
    document.getElementById("edit-name").value = product.name;
    document.getElementById("edit-sku").value = product.sku;
    document.getElementById("edit-quantity").value = product.quantity;
    document.getElementById("edit-price").value = product.price;
    document.getElementById("edit-category").value = product.category || "";

    document.getElementById("edit-modal").classList.add("is-open");
}

function closeEditModal() {
    document.getElementById("edit-modal").classList.remove("is-open");
}

async function handleDelete(id, name) {
    if (!confirm(`Remove "${name}" from inventory? This cannot be undone.`)) return;
    try {
        await deleteProduct(id);
        await loadInventory();
    } catch (err) {
        alert(err.message);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    loadInventory();

    document.getElementById("search-input").addEventListener("input", renderTable);
    document.getElementById("category-filter").addEventListener("change", renderTable);
    document.getElementById("edit-cancel").addEventListener("click", closeEditModal);

    document.getElementById("edit-form").addEventListener("submit", async (e) => {
        e.preventDefault();
        const id = document.getElementById("edit-id").value;
        const product = {
            name: document.getElementById("edit-name").value,
            sku: document.getElementById("edit-sku").value,
            quantity: document.getElementById("edit-quantity").value,
            price: document.getElementById("edit-price").value,
            category: document.getElementById("edit-category").value
        };

        try {
            await updateProduct(id, product);
            closeEditModal();
            await loadInventory();
        } catch (err) {
            alert(err.message);
        }
    });
});
