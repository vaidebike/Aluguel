import { CreditCard } from '../../models/CreditCard';
import { CreditCardServiceInterface } from './CreditCardServiceInterface';

export class FakeCreditCardService implements CreditCardServiceInterface {
  public async validateCreditCard(creditCard: CreditCard): Promise<boolean> {
    if(!creditCard) return Promise.resolve(false);
    return Promise.resolve(true);
  }
}