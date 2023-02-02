import { getMockReq, getMockRes } from '@jest-mock/express';
import { RentController } from '../../controllers/RentController';
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

describe('Rent controller', () => {
  let rentController: RentController;

  beforeEach(() => {
    jest.clearAllMocks();

    const databaseStub = new DatabaseHandlerMock();
    rentController = new RentController(databaseStub);
  });

  it('should return 200 if the rent is created', async () => {
    const req = getMockReq();

    req.body = {
      ciclista: 'd5446ea3-aa72-486f-9f11-203c5c04de67',
      trancaInicio: '3fa85f64-5717-4562-b3fc-2c963f66afa6'
    };
    const { res } = getMockRes();

    await rentController.rentBike(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
  });
});