import { JsonDB } from 'node-json-db';
import { v4 as uuidv4 } from 'uuid';
import { NoDataError } from '../../errors/NoDataError';
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


  findOne(id: string): Promise<unknown> {
    throw new Error('Method not implemented.');
  }
  findAll(): Promise<unknown> {
    throw new Error('Method not implemented.');
  }
  update(id: string, data: unknown): Promise<unknown> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): Promise<unknown> {
    throw new Error('Method not implemented.');
  }

}