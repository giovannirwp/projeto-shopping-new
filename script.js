const CART_ITEMS_CLASS = '.cart__items';
const buttonEmpty = document.querySelector('.empty-cart');
const spanLoading = document.createElement('span');

// requisito 7
const createLoading = () => {
  spanLoading.className = 'loading';
  spanLoading.textContent = 'Loading...';
  document.querySelector('.items').appendChild(spanLoading);
};

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

// requisito 3 
function cartItemClickListener(event) {
  // coloque seu código aqui
  event.target.remove();
  const OL_LIST = document.querySelector(CART_ITEMS_CLASS);
  // requisito 4 terceira parte
  saveCartItems(OL_LIST.innerHTML);
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  // requisito 4 segunda parte
  return li;
}

// REQUISITO 5
const calculateTotalPrice = () => {
  const cartItemsLi = document.querySelectorAll('.cart__item');
  let totalPrice = 0;
  cartItemsLi.forEach((cartItemLi) => {
    const cartItemText = cartItemLi.innerText.split('$');
    totalPrice += parseFloat(cartItemText[1]);
  });
  document.querySelector('.total-price').innerText = totalPrice;
};

// REQUISITO 5 - chamar dentro do window.onload
const createTotalPriceElement = () => {
  const spanTotalPrice = document.createElement('span');
  spanTotalPrice.className = 'total-price';
  document.querySelector('.cart').appendChild(spanTotalPrice);
};

 // requisito 2 - terceiro passo
const addToCart = async (sku) => {
  const itemResult = await fetchItem(sku);
  const { id, title, price } = itemResult;
  const cartItem = createCartItemElement({
    sku: id,
    name: title,
    salePrice: price,
  });
  document.querySelector(CART_ITEMS_CLASS).appendChild(cartItem);
  const OL_LIST = document.querySelector(CART_ITEMS_CLASS);
  saveCartItems(OL_LIST.innerHTML);
  calculateTotalPrice();
};

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  // section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));
  // requisito 2 - segundo passo
  const buttonAdd = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  buttonAdd.addEventListener('click', () => addToCart(sku));
  section.appendChild(buttonAdd);

  return section;
}

const addProductToSection = async () => {
  createLoading();
  const productItemElement = await fetchProducts('computador');
  productItemElement.forEach(({ id, title, thumbnail }) => {
    const productElement = createProductItemElement({
      sku: id,
      name: title,
      image: thumbnail,
    });
    const sectionItens = document.querySelector('.items');
    sectionItens.appendChild(productElement);
  });
  spanLoading.remove();
};

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function loadingCartItems() {
  try {
    const OL_LIST = document.querySelector(CART_ITEMS_CLASS);
    OL_LIST.innerHTML = getSavedCartItems();
    Array.from(OL_LIST.children).forEach((item) => {
      item.addEventListener('click', cartItemClickListener);
    });
    createTotalPriceElement();
  } catch (error) {
    console.log(error);
  }
}

window.onload = async () => { 
  await addProductToSection();
  // segundo passo requisito 4
  loadingCartItems();

  // requisito 6 primeiro passo
  buttonEmpty.addEventListener('click', () => {
    const OL_LIST = document.querySelector(CART_ITEMS_CLASS);
    OL_LIST.innerHTML = '';
    saveCartItems(OL_LIST.innerHTML);
  });
};
