document.addEventListener("DOMContentLoaded", () => {
  const order = FooddeeCart.lastOrder() || {
    id: "FD12345678",
    date: "May 20, 2025 - 12:45 PM",
    total: 548,
    payment: "bKash",
    status: "Paid",
  };
  document.querySelector("#orderFacts").innerHTML = `
    <article><img src="${FooddeePaths.asset("assets/icons/receipt-check.png")}" alt="" /><span>Order ID</span><strong>${order.id}</strong></article>
    <article><img src="${FooddeePaths.asset("assets/icons/calendar.png")}" alt="" /><span>Date</span><strong>${order.date}</strong></article>
    <article><img src="${FooddeePaths.asset("assets/payments/cash-hand.png")}" alt="" /><span>Total Amount</span><strong>${FooddeeCart.money(order.total)}</strong></article>
    <article><img src="${FooddeePaths.asset("assets/payments/card.png")}" alt="" /><span>Payment Method</span><strong>${order.payment}</strong></article>
    <article><img src="${FooddeePaths.asset("assets/icons/menu-list.png")}" alt="" /><span>Payment Status</span><strong>${order.status || "Paid"}</strong></article>
  `;
});
