document.addEventListener("DOMContentLoaded", () => {
  const products = window.FooddeeData.products;
  const params = new URLSearchParams(location.search);
  const current = products.find((item) => item.id === params.get("id")) || products[0];
  const detail = document.querySelector("#productDetail");
  const related = document.querySelector("#relatedProducts");
  let qty = 1;

  document.title = `${current.name} - Fooddee`;
  document.querySelector("#productCrumb").textContent = current.name;
  document.querySelector("#productCategoryCrumb").textContent = current.category;

  detail.innerHTML = `
    <div class="product-gallery">
      <div class="gallery-main">
        <img class="gallery-bg" src="${FooddeePaths.asset("assets/decor/green-blob.png")}" alt="" />
        <img class="gallery-fries" src="${FooddeePaths.asset("assets/food/hero/hero-fries.png")}" alt="" />
        <img class="gallery-drink" src="${FooddeePaths.asset("assets/food/hero/hero-drink.png")}" alt="" />
        <img class="gallery-product" src="${FooddeePaths.asset(current.image)}" alt="${current.name}" />
        <button class="wish-floating" type="button" aria-label="Save product"><img src="${FooddeePaths.asset("assets/icons/heart.png")}" alt="" /></button>
      </div>
      <div class="thumb-row">
        <button class="active" type="button"><img src="${FooddeePaths.asset(current.image)}" alt="${current.name}" /></button>
        <button type="button"><img src="${FooddeePaths.asset("assets/food/hero/hero-burger.png")}" alt="Burger" /></button>
        <button type="button"><img src="${FooddeePaths.asset("assets/food/hero/hero-fries.png")}" alt="French fries" /></button>
        <button type="button"><img src="${FooddeePaths.asset("assets/food/hero/hero-drink.png")}" alt="Lime cooler" /></button>
      </div>
    </div>
    <div class="detail-info">
      <h1>${current.name}</h1>
      <div class="rating"><img src="${FooddeePaths.asset("assets/icons/star-filled.png")}" alt="" />${current.rating} <span>(${current.reviews} reviews)</span></div>
      <h2>${FooddeeCart.money(current.price)}</h2>
      <p>${current.desc}</p>
      <h3>Choose Size</h3>
      <div class="size-options">
        <button type="button" class="active">Regular<span>${FooddeeCart.money(current.price)}</span></button>
        <button type="button">Large<span>${FooddeeCart.money(current.price + 50)}</span></button>
        <button type="button">XL<span>${FooddeeCart.money(current.price + 100)}</span></button>
      </div>
      <h3>Add-ons <span>(Optional)</span></h3>
      <div class="addon-options">
        <button type="button">Extra Cheese <span>BDT 30</span><img src="${FooddeePaths.asset("assets/icons/plus.png")}" alt="" /></button>
        <button type="button">Bacon <span>BDT 40</span><img src="${FooddeePaths.asset("assets/icons/plus.png")}" alt="" /></button>
        <button type="button">Jalapenos <span>BDT 20</span><img src="${FooddeePaths.asset("assets/icons/plus.png")}" alt="" /></button>
      </div>
      <h3>Quantity</h3>
      <div class="detail-action-row">
        <div class="qty-control"><button type="button" id="minusQty">-</button><strong id="detailQty">1</strong><button type="button" id="plusQty">+</button></div>
        <button class="btn btn-primary" type="button" id="addDetail"><img src="${FooddeePaths.asset("assets/icons/cart.png")}" alt="" />Add to Cart</button>
        <button class="btn btn-secondary" type="button" id="saveProduct"><img src="${FooddeePaths.asset("assets/icons/heart.png")}" alt="" />Add to Wishlist</button>
      </div>
    </div>
  `;

  related.innerHTML = products
    .filter((item) => item.id !== current.id)
    .slice(0, 4)
    .map(productCard)
    .join("");

  detail.addEventListener("click", (event) => {
    const size = event.target.closest(".size-options button");
    const addon = event.target.closest(".addon-options button");
    if (size) {
      document.querySelectorAll(".size-options button").forEach((button) => button.classList.remove("active"));
      size.classList.add("active");
    }
    if (addon) {
      addon.classList.toggle("active");
    }
  });

  document.querySelector("#minusQty").addEventListener("click", () => {
    qty = Math.max(1, qty - 1);
    document.querySelector("#detailQty").textContent = qty;
  });
  document.querySelector("#plusQty").addEventListener("click", () => {
    qty += 1;
    document.querySelector("#detailQty").textContent = qty;
  });
  document.querySelector("#addDetail").addEventListener("click", () => {
    FooddeeCart.add(current.id, qty);
    showToast(`${current.name} added to cart`);
  });
  document.querySelector("#saveProduct").addEventListener("click", () => showToast("Saved to wishlist"));
});
