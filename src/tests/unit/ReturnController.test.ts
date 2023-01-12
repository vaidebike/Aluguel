import { getMockReq, getMockRes } from '@jest-mock/express';
import { ReturnController } from '../../controllers/ReturnController';
import { Ciclista, StatusEnum } from '../../models/Ciclista';
import { DatabaseHandlerMock } from './mocks/DatabaseHandlerMock';

jest.mock('../../services/cyclistService/CyclistService', () => {
  return {
    CyclistService: jest.fn().mockImplementation(() => ({
      canRentBike: jest.fn().mockImplementation(() => {
        return true;
      }),
      notifyRentInProgress: jest.fn().mockImplementation(() => {
        const cyclist = new Ciclista();
        cyclist.id = '3fa85f64-5717-4562-b3fc-2c963f66afa6';
        cyclist.status = StatusEnum.Ativo;
        return cyclist;
      })
    }))
  };
});

jest.mock('../../models/repositories/RentRepository', () => {
  return {
    RentRepository: jest.fn().mockImplementation(() => ({
      findOne: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      findAll: jest.fn(),
      getRentByBike: jest.fn().mockImplementation(() => ({
        id: 'c11dec00-ae9d-4e71-821f-a0d7ad3a8a7a',
        bicicleta: 'c11dec00-ae9d-4e71-821f-a0d7ad3a8a7a',
        ciclista: 'c11dec00-ae9d-4e71-821f-a0d7ad3a8a7a',
        trancaInicio: 'c11dec00-ae9d-4e71-821f-a0d7ad3a8a7a',
        trancaFim: 'c11dec00-ae9d-4e71-821f-a0d7ad3a8a7a',
        horaInicio: new Date(),
        horaFim: new Date(),
      }))
    }))
  };
});

describe('Return controller', () => {
  let returnController: ReturnController;

  beforeEach(() => {
    jest.clearAllMocks();

    const databaseStub = new DatabaseHandlerMock();
    returnController = new ReturnController(databaseStub);
  });

  it('should return 200 if the bike is returned', async () => {
    const req = getMockReq();

    req.body = {
      bicicleta: 'c11dec00-ae9d-4e71-821f-a0d7ad3a8a7a',
      trancaFim: 'c11dec00-ae9d-4e71-821f-a0d7ad3a8a7a'
    };
    const { res } = getMockRes();

    await returnController.returnBike(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
  });
});