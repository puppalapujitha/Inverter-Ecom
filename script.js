const products = [
  {
    id: 1,
    name: "Luminous RC18000",
    price: 12500,
    image: "images/battery1.png"
  },
  {
    id: 2,
    name: "Exide IB1500",
    price: 11300,
    image: "images/battery2.png"
  },
  {
    id: 3,
    name: "Amaron Tall Tubular",
    price: 13800,
    image: "images/battery3.png"
  },
  {
    id: 4,
    name: "SF Sonic PowerBox",
    price: 11900,
    image: "images/battery4.png"
  }
];


let cart = JSON.parse(localStorage.getItem("cart")) || {};

function loadProducts() {
  const container = document.getElementById("product-list");
  container.innerHTML = "";
  products.forEach(product => {
    const card = document.createElement("div");
    card.className = "product";
    const quantity = cart[product.id]?.quantity || 0;
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>Price: ₹${product.price}</p>
      <div>
        <button onclick="updateQuantity(${product.id}, -1)">-</button>
        <span id="qty-${product.id}">${quantity}</span>
        <button onclick="updateQuantity(${product.id}, 1)">+</button>
      </div>
    `;
    container.appendChild(card);
  });
  updateCartDisplay();
}

function updateQuantity(productId, change) {
  if (!cart[productId]) {
    cart[productId] = { ...products.find(p => p.id === productId), quantity: 0 };
  }

  cart[productId].quantity += change;

  if (cart[productId].quantity <= 0) {
    delete cart[productId];
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  loadProducts();
}

function updateCartDisplay() {
  let totalItems = 0;
  let totalAmount = 0;

  for (let id in cart) {
    totalItems += cart[id].quantity;
    totalAmount += cart[id].price * cart[id].quantity;
  }

  document.getElementById("cart-count").textContent = totalItems;
  document.getElementById("cart-total").textContent = totalAmount;
}

window.onload = loadProducts;
