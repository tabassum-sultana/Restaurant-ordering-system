document.addEventListener("DOMContentLoaded", () => {
  FooddeeCart.seedIfEmpty();
  const list = document.querySelector("#cartList");
  const summary = document.querySelector("#cartSummary");

  function renderCart() {
    const items = FooddeeCart.items();
    const totals = FooddeeCart.totals();

    list.innerHTML = items.length
      ? items
          .map((item) => `
            <article class="cart-item">
              <img src="${FooddeePaths.asset(item.product.image)}" alt="${item.product.name}" />
              <div class="cart-item-copy">
                <h3>${item.product.name}</h3>
                <p>${item.product.desc}</p>
                <strong>${FooddeeCart.money(item.product.price)}</strong>
              </div>
              <div class="qty-control"><button type="button" data-delta="-1" data-id="${item.product.id}">−</button><strong>${item.qty}</strong><button type="button" data-delta="1" data-id="${item.product.id}">+</button></div>
              <button class="remove-item" type="button" data-remove="${item.product.id}" aria-label="Remove ${item.product.name}"><img src="${FooddeePaths.asset("assets/icons/trash.png")}" alt="" /></button>
            </article>
          `)
          .join("")
      : `<div class="empty-state">Your cart is empty. Add something delicious from the menu.</div>`;

    summary.innerHTML = `
      <h2>Order Summary</h2>
      <div><span>Subtotal (${items.reduce((sum, item) => sum + item.qty, 0)} items)</span><strong>${FooddeeCart.money(totals.subtotal)}</strong></div>
      <div><span>Delivery Fee</span><strong>${FooddeeCart.money(totals.delivery)}</strong></div>
      <div class="grand"><span>Total</span><strong>${FooddeeCart.money(totals.total)}</strong></div>
      <form class="promo-form"><input type="text" placeholder="Enter promo code" /><button type="submit">Apply</button></form>
      <a class="btn btn-primary checkout-link" href="${FooddeePaths.page("checkout.html")}"><img src="${FooddeePaths.asset("assets/icons/lock.png")}" alt="" />Proceed to Checkout</a>
      <p><img src="${FooddeePaths.asset("assets/icons/shield-check.png")}" alt="" />Secure checkout. Your data is safe with us.</p>
    `;
  }

  list.addEventListener("click", (event) => {
    const delta = event.target.closest("[data-delta]");
    const remove = event.target.closest("[data-remove]");
    if (delta) FooddeeCart.update(delta.dataset.id, Number(delta.dataset.delta));
    if (remove) FooddeeCart.remove(remove.dataset.remove);
    renderCart();
  });

  summary.addEventListener("submit", (event) => {
    event.preventDefault();
    showToast("Promo applied");
  });

  renderCart();
});
