import { Request, Response } from 'express';
import { JsonDB } from 'node-json-db';
import { DatabaseHandlerInterface } from '../database/DatabaseHandlerInterface';
import { NotFoundError } from '../errors/NotFoundError';
import { NotValidError } from '../errors/NotValidError';
import { Aluguel } from '../models/Aluguel';
import { RentRepository } from '../models/repositories/RentRepository';
import { CreditCardService } from '../services/creditCardService/CreditCardService';
import { CreditCardServiceInterface } from '../services/creditCardService/CreditCardServiceInterface';
import { FakeCreditCardService } from '../services/creditCardService/FakeCreditCardService';
import { CyclistService } from '../services/cyclistService/CyclistService';
import { CyclistServiceInterface } from '../services/cyclistService/CyclistServiceInterface';
import { FakeCyclistService } from '../services/cyclistService/FakeCyclistService';
import { EmailService } from '../services/emailService/EmailService';
import { EmailServiceInterface } from '../services/emailService/EmailServiceInterface';
import { FakeEmailService } from '../services/emailService/FakeEmailService';
import { EquipmentServiceInterface } from '../services/equipmentService/EquipmentServiceInterface';
import { FakeEquipmentService, Lock } from '../services/equipmentService/FakeEquipmentServiceService';

export class RentController {
  private rentRepository: RentRepository;
  private equipmentService: EquipmentServiceInterface;
  private cyclistService: CyclistServiceInterface;
  private creditCardService: CreditCardServiceInterface;
  private emailService: EmailServiceInterface;

  constructor(db: DatabaseHandlerInterface) {
    this.rentRepository = new RentRepository(db.db as JsonDB);
  }


  public rentBike = async (req: Request, res: Response) => {
    const { ciclista, trancaInicio } = req.body;

    this.equipmentService = new FakeEquipmentService();
    this.creditCardService = new CreditCardService();
    this.cyclistService = new CyclistService(req.get('host'));
    this.emailService = new EmailService();

    if(process.env.NODE_ENV == 'test'){
      this.cyclistService = new FakeCyclistService();
      this.creditCardService = new FakeCreditCardService();
      this.emailService = new FakeEmailService();

    }

    try {
      const lock = await this.checkIfLockExistsAndHasBike(trancaInicio, this.equipmentService);

      await this.checkIfCyclistCanRentBike(ciclista, this.cyclistService);

      const charge = await this.chargeCyclist(ciclista, this.creditCardService);

      const rent = new Aluguel();
      rent.ciclista = ciclista;
      rent.trancaInicio = trancaInicio;
      rent.horaInicio = new Date();
      rent.bicicleta = lock.bike;
      rent.cobranca = charge.id;

      await this.equipmentService.makeBikeInUse(lock.bike);
      await this.equipmentService.unlockBike(lock.id);

      const newRent = await this.rentRepository.create(rent);

      await this.emailService.sendEmail(ciclista, 'Aluguel iniciado com sucesso.');

      res.status(201).send(newRent);
    } catch (error) {
      let status = 400;
      if (error instanceof NotValidError) status = 422;
      if (error instanceof NotFoundError) status = 404;

      res.status(status).send({ error: error.message });
    }
  };

  private async chargeCyclist(cyclistId: string, service: CreditCardServiceInterface) {
    const charge = await service.makeCharge(cyclistId);
    if (!charge) throw new NotValidError('Ciclista não pode alugar.');
    return charge;
  }

  private async checkIfLockExistsAndHasBike(lockId: string, service: EquipmentServiceInterface): Promise<Lock> {
    const lock = await service.getLockById(lockId);
    if (lock === null) throw new NotFoundError('Tranca não encontrada.');
    if (!lock.bike) throw new NotFoundError('Tranca sem bicicleta.');

    return lock;
  }

  private async checkIfCyclistCanRentBike(cyclistId: string, service: CyclistServiceInterface) {
    const canRent = await service.canRentBike(cyclistId);
    if (!canRent) {
      await service.notifyRentInProgress(cyclistId);
      throw new NotValidError('Ciclista não pode alugar.');
    }
  }
}