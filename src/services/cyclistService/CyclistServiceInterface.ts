import { Ciclista } from '../../models/Ciclista';

export interface CyclistServiceInterface{
  canRentBike(idCyclist:string): Promise<boolean>;
  notifyRentInProgress(idCyclist: string): Promise<Ciclista>;
}