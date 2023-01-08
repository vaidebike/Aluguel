import { getMockReq, getMockRes } from '@jest-mock/express';
import { EmployeeController } from '../../controllers/EmployeeController';
import { DatabaseHandlerMock } from './mocks/DatabaseHandlerMock';

describe('EmployeeController', () => {
  let employeeController: EmployeeController;

  beforeEach(() => {
    jest.clearAllMocks();

    const databaseStub = new DatabaseHandlerMock();
    employeeController = new EmployeeController(databaseStub);
  });

  it('should return 200 if the employee is found', async () => {
    const req = getMockReq();
    req.params.id = 'd5446ea3-aa72-486f-9f11-203c5c04de67';

    const { res } = getMockRes();

    await employeeController.getOne(req, res);

    expect(res.status).toHaveBeenCalledWith(200);

  });

  it('should return 200 if the employee is created', async () => {
    const req = getMockReq();

    req.body = {
      funcionario: {
        nome: 'Fulano',
        email: 'fulano@email.com',
        cpf: '123456789',
        senha: '123456',
        idade: 30,
        cargo: 'ADMINISTRADOR',
      }
    };
    const { res } = getMockRes();

    await employeeController.create(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
  });

  it('should return 200 on read', async () => {
    const req = getMockReq();

    const { res } = getMockRes();

    await employeeController.read(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
  });

  it('should return 200 if the employee is updated', async () => {
    const req = getMockReq();
    req.params.id = 'd5446ea3-aa72-486f-9f11-203c5c04de67';
    req.body = {
      funcionario: {
        nome: 'Fulano',
        email: 'fulano@email.com',
        cpf: '123456789',
        senha: '123456',
        idade: 30,
        cargo: 'ADMINISTRADOR',
      }
    };

    const { res } = getMockRes();

    await employeeController.update(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
  });

  it('should return 200 if the employee is deleted', async () => {

    const req = getMockReq();
    req.params.id = 'd5446ea3-aa72-486f-9f11-203c5c04de67';

    const { res } = getMockRes();

    await employeeController.delete(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
  });
});