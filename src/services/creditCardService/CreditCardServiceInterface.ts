import { CreditCard } from '../../models/CreditCard';

export interface CreditCardServiceInterface { 
  validateCreditCard(creditCard: CreditCard): Promise<boolean>;
}