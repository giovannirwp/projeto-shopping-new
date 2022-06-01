const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');

// requisito 10
localStorageSimulator('setItem');

describe('4 - Teste a função saveCartItems', () => {
  it('Ao executar saveCartItens o methodo localStorege.setItem deve ser chamado', () => {
    const mock = '<ol><li>Item</li></ol>';
    saveCartItems(mock);
    expect(localStorage.setItem).toHaveBeenCalled();
  });
  it('Ao executar saveCartItens o methodo localStorege.setItem deve ser chamado corretamente com seus dois argumentos', () => {
    const key = 'cartItems';
    const mock = '<ol><li>Item</li></ol>';
    saveCartItems(mock);
    expect(localStorage.setItem).toHaveBeenCalledWith(key, mock);
  });
});
