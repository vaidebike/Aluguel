import { Ciclista } from '../../models/Ciclista';
import { CyclistServiceInterface } from './CyclistServiceInterface';

export class FakeCyclistService implements CyclistServiceInterface{
  public async canRentBike(idCyclist: string): Promise<boolean> {
    const canRent = (idCyclist === 'd5446ea3-aa72-486f-9f11-203c5c04de67');
    return Promise.resolve(canRent);
  }
  public async notifyRentInProgress(idCyclist: string): Promise<Ciclista> {
    const cyclist = new Ciclista();
    cyclist.id = idCyclist;
    cyclist.nome = 'Ciclano';
  
    return Promise.resolve(cyclist);
  }
}