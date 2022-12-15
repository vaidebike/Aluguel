export class Cyclist {
  id?: string;
  status?: StatusEnum;
  name: string;
  birthday: Date;
  cpf?: string;
  passport?:{
    number: string;
    expiration: Date;
    country: string;
  };
  nationality: string;
  email: string;
  urlDocumentPhoto: string;
  password: string;
  password2: string;
}

export enum StatusEnum {
  Active = 'ATIVO',
  Inactive = 'INATIVO',
  WatingConfirmation = 'AGUARDANDO_CONFIRMACAO'
}
