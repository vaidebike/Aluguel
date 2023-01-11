import axios from 'axios';
import { Ciclista } from '../../models/Ciclista';

export class CyclistService {
  private hostname: string;

  constructor() {
    this.hostname = 'localhost:4002';
  }
  public async canRentBike(idCyclist:string): Promise<boolean> {
    const canRent = await (await axios.post(`http://${this.hostname}/ciclista/${idCyclist}/permiteAluguel`)).data;
    return canRent;
  }

  public async notifyRentInProgress(idCyclist: string): Promise<Ciclista>{
    const cyclist = (await axios.post(`http://${this.hostname}/ciclista/${idCyclist}/notificaAluguelEmCurso`)).data;

    return cyclist;
  }

}