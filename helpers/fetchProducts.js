const fetchProducts = ($QUERY) => {
  fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${$QUERY}`)
  .then((results) => results.json())
  .catch((error) => error);
};
console.log(fetchProducts);
if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
