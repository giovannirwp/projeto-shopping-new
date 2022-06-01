const URL_PRODUCTS = 'https://api.mercadolibre.com/sites/MLB/search?q=';

// const fetchProducts = async (computador) => {
//   const data = await fetch(`${URL_PRODUCTS}${computador}`);
//   const products = await data.json();
//   return products.results;
// };

const fetchProducts = (computador) => fetch(`${URL_PRODUCTS}${computador}`)
    .then((response) => response.json())
    .then((data) => data.results)
    .catch((error) => (error));

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
