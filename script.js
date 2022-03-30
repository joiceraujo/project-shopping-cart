const itemElements = document.querySelector('.cart__items'); 

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function cartItemClickListener(event) {
  event.target.remove();
}

itemElements.addEventListener('click', cartItemClickListener);

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li'); 
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  itemElements.appendChild(li);
}

async function fetchItemResults(sku) {
  const allItens = await fetchItem(sku);
  const { title: name, price: salePrice, thumbnail: image } = allItens;
  createCartItemElement({ sku, image, name, salePrice });
  saveCartItems(itemElements.innerHTML);
  setCartPrice();
}

function createProductItemElement({ id: sku, title: name, thumbnail: image }) {
  const section = document.createElement('section');
  const itemsSection = document.querySelector('.items');
  section.className = 'item';
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  const addButton = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  section.appendChild(addButton);
  itemsSection.appendChild(section);
  addButton.addEventListener('click', () => {
    saveCartItems(itemElements.innerHTML);
    fetchItemResults(sku);
  });
}

const allProducts = () => {
  fetchProducts('computador').then((response) => {
    response.results.forEach((products) => createProductItemElement(products));
    insertLoading.remove();
  });
};

// function getSkuFromProductItem(item) {
  // return item.querySelector('span.item__sku').innerText;
// }

function loadingCart() {
  const message = document.createElement('message');
  message.className = 'loading';
  message.innerText = 'Loading...';
  document.querySelector('.container-title').appendChild(message);
}

function loadingCart2() {
  const loading = document.querySelector('.loading');
  loading.parentElement.removeChild(loading);
}

async function productsAll() {
  const items = document.querySelector('.items');
  loadingCart();
  const items2 = await fetchProducts('computador');
  loadingCart2();
  items2.results.forEach((element) => {
    items.appendChild(createElement(element));
  });
}

const setSavedCart = () => {
  const saved = getSavedCartItems();
  itemElements.innerHTML = saved;
};

const clearCartAll = () => {
const clearCart = document.querySelector('.empty-cart');
clearCart.addEventListener('click', () => {
  itemElements.innerHTML = '';
  setCartPrice(itemElements.innerHTML);
});
};

window.onload = async () => {
  productsAll();
  allProducts();
  setSavedCart();
  setCartPrice();
  clearCartAll();
};