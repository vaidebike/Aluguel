import { Config, JsonDB } from 'node-json-db';
import { CartaoDeCredito } from '../../models/CartaoDeCredito';
import { StatusEnum } from '../../models/Ciclista';
import { CreditCardRepository } from '../../models/repositories/CreditCardRepository';

describe('CreditCardRepository', () => {
  let creditCardRepository: CreditCardRepository;

  beforeEach(() => {
    const db = new JsonDB(new Config('database.test.json', true, false, '/'));
    prepareDatabaseForTests(db);
    creditCardRepository = new CreditCardRepository(db);
  });

  describe('Create', () => {
    it('should create a credit card', async () => {
      const creditCard = new CartaoDeCredito();
      creditCard.numero = '12345678910';
      creditCard.validade = new Date('2020-01-01');
      creditCard.cvv = '123';
      creditCard.nomeTitular = 'John Doe';

      const createdCreditCard = await creditCardRepository.create(creditCard);

      expect(createdCreditCard).toHaveProperty('id');
      expect(createdCreditCard.numero).toBe('12345678910');
      expect(createdCreditCard.cvv).toBe('123');
    });

    it('should get a invalid credit card error when try to create a credit card with no data', async () => {
      try {
        await creditCardRepository.create(null);
      } catch (e) {
        expect(e.message).toBe('Cartão de crédito inválido.');
      }
    });

    it('should get a not implemented then try to findOne creditCard', async () => {
      try {
        await creditCardRepository.findOne('123');
      } catch (e) {
        expect(e.message).toBe('Method not implemented.');
      }
    });
  });

  it('should get a not implemented then try to findAll creditCard', async () => {
    try {
      await creditCardRepository.findAll();
    } catch (e) {
      expect(e.message).toBe('Method not implemented.');
    }
  });

  it('should get a not implemented then try to update creditCard', async () => {
    try {
      await creditCardRepository.update('123', {});
    } catch (e) {
      expect(e.message).toBe('Method not implemented.');
    }
  });

  it('should get a not implemented then try to delete creditCard', async () => {
    try {
      await creditCardRepository.delete('123');
    } catch (e) {
      expect(e.message).toBe('Method not implemented.');
    }
  });
});

function prepareDatabaseForTests(db: JsonDB) {
  db.delete('/ciclistas');
  db.delete('/cartoesDeCredito');

  db.push('/ciclistas', [
    {
      nome: 'John Doe',
      nascimento: '1990-01-01',
      cpf: '12345678910',
      email: 'johndoe@email.com',
      passaporte: {
        numero: '12345678910',
        validade: '2020-01-01',
        pais: 'Brazil',
      },
      status: StatusEnum.AguardandoConfirmacao,
      id: 'ca67326d-8d9d-41b8-91ad-fcba610ddd3b'
    },
    {
      nome: 'John Doe 2',
      nascimento: '1990-01-01',
      cpf: '12345678911',
      email: 'johndoe2@email.com',
      passaporte: {
        numero: '12345678911',
        validade: '2020-01-01',
        pais: 'Brazil',
      },
      status: StatusEnum.Ativo,
      id: 'd11dec00-ae9d-4e71-821f-a0d7ad3a8a7a'
    }
  ], true);
}