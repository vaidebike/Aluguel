import { CartaoDeCredito } from '../../models/CartaoDeCredito';
import { Cobranca } from './FakeCreditCardService';

export interface CreditCardServiceInterface { 
  validateCreditCard(creditCard: CartaoDeCredito): Promise<boolean>;
  makeCharge(cyclist: string): Promise<Cobranca>;
  
}