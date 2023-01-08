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

    describe('Find a credit card by id', () => {
      it('should get a creditCard by id', async () => {
        const creditCard = await creditCardRepository.findOne('2ab87bf4-bca5-4d00-971c-ca1ad4009401');

        expect(creditCard).toHaveProperty('id');
        expect(creditCard.numero).toBe('12345678910');
        expect(creditCard.cvv).toBe('123');
      });

      it('should get a not found error when try to find a creditCard with a id that does not exist', async () => {
        try {
          await creditCardRepository.findOne('2ab87bf4-bca5-4d00-971c-ca1ad4009400');
        } catch (e) {
          expect(e.message).toBe('Cartão de crédito não encontrado.');
        }
      });

      it('should get a invalid uuid then try to findOne creditCard with a id that is not valid', async () => {
        try {
          await creditCardRepository.findOne('123');
        } catch (e) {
          expect(e.message).toBe('uuid inválido.');
        }
      });
    });

  });

  it('should get a not implemented then try to findAll creditCard', async () => {
    try {
      await creditCardRepository.findAll();
    } catch (e) {
      expect(e.message).toBe('Method not implemented.');
    }
  });

  describe('Update a credit card', () => {

    it('should update a credit card', async () => {
      const creditCard = new CartaoDeCredito();
      creditCard.numero = '12345678911';
      creditCard.validade = new Date('2020-01-01');
      creditCard.cvv = '123';
      creditCard.id = '2ab87bf4-bca5-4d00-971c-ca1ad4009401';
      creditCard.nomeTitular = 'John Doe';

      const updatedCreditCard = await creditCardRepository.update('2ab87bf4-bca5-4d00-971c-ca1ad4009401', creditCard);

      expect(updatedCreditCard).toHaveProperty('id');
      expect(updatedCreditCard.numero).toBe('12345678911');
      expect(updatedCreditCard.cvv).toBe('123');
    });

    it('should get a id invalid error when try to update a credit card with invalid id', async () => {
      try {
        const creditCard = new CartaoDeCredito();
        creditCard.numero = '12345678911';
        creditCard.validade = new Date('2020-01-01');
        creditCard.cvv = '123';
        creditCard.nomeTitular = 'John Doe';

        await creditCardRepository.update('12345', creditCard);
      } catch (e) {
        expect(e.message).toBe('Id não é válido');
      }
    });

    it('should get a not found error when try to update a credit card with a id that does not exist', async () => {
      try {
        const creditCard = new CartaoDeCredito();
        creditCard.numero = '12345678911';
        creditCard.validade = new Date('2020-01-01');
        creditCard.cvv = '123';
        creditCard.nomeTitular = 'John Doe';

        await creditCardRepository.update('2ab87bf4-bca5-4d00-971c-ca1ad4009400', creditCard);
      } catch (e) {
        expect(e.message).toBe('Cartão de crédito não encontrado.');
      }
    });

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
      id: 'ca67326d-8d9d-41b8-91ad-fcba610ddd3b',
      id_cartao_de: '2ab87bf4-bca5-4d00-971c-ca1ad4009401'
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

  db.push('/cartoesDeCredito', [
    {
      numero: '12345678910',
      validade: '2020-01-01',
      cvv: '123',
      nomeTitular: 'John Doe',
      id: '2ab87bf4-bca5-4d00-971c-ca1ad4009401'
    }
  ], true);
}