const ITEM_URL = 'https://api.mercadolibre.com/items/';

// uma maneira de fazers
// const fetchItem = async (id) => {
//   const data = await fetch(`${URL_PRODUCTS}${id}`);
//   const products = await data.json();
//   return products;
// };
// requisto 2 - primeira parte
const fetchItem = (id) => fetch(`${ITEM_URL}${id}`)
    .then((response) => response.json())
    .catch((error) => (error));

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
