import { Request, Response } from 'express';
import { JsonDB } from 'node-json-db';
import { DatabaseHandlerInterface } from '../database/DatabaseHandlerInterface';
import { NotFoundError } from '../errors/NotFoundError';
import { NotValidError } from '../errors/NotValidError';
import { Ciclista } from '../models/Ciclista';
import { CyclistRepository } from '../models/repositories/CyclistRepository';
import { FakeCreditCardService } from '../services/creditCardService/FakeCreditCardService';
import { FakeEmailService } from '../services/emailService/FakeEmailService';

export class CyclistController {
  private cyclistRepository: CyclistRepository;

  constructor(db: DatabaseHandlerInterface) {
    this.cyclistRepository = new CyclistRepository(db.db as JsonDB);
  }

  /**
   * Get one cyclist by id
   * @Route GET /cyclist/:id
   * @returns  Cyclist 
   */
  public getOne = async (req: Request, res: Response) => {
    const { id } = req.params;
    
    try{
      const cyclist = await this.cyclistRepository.findOne(id);
      res.status(200).send(cyclist);
    }catch(error){
      let status = 400;
      
      if(error instanceof NotFoundError) status = 404;
      if(error instanceof NotValidError) status = 422;

      res.status(status).send({ error: error.message});
    }
  };

  /**
 * Create a cyclist
 * @Route POST /cyclist/
 * @returns  Cyclist created 
 */
  public create = async(req: Request, res: Response) => {
    const {ciclista, meioDePagamento} = req.body;

    const creditCardService = new FakeCreditCardService();
    const validCreditCard = await creditCardService.validateCreditCard(meioDePagamento);

    if(!validCreditCard) return res.status(422).send({ error: 'Invalid credit card'});

    try{
      const newCyclist = await this.cyclistRepository.create(ciclista) as Ciclista;

      const emailService = new FakeEmailService();
      await emailService.sendEmail(newCyclist.email, 'Clique aqui para confirmar seu e-mail');

      res.status(200).send(newCyclist);
    }catch(error){
      let status = 400;
      
      if(error instanceof NotValidError) status = 422;

      res.status(status).send({ error: error.message});
    }
  };

  public update = async (req: Request, res: Response) =>{
    res.status(400).send({ error: 'Not implemented' });
  };

  public delete = async (req: Request, res: Response) => {
    res.status(400).send({ error: 'Not implemented' });
  };

  public emailExists = async(req: Request, res: Response) => {
    const { email } = req.params;

    try{
      const exists = await this.cyclistRepository.verifyIfEmailExists(email);
      res.status(200).send({ exists });
    }catch(error){
      let status = 400;
      
      if(error instanceof NotValidError) status = 422;

      res.status(status).send({ error: error.message});
    }
  };
}