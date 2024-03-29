import { Request, Response } from 'express';
import { JsonDB } from 'node-json-db';
import { DatabaseHandlerInterface } from '../database/DatabaseHandlerInterface';
import { NotFoundError } from '../errors/NotFoundError';
import { NotValidError } from '../errors/NotValidError';
import { Aluguel } from '../models/Aluguel';
import { CyclistRepository } from '../models/repositories/CyclistRepository';
import { RentRepository } from '../models/repositories/RentRepository';
import { CreditCardService } from '../services/creditCardService/CreditCardService';
import { CreditCardServiceInterface } from '../services/creditCardService/CreditCardServiceInterface';
import { FakeCreditCardService } from '../services/creditCardService/FakeCreditCardService';
import { EmailService } from '../services/emailService/EmailService';
import { EmailServiceInterface } from '../services/emailService/EmailServiceInterface';
import { FakeEmailService } from '../services/emailService/FakeEmailService';
import { EquipmentService } from '../services/equipmentService/EquipmentService';
import { EquipmentServiceInterface } from '../services/equipmentService/EquipmentServiceInterface';
import { FakeEquipmentService } from '../services/equipmentService/FakeEquipmentService';

export class ReturnController {
  private rentRepository: RentRepository;
  private cyclistRepository: CyclistRepository;
  private creditCardService: CreditCardServiceInterface;
  private emailService: EmailServiceInterface;
  private equipmentService: EquipmentServiceInterface;

  constructor(db: DatabaseHandlerInterface) {
    this.rentRepository = new RentRepository(db.db as JsonDB);
    this.cyclistRepository = new CyclistRepository(db.db as JsonDB);
  }

  public returnBike = async (req: Request, res: Response) => {
    const { bicicleta, trancaFim } = req.body;

    this.creditCardService = new CreditCardService();
    this.emailService = new EmailService();
    this.equipmentService = new EquipmentService();

    if (process.env.NODE_ENV == 'test') {
      this.creditCardService = new FakeCreditCardService();
      this.emailService = new FakeEmailService();
      this.equipmentService = new FakeEquipmentService();
    }


    try {
      if(!bicicleta) throw new NotValidError('Bicicleta não informada');
      
      await this.getRentByBike(bicicleta).then(async (rent) => {
        const valueToPay = await this.calculateValueToPay(rent);

        await this.chargeValue(rent.ciclista, valueToPay, this.creditCardService, this.emailService);

        await this.putBikeInLock(trancaFim, bicicleta, this.equipmentService);
        rent.trancaFim = trancaFim;
        rent.horaFim = new Date();

        await this.rentRepository.update(rent.id, rent);

        return res.status(200).json(rent);
      });

    } catch (error) {
      let status = 400;
      
      if (error instanceof NotValidError) status = 422;
      if (error instanceof NotFoundError) status = 404;

      return res.status(status).json({ error: error.message });
    }
  };

  private async putBikeInLock(idLock: string, idBike: string, equipmentService: EquipmentServiceInterface) {
    await equipmentService.lockBike(idLock, idBike);
  }

  private async sendMailWithCharge(valueToPay: number, email: string, emailService: EmailServiceInterface) {
    return emailService.sendEmail(email, `Você deve pagar R$ ${valueToPay} para finalizar o aluguel.`);
  }

  private async chargeValue(cyclistId: string, valueToPay: number, creditCardService: CreditCardServiceInterface, emailService: EmailServiceInterface) {
    await this.cyclistRepository.findOne(cyclistId).then(async (cyclist) => {
      if (valueToPay > 0) {
        await this.sendMailWithCharge(valueToPay, cyclist.email, emailService);
        return await creditCardService.makeCharge(cyclist.id_cartao);
      }
    });
  }

  private async getRentByBike(bicicleta: string): Promise<Aluguel> {
    return await this.rentRepository.getRentByBike(bicicleta);
  }

  private async calculateValueToPay(rent: Aluguel) {
    const horaInicio = new Date(rent.horaInicio);

    const time = new Date().getTime() - horaInicio.getTime();
    const hours = Math.ceil(time / (1000 * 60 * 60));

    return hours * 5;
  }
}


