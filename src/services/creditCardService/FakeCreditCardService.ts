import { CartaoDeCredito } from '../../models/CartaoDeCredito';
import { CreditCardServiceInterface } from './CreditCardServiceInterface';

export class FakeCreditCardService implements CreditCardServiceInterface {
  public async validateCreditCard(creditCard: CartaoDeCredito): Promise<boolean> {
    if(!creditCard || !creditCard.numero) return Promise.resolve(false);
    return Promise.resolve(true);
  }

  public async makeCharge(cyclist: string): Promise<Cobranca>{
    if(!cyclist) return Promise.resolve(null);

    const cobranca = new Cobranca();
    cobranca.id = '123';
    cobranca.status = 'CONFIRMADA';
    cobranca.horaSolicitacao = new Date();
    cobranca.valor = 10;
    cobranca.ciclista = cyclist;
    cobranca.horaFinalizacao = new Date();

    return Promise.resolve(cobranca);
  }
}

export class Cobranca{
  id?: string;
  status?: string;
  horaSolicitacao?: Date;
  horaFinalizacao?: Date;
  valor?: number;
  ciclista?: string;
}