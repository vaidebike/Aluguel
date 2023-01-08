import { CartaoDeCredito } from '../../models/CartaoDeCredito';
import { CreditCardServiceInterface } from './CreditCardServiceInterface';

export class FakeCreditCardService implements CreditCardServiceInterface {
  public async validateCreditCard(creditCard: CartaoDeCredito): Promise<boolean> {
    if(!creditCard) return Promise.resolve(false);
    return Promise.resolve(true);
  }
}