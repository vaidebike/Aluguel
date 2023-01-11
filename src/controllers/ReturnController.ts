import { Request, Response } from 'express';
import { JsonDB } from 'node-json-db';
import { DatabaseHandlerInterface } from '../database/DatabaseHandlerInterface';
import { NotValidError } from '../errors/NotValidError';
import { Aluguel } from '../models/Aluguel';
import { Ciclista } from '../models/Ciclista';
import { CyclistRepository } from '../models/repositories/CyclistRepository';
import { RentRepository } from '../models/repositories/RentRepository';
import { CreditCardServiceInterface } from '../services/creditCardService/CreditCardServiceInterface';
import { FakeCreditCardService } from '../services/creditCardService/FakeCreditCardService';
import { EmailServiceInterface } from '../services/emailService/EmailServiceInterface';
import { FakeEmailService } from '../services/emailService/FakeEmailService';
import { EquipmentServiceInterface } from '../services/equipmentService/EquipmentServiceInterface';
import { FakeEquipmentService } from '../services/equipmentService/FakeEquipmentServiceService';

export class ReturnController {
  private rentRepository: RentRepository;
  private cyclistRepository: CyclistRepository;

  constructor(db: DatabaseHandlerInterface) {
    this.rentRepository = new RentRepository(db.db as JsonDB);
    this.cyclistRepository = new CyclistRepository(db.db as JsonDB);
  }

  public returnBike = async (req: Request, res: Response) => {
    const { bicicleta, trancaFim } = req.body;

    const equipmentService = new FakeEquipmentService();
    const emailService = new FakeEmailService();
    const creditCardService = new FakeCreditCardService();

    try {
      await this.validateBike(bicicleta, equipmentService);

      const rent = await this.getRentByBike(bicicleta);
      const valueToPay = await this.calculateValueToPay(rent);
      const cyclist = await this.cyclistRepository.findOne(rent.ciclista);

      if (valueToPay > 0) {
        await this.sendMailWithCharge(valueToPay, cyclist, emailService);
        await this.chargeValue(cyclist, creditCardService);
      }

      await this.putBikeInLock(trancaFim, bicicleta, equipmentService);

      rent.trancaFim = trancaFim;
      rent.horaFim = new Date();

      await this.rentRepository.update(rent.id, rent);

      return res.status(200).json(rent);
    } catch (error) {
      let status = 400;
      if (error instanceof NotValidError) status = 422;
      
      return res.status(status).json({ error: error.message });
    }
  };

  private async putBikeInLock(idLock: string, idBike: string, equipmentService: EquipmentServiceInterface) {
    await equipmentService.makeBikeFree(idBike);
    await equipmentService.lockBike(idLock);
  }

  private async sendMailWithCharge(valueToPay: number, cyclist: Ciclista, emailService: EmailServiceInterface) {
    return emailService.sendEmail(cyclist.email, `Você deve pagar R$ ${valueToPay} para finalizar o aluguel.`);
  }

  private async chargeValue(cyclist: Ciclista, creditCardService: CreditCardServiceInterface) {
    return creditCardService.makeCharge(cyclist.id_cartao);
  }

  private async getRentByBike(bicicleta: string): Promise<Aluguel> {
    const rent = await this.rentRepository.getRentByBike(bicicleta);
    if (!rent) throw new NotValidError('Aluguel não encontrado.');
    return rent;
  }

  private async calculateValueToPay(rent: Aluguel) {
    const time = new Date().getTime() - rent.horaInicio.getTime();
    const hours = Math.ceil(time / (1000 * 60 * 60));

    return hours * 5;
  }


  private async validateBike(bicicleta: string, service: EquipmentServiceInterface) {
    if (!bicicleta) throw new NotValidError('Bicicleta não informada.');

    const bike = service.getBikeById(bicicleta);
    if (!bike) throw new NotValidError('Bicicleta não encontrada.');
  }
}


