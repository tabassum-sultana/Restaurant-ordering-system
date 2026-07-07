document.addEventListener("DOMContentLoaded", () => {
  const products = document.querySelector("#checkoutProducts");
  const subtotal = document.querySelector("#checkoutSubtotal");
  const delivery = document.querySelector("#checkoutDelivery");
  const discount = document.querySelector("#checkoutDiscount");
  const total = document.querySelector("#checkoutTotal");
  const form = document.querySelector("#checkoutForm");

  function render() {
    const items = FoodeeCart.items();
    if (products) {
      products.innerHTML = items.map(({ product, qty }) => `
        <article>
          <img src="${asset(product.image)}" alt="${product.name}" />
          <div><h3>${product.name}</h3><div class="qty-control"><button type="button" data-update-cart="${product.id}" data-delta="-1">−</button><span>${qty}</span><button type="button" data-update-cart="${product.id}" data-delta="1">+</button></div></div>
          <strong class="price">${FoodeeCart.money(product.price * qty)}</strong>
        </article>`).join("");
    }
    const totals = FoodeeCart.totals();
    subtotal.textContent = FoodeeCart.money(totals.subtotal);
    delivery.textContent = FoodeeCart.money(totals.delivery);
    discount.textContent = `- ${FoodeeCart.money(totals.discount)}`;
    total.textContent = FoodeeCart.money(totals.total);
    FoodeeCart.updateCount();
  }

  products?.addEventListener("click", (event) => {
    const update = event.target.closest("[data-update-cart]");
    if (!update) return;
    FoodeeCart.update(update.dataset.updateCart, Number(update.dataset.delta));
    render();
  });

  document.querySelectorAll(".payment-option").forEach((option) => {
    option.addEventListener("click", () => {
      document.querySelectorAll(".payment-option").forEach((item) => item.classList.remove("active"));
      option.classList.add("active");
    });
  });

  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    const totals = FoodeeCart.totals();
    FoodeeCart.saveOrder({ total: totals.total, method: document.querySelector(".payment-option.active h3")?.textContent || "bKash", status: "Paid", createdAt: new Date().toISOString() });
    FoodeeCart.clear();
    location.href = page("success.html");
  });

  render();
});
