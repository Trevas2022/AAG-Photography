document.addEventListener("DOMContentLoaded", () => {
  emailjs.init("YOUR_USER_ID"); // Replace with your real EmailJS user ID

  let cart = [];
  let total = 0;

  window.addToCart = function (item, price) {
    cart.push({ item, price });
    total += price;
    updateCart();
  };

  function updateCart() {
    const cartList = document.getElementById("cart-items");
    cartList.innerHTML = "";
    cart.forEach((entry) => {
      const li = document.createElement("li");
      li.textContent = `${entry.item} - $${entry.price}`;
      cartList.appendChild(li);
    });
    document.getElementById("total").textContent = total.toFixed(2);
  }

  window.checkout = function () {
    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    alert("Thank you! Once payment is confirmed, your download will appear below.");

    if (!document.getElementById("download-section")) {
      const downloadSection = document.createElement("div");
      downloadSection.id = "download-section";
      downloadSection.innerHTML = `
        <h3>Download Your Purchased Image</h3>
        <p>Click below to download:</p>
        <a href="./assets/AAG_Photo.JPG" download="AAG_Purchased_Image.JPG">
          <button>Download Image</button>
        </a>
      `;
      document.getElementById("cart").appendChild(downloadSection);
    }

    sendEmail(cart, total);

    // Reset cart
    cart = [];
    total = 0;
    updateCart();
  };

  window.sendEmail = function (cartItems, total) {
    const templateParams = {
      message: `Cart: ${JSON.stringify(cartItems)}\nTotal: $${total.toFixed(2)}`,
      buyer_email: "buyer@example.com"
    };

    emailjs
      .send("your_service_id", "your_template_id", templateParams)
      .then(() => alert("Email sent to seller!"))
      .catch((error) => console.error("Email error:", error));
  };

  // Modal logic
  window.openModal = function (imgElement) {
    const modal = document.getElementById("lightboxModal");
    const modalImg = document.getElementById("modalImage");
    modal.style.display = "block";
    modalImg.src = imgElement.src;
  };

  window.closeModal = function () {
    document.getElementById("lightboxModal").style.display = "none";
  };

  window.onclick = function (event) {
    const modal = document.getElementById("lightboxModal");
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };
});
