import { Ciclista } from '../../models/Ciclista';

export class CyclistService {
  private hostname: string;

  constructor() {
    this.hostname = 'localhost:4002';
  }
  public async canRentBike(idCyclist:string): Promise<boolean> {
    const canRent = await fetch(`http://${this.hostname}/ciclista/${idCyclist}/permiteAluguel`)
      .then(response => response.json());

    return canRent;
  }

  public async notifyRentInProgress(idCyclist: string): Promise<Ciclista>{
    const cyclist = await fetch(`http://${this.hostname}/ciclista/${idCyclist}/notificaAluguelEmCurso`)
      .then(response => response.json());

    return cyclist;
  }

}