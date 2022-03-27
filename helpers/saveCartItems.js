const saveCartItems = (itemCart) => {
  localStorage.setItem('cartItems', itemCart);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
