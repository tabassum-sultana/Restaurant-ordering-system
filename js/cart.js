const FooddeeCart = (() => {
  const key = "fooddee-cart";
  const orderKey = "fooddee-last-order";

  function read() {
    try {
      return JSON.parse(localStorage.getItem(key)) || [];
    } catch {
      return [];
    }
  }

  function write(cart) {
    localStorage.setItem(key, JSON.stringify(cart));
    updateCount();
  }

  function seedIfEmpty() {
    if (read().length) return;
    write(window.FooddeeData.initialCart.map((item) => ({ ...item })));
  }

  function add(id, qty = 1) {
    const cart = read();
    const found = cart.find((item) => item.id === id);
    if (found) found.qty += qty;
    else cart.push({ id, qty });
    write(cart);
  }

  function update(id, delta) {
    const next = read()
      .map((item) => (item.id === id ? { ...item, qty: item.qty + delta } : item))
      .filter((item) => item.qty > 0);
    write(next);
  }

  function remove(id) {
    write(read().filter((item) => item.id !== id));
  }

  function clear() {
    write([]);
  }

  function product(id) {
    return window.FooddeeData.products.find((item) => item.id === id);
  }

  function items() {
    return read()
      .map((item) => ({ ...item, product: product(item.id) }))
      .filter((item) => item.product);
  }

  function totals() {
    const subtotal = items().reduce((sum, item) => sum + item.product.price * item.qty, 0);
    const delivery = subtotal ? 29 : 0;
    return { subtotal, delivery, total: subtotal + delivery };
  }

  function money(value) {
    return `BDT ${Math.round(value)}`;
  }

  function updateCount() {
    const count = read().reduce((sum, item) => sum + item.qty, 0);
    document.querySelectorAll("[data-cart-count]").forEach((node) => {
      node.textContent = count;
    });
  }

  function saveOrder(order) {
    localStorage.setItem(orderKey, JSON.stringify(order));
  }

  function lastOrder() {
    try {
      return JSON.parse(localStorage.getItem(orderKey));
    } catch {
      return null;
    }
  }

  return { add, clear, items, lastOrder, money, product, read, remove, saveOrder, seedIfEmpty, totals, update, updateCount };
})();
