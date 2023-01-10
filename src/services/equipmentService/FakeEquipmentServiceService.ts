import { v4 as uuidv4 } from 'uuid';
import { Bike, StatusEnum as StatusBike } from '../../models/Bike';
import { EquipmentServiceInterface } from './EquipmentServiceInterface';

export class FakeEquipmentService implements EquipmentServiceInterface {

  public async getBikeRentedByCyclist(cyclistId: string): Promise<Bike> {
    const bike = (cyclistId) ? null : new Bike();

    return Promise.resolve(bike);
  }

  public async getLockById(idLock: string): Promise<Lock> {
    const lock = (idLock) ? null : new Lock();
    lock.bike = uuidv4();

    return Promise.resolve(lock);
  }

  public async makeBikeInUse(idBike: string): Promise<Bike> {
    const bike = new Bike();
    bike.id = idBike;
    bike.status = StatusBike.InUse;

    return Promise.resolve(bike);
  }

  public async unlockBike(idLock: string): Promise<Lock>{
    const lock = (idLock) ? null : new Lock();
    lock.bike = uuidv4();

    return Promise.resolve(lock);
  }

}

export class Lock {
  id: string;
  model: string;
  year: number;
  status: string;
  localization: string;
  bike: string;
}

export enum StatusEnum {
  Locked = 'OCUPADA', // OCUPADA VS DISPONÍVEL
  Excluded = 'EXCLUIDA',
  New = 'NOVA',
  OnRepair = 'EM_REPARO',
  Available = 'DISPONÍVEL',
  ToBeRepaired = 'REPARO_SOLICITADO',
}