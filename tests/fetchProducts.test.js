const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');
// requisito 8
window.fetch = jest.fn(fetchSimulator);

afterEach(jest.clearAllMocks);

describe('1 - Teste a função fecthProducts', () => {
  it('Testa se fetchProducts é uma função', () => {
    expect(typeof fetchProducts).toBe('function');
  });
  it('Executa a função fetchProducts e testa se fetch foi chamada', () => {
    fetchProducts('computador');
    expect(window.fetch).toHaveBeenCalled();
  });
  it('Testa se ao chamar a função fetchProducts, a função fetch é chamada corretamente com o endpoint utilizado', () => {
    fetchProducts('computador');
    expect(window.fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/sites/MLB/search?q=computador');
  });
  it('ao chamar a função fetchProducts com o argumento computador, deve retornar a mesma estrutura de dados computadorShearch', async () => {
    const result = await fetchProducts('computador');
    expect(result).toEqual(computadorSearch.results);
  });
  it('Testa se ao chamar a função fethProduct sem argumento, retorna um erro', async () => {
    const result = await fetchProducts();
    expect(result).toEqual(new Error('You must provide an url'));
  });
});