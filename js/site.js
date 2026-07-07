function showToast(message) {
  const toast = document.querySelector("#toast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("show"), 1600);
}

const FooddeePaths = (() => {
  return {
    asset(path) {
      return path;
    },
    page(path) {
      return `HTML/${path}`;
    },
    home() {
      return "index.html";
    },
  };
})();

function mountFooter() {
  const footer = document.querySelector(".site-footer");
  if (!footer) return;
  footer.innerHTML = `
    <div class="footer-inner">
      <div class="footer-brand">
        <a class="footer-logo" href="${FooddeePaths.home()}"><img src="${FooddeePaths.asset("assets/brand/logo.png")}" alt="Fooddee" /></a>
        <p>Fooddee brings your favorite food from top restaurants to your doorstep-fast, fresh and always delicious.</p>
        <div class="social-links">
          <img src="${FooddeePaths.asset("assets/social/facebook.png")}" alt="Facebook" />
          <img src="${FooddeePaths.asset("assets/social/instagram.png")}" alt="Instagram" />
          <img src="${FooddeePaths.asset("assets/social/twitter.png")}" alt="Twitter" />
          <img src="${FooddeePaths.asset("assets/social/whatsapp.png")}" alt="WhatsApp" />
        </div>
      </div>
      <nav class="footer-links" aria-label="Quick links">
        <h3>Quick Links</h3>
        <a href="${FooddeePaths.home()}">Home</a>
        <a href="${FooddeePaths.page("menu.html")}">Menu</a>
        <a href="${FooddeePaths.page("about.html")}">About Us</a>
        <a href="${FooddeePaths.page("contact.html")}">Contact Us</a>
        <a href="${FooddeePaths.page("contact.html")}">FAQs</a>
      </nav>
      <div class="footer-contact">
        <h3>Contact Us</h3>
        <p><img src="${FooddeePaths.asset("assets/icons/phone-circle.png")}" alt="" />+880 1712 345 678</p>
        <p><img src="${FooddeePaths.asset("assets/contact/email.png")}" alt="" />hello@fooddee.com</p>
        <p><img src="${FooddeePaths.asset("assets/icons/location-pin.png")}" alt="" />123 Food Street,<br />Dhaka 1205, Bangladesh</p>
      </div>
      <div class="footer-payments">
        <h3>We Accept</h3>
        <div class="payment-links">
          <span>VISA</span>
          <img src="${FooddeePaths.asset("assets/payments/mastercard.png")}" alt="Mastercard" />
          <img src="${FooddeePaths.asset("assets/payments/bkash.png")}" alt="bKash" />
          <img src="${FooddeePaths.asset("assets/payments/nagad.png")}" alt="Nagad" />
        </div>
      </div>
    </div>
    <div class="footer-bottom"><p>&copy; 2025 Fooddee. All rights reserved.</p></div>
  `;
}

function mountAuth() {
  const mount = document.querySelector("#authMount");
  if (!mount) return;
  mount.innerHTML = `
    <div class="modal-backdrop" id="authModal" aria-hidden="true">
      <section class="auth-dialog" role="dialog" aria-modal="true" aria-label="Account">
        <button class="close-modal" type="button" data-close-auth aria-label="Close">x</button>
        <div class="auth-panel" id="signInPanel">
          <img class="auth-logo" src="${FooddeePaths.asset("assets/brand/logo.png")}" alt="Fooddee" />
          <h2>Welcome Back</h2>
          <p>Sign in to continue ordering your favorite food</p>
          <form id="signInForm">
            <label class="input-icon"><img src="${FooddeePaths.asset("assets/icons/mail.png")}" alt="" /><input type="text" placeholder="Email or Phone" required /></label>
            <label class="input-icon"><img src="${FooddeePaths.asset("assets/icons/lock.png")}" alt="" /><input type="password" placeholder="Password" required /><img src="${FooddeePaths.asset("assets/icons/eye.png")}" alt="" /></label>
            <a class="forgot-link" href="${FooddeePaths.page("contact.html")}">Forgot Password?</a>
            <button class="btn btn-primary" type="submit"><img src="${FooddeePaths.asset("assets/icons/user.png")}" alt="" />Sign In</button>
          </form>
          <div class="divider"><span>or continue with</span></div>
          <div class="social-auth"><button type="button">G Google</button><button type="button"><img src="${FooddeePaths.asset("assets/social/facebook.png")}" alt="" />Facebook</button><button type="button"><img src="${FooddeePaths.asset("assets/payments/apple.png")}" alt="" />Apple</button></div>
          <p>Don't have an account? <button type="button" id="switchToSignUp">Create Account</button></p>
        </div>
        <div class="auth-panel hidden" id="signUpPanel">
          <img class="auth-logo" src="${FooddeePaths.asset("assets/brand/logo.png")}" alt="Fooddee" />
          <h2>Create Account</h2>
          <p>Join Fooddee and enjoy delicious food delivered fast to your doorstep.</p>
          <form id="signUpForm">
            <label class="input-icon"><img src="${FooddeePaths.asset("assets/icons/user.png")}" alt="" /><input type="text" placeholder="Full Name" required /></label>
            <label class="input-icon"><img src="${FooddeePaths.asset("assets/icons/mail.png")}" alt="" /><input type="text" placeholder="Email or Phone Number" required /></label>
            <label class="input-icon"><img src="${FooddeePaths.asset("assets/icons/lock.png")}" alt="" /><input type="password" placeholder="Password" required /><img src="${FooddeePaths.asset("assets/icons/eye-off.png")}" alt="" /></label>
            <label class="input-icon"><img src="${FooddeePaths.asset("assets/icons/lock.png")}" alt="" /><input type="password" placeholder="Confirm Password" required /><img src="${FooddeePaths.asset("assets/icons/eye.png")}" alt="" /></label>
            <label class="check-label"><input type="checkbox" required /> I agree to the <span>Terms & Conditions</span> and <span>Privacy Policy</span></label>
            <button class="btn btn-primary" type="submit">Create Account</button>
          </form>
          <div class="divider"><span>or continue with</span></div>
          <div class="social-auth"><button type="button">G Google</button><button type="button"><img src="${FooddeePaths.asset("assets/social/facebook.png")}" alt="" />Facebook</button><button type="button"><img src="${FooddeePaths.asset("assets/payments/apple.png")}" alt="" />Apple</button></div>
          <p>Already have an account? <button type="button" id="switchToSignIn">Sign In</button></p>
        </div>
      </section>
    </div>
  `;
}

function openAuth(showSignUp = false) {
  const modal = document.querySelector("#authModal");
  if (!modal) return;
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.querySelector("#signInPanel")?.classList.toggle("hidden", showSignUp);
  document.querySelector("#signUpPanel")?.classList.toggle("hidden", !showSignUp);
}

function closeAuth() {
  const modal = document.querySelector("#authModal");
  if (!modal) return;
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
}

function productCard(product) {
  return `
    <article class="product-card">
      <button class="wish-btn" type="button" aria-label="Save ${product.name}"><img src="${FooddeePaths.asset("assets/icons/heart.png")}" alt="" /></button>
      <a class="product-image-link" href="${FooddeePaths.page(`product.html?id=${product.id}`)}" aria-label="View ${product.name}">
        <img class="product-image" src="${FooddeePaths.asset(product.image)}" alt="${product.name}" />
      </a>
      <div class="product-body">
        <h3>${product.name}</h3>
        <p>${product.desc}</p>
        <div class="product-bottom">
          <span class="rating"><img src="${FooddeePaths.asset("assets/icons/star-filled.png")}" alt="" />${product.rating}</span>
          <strong>${FooddeeCart.money(product.price)}</strong>
          <button class="add-cart" type="button" data-add-cart="${product.id}" aria-label="Add ${product.name}"><img src="${FooddeePaths.asset("assets/icons/plus.png")}" alt="" /></button>
        </div>
      </div>
    </article>
  `;
}

document.addEventListener("DOMContentLoaded", () => {
  mountFooter();
  mountAuth();
  FooddeeCart.updateCount();

  document.addEventListener("click", (event) => {
    const add = event.target.closest("[data-add-cart]");
    if (add) {
      FooddeeCart.add(add.dataset.addCart);
      showToast("Added to cart");
    }
  });

  document.querySelectorAll("[data-open-auth]").forEach((button) => {
    button.addEventListener("click", () => openAuth(false));
  });

  document.addEventListener("click", (event) => {
    if (event.target.matches("[data-close-auth]") || event.target.id === "authModal") closeAuth();
  });

  document.querySelector("#switchToSignUp")?.addEventListener("click", () => openAuth(true));
  document.querySelector("#switchToSignIn")?.addEventListener("click", () => openAuth(false));
  document.querySelector("#signInForm")?.addEventListener("submit", (event) => {
    event.preventDefault();
    closeAuth();
    showToast("Signed in successfully");
  });
  document.querySelector("#signUpForm")?.addEventListener("submit", (event) => {
    event.preventDefault();
    closeAuth();
    showToast("Account created");
  });

  document.querySelector("#globalSearch")?.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") return;
    event.preventDefault();
    const query = event.currentTarget.value.trim();
    location.href = `${FooddeePaths.page("menu.html")}${query ? `?q=${encodeURIComponent(query)}` : ""}`;
  });
});
