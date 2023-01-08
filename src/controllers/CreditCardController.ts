import { Request, Response } from 'express';
import { JsonDB } from 'node-json-db';
import { DatabaseHandlerInterface } from '../database/DatabaseHandlerInterface';
import { NotFoundError } from '../errors/NotFoundError';
import { NotValidError } from '../errors/NotValidError';
import { CreditCardRepository } from '../models/repositories/CreditCardRepository';
import { CyclistRepository } from '../models/repositories/CyclistRepository';

export class CreditCardController {

  private creditCardRepository: CreditCardRepository;
  private cyclistRepository: CyclistRepository;

  constructor(db: DatabaseHandlerInterface) {
    this.creditCardRepository = new CreditCardRepository(db.db as JsonDB);
    this.cyclistRepository = new CyclistRepository(db.db as JsonDB);
  }

  public findByCyclist = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const cyclist = await this.cyclistRepository.findOne(id);
      const creditCard = await this.creditCardRepository.findOne(cyclist.id_cartao);
      res.status(200).send(creditCard);
    } catch (error) {
      let status = 400;

      if(error instanceof NotFoundError) status = 404;
      if(error instanceof NotValidError) status = 422;
      
      res.status(status).send({ error: error.message });
    }

  };

}