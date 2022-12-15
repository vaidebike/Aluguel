export interface EmailServiceInterface {
  sendEmail(email: string, message: string): Promise<boolean>;
}