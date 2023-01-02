import { Request, Response } from 'express';
import { NotFoundError } from '../errors/NotFoundError';
import { NotValidError } from '../errors/NotValidError';
import { CyclistRepository } from '../models/repositories/CyclistRepository';
import { FakeCreditCardService } from '../services/creditCardService/FakeCreditCardService';
import { FakeEmailService } from '../services/emailService/FakeEmailService';

export class CyclistController {

  /**
   * Get one cyclist by id
   * @Route GET /cyclist/:id
   * @returns  Cyclist 
   */
  public static async getOne(req: Request, res: Response) {
    const { id } = req.params;

    try{
      const cyclist = await new CyclistRepository(req.app.get('db')).findOne(id);
      res.status(200).send(cyclist);
    }catch(error){
      let status = 400;
      
      if(error instanceof NotFoundError) status = 404;
      if(error instanceof NotValidError) status = 422;

      res.status(status).send({ error: error.message});
    }
  }

  /**
 * Create a cyclist
 * @Route POST /cyclist/
 * @returns  Cyclist created 
 */
  public static async create(req: Request, res: Response) {
    const {ciclista, meioDePagamento} = req.body;

    const creditCardService = new FakeCreditCardService();
    const validCreditCard = await creditCardService.validateCreditCard(meioDePagamento);

    if(!validCreditCard) return res.status(422).send({ error: 'Invalid credit card'});

    try{
      const newCyclist = await new CyclistRepository(req.app.get('db')).create(ciclista);

      const emailService = new FakeEmailService();
      await emailService.sendEmail(newCyclist.email, 'Clique aqui para confirmar seu e-mail');

      res.status(200).send(newCyclist);
    }catch(error){
      let status = 400;
      
      if(error instanceof NotValidError) status = 422;

      res.status(status).send({ error: error.message});
    }
  }

  public static async update(req: Request, res: Response) {
    res.status(400).send({ error: 'Not implemented' });
  }

  public static async delete(req: Request, res: Response) {
    res.status(400).send({ error: 'Not implemented' });
  }

  public static async emailExists(req: Request, res: Response) {
    const { email } = req.params;

    try{
      const exists = await new CyclistRepository(req.app.get('db')).verifyIfEmailExists(email);
      res.status(200).send({ exists });
    }catch(error){
      let status = 400;
      
      if(error instanceof NotValidError) status = 422;

      res.status(status).send({ error: error.message});
    }
  }
}