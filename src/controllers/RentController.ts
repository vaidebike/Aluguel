import { Request, Response } from 'express';
import { JsonDB } from 'node-json-db';
import { DatabaseHandlerInterface } from '../database/DatabaseHandlerInterface';
import { NotValidError } from '../errors/NotValidError';
import { Aluguel } from '../models/Aluguel';
import { RentRepository } from '../models/repositories/RentRepository';
import { FakeCreditCardService } from '../services/creditCardService/FakeCreditCardService';
import { CyclistService } from '../services/cyclistService/CyclistService';
import { FakeEmailService } from '../services/emailService/FakeEmailService';
import { FakeEquipmentService } from '../services/equipmentService/FakeEquipmentServiceService';

export class RentController {
  private rentRepository: RentRepository;


  constructor(db: DatabaseHandlerInterface) {
    this.rentRepository = new RentRepository(db.db as JsonDB);
  }


  public rentBike = async (req: Request, res: Response) => {
    const { ciclista, trancaInicio } = req.body;

    const equipmentService = new FakeEquipmentService();
    const cyclistService = new CyclistService();

    //check if the lock exists and has a bike
    const lock = await equipmentService.getLockById(trancaInicio);
    if (!lock) return res.status(422).send({ error: 'Tranca inválida.' });
    if (!lock.bike) return res.status(422).send({ error: 'Tranca sem bicicleta.' });

    //check if the cyclist can rent a bike
    const canRent = await cyclistService.canRentBike(ciclista);
    if (!canRent) {
      await cyclistService.notifyRentInProgress(ciclista);
      return res.status(422).send({ error: 'Ciclista não pode alugar.' });
    }


    //send the carge for cardService
    const creditCardService = new FakeCreditCardService();
    const charge = await creditCardService.makeCharge(ciclista);
    if (!charge) return res.status(422).send({ error: 'Cobrança não realizada.' });


    const rent = new Aluguel();
    rent.ciclista = ciclista;
    rent.trancaInicio = trancaInicio;
    rent.horaInicio = new Date();
    rent.bicicleta = lock.bike;
    rent.cobranca = charge.id;

    await equipmentService.makeBikeInUse(lock.bike);
    await equipmentService.unlockBike(lock.id);

    try {
      const newRent = await this.rentRepository.create(rent);

      const emailService = new FakeEmailService();
      await emailService.sendEmail(ciclista, 'Aluguel iniciado com sucesso.');

      res.status(201).send(newRent);
    } catch (error) {
      let status = 400;
      if (error instanceof NotValidError) status = 422;

      res.status(status).send({ error: error.message });
    }
  };

}