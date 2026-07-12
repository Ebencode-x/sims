document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("add-product-form");
    const message = document.getElementById("form-message");
    const submitBtn = document.getElementById("submit-btn");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const product = {
            name: document.getElementById("name").value,
            sku: document.getElementById("sku").value,
            quantity: document.getElementById("quantity").value,
            price: document.getElementById("price").value,
            category: document.getElementById("category").value
        };

        message.className = "form-message";
        message.textContent = "";
        submitBtn.disabled = true;
        submitBtn.textContent = "Saving...";

        try {
            await createProduct(product);
            message.className = "form-message is-success";
            message.textContent = `"${product.name}" was added to inventory.`;
            form.reset();
        } catch (err) {
            message.className = "form-message is-error";
            message.textContent = err.message;
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = "Save Product";
        }
    });
});
