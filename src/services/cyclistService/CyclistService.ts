import axios from 'axios';
import { Ciclista } from '../../models/Ciclista';
import { CyclistServiceInterface } from './CyclistServiceInterface';

export class CyclistService implements CyclistServiceInterface {
  private hostname: string;

  constructor(host: string) {
    this.hostname = host;
  }
  public async canRentBike(idCyclist: string): Promise<boolean> {
    const canRent = await axios.get(`http://${this.hostname}/ciclista/${idCyclist}/permiteAluguel/`).then(data => data.data);
    console.log(canRent);
    
    return canRent;
  }

  public async notifyRentInProgress(idCyclist: string): Promise<Ciclista> {
    const cyclist = (await axios.post(`http://${this.hostname}/ciclista/${idCyclist}/notificaAluguelEmCurso/`)).data;

    return cyclist;
  }

}