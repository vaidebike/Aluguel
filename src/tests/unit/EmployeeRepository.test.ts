import { Config, JsonDB } from 'node-json-db';
import { Employee, RoleEnum } from '../../models/Employee';
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
    const employee = new Employee();
    employee.name = 'John Doe';
    employee.email = 'joao@email.com';
    employee.role = RoleEnum.Admin;
    employee.age = 30;
    employee.cpf = '12345678910';
    employee.password = '123456';

    const createdEmployee = await employeeRepository.create(employee);
    expect(createdEmployee).toBeDefined();
    expect(createdEmployee?.age).toBe(30);
  });

  it('should get a not valid error when try to create a employee with no name', async () => {
    const employee = new Employee();
    employee.email = 'joao@email.com';
    employee.role = RoleEnum.Admin;
    employee.age = 30;
    employee.cpf = '12345678910';
    employee.password = '123456';

    try {
      await employeeRepository.create(employee);
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toBe('Employee is not valid');
    }
  });

  it('should get a not valid error when try to create a employee with no email', async () => {
    const employee = new Employee();
    employee.name = 'John Doe';
    employee.role = RoleEnum.Admin;
    employee.age = 30;
    employee.cpf = '12345678910';
    employee.password = '123456';

    try {
      await employeeRepository.create(employee);
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toBe('Employee is not valid');
    }
  });

  it('should get a not valid error when try to create a employee with no role', async () => {
    const employee = new Employee();
    employee.name = 'John Doe';
    employee.email = 'joao@email.com';
    employee.age = 30;
    employee.cpf = '12345678910';
    employee.password = '123456';

    try {
      await employeeRepository.create(employee);
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toBe('Employee is not valid');
    }
  });

  
  it('should get a not valid error when try to create a employee with no age', async () => {
    const employee = new Employee();
    employee.name = 'John Doe';
    employee.email = 'joao@email.com';
    employee.role = RoleEnum.Admin;
    employee.cpf = '12345678910';
    employee.password = '123456';
    try {
      await employeeRepository.create(employee);
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toBe('Employee is not valid');
    }
  });

  it('should get a not valid error when try to create a employee with no cpf', async () => {
    const employee = new Employee();
    employee.name = 'John Doe';
    employee.email = 'joao@email.com';
    employee.role = RoleEnum.Admin;
    employee.age = 30;
    employee.password = '123456';
    try {
      await employeeRepository.create(employee);
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toBe('Employee is not valid');
    }
  });

  it('should get a not valid error when try to create a employee with no password', async () => {
    const employee = new Employee();
    employee.name = 'John Doe';
    employee.email = 'joao@email.com';
    employee.role = RoleEnum.Admin;
    employee.age = 30;
    employee.cpf = '12345678910';
    
    try {
      await employeeRepository.create(employee);
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toBe('Employee is not valid');
    }
  });


  it('should get a no data error when try to create a employee without data', async () => {
    try {
      await employeeRepository.create(null);
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toBe('Employee is required');
    }
  });

  it('should remove an employee', async () => {
    const id = '7ef32b9a-2e22-46e6-a7f6-6297c28421bf';
    const employeeDeleted = await employeeRepository.delete(id);
    expect(employeeDeleted).toBeDefined();
    expect(employeeDeleted?.registration).toBe(id);

  });

  it('should get a not valid error when try to delete a employee with no valid uuid', async () => {
    try {
      await employeeRepository.delete('a');
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toBe('Id is not valid');
    }
  });

  it('should get a not found error when try to remove a employee not exists', async () => {
    try {
      await employeeRepository.delete('1aa11a1a-2e22-46e6-a7f6-6297c28421bf');
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toBe('Employee not found');
    }
  });

  it('should return all employees', async () => {
    const employees = await employeeRepository.findAll();
    expect(employees).toHaveLength(1);
  });

  it('should return employee by id', async () => {
    const employee = await employeeRepository.findOne('7ef32b9a-2e22-46e6-a7f6-6297c28421bf') as Employee;
    expect(employee).toBeDefined();
    expect(employee?.registration).toBe('7ef32b9a-2e22-46e6-a7f6-6297c28421bf');
  });

  it('should get a not valid error when try to find a employee with no valid uuid', async () => {
    try {
      await employeeRepository.findOne('a');
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toBe('Id is not valid');
    }
  });

  it('should get a not found error when employee not exists', async () => {
    try {
      await employeeRepository.findOne('1aa11a1a-2e22-46e6-a7f6-6297c28421bf');
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toBe('Employee not found');
    }
  });

  it('should update a employee', async () => {
    const id = '7ef32b9a-2e22-46e6-a7f6-6297c28421bf';
    const employee = await employeeRepository.findOne(id) as Employee;
    const employeeUpdated = await employeeRepository.update(id, employee);
    expect(employeeUpdated).toBeDefined();
  });

  it('should get a not valid error when try tu update a employee with invalid id', async () =>{
    try {
      await employeeRepository.update('a', null);
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toBe('Id is not valid');
    }
  });

  it('should get a not valid error when try tu update a employee with no data', async () =>{
    try {
      await employeeRepository.update('7ef32b9a-2e22-46e6-a7f6-6297c28421bf', null);
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toBe('Employee is required');
    }
  });

  it('should get a not valid error when try to update a employee with invalid data', async () => {
    const id = '7ef32b9a-2e22-46e6-a7f6-6297c28421bf';
    const employee = await employeeRepository.findOne(id) as Employee;
    employee.name = '';
    try {
      await employeeRepository.update(id, employee);
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toBe('Employee is not valid');
    }
  });

  it('should get a not found error when try to update a employee not exists', async () => {
    try {
      const id = '1aa11a1a-2e22-46e6-a7f6-6297c28421bf';
      const employee = await employeeRepository.findOne('7ef32b9a-2e22-46e6-a7f6-6297c28421bf') as Employee;
      await employeeRepository.update(id, employee);
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toBe('Employee not found');
    }
  });

  it('should get a not found error when try to update a employee not exists', async () => {
    try {
      const id = '1aa11a1a-2e22-46e6-a7f6-6297c28421bf';
      const employee = await employeeRepository.findOne(id) as Employee;
      await employeeRepository.update(id, employee);
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toBe('Employee not found');
    }
  });
});

function prepareDatabaseForTests(db: JsonDB) {
  db.delete('/employees');

  db.push('/employees', [
    {
      name: 'John Doe',
      password: 'p4ssw0rd',
      email: 'user@example.com',
      age: 20,
      role: 'REPAIRMAN',
      cpf: '111.111.111-11',
      registration: '7ef32b9a-2e22-46e6-a7f6-6297c28421bf'
    }
  ]);
}
