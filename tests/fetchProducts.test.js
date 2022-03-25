require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fecthProducts', () => {
  it('Testa se fecthProducts é uma funcao', () => {
    expect(typeof fetchProducts).toBe('function')
  });
  
});
