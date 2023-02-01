import axios from 'axios';
import { EmailServiceInterface } from './EmailServiceInterface';

export class EmailService implements EmailServiceInterface {
  private apiURL = 'https://api.vaidebike.twdo.app/';

  public async sendEmail(email: string, mensagem: string): Promise<boolean> {
    const endpoint = 'enviarEmail';

    try{
      const creditCardValid = await axios.post(`${this.apiURL}${endpoint}`, {email, mensagem});
      
      return creditCardValid.status == 200;
    }catch(error){
      return false;
    }
  }
}