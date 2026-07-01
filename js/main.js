const cartCount = document.querySelector('#cartCount');
const searchInput = document.querySelector('#searchInput');
const dishCards = Array.from(document.querySelectorAll('.dish-card'));
const categoryButtons = Array.from(document.querySelectorAll('.category-card'));
const subscribeForm = document.querySelector('#subscribeForm');
let cartTotal = Number(cartCount.textContent) || 0;

function showToast(message) {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  document.body.appendChild(toast);

  window.setTimeout(() => toast.remove(), 2200);
}

function filterDishes(query) {
  const keyword = query.trim().toLowerCase();
  dishCards.forEach((card) => {
    const name = card.dataset.name.toLowerCase();
    const category = card.dataset.category.toLowerCase();
    const match = !keyword || name.includes(keyword) || category.includes(keyword);
    card.classList.toggle('hidden', !match);
  });
}

document.querySelectorAll('.add-to-cart').forEach((button) => {
  button.addEventListener('click', () => {
    cartTotal += 1;
    cartCount.textContent = cartTotal;
    showToast('Added to cart');
  });
});

categoryButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const active = button.classList.contains('is-active');
    categoryButtons.forEach((item) => item.classList.remove('is-active'));

    if (active) {
      filterDishes('');
      return;
    }

    button.classList.add('is-active');
    filterDishes(button.dataset.category);
  });
});

searchInput.addEventListener('input', (event) => {
  categoryButtons.forEach((item) => item.classList.remove('is-active'));
  filterDishes(event.target.value);
});

subscribeForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const email = subscribeForm.querySelector('input').value.trim();
  if (!email) return;
  showToast('Subscription saved');
  subscribeForm.reset();
});

document.querySelector('[data-action="order-now"]').addEventListener('click', () => {
  document.querySelector('#menu').scrollIntoView({ behavior: 'smooth' });
});
