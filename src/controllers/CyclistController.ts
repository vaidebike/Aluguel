import { Request, Response } from 'express';
import { JsonDB } from 'node-json-db';
import { DatabaseHandlerInterface } from '../database/DatabaseHandlerInterface';
import { AlreadyInUseError } from '../errors/AlreadyInUseError';
import { NotFoundError } from '../errors/NotFoundError';
import { NotValidError } from '../errors/NotValidError';
import { CreditCardRepository } from '../models/repositories/CreditCardRepository';
import { CyclistRepository } from '../models/repositories/CyclistRepository';
import { CreditCardService } from '../services/creditCardService/CreditCardService';
import { CreditCardServiceInterface } from '../services/creditCardService/CreditCardServiceInterface';
import { FakeCreditCardService } from '../services/creditCardService/FakeCreditCardService';
import { EmailService } from '../services/emailService/EmailService';
import { EmailServiceInterface } from '../services/emailService/EmailServiceInterface';
import { FakeEmailService } from '../services/emailService/FakeEmailService';
import { FakeEquipmentService } from '../services/equipmentService/FakeEquipmentServiceService';

export class CyclistController {

  private cyclistRepository: CyclistRepository;
  private creditCardRepository: CreditCardRepository;
  private creditCardService: CreditCardServiceInterface;
  private emailService: EmailServiceInterface;

  constructor(db: DatabaseHandlerInterface) {
    this.cyclistRepository = new CyclistRepository(db.db as JsonDB);
    this.creditCardRepository = new CreditCardRepository(db.db as JsonDB);
  }

  /**
   * Get one cyclist by id
   * @Route GET /ciclista/:id
   * @returns  Cyclist 
   */
  public getOne = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const cyclist = await this.cyclistRepository.findOne(id);
      res.status(200).send(cyclist);
    } catch (error) {
      let status = 400;

      if (error instanceof NotFoundError) status = 404;
      if (error instanceof NotValidError) status = 422;

      res.status(status).send({ error: error.message });
    }
  };

  /**
 * Create a cyclist
 * @Route POST /ciclista/
 * @returns  Cyclist created 
 */
  public create = async (req: Request, res: Response) => {
    const { ciclista, meioDePagamento } = req.body;

    this.creditCardService = new CreditCardService();
    this.emailService = new EmailService();
    if(process.env.NODE_ENV == 'test'){
      this.creditCardService = new FakeCreditCardService();
      this.emailService = new FakeEmailService();
    }

    const validCreditCard = await this.creditCardService.validateCreditCard(meioDePagamento);

    if (!ciclista) return res.status(422).send({ error: 'Ciclista inválido.' });
    if (!validCreditCard) return res.status(422).send({ error: 'Cartão de crédito inválido.' });

    try {
      const newCreditCard = await this.creditCardRepository.create(meioDePagamento);
      ciclista.id_cartao = newCreditCard.id;
      const newCyclist = await this.cyclistRepository.create(ciclista);
     

      const confirmEmailUrl = `${req.protocol}://${req.get('host')}/ciclista/${newCyclist?.id}/ativar`;

      await this.emailService.sendEmail(newCyclist?.email, `Por favor, confirme o e-mail através do link: ${confirmEmailUrl}`);

      res.status(200).send({ ciclista: newCyclist, confirmEmailUrl });
    } catch (error) {
      let status = 400;

      if (error instanceof NotValidError) status = 422;

      res.status(status).send({ error: error.message });
    }
  };

  /**
   * Create a cyclist
   * @Route PUT /ciclista/
   * @returns  Cyclist updated 
   */
  public update = async (req: Request, res: Response) => {
    const { ciclista } = req.body;
    const id = req.params.id;

    this.emailService = new EmailService();
    if(process.env.NODE_ENV == 'test'){
      this.emailService = new FakeEmailService();
    }

    try {
      const newCyclist = await this.cyclistRepository.update(id, ciclista);

      this.emailService.sendEmail(newCyclist?.email, 'Dados atualizados com sucesso');

      res.status(200).send(newCyclist);
    } catch (error) {
      let status = 400;

      if (error instanceof NotValidError) status = 422;
      if (error instanceof NotFoundError) status = 404;

      res.status(status).send({ error: error.message });
    }
  };

  public delete = async (req: Request, res: Response) => {
    res.status(400).send({ error: 'Not implemented' });
  };

  /**
   *  Verify if email exists
   * @Route GET /ciclista/email/:email
   * @returns  true if exists, false otherwise
   */
  public emailExists = async (req: Request, res: Response) => {
    const { email } = req.params;

    try {
      const exists = await this.cyclistRepository.verifyIfEmailExists(email);
      res.status(200).send({ exists });
    } catch (error) {
      let status = 400;

      if (error instanceof NotValidError) status = 422;

      res.status(status).send({ error: error.message });
    }
  };

  /**
   * Activate a cyclist account
   * @Route POST /ciclista/:id/ativar
   * @returns  Cyclist updated 
   */
  public activate = async (req: Request, res: Response) => {
    const { id } = req.params;

    this.emailService = new EmailService();
    if(process.env.NODE_ENV == 'test'){
      this.emailService = new FakeEmailService();
    }

    try {
      const cyclist = await this.cyclistRepository.activate(id);

      this.emailService.sendEmail(cyclist?.email, 'Conta ativada com sucesso');

      res.status(200).send(cyclist);
    } catch (error) {
      let status = 400;

      if (error instanceof NotFoundError) status = 404;
      if (error instanceof NotValidError) status = 422;
      if (error instanceof AlreadyInUseError) status = 409;

      res.status(status).send({ error: error.message });
    }
  };

  /**
   *  Verify if the cyclist can rent a bike.
   *  A cyclist can only rent a bike if the account is activated and
   *  there is no active rent.
   *  @Route GET /ciclista/:id/permiteAluguel
   *  @returns  true if can rent, false otherwise
   */
  public canRent = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const cyclistActive = await this.cyclistRepository.verifyStatus(id);

      const bikeService = new FakeEquipmentService();

      const bikeRented = await bikeService.getBikeRentedByCyclist((cyclistActive) ? id : null);

      const canRent = cyclistActive && !bikeRented;

      res.status(200).send(canRent);
    } catch (error) {
      let status = 400;

      if (error instanceof NotFoundError) status = 404;
      if (error instanceof NotValidError) status = 422;

      res.status(status).send({ error: error.message });
    }
  };

  /**
   * Send a email message to the cyclist notifying that the rent is in progress
   * and he cannot rent another bike.
   * @Route POST /ciclista/:id/notificaAluguelEmCurso
   * @returns  Cyclist updated
   */
  public notifyRentInProgress = async (req: Request, res: Response) => {
    const { id } = req.params;


    this.emailService = new EmailService();
    if(process.env.NODE_ENV == 'test'){
      this.emailService = new FakeEmailService();
    }

    try {
      const cyclist = await this.cyclistRepository.findOne(id);

      this.emailService.sendEmail(cyclist.email, 'Aluguel em andamento');

      res.status(200).send(cyclist);
    } catch (error) {
      let status = 400;

      if (error instanceof NotFoundError) status = 404;
      if (error instanceof NotValidError) status = 422;

      res.status(status).send({ error: error.message });
    }
  };
}