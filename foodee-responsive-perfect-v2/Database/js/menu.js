document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelector("#categoryList");
  const grid = document.querySelector("#menuProducts");
  const search = document.querySelector("#menuSearch");
  const params = new URLSearchParams(location.search);
  let currentCategory = params.get("category") || "All";
  let query = params.get("q") || "";
  if (search) search.value = query;

  function renderTabs() {
    if (!tabs) return;
    const allTab = categoryTab("All", "assets/icons/menu-list.png", currentCategory === "All");
    const catTabs = FoodeeData.categories.map((cat) => categoryTab(cat.name, cat.icon, currentCategory === cat.name)).join("");
    tabs.innerHTML = allTab + catTabs;
  }

  function renderProducts() {
    if (!grid) return;
    const q = query.toLowerCase();
    const products = FoodeeData.products.filter((product) => {
      const byCat = currentCategory === "All" || product.category === currentCategory;
      const byQuery = !q || `${product.name} ${product.category} ${product.desc}`.toLowerCase().includes(q);
      return byCat && byQuery;
    });
    grid.innerHTML = products.length ? products.map(productCard).join("") : `<div class="empty-state">No dishes found.</div>`;
  }

  renderTabs();
  renderProducts();
  tabs?.addEventListener("click", (event) => {
    const button = event.target.closest(".menu-tab");
    if (!button) return;
    currentCategory = button.dataset.category;
    renderTabs();
    renderProducts();
  });
  search?.addEventListener("input", () => {
    query = search.value.trim();
    renderProducts();
  });
});
