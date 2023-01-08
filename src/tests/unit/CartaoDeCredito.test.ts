import { CartaoDeCredito } from '../../models/CartaoDeCredito';

test('Credit card attributions should be ok', () =>{
  const creditCard = new CartaoDeCredito();
  creditCard.id = '1';
  creditCard.numero = '123456789';
  creditCard.nomeTitular = 'test';
  creditCard.validade = new Date();
  creditCard.cvv = '123';

  expect(creditCard.id).toBe('1');
  expect(creditCard.numero).toBe('123456789');
  expect(creditCard.nomeTitular).toBe('test');
  expect(creditCard.validade).toBeInstanceOf(Date);
  expect(creditCard.cvv).toBe('123');
});