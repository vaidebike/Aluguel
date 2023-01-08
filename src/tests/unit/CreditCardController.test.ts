import { getMockReq, getMockRes } from '@jest-mock/express';
import { CreditCardController } from '../../controllers/CreditCardController';
import { DatabaseHandlerMock } from './mocks/DatabaseHandlerMock';

jest.mock('../../models/repositories/CreditCardRepository', () => {
  return {
    CreditCardRepository: jest.fn().mockImplementation(() => ({
      findOne: jest.fn().mockImplementation(() => ({
        numero: '12345678910',
        validade: '2020-01-01',
        cvv: '123',
        nomeTitular: 'John Doe',
        id: '2ab87bf4-bca5-4d00-971c-ca1ad4009401'
      })),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      findAll: jest.fn(),
      verifyIfEmailExists: jest.fn(),
      activate: jest.fn()
    }))
  };
});

jest.mock('../../models/repositories/CyclistRepository', () => {
  return {
    CyclistRepository: jest.fn().mockImplementation(() => ({
      findOne: jest.fn().mockImplementation(() => ({
        id: 'd5446ea3-aa72-486f-9f11-203c5c04de67',
        nome: 'Fulano',
        nascimento: '1990-01-01',
        cpf: '12345678901',
        passaporte: {
          numero: '123456789',
          validade: '2020-01-01',
          pais: 'Brasil'
        },
        nacionalidade: 'Brasileiro',
        email: 'fulano@email.com',
        urlFotoDocumento: 'http://www.google.com',
        senha: '123456',
        confirma_senha: '123456',
        status: 'ATIVO'
      })),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      findAll: jest.fn(),
      verifyIfEmailExists: jest.fn(),
      activate: jest.fn()
    }))
  };
});


describe('CreditCardController', () => {
  let creditCardController: CreditCardController;

  beforeEach(() => {
    const databaseStub = new DatabaseHandlerMock();
    creditCardController = new CreditCardController(databaseStub);
  });

  it('should return 200 if the credit card is found', async () => {
    const req = getMockReq();
    req.params.id = 'd5446ea3-aa72-486f-9f11-203c5c04de67';

    const { res } = getMockRes();

    await creditCardController.findByCyclist(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
  });
});