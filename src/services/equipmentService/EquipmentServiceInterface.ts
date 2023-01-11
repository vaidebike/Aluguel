import { Bike } from '../../models/Bike';
import { Lock } from './FakeEquipmentServiceService';

export interface EquipmentServiceInterface {
  getBikeRentedByCyclist(cyclistId: string): Promise<Bike>;
  getLockById(idLock: string): Promise<Lock>;
  makeBikeInUse(idBike: string): Promise<Bike>;
  makeBikeFree(idBike: string): Promise<Bike>;
  unlockBike(idLock: string): Promise<Lock>;
  lockBike(idLock: string): Promise<Lock>;
  getBikeById(idBike: string): Promise<Bike>;
}