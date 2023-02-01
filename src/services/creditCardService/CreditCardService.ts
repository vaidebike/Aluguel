import axios from 'axios';
import { CartaoDeCredito } from '../../models/CartaoDeCredito';
import { CreditCardServiceInterface } from './CreditCardServiceInterface';
import { Cobranca } from './FakeCreditCardService';

export class CreditCardService implements CreditCardServiceInterface {
  private apiURL = 'https://api.vaidebike.twdo.app/';
  
  
  public async validateCreditCard(creditCard: CartaoDeCredito): Promise<boolean> {
    const endpoint = 'validaCartaoDeCredito';

    try{
      const creditCardValid = await axios.post(`${this.apiURL}${endpoint}`, creditCard);
      return creditCardValid.status == 200;
    }catch(error){
      return false;
    }
  }

  public async makeCharge(cyclist: string): Promise<Cobranca>{
    if(!cyclist) return Promise.resolve(null);

    const endpoint = 'cobranca';
    const valor = 5;
    const ciclista = cyclist;

    try{
      const reqCobranca = await axios.post(`${this.apiURL}${endpoint}`, {valor, ciclista});
      const cobrancaData = reqCobranca.data.data;
      
      const cobranca = new Cobranca();
      cobranca.id = cobrancaData.id;
      cobranca.status = cobrancaData.status;
      cobranca.horaSolicitacao = cobrancaData.horaSolicitacao;
      cobranca.valor = cobrancaData.valor;
      cobranca.ciclista = cobrancaData.ciclista;
      cobranca.horaFinalizacao = cobrancaData.horaFinalizacao;

      return cobranca;
    }catch(error){
      return null;
    }


  }
} 

