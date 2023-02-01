import { Request, Response } from 'express';
import { JsonDB } from 'node-json-db';
import { DatabaseHandlerInterface } from '../database/DatabaseHandlerInterface';
import { NotFoundError } from '../errors/NotFoundError';
import { NotValidError } from '../errors/NotValidError';
import { CreditCardRepository } from '../models/repositories/CreditCardRepository';
import { CyclistRepository } from '../models/repositories/CyclistRepository';
import { CreditCardService } from '../services/creditCardService/CreditCardService';
import { CreditCardServiceInterface } from '../services/creditCardService/CreditCardServiceInterface';
import { FakeCreditCardService } from '../services/creditCardService/FakeCreditCardService';
import { FakeEmailService } from '../services/emailService/FakeEmailService';

export class CreditCardController {

  private creditCardRepository: CreditCardRepository;
  private cyclistRepository: CyclistRepository;
  private creditCardService: CreditCardServiceInterface;


  constructor(db: DatabaseHandlerInterface) {
    this.creditCardRepository = new CreditCardRepository(db.db as JsonDB);
    this.cyclistRepository = new CyclistRepository(db.db as JsonDB);
  }

  /**
   * Get credit card by cyclist id
   *  @Route GET /cartaoDeCredito/:idCiclista
   * @returns CartaoDeCredito Cartão de credito do ciclista
   */
  public findByCyclist = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const cyclist = await this.cyclistRepository.findOne(id);
      const creditCard = await this.creditCardRepository.findOne(cyclist.id_cartao);
      res.status(200).send(creditCard);
    } catch (error) {
      let status = 400;

      if (error instanceof NotFoundError) status = 404;
      if (error instanceof NotValidError) status = 422;

      res.status(status).send({ error: error.message });
    }
  };

  /**
   * Update a credit card by cyclist id
   * @Route PUT /cartaoDeCredito/:idCiclista
   * @returns CartaoDeCredito Cartão de credito do ciclista
   */
  public update = async (req: Request, resp: Response) => {
    const { id } = req.params;
    const creditCard = req.body;

    try {

      this.creditCardService = new CreditCardService();
      if(process.env.NODE_ENV == 'test'){
        this.creditCardService = new FakeCreditCardService();
      }

      const validCreditCard = await this.creditCardService.validateCreditCard(creditCard);
      if (!validCreditCard) throw new NotValidError('Cartão de crédito inválido');

      const cyclist = await this.cyclistRepository.findOne(id);
      creditCard.id = cyclist.id_cartao;

      const creditCardUpdated = await this.creditCardRepository.update(cyclist.id_cartao, creditCard);

      const fakeEmailService = new FakeEmailService();
      fakeEmailService.sendEmail(cyclist.email, 'Seu cartão de crédito foi atualizado com sucesso');
      resp.status(200).send(creditCardUpdated);
    } catch (error) {
      let status = 400;

      if (error instanceof NotFoundError) status = 404;
      if (error instanceof NotValidError) status = 422;

      resp.status(status).send({ error: error.message });
    }
  };
}