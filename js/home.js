document.addEventListener("DOMContentLoaded", () => {
  const categories = document.querySelector("#homeCategories");
  const picks = document.querySelector("#homePicks");

  if (categories) {
    categories.innerHTML = window.FooddeeData.categories
      .map((category) => `
        <a class="category-card" href="${FooddeePaths.page(`menu.html?category=${encodeURIComponent(category.name)}`)}">
          <img src="${FooddeePaths.asset(category.icon)}" alt="" />
          <span>${category.name}</span>
        </a>
      `)
      .join("");
  }

  if (picks) {
    picks.innerHTML = ["burger", "pizza", "pasta", "cake"]
      .map((id) => window.FooddeeData.products.find((product) => product.id === id))
      .filter(Boolean)
      .map(productCard)
      .join("");
  }
});
