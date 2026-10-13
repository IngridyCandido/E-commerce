const products = [
  { id: "apple", name: "Apple", description: "Crisp, sweet apples, great for a snack.", price: 1.2, unit: "item", emoji: "🍎" },
  { id: "banana", name: "Banana", description: "Ripe, soft bananas, good for eating or recipes.", price: 0.6, unit: "item", emoji: "🍌" },
  { id: "orange", name: "Orange", description: "Juicy oranges with a fresh citrus flavor.", price: 0.9, unit: "item", emoji: "🍊" },
  { id: "strawberry", name: "Strawberry", description: "Sweet red strawberries, sold by the basket.", price: 4.5, unit: "basket (1 lb)", emoji: "🍓" },
  { id: "grapes", name: "Grapes", description: "Sweet, seedless grapes, sold by the pound.", price: 3.2, unit: "lb", emoji: "🍇" },
  { id: "watermelon", name: "Watermelon", description: "Refreshing watermelon, sold by the whole fruit.", price: 6, unit: "item", emoji: "🍉" },
  { id: "pineapple", name: "Pineapple", description: "Tropical pineapple with a sweet, slightly tart flavor.", price: 3.5, unit: "item", emoji: "🍍" },
  { id: "mango", name: "Mango", description: "Ripe, fragrant mangoes, sold individually.", price: 1.8, unit: "item", emoji: "🥭" },
  { id: "peach", name: "Peach", description: "Soft, fragrant peaches, sold individually.", price: 2, unit: "item", emoji: "🍑" },
  { id: "kiwi", name: "Kiwi", description: "Fresh kiwi with a green center and mildly tart flavor.", price: 0.75, unit: "item", emoji: "🥝" },
];

const currency = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });
const appView = document.querySelector("#app-view");
const cartCount = document.querySelector("#top-cart-count");
const navCartCount = document.querySelector("#nav-cart-count");
const detailsNavLink = document.querySelector('.nav-link[data-page="details"]');
const toast = document.querySelector("#toast");

const state = {
  cart: {},
  catalogQuantities: Object.fromEntries(products.map((product) => [product.id, 1])),
  selectedProductId: "apple",
  confirmation: false,
  toastTimer: null,
};

function productById(id) {
  return products.find((product) => product.id === id);
}

function cartQuantity() {
  return Object.values(state.cart).reduce((total, quantity) => total + quantity, 0);
}

function cartTotal() {
  return products.reduce((total, product) => total + product.price * (state.cart[product.id] || 0), 0);
}

function formatPrice(value) {
  return currency.format(value);
}

function readRoute() {
  const parts = window.location.hash.replace(/^#\/?/, "").split("/").filter(Boolean);
  if (parts[0] === "details") return { page: "details", productId: parts[1] || "" };
  if (["cart", "checkout"].includes(parts[0])) return { page: parts[0] };
  return { page: "products" };
}

function setActiveNavigation(page) {
  const activePage = page === "details" ? "details" : page;
  document.querySelectorAll(".nav-link").forEach((link) => {
    const active = link.dataset.page === activePage;
    link.classList.toggle("is-active", active);
    if (active) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });

  const quantity = cartQuantity();
  cartCount.textContent = String(quantity);
  navCartCount.textContent = String(quantity);
  navCartCount.hidden = quantity === 0;
  document.querySelector('.nav-link[data-page="cart"]').setAttribute(
    "aria-label",
    quantity === 0 ? "Shopping cart, empty" : `Shopping cart, ${quantity} ${quantity === 1 ? "item" : "items"}`,
  );
}

function pageHeading(eyebrow, title, description, trailing = "") {
  return `
    <section class="page-heading">
      <div>
        <p class="eyebrow">${eyebrow}</p>
        <h1>${title}</h1>
        <p class="heading-copy">${description}</p>
      </div>
      ${trailing}
    </section>`;
}

function productCard(product, index) {
  const quantity = state.catalogQuantities[product.id] || 1;
  return `
    <article class="product-card" style="--card-index: ${index}">
      <a class="product-art" href="#/details/${product.id}" aria-label="View ${product.name} details">${product.emoji}</a>
      <div class="product-meta">
        <div>
          <h2 class="product-name"><a href="#/details/${product.id}">${product.name}</a></h2>
          <p class="product-price"><strong>${formatPrice(product.price)}</strong> / ${product.unit}</p>
        </div>
        <a class="detail-link" href="#/details/${product.id}">Details</a>
      </div>
      <div class="product-actions">
        <div class="quantity-control">
          <button type="button" data-action="catalog-decrement" data-id="${product.id}" aria-label="Decrease ${product.name} quantity">−</button>
          <label class="sr-only" for="catalog-qty-${product.id}">${product.name} quantity</label>
          <input id="catalog-qty-${product.id}" data-catalog-quantity="${product.id}" type="number" min="1" step="1" value="${quantity}" inputmode="numeric">
          <button type="button" data-action="catalog-increment" data-id="${product.id}" aria-label="Increase ${product.name} quantity">+</button>
        </div>
        <button class="button button-primary" type="button" data-action="add-to-cart" data-id="${product.id}">Add to cart <span aria-hidden="true">+</span></button>
      </div>
    </article>`;
}

function renderProducts() {
  const trailing = `<div class="catalog-note"><strong>10</strong><span>good things in season</span></div>`;
  return `
    ${pageHeading("GOOD FOOD, GOOD MOOD", "A little more\nfruit in your day.", "Everyday favorites, picked for bright breakfasts and better snack breaks.", trailing)}
    <section class="product-grid" aria-label="Fruit products">
      ${products.map(productCard).join("")}
    </section>`;
}

function renderDetails(productId) {
  const product = productById(productId);
  if (!product) {
    return `
      ${pageHeading("PRODUCT DETAILS", "Fruit not found", "That product is not in this market.")}
      <section class="empty-state"><div class="empty-icon" aria-hidden="true">🍐</div><p>Choose a fruit from the catalog to see its details.</p><a class="button button-dark" href="#/products">Back to products</a></section>`;
  }

  return `
    ${pageHeading("PRODUCT DETAILS", product.name, "A little more about this market favorite.")}
    <section class="detail-layout">
      <div class="detail-art" aria-label="${product.name} emoji" role="img">${product.emoji}</div>
      <div class="detail-copy">
        <a class="back-link" href="#/products">← Back to products</a>
        <p class="eyebrow">FRESH FROM THE MARKET</p>
        <h1>${product.name}</h1>
        <p class="detail-description">${product.description}</p>
        <p class="detail-price"><strong>${formatPrice(product.price)}</strong> <span>/ ${product.unit}</span></p>
        <p class="detail-aside">A simple, seasonal favorite for your everyday table.</p>
      </div>
    </section>`;
}

function renderCart() {
  const items = products.filter((product) => state.cart[product.id]);
  if (items.length === 0) {
    return `
      ${pageHeading("YOUR BAG", "Shopping cart", "Your market picks will be collected here.")}
      <section class="empty-state">
        <div class="empty-icon" aria-hidden="true">🧺</div>
        <h2>Your cart is taking a little rest.</h2>
        <p>There is nothing in your bag yet. Browse the market and add something fresh.</p>
        <a class="button button-dark" href="#/products">Browse products</a>
      </section>`;
  }

  const rows = items.map((product) => {
    const quantity = state.cart[product.id];
    return `
      <article class="cart-row">
        <div class="cart-item">
          <span class="cart-emoji" aria-hidden="true">${product.emoji}</span>
          <div><h2 class="cart-item-name">${product.name}</h2></div>
        </div>
        <div class="cart-cell cart-unit-cell"><span class="cart-cell-label">Unit price</span><span class="cart-cell-value">${formatPrice(product.price)} / ${product.unit}</span></div>
        <div class="cart-cell cart-quantity-cell">
          <span class="cart-cell-label">Quantity</span>
          <div class="quantity-control">
            <button type="button" data-action="cart-decrement" data-id="${product.id}" aria-label="Decrease ${product.name} quantity">−</button>
            <label class="sr-only" for="cart-qty-${product.id}">${product.name} quantity</label>
            <input id="cart-qty-${product.id}" data-cart-quantity="${product.id}" type="number" min="0" step="1" value="${quantity}" inputmode="numeric">
            <button type="button" data-action="cart-increment" data-id="${product.id}" aria-label="Increase ${product.name} quantity">+</button>
          </div>
        </div>
        <div class="cart-cell cart-subtotal-cell"><span class="cart-cell-label">Subtotal</span><span class="cart-cell-value"><strong>${formatPrice(product.price * quantity)}</strong></span></div>
        <div class="cart-remove-cell"><button class="remove-button" type="button" data-action="remove-item" data-id="${product.id}" aria-label="Remove ${product.name} from cart">×</button></div>
      </article>`;
  }).join("");

  return `
    ${pageHeading("YOUR BAG", "Shopping cart", "A quick look at the good things you picked.")}
    <section class="cart-list" aria-label="Items in your shopping cart">${rows}</section>
    <section class="cart-summary">
      <div><p class="cart-total-label">Cart total</p><p class="cart-total">${formatPrice(cartTotal())}</p></div>
      <div class="cart-actions"><a class="button button-light" href="#/products">Continue shopping</a><a class="button button-dark" href="#/checkout">Proceed to checkout <span aria-hidden="true">→</span></a></div>
    </section>`;
}

function renderCheckout() {
  if (state.confirmation) {
    return `
      <section class="confirmation" aria-labelledby="confirmation-title">
        <div class="confirmation-mark" aria-hidden="true">✓</div>
        <p class="eyebrow">ORDER SIMULATED</p>
        <h1 id="confirmation-title">Thank you!</h1>
        <p>Your demo order was processed for <strong>${formatPrice(state.confirmationTotal)}</strong>. This was only a simulation; no payment was taken. Your cart is now clear.</p>
        <a class="button button-dark" href="#/products">Back to the market</a>
      </section>`;
  }

  const items = products.filter((product) => state.cart[product.id]);
  if (items.length === 0) {
    return `
      ${pageHeading("ALMOST THERE", "Checkout", "Your order summary will appear here.")}
      <section class="empty-state"><div class="empty-icon" aria-hidden="true">🧺</div><h2>Your cart is empty.</h2><p>Add a few market favorites before heading to checkout.</p><a class="button button-dark" href="#/products">Browse products</a></section>`;
  }

  const rows = items.map((product) => {
    const quantity = state.cart[product.id];
    return `
      <div class="checkout-row">
        <div class="checkout-product"><span class="checkout-product-emoji" aria-hidden="true">${product.emoji}</span><span class="checkout-product-name">${product.name}<span class="checkout-product-unit">${formatPrice(product.price)} / ${product.unit}</span></span></div>
        <span class="checkout-qty">× ${quantity}</span>
        <strong class="checkout-line-total">${formatPrice(product.price * quantity)}</strong>
      </div>`;
  }).join("");

  return `
    ${pageHeading("ALMOST THERE", "Checkout", "One last look at your market picks.")}
    <section class="checkout-layout">
      <div>
        <p class="eyebrow">ORDER SUMMARY</p>
        <div class="checkout-items">${rows}</div>
      </div>
      <aside class="summary-panel" aria-label="Order total">
        <h2>Your total</h2>
        <div class="summary-total-line"><span>Items (${cartQuantity()})</span><span>${formatPrice(cartTotal())}</span></div>
        <div class="summary-total-line grand"><span>Total</span><strong>${formatPrice(cartTotal())}</strong></div>
        <button class="button button-primary" type="button" data-action="process-order">Process order <span aria-hidden="true">→</span></button>
        <p class="summary-footnote">Demo only. No address or payment details needed.</p>
      </aside>
    </section>`;
}

function render({ focusHeading = false } = {}) {
  const activeControl = appView.contains(document.activeElement)
    ? document.activeElement.closest("[data-action], [data-catalog-quantity], [data-cart-quantity]")
    : null;
  const focusSelector = activeControl?.hasAttribute("data-action")
    ? `[data-action="${activeControl.dataset.action}"][data-id="${activeControl.dataset.id}"]`
    : activeControl?.hasAttribute("data-catalog-quantity")
      ? `[data-catalog-quantity="${activeControl.dataset.catalogQuantity}"]`
      : activeControl?.hasAttribute("data-cart-quantity")
        ? `[data-cart-quantity="${activeControl.dataset.cartQuantity}"]`
        : null;
  const route = readRoute();
  if (route.page === "details" && productById(route.productId)) {
    state.selectedProductId = route.productId;
  }
  detailsNavLink.href = `#/details/${state.selectedProductId}`;
  setActiveNavigation(route.page);
  if (route.page !== "checkout") state.confirmation = false;

  if (route.page === "details") appView.innerHTML = renderDetails(route.productId);
  else if (route.page === "cart") appView.innerHTML = renderCart();
  else if (route.page === "checkout") appView.innerHTML = renderCheckout();
  else appView.innerHTML = renderProducts();

  if (focusHeading || (focusSelector && !appView.querySelector(focusSelector))) {
    const heading = appView.querySelector("h1");
    heading?.setAttribute("tabindex", "-1");
    heading?.focus({ preventScroll: true });
  } else if (focusSelector) {
    appView.querySelector(focusSelector)?.focus({ preventScroll: true });
  }
}

function showToast(message) {
  window.clearTimeout(state.toastTimer);
  toast.textContent = message;
  toast.hidden = false;
  state.toastTimer = window.setTimeout(() => { toast.hidden = true; }, 2400);
}

function updateCartQuantity(id, quantity) {
  const nextQuantity = Number.parseInt(quantity, 10);
  if (!Number.isFinite(nextQuantity) || nextQuantity <= 0) delete state.cart[id];
  else state.cart[id] = nextQuantity;
  render();
}

appView.addEventListener("click", (event) => {
  const button = event.target.closest("[data-action]");
  if (!button) return;

  const { action, id } = button.dataset;
  if (action === "add-to-cart") {
    const input = appView.querySelector(`[data-catalog-quantity="${id}"]`);
    const quantity = Math.max(1, Number.parseInt(input?.value, 10) || 1);
    state.catalogQuantities[id] = quantity;
    state.cart[id] = (state.cart[id] || 0) + quantity;
    render();
    showToast(`${productById(id).name} added to your bag`);
  } else if (action === "catalog-increment" || action === "catalog-decrement") {
    const input = appView.querySelector(`[data-catalog-quantity="${id}"]`);
    const current = Number.parseInt(input.value, 10) || 1;
    input.value = String(Math.max(1, current + (action === "catalog-increment" ? 1 : -1)));
    state.catalogQuantities[id] = Number.parseInt(input.value, 10);
  } else if (action === "cart-increment" || action === "cart-decrement") {
    const current = state.cart[id] || 0;
    updateCartQuantity(id, current + (action === "cart-increment" ? 1 : -1));
  } else if (action === "remove-item") {
    delete state.cart[id];
    render();
    showToast(`${productById(id).name} removed from your bag`);
  } else if (action === "process-order" && cartQuantity() > 0) {
    state.confirmationTotal = cartTotal();
    state.cart = {};
    state.confirmation = true;
    render();
  }
});

appView.addEventListener("change", (event) => {
  const input = event.target;
  if (input.matches("[data-catalog-quantity]")) {
    const id = input.dataset.catalogQuantity;
    const quantity = Math.max(1, Number.parseInt(input.value, 10) || 1);
    state.catalogQuantities[id] = quantity;
    input.value = String(quantity);
  } else if (input.matches("[data-cart-quantity]")) {
    updateCartQuantity(input.dataset.cartQuantity, input.value);
  }
});

window.addEventListener("hashchange", () => {
  state.confirmation = false;
  render({ focusHeading: true });
});

if (!window.location.hash) window.location.hash = "#/products";
render();