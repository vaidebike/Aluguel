import { v4 as uuidv4 } from 'uuid';
import { Bike, StatusEnum as StatusBike } from '../../models/Bike';
import { EquipmentServiceInterface } from './EquipmentServiceInterface';

export class FakeEquipmentService implements EquipmentServiceInterface {

  public async getBikeRentedByCyclist(cyclistId: string): Promise<Bike> {
    const bike = (cyclistId) ? null : new Bike();

    return Promise.resolve(bike);
  }

  public async getLockById(idLock: string): Promise<Lock> {
    const lock = (!idLock) ? null : new Lock();
    lock.bike = uuidv4();

    return Promise.resolve(lock);
  }

  public async makeBikeInUse(idBike: string): Promise<Bike> {
    const bike = new Bike();
    bike.id = idBike;
    bike.status = StatusBike.InUse;

    return Promise.resolve(bike);
  }

  public async makeBikeFree(idBike: string): Promise<Bike>{
    const bike = new Bike();
    bike.id = idBike;
    bike.status = StatusBike.Available;

    return Promise.resolve(bike);
  }

  public async unlockBike(idLock: string): Promise<Lock>{
    const lock = (idLock) ? null : new Lock();
    lock.status = StatusEnum.Available;
    lock.bike = uuidv4();

    return Promise.resolve(lock);
  }

  public async lockBike(idLock: string): Promise<Lock>{
    const lock = (idLock) ? null : new Lock();
    lock.bike = null;
    lock.status = StatusEnum.Locked;

    return Promise.resolve(lock);
  }

  public async getBikeById(idBike: string): Promise<Bike>{
    const bike = (!idBike) ? null : new Bike();
    bike.id = idBike;

    return Promise.resolve(bike);
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