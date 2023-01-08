import { CartaoDeCredito } from '../../models/CartaoDeCredito';
import { CreditCardServiceInterface } from './CreditCardServiceInterface';

export class FakeCreditCardService implements CreditCardServiceInterface {
  public async validateCreditCard(creditCard: CartaoDeCredito): Promise<boolean> {
    if(!creditCard || !creditCard.numero) return Promise.resolve(false);
    return Promise.resolve(true);
  }
}