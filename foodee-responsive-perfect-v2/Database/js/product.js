document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(location.search);
  const id = params.get("id") || "burger";
  const product = FoodeeCart.product(id) || FoodeeCart.product("burger");
  const related = document.querySelector("#relatedProducts");
  const addButton = document.querySelector("#detailAddCart");

  document.querySelectorAll("[data-product-name]").forEach((el) => el.textContent = product.name);
  document.querySelectorAll("[data-product-price]").forEach((el) => el.textContent = FoodeeCart.money(product.price));
  document.querySelectorAll("[data-product-rating]").forEach((el) => el.textContent = product.rating);
  document.querySelectorAll("[data-product-reviews]").forEach((el) => el.textContent = `(${product.reviews} reviews)`);
  document.querySelectorAll("[data-product-desc]").forEach((el) => el.textContent = product.desc);
  const mainImage = document.querySelector("[data-product-image]");
  const productThumb = document.querySelector("[data-product-thumb]");
  if (mainImage) {
    mainImage.src = asset(product.image);
    mainImage.alt = product.name;
  }
  if (productThumb) {
    productThumb.src = asset(product.image);
    productThumb.alt = product.name;
  }
  addButton?.setAttribute("data-add-cart", product.id);
  if (related) related.innerHTML = FoodeeData.products.filter((item) => item.id !== product.id).slice(0, 4).map(productCard).join("");

  document.querySelectorAll(".thumb").forEach((thumb) => {
    thumb.addEventListener("click", () => {
      const image = thumb.querySelector("img");
      const main = document.querySelector("[data-product-image]");
      if (image && main) {
        main.src = image.src;
        main.alt = image.alt || product.name;
      }
      thumb.parentElement.querySelectorAll(".thumb").forEach((item) => item.classList.remove("active"));
      thumb.classList.add("active");
    });
  });

  document.querySelectorAll(".choice-card").forEach((card) => {
    card.addEventListener("click", () => {
      card.parentElement.querySelectorAll(".choice-card").forEach((item) => item.classList.remove("active"));
      card.classList.add("active");
    });
  });
});
