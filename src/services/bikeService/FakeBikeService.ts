import { Bike } from '../../models/Bike';
import { BikeServiceInterface } from './BikeServiceInterface';

export class FakeBikeService implements BikeServiceInterface {

  public async getBikeRentedByCyclist(cyclistId: string): Promise<Bike> {
    const bike = (cyclistId) ? null : new Bike();
    
    return Promise.resolve(bike);
  }

}