let cart = [];

function addToCart(item, price) {
  cart.push({ item, price });
  updateCart();
}

function removeFromCart(index) {
  cart.splice(index, 1); // Remove item by index
  updateCart();
}

function updateCart() {
  const cartItems = document.getElementById("cart-items");
  const totalEl = document.getElementById("total");
  cartItems.innerHTML = ""; // Clear existing list
  let total = 0;

  cart.forEach((entry, index) => {
    const li = document.createElement("li");
    li.innerHTML = `${entry.item} - $${entry.price.toFixed(2)} 
      <button onclick="removeFromCart(${index})" style="margin-left: 10px; color: red;">Remove</button>`;
    cartItems.appendChild(li);
    total += entry.price;
  });

  totalEl.textContent = total.toFixed(2);
}

function checkout() {
  alert("Please use the Cash App or Zelle info below to complete your purchase.");
}

const app = document.getElementById("app");

const toggleButton = document.getElementById("theme-toggle");

toggleButton.addEventListener("click", () => {
  const isDark = document.documentElement.classList.toggle("light-theme");

  if (isDark) {
    // Switch to light
    document.documentElement.style.setProperty('--bg-color', '#ffffff');
    document.documentElement.style.setProperty('--text-color', '#111111');
    document.documentElement.style.setProperty('--card-bg', '#f0f0f0');
  } else {
    // Switch to dark
    document.documentElement.style.setProperty('--bg-color', '#1e1e1e');
    document.documentElement.style.setProperty('--text-color', '#ffffff');
    document.documentElement.style.setProperty('--card-bg', '#2e2e2e');
  }
});

function checkout() {
  alert("Please complete payment via Cash App or Zelle.");
  sendEmail(cart, cart.reduce((t, i) => t + i.price, 0));
}
