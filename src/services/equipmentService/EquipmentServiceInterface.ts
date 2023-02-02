import { Bike } from '../../models/Bike';
import { Tranca } from '../../models/Tranca';

export interface EquipmentServiceInterface {
  getBikeRentedByCyclist(cyclistId: string): Promise<Bike>;
  getLockById(idLock: string): Promise<Tranca>;
  makeBikeInUse(idBike: string): Promise<Bike>;
  makeBikeFree(idBike: string): Promise<Bike>;
  unlockBike(idLock: string): Promise<Tranca>;
  lockBike(idLock: string, idBike: string): Promise<Tranca>;
  getBikeById(idBike: string): Promise<Bike>;
}