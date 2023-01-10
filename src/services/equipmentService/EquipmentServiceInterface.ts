import { Bike } from '../../models/Bike';

export interface EquipmentServiceInterface {
  getBikeRentedByCyclist(cyclistId: string): Promise<Bike>;
}