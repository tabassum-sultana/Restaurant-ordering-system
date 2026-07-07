document.addEventListener("DOMContentLoaded", () => {
  const products = window.FooddeeData.products;
  const categoryList = document.querySelector("#categoryList");
  const menuProducts = document.querySelector("#menuProducts");
  const search = document.querySelector("#menuSearch");
  const params = new URLSearchParams(location.search);
  let activeCategory = params.get("category") || "All";

  if (params.get("q")) search.value = params.get("q");

  function renderCategories() {
    const categories = [{ name: "All", icon: "assets/icons/menu-list.png" }, ...window.FooddeeData.categories];
    categoryList.innerHTML = categories
      .map((category) => `
        <button type="button" class="${category.name === activeCategory ? "active" : ""}" data-category="${category.name}">
          <img src="${FooddeePaths.asset(category.icon)}" alt="" />${category.name}
        </button>
      `)
      .join("");
  }

  function renderProducts() {
    const query = search.value.trim().toLowerCase();
    const list = products.filter((product) => {
      const matchesCategory = activeCategory === "All" || product.category === activeCategory;
      const matchesSearch = product.name.toLowerCase().includes(query) || product.category.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });

    menuProducts.innerHTML = list.length
      ? list.map(productCard).join("")
      : `<div class="empty-state">No matching dishes found.</div>`;
  }

  categoryList.addEventListener("click", (event) => {
    const button = event.target.closest("[data-category]");
    if (!button) return;
    activeCategory = button.dataset.category;
    renderCategories();
    renderProducts();
  });

  search.addEventListener("input", renderProducts);
  renderCategories();
  renderProducts();
});
