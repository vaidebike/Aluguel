export class Ciclista {
  id?: string;
  status?: StatusEnum;
  nome: string;
  nascimento: Date;
  cpf?: string;
  passaporte?:{
    numero: string;
    validade: Date;
    pais: string;
  };
  nacionalidade: string;
  email: string;
  urlFotoDocumento: string;
  senha: string;
  confirma_senha: string;
  id_cartao?: string;
}

export enum StatusEnum {
  Ativo = 'ATIVO',
  Inativo = 'INATIVO',
  AguardandoConfirmacao = 'AGUARDANDO_CONFIRMACAO'
}
