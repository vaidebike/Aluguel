import { Config, JsonDB } from 'node-json-db';
import { CargoEnum, Funcionario } from '../../models/Funcionario';
import { EmployeeRepository } from '../../models/repositories/EmployeeRepository';

describe('EmployeeRepository', () => {
  let employeeRepository: EmployeeRepository;

  beforeEach(() => {
    const db = new JsonDB(new Config('database.test.json', true, false, '/'));
    prepareDatabaseForTests(db);
    employeeRepository = new EmployeeRepository(db);
  });

  it('should create a new employee repository', () => {
    expect(employeeRepository).toBeDefined();
  });

  it('should set a new db', () => {
    const db = new JsonDB(new Config('databasetest.test.json', true, false, '/'));
    employeeRepository.db = db;
    expect(employeeRepository.db).toBeDefined();
  });

  it('should create a new employee', async () => {
    const employee = new Funcionario();
    employee.nome = 'John Doe';
    employee.email = 'joao@email.com';
    employee.cargo = CargoEnum.Admin;
    employee.idade = 30;
    employee.cpf = '12345678910';
    employee.senha = '123456';

    const createdEmployee = await employeeRepository.create(employee);
    expect(createdEmployee).toBeDefined();
    expect(createdEmployee?.idade).toBe(30);
  });

  it('should get a not valid error when try to create a employee with no nome', async () => {
    const employee = new Funcionario();
    employee.email = 'joao@email.com';
    employee.cargo = CargoEnum.Admin;
    employee.idade = 30;
    employee.cpf = '12345678910';
    employee.senha = '123456';

    try {
      await employeeRepository.create(employee);
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toBe('Funcionário não é válido');
    }
  });

  it('should get a not valid error when try to create a employee with no email', async () => {
    const employee = new Funcionario();
    employee.nome = 'John Doe';
    employee.cargo = CargoEnum.Admin;
    employee.idade = 30;
    employee.cpf = '12345678910';
    employee.senha = '123456';

    try {
      await employeeRepository.create(employee);
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toBe('Funcionário não é válido');
    }
  });

  it('should get a not valid error when try to create a employee with no cargo', async () => {
    const employee = new Funcionario();
    employee.nome = 'John Doe';
    employee.email = 'joao@email.com';
    employee.idade = 30;
    employee.cpf = '12345678910';
    employee.senha = '123456';

    try {
      await employeeRepository.create(employee);
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toBe('Funcionário não é válido');
    }
  });

  
  it('should get a not valid error when try to create a employee with no idade', async () => {
    const employee = new Funcionario();
    employee.nome = 'John Doe';
    employee.email = 'joao@email.com';
    employee.cargo = CargoEnum.Admin;
    employee.cpf = '12345678910';
    employee.senha = '123456';
    try {
      await employeeRepository.create(employee);
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toBe('Funcionário não é válido');
    }
  });

  it('should get a not valid error when try to create a employee with no cpf', async () => {
    const employee = new Funcionario();
    employee.nome = 'John Doe';
    employee.email = 'joao@email.com';
    employee.cargo = CargoEnum.Admin;
    employee.idade = 30;
    employee.senha = '123456';
    try {
      await employeeRepository.create(employee);
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toBe('Funcionário não é válido');
    }
  });

  it('should get a not valid error when try to create a employee with no senha', async () => {
    const employee = new Funcionario();
    employee.nome = 'John Doe';
    employee.email = 'joao@email.com';
    employee.cargo = CargoEnum.Admin;
    employee.idade = 30;
    employee.cpf = '12345678910';
    
    try {
      await employeeRepository.create(employee);
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toBe('Funcionário não é válido');
    }
  });


  it('should get a no data error when try to create a employee without data', async () => {
    try {
      await employeeRepository.create(null);
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toBe('Funcionário é obrigatório');
    }
  });

  it('should remove an employee', async () => {
    const id = '7ef32b9a-2e22-46e6-a7f6-6297c28421bf';
    const employeeDeleted = await employeeRepository.delete(id);
    expect(employeeDeleted).toBeDefined();
    expect(employeeDeleted?.matricula).toBe(id);

  });

  it('should get a not valid error when try to delete a employee with no valid uuid', async () => {
    try {
      await employeeRepository.delete('a');
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toBe('Id não é válido');
    }
  });

  it('should get a not found error when try to remove a employee not exists', async () => {
    try {
      await employeeRepository.delete('1aa11a1a-2e22-46e6-a7f6-6297c28421bf');
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toBe('Funcionário não encontrado');
    }
  });

  it('should return all employees', async () => {
    const employees = await employeeRepository.findAll();
    expect(employees).toHaveLength(1);
  });

  it('should return employee by id', async () => {
    const employee = await employeeRepository.findOne('7ef32b9a-2e22-46e6-a7f6-6297c28421bf') as Funcionario;
    expect(employee).toBeDefined();
    expect(employee?.matricula).toBe('7ef32b9a-2e22-46e6-a7f6-6297c28421bf');
  });

  it('should get a not valid error when try to find a employee with no valid uuid', async () => {
    try {
      await employeeRepository.findOne('a');
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toBe('Id não é válido');
    }
  });

  it('should get a not found error when employee not exists', async () => {
    try {
      await employeeRepository.findOne('1aa11a1a-2e22-46e6-a7f6-6297c28421bf');
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toBe('Funcionário não encontrado');
    }
  });

  it('should update a employee', async () => {
    const id = '7ef32b9a-2e22-46e6-a7f6-6297c28421bf';
    const employee = await employeeRepository.findOne(id) as Funcionario;
    const employeeUpdated = await employeeRepository.update(id, employee);
    expect(employeeUpdated).toBeDefined();
  });

  it('should get a not valid error when try tu update a employee with invalid id', async () =>{
    try {
      await employeeRepository.update('a', null);
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toBe('Id não é válido');
    }
  });

  it('should get a not valid error when try tu update a employee with no data', async () =>{
    try {
      await employeeRepository.update('7ef32b9a-2e22-46e6-a7f6-6297c28421bf', null);
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toBe('Funcionário é obrigatório');
    }
  });

  it('should get a not valid error when try to update a employee with invalid data', async () => {
    const id = '7ef32b9a-2e22-46e6-a7f6-6297c28421bf';
    const employee = await employeeRepository.findOne(id) as Funcionario;
    employee.nome = '';
    try {
      await employeeRepository.update(id, employee);
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toBe('Funcionário não é válido');
    }
  });

  it('should get a not found error when try to update a employee not exists', async () => {
    try {
      const id = '1aa11a1a-2e22-46e6-a7f6-6297c28421bf';
      const employee = await employeeRepository.findOne('7ef32b9a-2e22-46e6-a7f6-6297c28421bf') as Funcionario;
      await employeeRepository.update(id, employee);
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toBe('Funcionário não encontrado');
    }
  });

  it('should get a not found error when try to update a employee not exists', async () => {
    try {
      const id = '1aa11a1a-2e22-46e6-a7f6-6297c28421bf';
      const employee = await employeeRepository.findOne(id) as Funcionario;
      await employeeRepository.update(id, employee);
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toBe('Funcionário não encontrado');
    }
  });
});

function prepareDatabaseForTests(db: JsonDB) {
  db.delete('/funcionarios');

  db.push('/funcionarios', [
    {
      nome: 'John Doe',
      senha: 'p4ssw0rd',
      email: 'user@example.com',
      idade: 20,
      cargo: 'REPAIRMAN',
      cpf: '111.111.111-11',
      matricula: '7ef32b9a-2e22-46e6-a7f6-6297c28421bf'
    }
  ]);
}
