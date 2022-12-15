import { Cyclist, StatusEnum } from '../../models/Cyclist';

test('Cyclist attributions should be ok', () =>{
  const cyclist = new Cyclist();
  cyclist.id = '1';
  cyclist.status = StatusEnum.Active;
  cyclist.name = 'test';
  cyclist.birthday = new Date();
  cyclist.cpf = '123456789';
  cyclist.passport = {
    number: '123456789',
    expiration: new Date(),
    country: 'Brazil'
  };
  cyclist.nationality = 'Brazil';
  cyclist.email = 'email@email.com';
  cyclist.urlDocumentPhoto = 'http://url.com';

  expect(cyclist.id).toBe('1');
  expect(cyclist.status).toBe(StatusEnum.Active);
  expect(cyclist.name).toBe('test');
  expect(cyclist.birthday).toBeInstanceOf(Date);
  expect(cyclist.cpf).toBe('123456789');
  expect(cyclist.passport.number).toBe('123456789');
  expect(cyclist.passport.expiration).toBeInstanceOf(Date);
  expect(cyclist.passport.country).toBe('Brazil');
  expect(cyclist.nationality).toBe('Brazil');
  expect(cyclist.email).toBe('email@email.com');
  expect(cyclist.urlDocumentPhoto).toBe('http://url.com');
});