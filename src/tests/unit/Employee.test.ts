import { Employee, RoleEnum } from '../../models/Employee';
test('Employee model', () => {
  const employee = new Employee();
  employee.registration = '123456';
  employee.name = 'John Doe';
  employee.email = 'jonh@email.com';
  employee.cpf = '123.456.789-10';
  employee.password = '123456';
  employee.age = 30;
  employee.role = RoleEnum.Admin;

  expect(employee.registration).toBe('123456');
  expect(employee.name).toBe('John Doe');
  expect(employee.email).toBe('jonh@email.com');
  expect(employee.cpf).toBe('123.456.789-10');
  expect(employee.password).toBe('123456');
  expect(employee.age).toBe(30);
  expect(employee.role).toBe(RoleEnum.Admin);
});