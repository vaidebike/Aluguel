import { JsonDB } from 'node-json-db';
import { v4 as uuidv4 } from 'uuid';
import { NoDataError } from '../../errors/NoDataError';
import { NotFoundError } from '../../errors/NotFoundError';
import { Aluguel } from '../Aluguel';
import { RepositoryInterface } from './RepositoryInterface';

export class RentRepository implements RepositoryInterface {

  private _db: JsonDB;

  constructor(db: JsonDB) {
    this._db = db;
  }

  public get db(): JsonDB {
    return this._db;
  }

  public set db(value: JsonDB) {
    this._db = value;
  }

  public async create(aluguel: Aluguel): Promise<Aluguel> {
    if(!aluguel) throw new NoDataError('Aluguel inválido.');
    
    const id = uuidv4();
    aluguel.id = id;

    await this.db.push('/alugueis[]', aluguel, true);

    return aluguel;
  }

  public async getRentByBike(bicicleta: string): Promise<Aluguel> {
    if(!bicicleta) throw new NoDataError('Bicicleta inválida.');

    try{
      const rentIndex = await this.db.getIndex('/alugueis', bicicleta, 'bicicleta');
      //get all rents from db
      if(rentIndex === -1) throw new NotFoundError('Aluguel não encontrado.');

      const aluguel = await this.db.getData(`/alugueis[${rentIndex}]`) as Aluguel;
      
      return aluguel;
    }catch(error){
      throw new NotFoundError('Aluguel não encontrado.');
    }
  }

  public async getRentByCyclist(ciclista: string): Promise<Aluguel> {
    if(!ciclista) throw new NoDataError('Ciclista inválido.');

    try{
      const allRents = await this.db.getData('/alugueis');

      const rentsByCyclist = allRents.filter((rent: Aluguel) => rent.ciclista === ciclista);

      if(rentsByCyclist.length === 0) throw new NotFoundError('Aluguel não encontrado.');

      const currentRent = rentsByCyclist.find((rent: Aluguel) => rent.trancaFim === undefined);

      if(currentRent === undefined) throw new NotFoundError('Aluguel não encontrado.');

      return currentRent;
    }catch(error){
      throw new NotFoundError('Aluguel não encontrado.');
    }
  }

  findOne(id: string): Promise<unknown> {
    throw new Error('Method not implemented.');
  }
  findAll(): Promise<unknown> {
    throw new Error('Method not implemented.');
  }
  public async update(id: string, data: Aluguel): Promise<Aluguel> {
    if(!id) throw new NoDataError('Id inválido.');
    if(!data) throw new NoDataError('Dados inválidos.');

    const aluguelIndex = await this.db.getIndex('/alugueis', id);

    if(aluguelIndex === -1) throw new NoDataError('Aluguel não encontrado.');

    await this.db.push(`/alugueis[${aluguelIndex}]`, data, true);
    
    return data;
  }

  delete(id: string): Promise<unknown> {
    throw new Error('Method not implemented.');
  }

}