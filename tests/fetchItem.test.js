const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste a função fecthItem', () => {
  fetchItem('MLB1615760527')
 it('1 - Teste se fetchItem é uma função', () => {
   expect(typeof fetchItem).toBe('function');
 })

 it('2 - Execute a função fetchItem com o argumento "computador" e teste se fetch foi chamada', () => {
   fetchItem('MLB1615760527');
   expect(fetch).toHaveBeenCalled();      
 })

 it('3 - Teste se, ao chamar a função fetchItem com o argumento "computador", a função fetch utiliza o endpoint "https://api.mercadolibre.com/sites/MLB/search?q=computador"', async () => {
   fetchItem('MLB1615760527')
   expect(fetch).toHaveBeenLastCalledWith('https://api.mercadolibre.com/items/MLB1615760527');
 })

it('Testando se o retorno da função fetchItem com o argumento "MLB1615760527" é uma estrutura de dados igual ao objeto item, que já está importado no arquivo', async () => {
  const result = await fetchItem('MLB1615760527');
  expect(result).toEqual(item);
})

 it('5 - Teste se, ao chamar a função fetchItem sem argumento, retorna um erro com a mensagem: You must provide an url.', () => {
   try{
     fetchItem();
   } catch (error) {
     expect(error).toEqual(new Error('You must provide an url'));
   }
 })
});
