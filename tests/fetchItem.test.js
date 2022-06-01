const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');
// requisito 9
window.fetch = jest.fn(fetchSimulator);

afterEach(jest.clearAllMocks);

describe('2 - Teste a função fecthItem', () => {
  // implemente seus testes aqui
  it('Testa se fetchItem é uma função', () => {
    expect(typeof fetchItem).toBe('function');
  });
  it('Executa a função fetchItrm e testa se fetch foi chamada', () => {
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  });
  it('Testa se ao chamar a função fetchItem, a função fetch é chamada corretamente com o endpoint utilizado', () => {
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/items/MLB1615760527');
  });
  it('Testa se o retorno da função fetchItem é uma estrutura como a do objeto importado', async () => {
    const result = await fetchItem('MLB1615760527');
    expect(result).toEqual(item);
  });
  it('Testa se ao chamar a função testItem sem argumento, retorna um erro', async () => {
    const result = await fetchItem();
    expect(result).toEqual(new Error('You must provide an url'));
  });
});