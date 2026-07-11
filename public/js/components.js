// Builds the sidebar, topbar and footer that every app page shares.
// Each protected HTML page needs an empty <aside id="sidebar">,
// <header id="topbar"> and <footer id="page-footer">, plus a
// <main id="page-content" data-title="..." data-subtitle="..."> wrapper.

const NAV_ITEMS = [
    { href: "dashboard.html", label: "Dashboard", icon: "01" },
    { href: "products.html", label: "Inventory", icon: "02" },
    { href: "add-product.html", label: "Add Product", icon: "03" },
    { href: "reports.html", label: "Reports", icon: "04" }
];

function currentPage() {
    const path = window.location.pathname.split("/").pop();
    return path === "" ? "dashboard.html" : path;
}

function renderSidebar() {
    const sidebar = document.getElementById("sidebar");
    if (!sidebar) return;

    const active = currentPage();

    const links = NAV_ITEMS.map(item => `
        <a class="nav-link ${item.href === active ? "active" : ""}" href="${item.href}">
            <span class="nav-icon">${item.icon}</span>
            <span>${item.label}</span>
        </a>
    `).join("");

    sidebar.innerHTML = `
        <div class="brand">
            <div class="brand-mark">SI</div>
            <div class="brand-text">SIMS
                <small>Smart Inventory</small>
            </div>
        </div>
        <div class="nav-group">
            <div class="nav-label">Manage</div>
            ${links}
        </div>
        <div class="sidebar-footer" id="sidebar-footer">
            IT 8114 &middot; Software Engineering<br>
            Final Project &middot; Team Build
        </div>
    `;
}

function renderTopbar() {
    const topbar = document.getElementById("topbar");
    const content = document.getElementById("page-content");
    if (!topbar || !content) return;

    const title = content.dataset.title || "";
    const subtitle = content.dataset.subtitle || "";

    topbar.innerHTML = `
        <div>
            <h1>${title}</h1>
            ${subtitle ? `<div class="topbar-subtitle">${subtitle}</div>` : ""}
        </div>
        <div class="topbar-right" id="topbar-actions"></div>
    `;
}

function renderFooter() {
    const footer = document.getElementById("page-footer");
    if (!footer) return;

    footer.innerHTML = `Smart Inventory Management System &middot; built on Node.js, Express &amp; SQLite`;
}

document.addEventListener("DOMContentLoaded", () => {
    renderSidebar();
    renderTopbar();
    renderFooter();
});
