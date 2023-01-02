import { Ciclista, StatusEnum } from '../../models/Ciclista';

test('Cyclist attributions should be ok', () =>{
  const cyclist = new Ciclista();
  cyclist.id = '1';
  cyclist.status = StatusEnum.Ativo;
  cyclist.nome = 'test';
  cyclist.nascimento = new Date();
  cyclist.cpf = '123456789';
  cyclist.passaporte = {
    numero: '123456789',
    validade: new Date(),
    pais: 'Brazil'
  };
  cyclist.nacionalidade = 'Brazil';
  cyclist.email = 'email@email.com';
  cyclist.urlFotoDocumento = 'http://url.com';

  expect(cyclist.id).toBe('1');
  expect(cyclist.status).toBe(StatusEnum.Ativo);
  expect(cyclist.nome).toBe('test');
  expect(cyclist.nascimento).toBeInstanceOf(Date);
  expect(cyclist.cpf).toBe('123456789');
  expect(cyclist.passaporte.numero).toBe('123456789');
  expect(cyclist.passaporte.validade).toBeInstanceOf(Date);
  expect(cyclist.passaporte.pais).toBe('Brazil');
  expect(cyclist.nacionalidade).toBe('Brazil');
  expect(cyclist.email).toBe('email@email.com');
  expect(cyclist.urlFotoDocumento).toBe('http://url.com');
});