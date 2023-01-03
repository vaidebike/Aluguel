import { getMockReq, getMockRes } from '@jest-mock/express';
import { CyclistController } from '../../controllers/CyclistController';
import { DatabaseHandlerStub } from './mocks/DatabaseHandlerMock';

describe('CyclistController', () => {
  let cyclistController: CyclistController;

  beforeEach(() => {
    jest.clearAllMocks();

    const databaseStub = new DatabaseHandlerStub();
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

  it('should return 200 if the email exists', async () => {
    const req = getMockReq();
    req.params.email = 'cassiano@email.com';

    const { res } = getMockRes();

    await cyclistController.emailExists(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  
});
