export class NotValidError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NotValidError';
  }
}