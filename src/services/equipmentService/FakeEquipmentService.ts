import { v4 as uuidv4 } from 'uuid';
import { NotValidError } from '../../errors/NotValidError';
import { Bike } from '../../models/Bike';
import { StatusEnum, Tranca } from '../../models/Tranca';
import { EquipmentServiceInterface } from './EquipmentServiceInterface';

export class FakeEquipmentService implements EquipmentServiceInterface {

  public async getBikeRentedByCyclist(cyclistId: string): Promise<Bike> {
    const bike = (cyclistId) ? null : new Bike();

    return Promise.resolve(bike);
  }

  public async getLockById(idLock: string): Promise<Tranca> {
    const lock = (idLock === '3fa85f64-5717-4562-b3fc-2c963f66afa6') ? new Tranca() : null;
    if (lock) {
      lock.bicicleta = uuidv4();
    }

    return Promise.resolve(lock);
  }

  public async unlockBike(idLock: string): Promise<Tranca> {
    const lock = (idLock) ? null : new Tranca();
    lock.status = StatusEnum.Disponivel;
    lock.bicicleta = uuidv4();

    return Promise.resolve(lock);
  }

  public async lockBike(idLock: string, idBike: string): Promise<Tranca> {
    if (!idLock) throw new NotValidError('Tranca não encontrada');
    if (!idBike) throw new NotValidError('Bicicleta não encontrada');

    const lock = new Tranca();
    lock.bicicleta = idBike;
    lock.status = StatusEnum.Ocupada;

    return Promise.resolve(lock);
  }

  public async getBikeById(idBike: string): Promise<Bike> {
    const bike = (idBike === 'a11dec00-ae9d-4e71-821f-a0d7ad3a8a7b') ? null : new Bike();
    if (bike) bike.id = idBike;

    return Promise.resolve(bike);
  }
}