document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("add-product-form");
    const message = document.getElementById("form-message");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const product = {
            name: document.getElementById("name").value,
            sku: document.getElementById("sku").value,
            quantity: document.getElementById("quantity").value,
            price: document.getElementById("price").value,
            category: document.getElementById("category").value
        };

        try {
            await createProduct(product);
            message.style.color = "var(--moss)";
            message.textContent = `"${product.name}" was added to inventory.`;
            form.reset();
        } catch (err) {
            message.style.color = "var(--rust)";
            message.textContent = err.message;
        }
    });
});
