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
  event.currentTarget.remove();
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

async function fetchItemResults(ItemID) {
  const resultado = fetchItem(ItemID);
  const sectionItens = document.querySelector('.cart__items');
  const resulcart = createCartItemElement(
{ sku: resultado.id, name: resultado.title, salePrice: resultado.price },
  );
  sectionItens.appendChild(resulcart);
  saveCartItems(sectionItens.innerHTML);
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));
  btAddCart.addEventListener('click', () => fetchItemResults(sku));

  section.appendChild(btAddCart);
  
  return section;
}

async function fetchResults() {
  const sectionItens = document.querySelector('.items');
 sectionItens.innerHTML = '<ol class="loading"><li>Carregando</li></ol>';
  setTimeout(async () => {
    const resultado = await fetchProducts('computador');
    sectionItens.innerHTML = '';
    resultado.results.forEach((item) => 
      sectionItens.appendChild(
        createProductItemElement({ sku: item.id, name: item.title, image: item.thumbnail }),
      ));
  }, 2000);
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function playCart() {
  const cartItems = getSavedCartItems();
  const sectionItems = document.querySelector('.cart__items');
  sectionItems.innerHTML = cartItems;
  console.log(sectionItems.children);
  for (let i = 0; i < sectionItems.children.length; i += 1) {
  sectionItems.children[i].addEventListener('click', cartItemClickListener);
  }
}

window.onload = () => {
  fetchResults();
  playCart();
};