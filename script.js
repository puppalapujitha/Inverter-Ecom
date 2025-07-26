const products = [
  { id: 1, name: "Luminous RC18000", price: 13000, brand: "Luminous", image: "images/battery1.png" },
  { id: 2, name: "Exide IB1500", price: 12000, brand: "Exide", image: "images/battery2.png" },
  { id: 3, name: "Amaron Tall Tubular", price: 12500, brand: "Amaron", image: "images/battery3.png" },
  { id: 4, name: "SF Sonic PowerBox", price: 12800, brand: "SF Sonic", image: "images/battery4.png" },
  { id: 5, name: "Microtek EB1900", price: 11800, brand: "Microtek", image: "images/microtek.png" },
  { id: 6, name: "Okaya Tall Tubular", price: 11000, brand: "Okaya", image: "images/okaya.png" },
  { id: 7, name: "Livguard IT1536TT", price: 12999, brand: "Livguard", image: "images/livguard.png" },
  { id: 8, name: "V-Guard VT160", price: 12100, brand: "V-Guard", image: "images/vguard.png" }
];

let cart = JSON.parse(localStorage.getItem('cart')) || {};

function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function renderProducts(filter = '') {
  const productList = document.getElementById("product-list");
  productList.innerHTML = '';

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(filter) ||
    p.brand.toLowerCase().includes(filter) ||
    p.price.toString().includes(filter)
  );

  filtered.forEach(product => {
    const qty = cart[product.id] || 0;
    const item = document.createElement("div");
    item.className = "product";
    item.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>Brand: ${product.brand}</p>
      <p>Price: ₹${product.price}</p>
      <div class="quantity-control">
        <button onclick="removeFromCart(${product.id})">−</button>
        <span>${qty}</span>
        <button onclick="addToCart(${product.id})">+</button>
      </div>
    `;
    productList.appendChild(item);
  });
}

function renderCart() {
  const cartItems = document.getElementById("cart-items");
  const totalSpan = document.getElementById("total");
  cartItems.innerHTML = '';
  let total = 0;

  Object.keys(cart).forEach(id => {
    const product = products.find(p => p.id == id);
    const qty = cart[id];
    const itemTotal = qty * product.price;
    total += itemTotal;

    const div = document.createElement("div");
    div.innerHTML = `
      ${product.name} (x${qty}) - ₹${itemTotal}
      <button onclick="removeFromCart(${id})">Remove One</button>
    `;
    cartItems.appendChild(div);
  });

  totalSpan.textContent = total;
}

function addToCart(id) {
  cart[id] = (cart[id] || 0) + 1;
  saveCart();
  renderProducts(document.getElementById("search").value.toLowerCase());
  renderCart();
}

function removeFromCart(id) {
  if (cart[id]) {
    cart[id]--;
    if (cart[id] === 0) delete cart[id];
    saveCart();
    renderProducts(document.getElementById("search").value.toLowerCase());
    renderCart();
  }
}

function clearCart() {
  cart = {};
  saveCart();
  renderProducts(document.getElementById("search").value.toLowerCase());
  renderCart();
}

document.getElementById("search").addEventListener("input", e => {
  renderProducts(e.target.value.toLowerCase());
});

renderProducts();
renderCart();
