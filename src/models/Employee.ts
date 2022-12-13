export class Employee{
  registration?: string;
  name: string;
  email: string;
  password: string;
  age: number;
  role: RoleEnum;
  cpf: string;
}

export enum RoleEnum {
  Admin = 'ADMINISTRATOR',
  Repairman = 'REPAIRMAN',
}