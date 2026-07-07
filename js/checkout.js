document.addEventListener("DOMContentLoaded", () => {
  FooddeeCart.seedIfEmpty();
  const summary = document.querySelector("#checkoutSummary");
  const form = document.querySelector("#checkoutForm");

  function renderSummary() {
    const items = FooddeeCart.items();
    const totals = FooddeeCart.totals();
    summary.innerHTML = `
      <h2>Order Summary</h2>
      <div class="summary-items">
        ${items
          .map((item) => `
            <article class="mini-item">
              <img src="${FooddeePaths.asset(item.product.image)}" alt="${item.product.name}" />
              <div><h3>${item.product.name}</h3><div class="qty-control mini"><button type="button" data-delta="-1" data-id="${item.product.id}">-</button><strong>${item.qty}</strong><button type="button" data-delta="1" data-id="${item.product.id}">+</button></div></div>
              <strong>${FooddeeCart.money(item.product.price * item.qty)}</strong>
            </article>
          `)
          .join("")}
      </div>
      <div class="summary-total"><span>Subtotal</span><span>${FooddeeCart.money(totals.subtotal)}</span></div>
      <div class="summary-total"><span>Delivery Fee</span><span>${FooddeeCart.money(totals.delivery)}</span></div>
      <div class="summary-total grand"><strong>Total</strong><strong>${FooddeeCart.money(totals.total)}</strong></div>
      <div class="save-box"><img src="${FooddeePaths.asset("assets/icons/fresh-leaf.png")}" alt="" />Yay! You saved BDT 20 with Fooddee specials</div>
      <button class="btn btn-primary place-order" form="checkoutForm" type="submit"><img src="${FooddeePaths.asset("assets/icons/shopping-bag.png")}" alt="" />Place Order</button>
      <p class="secure-note"><img src="${FooddeePaths.asset("assets/icons/shield-check.png")}" alt="" />Safe & Secure Checkout</p>
    `;
  }

  summary.addEventListener("click", (event) => {
    const button = event.target.closest("[data-delta]");
    if (!button) return;
    FooddeeCart.update(button.dataset.id, Number(button.dataset.delta));
    renderSummary();
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const totals = FooddeeCart.totals();
    if (!totals.subtotal) {
      showToast("Add an item before checkout");
      return;
    }
    const payment = document.querySelector("input[name='payment']:checked")?.value || "bKash";
    FooddeeCart.saveOrder({
      id: "FD12345678",
      date: "May 20, 2025 - 12:45 PM",
      total: totals.total,
      payment,
      status: "Paid",
    });
    FooddeeCart.clear();
    location.href = FooddeePaths.page("success.html");
  });

  renderSummary();
});
