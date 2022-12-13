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

  it('should create a new employee', async () => {
    const employee = new Employee();
    employee.name = 'John Doe';
    employee.registration = '6ef32b9a-2e22-46e6-a7f6-6297c28421bf';
    employee.email = 'joao@email.com';
    employee.role = RoleEnum.Admin;
    employee.age = 30;
    employee.cpf = '12345678910';
    employee.password = '123456';

    const createdEmployee = await employeeRepository.create(employee);
    expect(createdEmployee).toBeDefined();
    expect(createdEmployee?.registration).toBe('6ef32b9a-2e22-46e6-a7f6-6297c28421bf');
    
  });
  it('should remove an employee', async () => {
    const id = '7ef32b9a-2e22-46e6-a7f6-6297c28421bf';
    const employeeDeleted = await employeeRepository.delete(id);
    expect(employeeDeleted).toBeDefined();
    expect(employeeDeleted?.registration).toBe(id);

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

function prepareDatabaseForTests(db:JsonDB){
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
