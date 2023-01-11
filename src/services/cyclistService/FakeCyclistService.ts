import { Ciclista } from '../../models/Ciclista';
import { CyclistServiceInterface } from './CyclistServiceInterface';

export class FakeCyclistService implements CyclistServiceInterface{
  public async canRentBike(idCyclist: string): Promise<boolean> {
    return Promise.resolve(true);
  }
  public async notifyRentInProgress(idCyclist: string): Promise<Ciclista> {
    const cyclist = new Ciclista();
    cyclist.id = idCyclist;
    cyclist.nome = 'Ciclano';
  
    return Promise.resolve(cyclist);
  }
}