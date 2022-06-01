// primeira parte requisito 4
const saveCartItems = (cartItemsHtml) => localStorage.setItem('cartItems', cartItemsHtml);

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
