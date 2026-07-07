document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("#contactForm")?.addEventListener("submit", (event) => {
    event.preventDefault();
    event.currentTarget.reset();
    showToast("Message sent");
  });
});
