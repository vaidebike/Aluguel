import { getMockReq, getMockRes } from '@jest-mock/express';
import { CyclistController } from '../../controllers/CyclistController';
import { DatabaseHandlerMock } from './mocks/DatabaseHandlerMock';

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
        status: 'AGUARDANDO_CONFIRMACAO'
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


describe('CyclistController', () => {
  let cyclistController: CyclistController;

  beforeEach(() => {

    const databaseStub = new DatabaseHandlerMock();
    cyclistController = new CyclistController(databaseStub);
  });

  it('should return 200 if the cyclist is found', async () => {
    const req = getMockReq();
    req.params.id = 'd5446ea3-aa72-486f-9f11-203c5c04de67';

    const { res } = getMockRes();

    await cyclistController.getOne(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
  });

  it('should return 200 if the cyclist is created', async () => {
    const req = getMockReq();
    req.body = {
      ciclista: {
        nome: 'Ciclano',
        nascimento: '1990-01-01',
        cpf: '12345678901',
        passaporte: {
          numero: '123456789',
          validade: '2020-01-01',
          pais: 'Brasil'
        },
        nacionalidade: 'Brasileiro',
        email: 'ciclano@email.com',
        urlFotoDocumento: 'http://www.google.com',
        senha: '123456',
        confirma_senha: '123456'
      },
      meioDePagamento: {
        numero: '1234567890123456',
        nome: 'Ciclano',
        validade: '2020-01-01',
        cvv: '123',
      },
    };

    const { res } = getMockRes();

    await cyclistController.create(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
  });

  it('should return 200 if the cyclist is updated', async () => {
    const req = getMockReq();
    req.params.id = 'd5446ea3-aa72-486f-9f11-203c5c04de67';
    req.body = {
      ciclista: {
        nome: 'Ciclano',
        nascimento: '1990-01-01',
        cpf: '12345678901',
        passaporte: {
          numero: '123456789',
          validade: '2020-01-01',
          pais: 'Brasil'
        },
        nacionalidade: 'Brasileiro',
        email: 'ciclano@email.com',
        urlFotoDocumento: 'http://www.google.com/foto.jpg',
        senha: '123456',
        confirma_senha: '123456'
      }
    };

    const { res } = getMockRes();

    await cyclistController.update(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
  });

  it('should return 200 if the email exists', async () => {
    const req = getMockReq();
    req.params.email = 'cassiano@email.com';

    const { res } = getMockRes();

    await cyclistController.emailExists(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it('should return 200 if cyclist is activated successfully', async () => {
    const req = getMockReq();
    req.params.id = 'd5446ea3-aa72-486f-9f11-203c5c04de67';

    const { res } = getMockRes();

    await cyclistController.activate(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
  });


});
