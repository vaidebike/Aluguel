export class Tranca {
  id: string;
  modelo: string;
  ano: number;
  status: string;
  localizacao: string;
  bicicleta: string;
  numero: number;
  anoDeFabricacao: number;
}

export enum StatusEnum {
  Ocupada = 'OCUPADA', // OCUPADA VS DISPONÍVEL
  Excluida = 'EXCLUIDA',
  Nova = 'NOVA',
  EmReparo = 'EM_REPARO',
  Disponivel = 'DISPONÍVEL',
  ReparoSolicitado = 'REPARO_SOLICITADO',
}