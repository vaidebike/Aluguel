import { EmailServiceInterface } from './EmailServiceInterface';

export class FakeEmailService implements EmailServiceInterface {
  public async sendEmail(email: string, message: string): Promise<boolean> {
    return Promise.resolve(true);
  }
}