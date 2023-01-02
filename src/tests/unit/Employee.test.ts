import { CargoEnum, Funcionario } from '../../models/Funcionario';
test('Employee model', () => {
  const employee = new Funcionario();
  employee.matricula = '123456';
  employee.nome = 'John Doe';
  employee.email = 'jonh@email.com';
  employee.cpf = '123.456.789-10';
  employee.senha = '123456';
  employee.idade = 30;
  employee.cargo = CargoEnum.Admin;

  expect(employee.matricula).toBe('123456');
  expect(employee.nome).toBe('John Doe');
  expect(employee.email).toBe('jonh@email.com');
  expect(employee.cpf).toBe('123.456.789-10');
  expect(employee.senha).toBe('123456');
  expect(employee.idade).toBe(30);
  expect(employee.cargo).toBe(CargoEnum.Admin);
});