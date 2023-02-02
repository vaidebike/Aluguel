export class Bike {
  id: string;
  marca: string;
  modelo: string;
  ano: number;
  numero: string;
  status: string;
}

export enum StatusEnum {
  Disponivel = 'DISPONIVEL',
  EmUso = 'EM_USO',
  Nova = 'NOVA',
  Aposentada = 'APOSENTADA',
  ReparoSolicitado = 'REPARO_SOLICITADO',
  EmReparo = 'EM_REPARO',
}