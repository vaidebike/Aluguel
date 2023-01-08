import { Bike } from '../../models/Bike';

export interface BikeServiceInterface {
  getBikeRentedByCyclist(cyclistId: string): Promise<Bike>;
}