import axios from 'axios';
import { Bike } from '../../models/Bike';
import { Tranca } from '../../models/Tranca';
import { EquipmentServiceInterface } from './EquipmentServiceInterface';

export class EquipmentService implements EquipmentServiceInterface {
  private apiURL = 'https://equipamento-api-vaidebike.herokuapp.com/';

  public async getBikeRentedByCyclist(cyclistId: string): Promise<Bike> {
    const endpoint = 'bicicleta/alugadaPor/';

    try{
      const response = await axios.get(`${this.apiURL}${endpoint}${cyclistId}`);
      
      const {data} = response;
      const bike = new Bike();
      bike.id = data.content.id;
      bike.marca = data.content.marca;
      bike.modelo = data.content.modelo;
      bike.ano = data.content.ano;
      bike.numero = data.content.numero;
      bike.status = data.content.status;

      return bike;
    }catch(error){
      return null;
    }
  }

  public async getLockById(idLock: string): Promise<Tranca> {
    const endpoint = 'tranca/';
    
    try{
      const response = await axios.get(`${this.apiURL}${endpoint}${idLock}`);

      const {data} = response;
      if(data.content.bicicleta === '') return null;
      
      const lock = new Tranca();
      lock.id = data.content.id;
      lock.status = data.content.status;
      lock.bicicleta = data.content.bicicleta;

      return lock;
    }catch(error){
      return null;
    }

  }


  public async unlockBike(idLock: string): Promise<Tranca> {
    const endpoint = `${this.apiURL}tranca/${idLock}/destrancar`;

    try{
      const response = await axios.post(endpoint);
      
      const {data} = response;
      const lock = new Tranca();
      lock.id = data.content.id;
      lock.status = data.content.status;
      lock.bicicleta = data.content.bike;

      return lock;
    }catch(error){
      return null;
    }
  }

  public async lockBike(idLock: string, idBike: string): Promise<Tranca> {
    const endpoint = `${this.apiURL}tranca/${idLock}/trancar/`;

    try{
      const response = await axios.post(endpoint, {bicicleta: idBike});

      const {data} = response;
      const lock = new Tranca();
      lock.id = data.content.id;
      lock.status = data.content.status;
      lock.bicicleta = data.content.bike;

      return lock;
    }catch(error){
      return null;
    }
  }

  public async getBikeById(idBike: string): Promise<Bike> {
    const endpoint = 'bicicleta/';

    try{
      const response = await axios.get(`${this.apiURL}${endpoint}${idBike}`);

      const {data} = response;
      const bike = new Bike();
      bike.id = data.content.id;
      bike.marca = data.content.marca;
      bike.modelo = data.content.modelo;
      bike.ano = data.content.ano;
      bike.numero = data.content.numero;
      bike.status = data.content.status;

      return bike;
    }catch(error){
      return null;
    }
  }
}

