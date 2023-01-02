export class Funcionario{
  matricula?: string;
  nome: string;
  email: string;
  senha: string;
  idade: number;
  cargo: CargoEnum;
  cpf: string;
}

export enum CargoEnum {
  Admin = 'ADMINISTRADOR',
  Reparador = 'REPARADO',
}