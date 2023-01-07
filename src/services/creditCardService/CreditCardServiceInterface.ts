import { CartaoDeCredito } from '../../models/CartaoDeCredito';

export interface CreditCardServiceInterface { 
  validateCreditCard(creditCard: CartaoDeCredito): Promise<boolean>;
}