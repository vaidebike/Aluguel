import axios from 'axios';
import { NotValidError } from '../../errors/NotValidError';
import { Bike } from '../../models/Bike';
import { Tranca } from '../../models/Tranca';
import { EquipmentServiceInterface } from './EquipmentServiceInterface';


export class EquipmentService implements EquipmentServiceInterface {
  private apiURL = 'https://equipamento-api-vaidebike.herokuapp.com/';

  public async getBikeRentedByCyclist(cyclistId: string): Promise<Bike> {
    const endpoint = 'bicicleta/alugadaPor/';

    try {
      const response = await axios.get(`${this.apiURL}${endpoint}${cyclistId}`);

      const { data } = response;
      const bike = new Bike();
      bike.id = data.id;
      bike.marca = data.marca;
      bike.modelo = data.modelo;
      bike.ano = data.ano;
      bike.numero = data.numero;
      bike.status = data.status;

      return bike;
    } catch (error) {
      throw new NotValidError(error.response.data.mensagem);
    }
  }

  public async getLockById(idLock: string): Promise<Tranca> {

    const endpoint = 'tranca/';

    try {
      const response = await axios.get(`${this.apiURL}${endpoint}${idLock}`);

      const { data } = response;
      if (data.bicicleta === '') return null;

      const lock = new Tranca();
      lock.id = data.id;
      lock.status = data.status;
      lock.bicicleta = data.bicicleta;
      lock.numero = data.numero;
      lock.localizacao = data.localizacao;
      lock.modelo = data.modelo;
      lock.anoDeFabricacao = data.anoDeFabricacao;



      return lock;
    } catch (error) {
      throw new NotValidError(error.response.data.mensagem);
    }

  }


  public async unlockBike(idLock: string): Promise<Tranca> {
    const endpoint = `${this.apiURL}tranca/${idLock}/destrancar`;

    try {
      const response = await axios.post(endpoint);

      const { data } = response;

      console.log('************************');
      console.log(data);

      const lock = new Tranca();
      lock.id = data.id;
      lock.status = data.status;
      lock.bicicleta = data.bicicleta;

      return lock;
    } catch (error) {

      throw new NotValidError(error.response.data.mensagem);
    }
  }

  public async lockBike(idLock: string, idBike: string): Promise<Tranca> {
    const endpoint = `${this.apiURL}tranca/${idLock}/trancar/`;

    try {
      const response = await axios.post(endpoint, { bicicleta: idBike });

      const { data } = response;



      const lock = new Tranca();
      lock.id = data.id;
      lock.status = data.status;
      lock.bicicleta = data.bicicleta;

      return lock;
    } catch (error) {
      throw new NotValidError(error.response.data.mensagem);
    }
  }

  public async getBikeById(idBike: string): Promise<Bike> {
    const endpoint = 'bicicleta/';

    const response = await axios.get(`${this.apiURL}${endpoint}${idBike}`);

    const { data } = response;
    const bike = new Bike();
    bike.id = data.id;
    bike.marca = data.marca;
    bike.modelo = data.modelo;
    bike.ano = data.ano;
    bike.numero = data.numero;
    bike.status = data.status;

    return bike;

  }
}

