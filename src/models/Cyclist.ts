export class Cyclist {
  id?: string;
  status?: StatusEnum;
  name: string;
  nascimento: Date;
  cpf: string;
  passaporte:{
    number: string;
    expiration: Date;
    contry: string;
  };
  nationality: string;
  email: string;
  urlDocumentPhoto: string;
  password: string;
}

export enum StatusEnum {
  Active = 'ATIVO',
  Inactive = 'INATIVO',
  WatingConfirmation = 'AGUARDANDO_CONFIRMACAO'
}
